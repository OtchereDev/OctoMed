package models

import "time"

type Diet struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	UserID      uint      `json:"user_id"`
	Name        string    `json:"name"`
	Type        string    `json:"type"` //either breakfast, lunch, dinner or snack
	IsCompleted bool      `json:"is_completed" gorm:"default:false"`
	Calories    int       `json:"calories"`
	Protein     int       `json:"protein"` // in grams
	Carbs       int       `json:"carbs"`   // in grams
	Fats        int       `json:"fats"`    // in grams
	Photo       string    `json:"photo"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type Meal struct {
	Name     string `json:"string"`
	Type     string `json:"type"` //either breakfast, lunch, dinner or snack
	Calories int    `json:"calories"`
	Protein  int    `json:"protein"` // in grams
	Carbs    int    `json:"carbs"`   // in grams
	Fats     int    `json:"fats"`    // in grams
}
