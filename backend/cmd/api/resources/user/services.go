package user

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/notification"
	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/storage"
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/swagger"
	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	"gorm.io/gorm"
)

func (u UserApp) CreateUser(data models.User) (*models.User, error) {
	db := u.DB

	var existingUser models.User

	db.Where("is_deleted = ?", false).
		First(&existingUser, "email = ?", strings.ToLower(data.Email))

	if existingUser.Email != "" {
		return nil, errors.New("user with this email already exist")
	}

	hashedPassword, err := utils.HashPassword(data.Password)

	if err != nil {
		return nil, err
	}

	newUser := models.User{
		FullName:    data.FullName,
		Email:       strings.ToLower(data.Email),
		Password:    string(hashedPassword),
		PhoneNumber: data.PhoneNumber,
		DOB:         data.DOB,
	}

	result := db.Create(&newUser)

	var user models.User

	db.First(&user, "id = ?", newUser.ID)

	return &user, result.Error

}

func (u UserApp) GetUserDetail(userId int) (*models.User, error) {
	db := u.DB

	var user models.User

	result := db.Preload("EmergencyContact").
		Preload("BioData").Preload("BioData.Allergies").
		Preload("BioData.HealthConditions").Preload("Address").
		First(&user, "id = ?", userId)

	return &user, result.Error
}

func (u UserApp) EditUser(userId int, data UpdateUser) (*models.User, error) {
	db := u.DB

	var userWithSameEmail models.User

	var existingUser models.User

	db.First(&existingUser, "id = ?", userId)

	if existingUser.Email == "" {
		return nil, errors.New("user does not exist")
	}

	if existingUser.Email != strings.ToLower(data.Email) {

		db.First(&userWithSameEmail, "email = ?", strings.ToLower(data.Email))

		if userWithSameEmail.Email != "" {
			return nil, errors.New("user with this email already exist")
		}
	}

	existingUser.FullName = data.FullName
	existingUser.Email = strings.ToLower(data.Email)
	existingUser.PhoneNumber = data.PhoneNumber

	d, err := time.Parse(time.RFC3339, data.DOB)
	if err == nil {
		existingUser.DOB = d
	}

	result := db.Save(&existingUser)

	var user models.User

	db.First(&user, "id = ?", userId)

	return &user, result.Error
}

func (u UserApp) DeleteUser(userId int) (models.User, error) {
	db := u.DB

	var user models.User

	result := db.First(&user, "id = ?", userId)

	if result.Error != nil {
		return user, result.Error
	}

	user.IsDeleted = true

	result = db.Save(&user)

	return user, result.Error
}

func (u UserApp) LoginUser(email string, password string) (string, *models.User, error) {

	db := u.DB
	var user models.User

	db.Where("is_deleted = ?", false).
		First(&user, "email = ?", strings.ToLower(email))

	if user.Email == "" || user.IsDeleted {
		return "", nil, errors.New("invalid credientials")
	}

	err := utils.CompareUserPassword(password, user.Password)

	user.LastLogin = time.Now()

	db.Save(&user)

	handleStreaking(db, user.ID)

	db.Where("is_deleted = ?", false).Preload("Streak").
		First(&user, "email = ?", strings.ToLower(email))

	if err != nil {
		return "", nil, errors.New("invalid credientials")
	}

	var jwtPayload = utils.JwtPayload{
		Name:     user.FullName,
		Email:    user.Email,
		UserType: "user",
		UserID:   fmt.Sprint(user.ID),
	}

	accessToken, err := utils.GenerateJWT(jwtPayload)

	if err != nil {
		return "", nil, err
	}

	return accessToken, &user, nil
}

func (u UserApp) RequestForgotPassword(data ForgotPasswordRequestPayload) error {
	db := u.DB

	var existingUser models.User

	db.Where("is_deleted = ?", false).
		First(&existingUser, "email = ?", strings.ToLower(data.Email))

	if existingUser.Email == "" {
		return errors.New("user does not exist")
	}

	code := utils.GenerateCode(10)

	request := models.ForgotPassword{
		UserID: existingUser.ID,
		User:   existingUser,
		Token:  code,
	}

	result := db.Save(&request)

	// send email notification with code
	sendLink := fmt.Sprintf("%v/reset/%v/%v", os.Getenv("FRONTEND_URL"), existingUser.ID, code)
	notification.SendForgotPassword(
		existingUser.FullName, existingUser.Email, sendLink,
	)

	return result.Error
}

func (u UserApp) ResetPassword(data ResetPasswordPayload) error {
	db := u.DB

	var code models.ForgotPassword

	db.Where("is_used = ?", false).Preload("User").First(&code, "user_id = ? AND token = ?", data.User, data.Token)

	if code.Token == "" || code.IsUsed {
		return errors.New("token does not exist")
	}

	hashedPassword, err := utils.HashPassword(data.Password)

	if err != nil {
		return err
	}

	code.User.Password = string(hashedPassword)
	code.IsUsed = true

	result := db.Save(&code.User)
	db.Save(&code)

	return result.Error
}

func (u UserApp) SkipOnboarding(userId int) error {
	db := u.DB

	var user models.User

	db.Where("is_deleted = ?", false).First(&user, "id = ?", userId)

	user.SkipOnboarding = true

	result := db.Save(&user)

	return result.Error
}

