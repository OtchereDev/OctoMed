package user

import (
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func (a UserApp) UserRoutes() {
	// Authentication
	a.App.Post("/users/login", func(c *fiber.Ctx) error {
		return LoginUser(c, a)
	})
	a.App.Post("/users/create", func(c *fiber.Ctx) error {
		return CreateUser(c, a)
	})

	// forgot password
	a.App.Post("/users/request-forgot-password", func(c *fiber.Ctx) error {
		return RequestForgotPassword(c, a)
	})
	a.App.Post("/users/reset-password", func(c *fiber.Ctx) error {
		return RequestPassword(c, a)
	})

	// onboarding
	a.App.Post("/users/skip-onboarding", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return SkipOnboarding(c, a)
	})
	a.App.Post("/users/onboarding/biodata", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return OnboardingBiodata(c, a)
	})
	a.App.Post("/users/onboarding/location", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return OnboardingLocation(c, a)
	})
	a.App.Post("/users/onboarding/health-information", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return OnboardingHealthDetails(c, a)
	})

	// user detail
	a.App.Get("/users/details", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetUserDetails(c, a)
	})
	a.App.Put("/users/details/edit", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return EditUser(c, a)
	})

}
