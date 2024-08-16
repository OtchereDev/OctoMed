package appointment

import (
	"errors"
	"time"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"gorm.io/gorm"
)

func CheckAppointmentClash(db *gorm.DB, doctorID uint, startTime, endTime time.Time) (bool, error) {
	var count int64
	err := db.Model(&models.Appointment{}).
		Where("doctor_id = ? AND ((start_time < ? AND end_time > ?) OR (start_time < ? AND end_time > ?))",
			doctorID, endTime, startTime, startTime, startTime).
		Count(&count).Error

	if err != nil {
		return false, err
	}

	return count > 0, nil
}

func (u AppointmentApp) GetAllAppointment(userId int) ([]GroupedAppointments, error) {
	var appointments []models.Appointment
	db := u.DB

	err := db.Where("user_id = ?", userId).Order("start_time asc").Preload("Doctor").Find(&appointments).Error

	if err != nil {
		return nil, errors.New("could not fetch appointments")
	}

	// Group appointments by day
	groupedAppointments := make(map[string][]models.Appointment)
	for _, appointment := range appointments {
		day := appointment.StartTime.Format("2006-01-02")
		groupedAppointments[day] = append(groupedAppointments[day], appointment)
	}

	// fmt.Println(groupedAppointments[0].)

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

	result := db.Where("user_id = ?", user).First(&appointment, aId)

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
