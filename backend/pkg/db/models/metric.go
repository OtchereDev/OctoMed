package models

import "time"

type Pulse struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Reading   int       `json:"reading"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type HeartBeat struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Reading   int       `json:"reading"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type BloodPressure struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Systolic  int       `json:"systolic"`
	Diastolic int       `json:"diastolic"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type BloodGlucose struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Reading   int       `json:"reading"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type SleepPattern struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Reading   int       `json:"reading"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type Weight struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Reading   int       `json:"reading"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type Height struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Reading   int       `json:"reading"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type BMI struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	User      User      `json:"-"`
	UserID    uint      `json:"user_id"`
	Reading   int       `json:"reading"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}
