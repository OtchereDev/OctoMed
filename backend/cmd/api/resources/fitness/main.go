package fitness

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/sashabaranov/go-openai"
	"gorm.io/gorm"
)

type FitnessApp struct {
	DB           *gorm.DB
	App          *fiber.App
	Validate     *validator.Validate
	OpenAiClient *openai.Client
}
