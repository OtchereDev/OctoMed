package fitness

import (
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
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

type DailyMeals struct {
	Date  string        `json:"date"`
	Meals []models.Diet `json:"meals"`
}

type DailyExercise struct {
	Date     string            `json:"date"`
	Exercise []models.Exercise `json:"exercise"`
}
