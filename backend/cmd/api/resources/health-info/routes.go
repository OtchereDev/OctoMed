package healthinfo

import (
	"github.com/gofiber/fiber/v2"
)

func (a HealthApp) HealthConditionRoutes() {

	a.App.Get("/health-conditions", func(c *fiber.Ctx) error {
		return GeAllConditions(c, a)
	})

	// TODO: add admin middleware to route below
	a.App.Post("/health-conditions/create/allergy", func(c *fiber.Ctx) error {
		return CreateAllergy(c, a)
	})
	a.App.Post("/health-conditions/create/health-condition", func(c *fiber.Ctx) error {
		return CreateHealthCondition(c, a)
	})
}
