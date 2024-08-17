package models

import "time"

type Appointment struct {
	ID          uint      `json:"id,omitempty" gorm:"primary_key"`
	DoctorID    uint      `json:"doctor_id" validate:"required"`
	Doctor      Doctor    `json:"doctor" validate:"-"`
	UserID      uint      `json:"user_id"`
	User        User      `json:"user" validate:"-"`
	StartTime   time.Time `json:"start_time" validate:"required"`
	EndTime     time.Time `json:"end_time" validate:"required"`
	Duration    string    `json:"duration" validate:"required"`
	Status      string    `json:"status" gorm:"default:scheduled"`
	MeetingLink string    `json:"meeting_link"`
	IsDeleted   bool      `json:"is_deleted" gorm:"default:false"`
	CreatedAt   time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type RescheduleAppointmentType struct {
	StartTime time.Time `json:"start_time" validate:"required"`
	EndTime   time.Time `json:"end_time" validate:"required"`
}
