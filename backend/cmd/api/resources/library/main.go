package library

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type LibraryApp struct {
	DB       *gorm.DB
	App      *fiber.App
	Validate *validator.Validate
}
