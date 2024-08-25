package fitness

import (
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func (a FitnessApp) Routes() {
	a.App.Post("/fitness/water-consumption/increment", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return IncreaseWaterConsumption(c, a)
	})
	a.App.Get("/fitness/water-consumption", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetOrCreateWaterConsumption(c, a)
	})

	a.App.Get("/fitness/my-meal", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GenerateDiet(c, a)
	})

	a.App.Get("/fitness/my-exercise", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GenerateExercise(c, a)
	})

	a.App.Post("/fitness/my-exercise/:id/toggle", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return ToggleInstructionCompletion(c, a)
	})

	a.App.Post("/fitness/my-exercise/:id/toggle-instructions", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return ToggleAllInstructionCompletion(c, a)
	})

	a.App.Post("/fitness/my-meal/:id/toggle", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return ToggleDietCompletion(c, a)
	})
}
