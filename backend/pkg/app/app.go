package app

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Application struct {
	DB  *gorm.DB
	App *fiber.App
}
