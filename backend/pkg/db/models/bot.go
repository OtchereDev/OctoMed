package models

import "time"

type BotChat struct {
	ID        uint         `json:"id,omitempty" gorm:"primary_key"`
	Messages  []BotMessage `json:"message"`
	User      User         `json:"user"`
	UserID    uint         `json:"user_id"`
	Title     string       `json:"title"`
	CreatedAt time.Time    `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time    `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}

type BotMessage struct {
	ID        uint      `json:"id,omitempty" gorm:"primary_key"`
	Role      string    `json:"role"`
	Content   string    `json:"content" validate:"required"`
	BotChatID uint      `json:"bot_chat_id"`
	CreatedAt time.Time `json:"created_at,omitempty" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at,omitempty" gorm:"autoUpdateTime"`
}
