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

	a.App.Get("/fitness/generate", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GenerateDiet(c, a)
	})
}
