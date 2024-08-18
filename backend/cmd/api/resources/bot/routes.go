package bot

import (
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func (a BotApp) BotRoutes() {

	a.App.Get("/bot/chats", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetAllMyChats(c, a)
	})
	a.App.Post("/bot/chats", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateChat(c, a)
	})

	a.App.Get("/bot/chats/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetDetailsOfMyChat(c, a)
	})

	a.App.Post("bot/chats/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return MessageOpenAI(c, a)
	})
}
