package fitness

import (
	"net/http"
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

	startDateStr := c.Query("date")
	var startDate time.Time

	var err error

	// If start_date is provided, try to parse it, otherwise use today's date
	if startDateStr != "" {
		startDate, err = time.Parse("2006-01-02", startDateStr)
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"status": http.StatusBadRequest,
				"data": &fiber.Map{
					"message": "invalid start_date format, expected YYYY-MM-DD",
				},
			})
		}
	} else {
		startDate = time.Now() // Default to today if no start_date is provided
	}

	mealPlans, err := app.GenerateDiet(userId, startDate)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status": http.StatusBadRequest,
			"data": &fiber.Map{
				"message": err.Error(),
			},
		})
	}

	return c.JSON(&fiber.Map{
		"status": http.StatusOK,
		"data": &fiber.Map{
			"mealPlan": mealPlans,
		},
	})
}

func GenerateExercise(c *fiber.Ctx, app FitnessApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	startDateStr := c.Query("date")
	var startDate time.Time

	var err error

	// If start_date is provided, try to parse it, otherwise use today's date
	if startDateStr != "" {
		startDate, err = time.Parse("2006-01-02", startDateStr)
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"status": http.StatusBadRequest,
				"data": &fiber.Map{
					"message": "invalid start_date format, expected YYYY-MM-DD",
				},
			})
		}
	} else {
		startDate = time.Now() // Default to today if no start_date is provided
	}

	exercises, err := app.GenerateExercise(userId, startDate)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status": http.StatusBadRequest,
			"data": &fiber.Map{
				"message": err.Error(),
			},
		})
	}

	return c.JSON(&fiber.Map{
		"status": http.StatusOK,
		"data": &fiber.Map{
			"exercises": exercises,
		},
	})
}

func ToggleInstructionCompletion(c *fiber.Ctx, app FitnessApp) error {
	instructionID, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	err = app.ToggleInstructionCompletion(uint(instructionID))

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
			"message": "Successfully toggle instruction completion",
		}},
	)
}

func ToggleAllInstructionCompletion(c *fiber.Ctx, app FitnessApp) error {
	exerciseID, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	err = app.ToggleAllInstructionCompletion(uint(exerciseID))

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
			"message": "Successfully toggle instruction completion",
		}},
	)
}

func ToggleDietCompletion(c *fiber.Ctx, app FitnessApp) error {
	instructionID, err := c.ParamsInt("id")
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}},
		)
	}

	err = app.ToggleDietCompletion(uint(userId), uint(instructionID))

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
			"message": "Successfully toggle diet completion",
		}},
	)
}