func (u UserApp) OnboardingBiodata(userId int, data swagger.BioDataPayload) error {
	db := u.DB

	var user models.User

	db.Where("is_deleted = ?", false).Preload("BioData").
		First(&user, "id = ?", userId)

	avatar, err := storage.
		UploadImage(data.Avatar, fmt.Sprintf("%v-avatar", user.ID))
	biodata := user.BioData

	if err == nil {
		user.Avatar = avatar
	}

	if biodata != nil {
		biodata.Height = data.Height
		biodata.HeightMetric = data.HeightMetric
		biodata.Weight = data.Weight
		biodata.WeightMetric = data.WeightMetric
	} else {
		biodata = &models.BioData{
			Height:       data.Height,
			Weight:       data.Weight,
			WeightMetric: data.WeightMetric,
			HeightMetric: data.HeightMetric,
			UserID:       user.ID,
			User:         &user,
		}
	}

	result := db.Save(biodata)

	if result.Error != nil {
		return result.Error
	}

	user.BioDataID = &biodata.ID
	user.BioData = biodata
	user.BioDataSetup = true

	result = db.Save(&user)

	return result.Error
}

func (u UserApp) OnboardingLocation(userId int, data swagger.LocationPayload) error {
	db := u.DB

	var user models.User

	db.Where("is_deleted = ?", false).
		Preload("Address").Preload("EmergencyContact").
		First(&user, "id = ?", userId)
	address := user.Address
	emergency := user.EmergencyContact

	if address != nil {
		address.Country = data.Country
		address.Region = data.Region
		address.City = data.City
		address.Street = data.Street
	} else {
		address = &models.Address{
			Country: data.Country,
			Region:  data.Region,
			City:    data.City,
			Street:  data.Street,
			UserID:  user.ID,
			User:    &user,
		}
	}

	result := db.Save(address)

	if result.Error != nil {
		return result.Error
	}

	if emergency != nil {
		emergency.Name = data.Name
		emergency.PhoneNumber = data.PhoneNumber

	} else {
		emergency = &models.EmergencyContact{
			Name:        data.Name,
			PhoneNumber: data.PhoneNumber,
			UserID:      user.ID,
			User:        &user,
		}
	}

	result = db.Save(emergency)

	if result.Error != nil {
		return result.Error
	}

	user.EmergencyContactID = &emergency.ID
	user.EmergencyContact = emergency
	user.AddressID = &address.ID
	user.Address = address
	user.LocationSetup = true

	result = db.Save(&user)

	return result.Error
}

func (u UserApp) OnboardingHealthDetails(userId int, payload swagger.HealthConditionPayload) error {
	db := u.DB
	query := "id IN ?"

	var bioData models.BioData

	db.
		Preload("HealthConditions").
		Preload("Allergies").First(&bioData, "user_id = ?", userId)

	if len(payload.Allergies) > 0 {
		var newAllergies []models.Allergy
		if err := db.Where(query, payload.Allergies).Find(&newAllergies).Error; err != nil {
			return err
		}
		db.Model(&bioData).Association("Allergies").Append(newAllergies)
	}

	// Remove Allergies
	if len(payload.RemoveAllergies) > 0 {
		var removeAllergies []models.Allergy
		if err := db.Where(query, payload.RemoveAllergies).Find(&removeAllergies).Error; err != nil {
			return err
		}
		db.Model(&bioData).Association("Allergies").Delete(removeAllergies)
	}

	if len(payload.HealthConditions) > 0 {
		var newHealthConditions []models.HealthCondition
		if err := db.Where(query, payload.HealthConditions).Find(&newHealthConditions).Error; err != nil {
			return err
		}
		db.Model(&bioData).Association("HealthConditions").Append(newHealthConditions)
	}

	// Remove Health Conditions
	if len(payload.RemoveHealthConditions) > 0 {
		var removeHealthConditions []models.HealthCondition
		if err := db.Where(query, payload.RemoveHealthConditions).Find(&removeHealthConditions).Error; err != nil {
			return err
		}
		db.Model(&bioData).Association("HealthConditions").Delete(removeHealthConditions)
	}

	return nil
}

func checkAndUpdateStreak(db *gorm.DB, userID uint) {
	var streak models.Streak
	now := time.Now()

	if err := db.Where("user_id = ? AND end_date IS NULL", userID).Last(&streak).Error; err != nil {
		fmt.Println("No active streak found or error fetching streak", err)
		return
	}

	duration := now.Sub(streak.StartDate)

	if duration.Hours() > 24 {
		endDate := now
		db.Model(&streak).Update("end_date", endDate)

		fmt.Println("Streak is broken and reset")
	} else {
		fmt.Println("Streak is still valid")
	}
}

func handleStreaking(db *gorm.DB, userID uint) {
	checkAndUpdateStreak(db, userID)

	var streak models.Streak
	if err := db.Where("user_id = ? AND end_date IS NULL", userID).First(&streak).Error; errors.Is(gorm.ErrRecordNotFound, err) {
		newStreak := models.Streak{
			UserID:    userID,
			StartDate: time.Now(),
		}
		db.Create(&newStreak)
	}
}
