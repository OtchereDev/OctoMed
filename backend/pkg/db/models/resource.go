package models

import "time"

type Resource struct {
	ID          uint      `json:"id,omitempty" gorm:"primary_key"`
	Title       string    `json:"title" validate:"required"`
	Content     string    `json:"content" validate:"required"`
	Poster      string    `json:"poster" validate:"required"`
	Type        string    `json:"type" validate:"required"` // can be either video or blog
	Description string    `json:"description" validate:"required"`
	Author      string    `json:"author" validate:"required"`
	AuthorImage string    `json:"author_image" validate:"required"`
	Category    string    `json:"category" validate:"required"`
	CreatedAt   time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}
