package bot

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/sashabaranov/go-openai"
	"gorm.io/gorm"
)

type BotApp struct {
	DB           *gorm.DB
	App          *fiber.App
	Validate     *validator.Validate
	OpenAIClient *openai.Client
}

type ChatRequest struct {
	ChatID  uint   `json:"chat_id"`
	UserID  uint   `json:"user_id"`
	Content string `json:"content"`
}
