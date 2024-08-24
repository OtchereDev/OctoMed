package models

import "time"

type WaterConsumption struct {
	ID            uint      `json:"id" gorm:"primary_key"`
	NumberOfGlass int       `json:"number_of_glass" gorm:"default:0"`
	UserID        uint      `json:"user_id"`
	CreatedAt     time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
