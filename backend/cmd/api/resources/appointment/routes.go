package appointment

import (
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
	"github.com/gofiber/fiber/v2"
)

func (a AppointmentApp) AppointmentRoutes() {

	a.App.Post("/rating/create", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return LeaveAReview(c, a)
	})

	a.App.Get("/appointments", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetAllAppointments(c, a)
	})

	a.App.Post("/appointments/book", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CreateAppointment(c, a)
	})
	a.App.Post("/appointments/reschedule/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return RescheduleAppointment(c, a)
	})

	a.App.Delete("/appointments/delete/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return DeleteAppointment(c, a)
	})
	a.App.Post("/appointments/cancel/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return CancelAppointment(c, a)
	})
	a.App.Get("/appointments/meeting-link/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return GetMeetingLink(c, a)
	})
	a.App.Get("/appointments/:id", middlewares.AuthMiddleware, func(c *fiber.Ctx) error {
		return AppointmentDetail(c, a)
	})
}
