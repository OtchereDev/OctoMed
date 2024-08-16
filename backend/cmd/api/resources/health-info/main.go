package healthinfo

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type HealthApp struct {
	DB       *gorm.DB
	App      *fiber.App
	Validate *validator.Validate
}
