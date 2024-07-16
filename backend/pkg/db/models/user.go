package models

import "time"

type User struct {
	ID           uint      `json:"id,omitempty" gorm:"primary_key"`
	FirstName    string    `json:"first_name" validate:"required"`
	LastName     string    `json:"last_name" validate:"required"`
	Email        string    `json:"email" validate:"email"`
	PhoneNumber  string    `json:"phone_number"`
	Password     string    `json:"-"`
	DOB          string    `json:"dob"`
	Avatar       string    `json:"avatar"`
	BioData      BioData   `json:"biodata"`
	BioDataID    int       `json:"biodata_id"`
	Address      Address   `json:"address"`
	AddressID    int       `json:"address_id"`
	UserPassword string    `json:"password,omitempty" validate:"required" gorm:"-"`
	LastLogin    time.Time `json:"last_login,omitempty"`
	IsDeleted    bool      `json:"is_deleted" gorm:"default:false"`
	CreatedAt    time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt    time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type ForgotPassword struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	UserID    uint      `json:"user_id,omitempty"`
	User      User      `json:"user"`
	Token     string    `json:"token"`
	IsUsed    bool      `json:"is_used" gorm:"default:false"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type BioData struct {
	ID               uint              `json:"id,omitempty" gorm:"primary_key"`
	UserID           uint              `json:"user_id,omitempty"`
	User             *User             `json:"user"`
	Weight           int               `json:"weight"`
	WeightMetric     string            `json:"weight_metric"`
	Height           int               `json:"height"`
	HeightMetric     string            `json:"height_metric"`
	Allergies        []Allergy         `json:"allergies"`
	HealthConditions []HealthCondition `json:"health_conditons"`
	UpdatedAt        time.Time         `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type Allergy struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	Allergy   string    `json:"allergy"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type HealthCondition struct {
	ID              uint      `json:"id,omitempty" gorm:"primary_key"`
	HealthCondition string    `json:"health_condition"`
	CreatedAt       time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt       time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type Address struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	Country   string    `json:"country"`
	Region    string    `json:"region"`
	City      string    `json:"city"`
	Street    string    `json:"street"`
	User      *User     `json:"user"`
	UserID    int       `json:"user_id"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type EmergencyContact struct {
	ID          uint      `json:"id,omitempty" gorm:"primary_key"`
	Name        string    `json:"name"`
	PhoneNumber string    `json:"phone_number"`
	User        *User     `json:"user"`
	UserID      int       `json:"user_id"`
	CreatedAt   time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}
