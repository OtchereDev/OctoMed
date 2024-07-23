package middlewares

import (
	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	"github.com/gofiber/fiber/v2"
)

var PermissionNotFulfilledError = &fiber.Map{"status": fiber.StatusForbidden, "data": &fiber.Map{"message": "You dont have permission to perform this action"}}

func RoleMiddleware(roles []string) fiber.Handler {

	return func(c *fiber.Ctx) error {
		user, _ := utils.SerializeRequestUser(c)

		if utils.Contains(roles, user.UserType) {
			return c.Next()
		}

		return c.Status(fiber.StatusForbidden).JSON(PermissionNotFulfilledError)

	}
}
