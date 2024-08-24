package fitness

import (
	"strconv"
	"time"

	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	"github.com/gofiber/fiber/v2"
)

func GetOrCreateWaterConsumption(c *fiber.Ctx, app FitnessApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	date := c.Query("date")

	var parsedDate time.Time

	var err error
	if date == "" {
		parsedDate = time.Now() // Use current date if not provided
	} else {
		parsedDate, err = time.Parse("2006-01-02", date) // Parse the provided date
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid date format, expected YYYY-MM-DD",
			})
		}
	}

	startOfDay := time.Date(parsedDate.Year(), parsedDate.Month(), parsedDate.Day(), 0, 0, 0, 0, parsedDate.Location())

	water, err := app.GetOrCreateWaterConsumption(userId, startOfDay)

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
			"message":           "Successfully fetched water comsumption",
			"water_comsumption": water,
		}},
	)
}

func IncreaseWaterConsumption(c *fiber.Ctx, app FitnessApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	date := c.Query("date")

	var parsedDate time.Time
	var err error
	if date == "" {
		parsedDate = time.Now() // Use current date if not provided
	} else {
		parsedDate, err = time.Parse("2006-01-02", date) // Parse the provided date
		if err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
				"error": "Invalid date format, expected YYYY-MM-DD",
			})
		}
	}

	startOfDay := time.Date(parsedDate.Year(), parsedDate.Month(), parsedDate.Day(), 0, 0, 0, 0, parsedDate.Location())

	water, err := app.IncreaseWaterConsumption(userId, startOfDay)

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
			"message":           "Successfully increased water comsumption",
			"water_comsumption": water,
		}},
	)

}

func GenerateDiet(c *fiber.Ctx, app FitnessApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	app.GenerateDiet(userId)

	return c.JSON(&fiber.Map{})
}
