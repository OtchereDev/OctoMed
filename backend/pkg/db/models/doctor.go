package models

import "time"

type Doctor struct {
	ID          uint         `json:"id,omitempty" gorm:"primary_key"`
	Name        string       `json:"name" validate:"required"`
	Title       string       `json:"title" validate:"required"`
	Specialty   string       `json:"specialty" validate:"required"`
	Hospital    string       `json:"hospital" validate:"required"`
	About       string       `json:"about" validate:"required"`
	Email       string       `json:"email" validate:"email"`
	Password    string       `json:"-"`
	UserPass    string       `json:"password" gorm:"-" validate:"required"`
	Experiences []Experience `json:"experiences" gorm:"foreignKey:DoctorID"`
	Educations  []Education  `json:"educations" gorm:"foreignKey:DoctorID"`
	Ratings     []Rating     `json:"ratings" gorm:"foreignKey:DoctorID"`
	CreatedAt   time.Time    `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt   time.Time    `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type Experience struct {
	ID              uint      `json:"id,omitempty" gorm:"primary_key"`
	Company         string    `json:"company" validate:"required"`
	Logo            string    `json:"logo" validate:"required"`
	Position        string    `json:"position" validate:"required"`
	StartYear       time.Time `json:"start_year" validate:"required"`
	EndYear         time.Time `json:"end_year"`
	CurrentPosition bool      `json:"current_position"`
	DoctorID        uint      `json:"doctor_id"`
	CreatedAt       time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt       time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type Education struct {
	ID               uint      `json:"id,omitempty" gorm:"primary_key"`
	School           string    `json:"school" validate:"required"`
	Course           string    `json:"course" validate:"required"`
	Logo             string    `json:"logo" validate:"required"`
	StartYear        time.Time `json:"start_year" validate:"required"`
	EndYear          time.Time `json:"end_year"`
	CurrentEducation bool      `json:"current_education"`
	DoctorID         uint      `json:"doctor_id"`
	CreatedAt        time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt        time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type Rating struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	Comment   string    `json:"comment" validate:"required"`
	Rate      int       `json:"rate" validate:"required"`
	UserID    uint      `json:"user_id" validate:"-"`
	User      User      `json:"user" validate:"-"`
	DoctorID  uint      `json:"doctor_id" validate:"required"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}
