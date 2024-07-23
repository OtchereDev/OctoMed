package user

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type UserApp struct {
	DB       *gorm.DB
	App      *fiber.App
	Validate *validator.Validate
}

type JwtPayload struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	UserType string `json:"role"`
	UserID   string `json:"user_id"`
}

type LoginRequestPayload struct {
	Email    string `json:"email" validate:"email,required"`
	Password string `json:"password" validate:"required"`
}

type UpdateUser struct {
	FullName string `json:"full_name" validate:"required"`
	Email    string `json:"email" validate:"email"`
}

type ForgotPasswordRequestPayload struct {
	Email string `json:"email" validate:"email"`
}

type ResetPasswordPayload struct {
	Token    string `json:"token" validate:"required"`
	User     int    `json:"user" validate:"required"`
	Password string `json:"password" validate:"required"`
}
