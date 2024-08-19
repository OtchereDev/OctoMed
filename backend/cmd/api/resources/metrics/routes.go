package metric

import (
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func (a MetricApp) Routes() {

	a.App.Get("/metrics/:type", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetMetricsByDateRange(c, a)
	})

	a.App.Post("/metrics/pulse", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreatePulse(c, a)
	})
	a.App.Post("/metrics/heartbeat", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateHeartBeat(c, a)
	})

	a.App.Post("/metrics/bloodpressure", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateBloodPressure(c, a)
	})

	a.App.Post("/metrics/bloodglucose", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateBloodGlucose(c, a)
	})

	a.App.Post("/metrics/sleeppattern", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateSleepPattern(c, a)
	})

	a.App.Post("/metrics/weight", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateWeight(c, a)
	})

	a.App.Post("/metrics/height", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateHeight(c, a)
	})

	// Update Metrics
	a.App.Put("/metrics/pulse/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return UpdatePulse(c, a)
	})
	a.App.Put("/metrics/heartbeat/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return UpdateHeartBeat(c, a)
	})

	a.App.Put("/metrics/bloodpressure/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return UpdateBloodPressure(c, a)
	})

	a.App.Put("/metrics/bloodglucose/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return UpdateBloodGlucose(c, a)
	})

	a.App.Put("/metrics/sleeppattern/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return UpdateSleepPattern(c, a)
	})

	a.App.Put("/metrics/weight/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return UpdateWeight(c, a)
	})

	a.App.Put("/metrics/height/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return UpdateHeight(c, a)
	})

	// Delete metrics
	a.App.Delete("/metrics/pulse/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeletePulse(c, a)
	})
	a.App.Delete("/metrics/heartbeat/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeleteHeartBeat(c, a)
	})

	a.App.Delete("/metrics/bloodpressure/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeleteBloodPressure(c, a)
	})

	a.App.Delete("/metrics/bloodglucose/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeleteBloodGlucose(c, a)
	})

	a.App.Delete("/metrics/sleeppattern/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeleteSleepPattern(c, a)
	})

	a.App.Delete("/metrics/weight/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeleteWeight(c, a)
	})

	a.App.Delete("/metrics/height/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeleteHeight(c, a)
	})

}
