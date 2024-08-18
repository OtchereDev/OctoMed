package library

import (
	"github.com/gofiber/fiber/v2"
)

func (a LibraryApp) LibraryRoutes() {

	a.App.Get("/library", func(c *fiber.Ctx) error {
		return GetAllResource(c, a)
	})
	a.App.Post("/library", func(c *fiber.Ctx) error {
		return CreateAResource(c, a)
	})

	a.App.Get("/library/:id", func(c *fiber.Ctx) error {
		return GetResourceDetail(c, a)
	})

}
