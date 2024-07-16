package user

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
)

func (u UserApp) CreateUser(data models.User) (*models.User, error) {
	db := u.DB

	var existingUser models.User

	db.Where("is_deleted = ?", false).First(&existingUser, "email = ?", strings.ToLower(data.Email))

	if existingUser.Email != "" {
		return nil, errors.New("user with this email already exist")
	}

	hashedPassword, err := HashPassword(data.UserPassword)

	if err != nil {
		return nil, err
	}

	newUser := models.User{
		FirstName: data.FirstName,
		LastName:  data.LastName,
		Email:     strings.ToLower(data.Email),
		Password:  string(hashedPassword),
	}

	result := db.Create(&newUser)

	var user models.User

	db.First(&user, "id = ?", newUser.ID)

	return &user, result.Error

}

func (u UserApp) GetUserDetail(userId int) (*models.User, error) {
	db := u.DB

	var user models.User

	result := db.First(&user, "id = ?", userId)

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

	existingUser.FirstName = data.FirstName
	existingUser.LastName = data.LastName
	existingUser.Email = strings.ToLower(data.Email)

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

	err := CompareUserPassword(password, user.Password)

	user.LastLogin = time.Now()

	db.Save(&user)

	if err != nil {
		return "", nil, errors.New("invalid credientials")
	}

	var jwtPayload = JwtPayload{
		Name:     user.FirstName + " " + user.LastName,
		Email:    user.Email,
		UserType: "user",
		UserID:   fmt.Sprint(user.ID),
	}

	accessToken, err := GenerateJWT(jwtPayload)

	if err != nil {
		return "", nil, err
	}

	return accessToken, &user, nil
}

func (u UserApp) RequestForgotPassword(data ForgotPasswordRequestPayload) error {
	db := u.DB

	var existingUser models.User

	db.Where("is_deleted = ?", false).First(&existingUser, "email = ?", strings.ToLower(data.Email))

	if existingUser.Email != "" {
		return errors.New("user with this email already exist")
	}

	code := GenerateCode(10)

	request := models.ForgotPassword{
		UserID: existingUser.ID,
		User:   existingUser,
		Token:  code,
	}

	result := db.Save(&request)

	// send email notification with code
	sendLink := fmt.Sprintf("%v/%v", existingUser.ID, code)
	fmt.Println(sendLink)

	return result.Error
}

func (u UserApp) ResetPassword(data ResetPasswordPayload) error {
	db := u.DB

	var code models.ForgotPassword

	db.Where("is_used = ?", false).Preload("User").First(&code, "user_id = ? AND token = ?", data.User, data.Token)

	if code.Token != "" {
		return errors.New("token does not exist")
	}

	hashedPassword, err := HashPassword(data.Password)

	if err != nil {
		return err
	}

	code.User.Password = string(hashedPassword)

	result := db.Save(&code.User)

	return result.Error
}
