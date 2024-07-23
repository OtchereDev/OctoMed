package utils

import (
	"encoding/json"
	"errors"

	"github.com/gofiber/fiber/v2"
)

type JwtPayload struct {
	Name      string `json:"name"`
	Email     string `json:"email"`
	UserType  string `json:"role"`
	UserID    string `json:"user_id"`
	IsAdmin   bool   `json:"is_admin"`
	CanVerify bool   `json:"can_verify"`
}

func SerializeRequestUser(c *fiber.Ctx) (*JwtPayload, error) {
	var userPayload = c.Locals("user")

	if userPayload == nil {
		return nil, errors.New("unauthorized")
	}

	jsonData, error := json.Marshal(userPayload)

	var JwtPayload JwtPayload
	json.Unmarshal(jsonData, &JwtPayload)

	return &JwtPayload, error
}
