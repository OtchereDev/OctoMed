package doctor

import (
	"github.com/gofiber/fiber/v2"
)

func (a DoctorApp) DoctorRoutes() {

	a.App.Get("/doctors", func(c *fiber.Ctx) error {
		return GetAllProviders(c, a)
	})

	a.App.Get("/doctors/:id", func(c *fiber.Ctx) error {
		return GetProviderDetail(c, a)
	})

	a.App.Post("/doctors/create", func(c *fiber.Ctx) error {
		return CreateProvider(c, a)
	})
	a.App.Post("/doctors/:id/education/create", func(c *fiber.Ctx) error {
		return CreateEducation(c, a)
	})
	a.App.Post("/doctors/:id/experience/create", func(c *fiber.Ctx) error {
		return CreateExperience(c, a)
	})
}
