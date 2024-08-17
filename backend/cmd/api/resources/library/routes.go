package library

import (
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func (a LibraryApp) LibraryRoutes() {

	a.App.Get("/library", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetAllResource(c, a)
	})
	a.App.Post("/library", func(c *fiber.Ctx) error {
		return CreateAResource(c, a)
	})

	a.App.Get("/library/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetResourceDetail(c, a)
	})

}
