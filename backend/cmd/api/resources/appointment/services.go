package appointment

import (
	"errors"
	"time"

	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/fitness"
	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/library"
	metric "github.com/OtchereDev/ProjectAPI/cmd/api/resources/metrics"
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

func CheckAppointmentClash(db *gorm.DB, doctorID uint, startTime, endTime time.Time) (bool, error) {
	var count int64
	err := db.Model(&models.Appointment{}).
		Where("is_deleted = ?", false).
		Where("status != ?", "cancelled").
		Where("doctor_id = ? AND ((start_time < ? AND end_time > ?) OR (start_time < ? AND end_time > ?))",
			doctorID, endTime, startTime, startTime, startTime).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func GenerateUniqueMeetingLink(db *gorm.DB) (string, error) {
	for {
		link := uuid.NewString()

		var count int64
		err := db.Model(&models.Appointment{}).Where("meeting_link = ?", link).Count(&count).Error
		if err != nil {
			return "", err
		}

		if count == 0 {
			return link, nil
		}
	}
}

func (u AppointmentApp) GetAllAppointment(userId int) ([]GroupedAppointments, error) {
	var appointments []models.Appointment
	db := u.DB

	err := db.Where("is_deleted = ?", false).
		Where("user_id = ?", userId).
		Order("start_time asc").
		Preload("Doctor").
		Find(&appointments).Error

	if err != nil {
		return nil, errors.New("could not fetch appointments")
	}

	// Group appointments by day
	groupedAppointments := make(map[string][]models.Appointment)
	for _, appointment := range appointments {
		day := appointment.StartTime.Format("2006-01-02")
		groupedAppointments[day] = append(groupedAppointments[day], appointment)
	}

	// Convert the map to a slice of GroupedAppointments
	var result []GroupedAppointments
	for date, appointments := range groupedAppointments {
		result = append(result, GroupedAppointments{
			Date:         date,
			Appointments: appointments,
		})
	}

	return result, nil

}

func (u AppointmentApp) CreateAppointment(data models.Appointment) error {
	db := u.DB

	clash, err := CheckAppointmentClash(db, data.DoctorID, data.StartTime, data.EndTime)

	if err != nil {
		return errors.New("could not check for appointment clashes")
	}

	if clash {
		return errors.New("the doctor has an existing appointment at this time")
	}

	result := db.Create(&data)

	return result.Error
}

func (u AppointmentApp) RescheduleAppointment(user int, data models.RescheduleAppointmentType, aId int) error {
	var appointment models.Appointment

	db := u.DB

	result := db.Where("is_deleted = ?", false).
		Where("user_id = ?", user).
		First(&appointment, aId)

	if appointment.ID == 0 {
		return errors.New("appointment not found")
	}

	if result.Error != nil {
		return result.Error
	}

	clash, err := CheckAppointmentClash(db, appointment.DoctorID, data.StartTime, data.EndTime)

	if err != nil {
		return errors.New("could not check for appointment clashes")
	}

	if clash {
		return errors.New("the doctor has an existing appointment at this time")
	}

	appointment.StartTime = data.StartTime
	appointment.EndTime = data.EndTime

	result = db.Save(&appointment)

	return result.Error

}

func (u AppointmentApp) CancelAppointment(user int, aId int) error {
	var appointment models.Appointment

	db := u.DB

	result := db.Where("is_deleted = ?", false).
		Where("user_id = ?", user).
		First(&appointment, aId)

	if appointment.ID == 0 {
		return errors.New("appointment not found")
	}

	if result.Error != nil {
		return result.Error
	}

	appointment.Status = "cancelled"

	result = db.Save(&appointment)

	return result.Error
}

func (u AppointmentApp) DeleteAppointment(user int, aId int) error {
	var appointment models.Appointment

	db := u.DB

	result := db.Where("is_deleted = ?", false).
		Where("user_id = ?", user).
		First(&appointment, aId)

	if appointment.ID == 0 {
		return errors.New("appointment not found")
	}

	if result.Error != nil {
		return result.Error
	}

	appointment.IsDeleted = true

	result = db.Save(&appointment)

	return result.Error
}

func (u AppointmentApp) GetOrGenerateMeetingLink(user int, aId int) (string, error) {
	var appointment models.Appointment

	db := u.DB

	result := db.Where("is_deleted = ?", false).
		Where("user_id = ?", user).
		First(&appointment, aId)

	if appointment.ID == 0 {
		return "", errors.New("appointment not found")
	}

	if result.Error != nil {
		return "", result.Error
	}

	// // Check if the current time is within the appointment's start and end time
	currentTime := time.Now()
	if currentTime.Before(appointment.StartTime) || currentTime.After(appointment.EndTime) {
		return "", errors.New("meeting link can only be accessed during the scheduled appointment time")
	}

	if appointment.MeetingLink == "" {
		newLink, _ := GenerateUniqueMeetingLink(db)
		appointment.MeetingLink = newLink

		result = db.Save(&appointment)

		return newLink, result.Error
	}

	return appointment.MeetingLink, nil
}

func (u AppointmentApp) GetAppointmentDetails(user int, aId int) (*models.Appointment, error) {
	var appointment models.Appointment

	db := u.DB

	result := db.Where("is_deleted = ?", false).
		Where("user_id = ?", user).
		Preload("Doctor").
		First(&appointment, aId)

	if appointment.ID == 0 {
		return nil, errors.New("appointment not found")
	}

	return &appointment, result.Error
}

func (u AppointmentApp) LeaveAReview(rating models.Rating) error {
	db := u.DB
	var doctor models.Doctor

	if err := db.First(&doctor, rating.DoctorID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("doctor not found")
		}
		return errors.New("could not verify doctor")
	}

	if err := db.Create(&rating).Error; err != nil {
		return errors.New("could not create rating")
	}

	return nil
}

func (u AppointmentApp) GetAppointmentDetailsByMeetingId(user int, aId string) (*models.Appointment, error) {
	var appointment models.Appointment

	db := u.DB

	result := db.Where("is_deleted = ?", false).
		Where("user_id = ?", user).
		Where("meeting_link = ?", aId).
		Preload("Doctor").
		First(&appointment)

	if appointment.ID == 0 {
		return nil, errors.New("appointment not found")
	}

	return &appointment, result.Error
}

func (u AppointmentApp) GetAppointmentDetailsByMeetingIdDoc(aId string) (*models.Appointment, error) {
	var appointment models.Appointment

	db := u.DB

	result := db.Where("is_deleted = ?", false).
		Where("meeting_link = ?", aId).
		Preload("Doctor").
		Preload("User").
		First(&appointment)

	if appointment.ID == 0 {
		return nil, errors.New("appointment not found")
	}

	return &appointment, result.Error
}

func GetLastAppointment(userID uint, DB *gorm.DB) (models.Appointment, error) {
	var appt models.Appointment
	if err := DB.Where("user_id = ?", userID).Preload("Doctor").Order("created_at desc").First(&appt).Error; err != nil {
		return appt, err
	}
	return appt, nil
}

func (u AppointmentApp) Dashboard(user int) *fiber.Map {
	bloodPressure, _ := metric.GetLastBloodPressure(uint(user), u.DB)
	weight, _ := metric.GetLastWeight(uint(user), u.DB)
	height, _ := metric.GetLastHeight(uint(user), u.DB)
	pulse, _ := metric.GetLastPulse(uint(user), u.DB)
	bloodGlucose, _ := metric.GetLastBloodGlucose(uint(user), u.DB)
	sleep, _ := metric.GetLastSleepPattern(uint(user), u.DB)

	appt, _ := GetLastAppointment(uint(user), u.DB)
	resource, _ := library.GetLastResource(u.DB)

	exercises, _ := fitness.FetchThreeDayExercise(user, u.DB, u.OpenAiClient, time.Now())
	meals, _ := fitness.FetchThreeDayMeals(user, u.DB, u.OpenAiClient, time.Now())

	metrics := &fiber.Map{
		"blood_pressure": bloodPressure,
		"weight":         weight,
		"pulse":          pulse,
		"height":         height,
		"blood_glucose":  bloodGlucose,
		"sleep":          sleep,
	}

	return &fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"metrics":     metrics,
			"exercises":   exercises,
			"meals":       meals,
			"appointment": appt,
			"resource":    resource,
		},
	}
}
