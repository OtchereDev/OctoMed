package metric

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type MetricApp struct {
	DB       *gorm.DB
	App      *fiber.App
	Validate *validator.Validate
}

type ResourceListParam struct {
	Page     int
	Category string
	Search   string
}
