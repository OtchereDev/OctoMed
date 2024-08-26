package models

import "time"

type Exercise struct {
	ID            uint                  `json:"id" gorm:"primaryKey"`
	Name          string                `json:"name"`
	UserID        uint                  `json:"user_id"`
	TotalDuration int                   `json:"total_duration"`
	CaloriesLost  int                   `json:"calories_lost" gorm:"default:0"`
	Instructions  []ExerciseInstruction `json:"instructions"`
	Photo         string                `json:"photo"`
	CreatedAt     time.Time             `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     time.Time             `json:"updated_at" gorm:"autoUpdateTime"`
}

type ExerciseInstruction struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title"`
	ExerciseID  uint      `json:"exercise_id"`
	IsCompleted bool      `json:"is_completed" gorm:"default:false"`
	Content     string    `json:"content"`
	Minutes     int       `json:"minutes"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}
