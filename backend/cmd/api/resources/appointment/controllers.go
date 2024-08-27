package appointment

import (
	"net/http"
	"strconv"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	"github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

func GetAllAppointments(c *fiber.Ctx, app AppointmentApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	response, err := app.GetAllAppointment(userId)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message":      "Successfully fetched appointments",
			"appointments": response,
		}},
	)

}

func CreateAppointment(c *fiber.Ctx, app AppointmentApp) error {
	var appointment models.Appointment
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	appointment.UserID = uint(userId)

	if err := c.BodyParser(&appointment); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": "Cannot parse JSON",
			},
		})
	}

	if validationErr := app.Validate.Struct(&appointment); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	// Validate that StartTime is before EndTime
	if appointment.EndTime.Before(appointment.StartTime) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": "end_time must be after start_time",
			},
		})
	}

	response := app.CreateAppointment(appointment)

	if response != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": response.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Appointment successfully booked",
		}},
	)
}

func RescheduleAppointment(c *fiber.Ctx, app AppointmentApp) error {
	var appointment models.RescheduleAppointmentType
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	appointmentID, _ := c.ParamsInt("id")

	if err := c.BodyParser(&appointment); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": "Cannot parse JSON",
			},
		})
	}

	if validationErr := app.Validate.Struct(&appointment); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	// Validate that StartTime is before EndTime
	if appointment.EndTime.Before(appointment.StartTime) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": "end_time must be after start_time",
			},
		})
	}

	response := app.RescheduleAppointment(userId, appointment, appointmentID)

	if response != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": response.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Appointment successfully booked",
		}},
	)
}

func CancelAppointment(c *fiber.Ctx, app AppointmentApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	appointmentID, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	err = app.CancelAppointment(userId, appointmentID)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Successfully cancelled appointment",
		}},
	)

}

func DeleteAppointment(c *fiber.Ctx, app AppointmentApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	appointmentID, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	err = app.DeleteAppointment(userId, appointmentID)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Successfully deleted appointment",
		}},
	)

}

func AppointmentDetail(c *fiber.Ctx, app AppointmentApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	appointmentID, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	appt, err := app.GetAppointmentDetails(userId, appointmentID)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message":     "Successfully fetched appointment",
			"appointment": appt,
		}},
	)

}

func GetMeetingLink(c *fiber.Ctx, app AppointmentApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	appointmentID, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	ml, err := app.GetOrGenerateMeetingLink(userId, appointmentID)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message":      "Successfully fetched appointment meeting link",
			"meeting_link": ml,
		}},
	)

}

func LeaveAReview(c *fiber.Ctx, app AppointmentApp) error {
	var rating models.Rating
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	// Parse the JSON payload
	if err := c.BodyParser(&rating); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"message": "Errors",
			"data":    &fiber.Map{"errors": "Cannot parse JSON"},
		})
	}

	// Validate the rating
	if rating.Rate < 1 || rating.Rate > 5 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"message": "Errors",
			"data":    &fiber.Map{"errors": "Rate must be between 1 and 5"},
		})
	}

	if validationErr := app.Validate.Struct(&rating); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	rating.UserID = uint(userId)
	err := app.LeaveAReview(rating)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Successfully added review",
		}},
	)
}

func GetAppointmentDetailsByMeetingId(c *fiber.Ctx, app AppointmentApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	appointmentID := c.Params("id")

	appt, err := app.GetAppointmentDetailsByMeetingId(userId, appointmentID)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message":     "Successfully fetched appointment",
			"appointment": appt,
		}},
	)

}

func GetDashboardData(c *fiber.Ctx, app AppointmentApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	response := app.Dashboard(userId)

	return c.JSON(response)
}
