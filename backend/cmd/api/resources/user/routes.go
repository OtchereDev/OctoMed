package user

import "github.com/gofiber/fiber/v2"

func (a UserApp) UserRoutes() {
	a.App.Post("/users/login", func(c *fiber.Ctx) error {
		return LoginUser(c, a)
	})
	a.App.Post("/users/create", func(c *fiber.Ctx) error {
		return CreateUser(c, a)
	})
	a.App.Get("/users/details/:userId", func(c *fiber.Ctx) error {
		return GetUserDetails(c, a)
	})
	a.App.Put("/users/edit/:userId", func(c *fiber.Ctx) error {
		return EditUser(c, a)
	})
	a.App.Post("/users/request-forgot-password", func(c *fiber.Ctx) error {
		return RequestForgotPassword(c, a)
	})
	a.App.Post("/users/reset-password", func(c *fiber.Ctx) error {
		return RequestPassword(c, a)
	})
}
