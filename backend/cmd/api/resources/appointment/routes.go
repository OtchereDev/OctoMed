package appointment

import (
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func (a AppointmentApp) AppointmentRoutes() {

	a.App.Get("/appointments", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetAllAppointments(c, a)
	})

	a.App.Post("/appointments/book", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateAppointment(c, a)
	})
	a.App.Post("/appointments/reschedule/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return RescheduleAppointment(c, a)
	})
}
