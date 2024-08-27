package appointment

import (
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/sashabaranov/go-openai"
	"gorm.io/gorm"
)

type AppointmentApp struct {
	DB           *gorm.DB
	App          *fiber.App
	Validate     *validator.Validate
	OpenAiClient *openai.Client
}

type GroupedAppointments struct {
	Date         string               `json:"date"`
	Appointments []models.Appointment `json:"appointments"`
}
