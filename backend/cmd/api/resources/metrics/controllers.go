package metric

import (
	"net/http"
	"strconv"
	"time"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	"github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

func CreatePulse(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	var resource models.Pulse
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	pulse, err := app.CreatePulse(uint(userId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"data":    pulse,
		"message": "Successfully recorded pulse",
		"status":  http.StatusOK,
	})
}

func CreateHeartBeat(c *fiber.Ctx, app MetricApp) error {
	var resource models.HeartBeat
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	beat, err := app.CreateHeartBeat(uint(userId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"data":    beat,
		"message": "Successfully recorded heart beat",
		"status":  http.StatusOK,
	})
}

func CreateBloodPressure(c *fiber.Ctx, app MetricApp) error {
	var resource models.BloodPressure
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	pressure, err := app.CreateBloodPressure(uint(userId), resource.Systolic, resource.Diastolic)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"data":    pressure,
		"message": "Successfully recorded blood pressure",
		"status":  http.StatusOK,
	})
}

func CreateBloodGlucose(c *fiber.Ctx, app MetricApp) error {
	var resource models.BloodGlucose
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	glucose, err := app.CreateBloodGlucose(uint(userId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"data":    glucose,
		"message": "Successfully recorded blood glucose",
		"status":  http.StatusOK,
	})
}

func CreateSleepPattern(c *fiber.Ctx, app MetricApp) error {
	var resource models.SleepPattern
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	sleep, err := app.CreateSleepPattern(uint(userId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"data":    sleep,
		"message": "Successfully recorded sleep pattern",
		"status":  http.StatusOK,
	})
}

func CreateWeight(c *fiber.Ctx, app MetricApp) error {
	var resource models.Weight
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	weight, err := app.CreateWeight(uint(userId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"data":    weight,
		"message": "Successfully created pulse",
		"status":  http.StatusOK,
	})
}

func CreateHeight(c *fiber.Ctx, app MetricApp) error {
	var resource models.Height
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	height, err := app.CreateHeight(uint(userId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
		"data":    height,
		"message": "Successfully recorded weight",
		"status":  http.StatusOK,
	})
}

func UpdateBloodPressure(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	bloodPressureId, _ := strconv.Atoi(c.Params("id"))

	var resource models.BloodPressure
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	bloodPressure, err := app.UpdateBloodPressure(uint(userId), uint(bloodPressureId), resource.Systolic, resource.Diastolic)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"data":    bloodPressure,
		"message": "Successfully updated blood pressure",
		"status":  http.StatusOK,
	})
}

func UpdateBloodGlucose(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	glucoseId, _ := strconv.Atoi(c.Params("id"))

	var resource models.BloodGlucose
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	bloodGlucose, err := app.UpdateBloodGlucose(uint(userId), uint(glucoseId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"data":    bloodGlucose,
		"message": "Successfully updated blood glucose",
		"status":  http.StatusOK,
	})
}

func UpdateSleepPattern(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	sleepPatternId, _ := strconv.Atoi(c.Params("id"))

	var resource models.SleepPattern
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	sleepPattern, err := app.UpdateSleepPattern(uint(userId), uint(sleepPatternId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"data":    sleepPattern,
		"message": "Successfully updated sleep pattern",
		"status":  http.StatusOK,
	})
}

func UpdateWeight(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	weightId, _ := strconv.Atoi(c.Params("id"))

	var resource models.Weight
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	weight, err := app.UpdateWeight(uint(userId), uint(weightId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"data":    weight,
		"message": "Successfully updated weight",
		"status":  http.StatusOK,
	})
}

func UpdateHeight(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	heightId, _ := strconv.Atoi(c.Params("id"))

	var resource models.Height
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	height, err := app.UpdateHeight(uint(userId), uint(heightId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"data":    height,
		"message": "Successfully updated height",
		"status":  http.StatusOK,
	})
}

func UpdatePulse(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	pulseId, _ := strconv.Atoi(c.Params("id"))

	var resource models.Pulse
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	pulse, err := app.UpdatePulse(uint(userId), uint(pulseId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"data":    pulse,
		"message": "Successfully updated pulse",
		"status":  http.StatusOK,
	})
}

func UpdateHeartBeat(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	heartBeatId, _ := strconv.Atoi(c.Params("id"))

	var resource models.HeartBeat
	if err := c.BodyParser(&resource); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&resource); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	heartBeat, err := app.UpdateHeartBeat(uint(userId), uint(heartBeatId), resource.Reading)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"data":    heartBeat,
		"message": "Successfully updated heart beat",
		"status":  http.StatusOK,
	})
}

func DeletePulse(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	pulseID, _ := strconv.Atoi(c.Params("id"))

	err := app.DeletePulse(uint(userId), uint(pulseID))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Successfully deleted pulse",
		"status":  http.StatusOK,
	})
}

func DeleteHeartBeat(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	heartBeatID, _ := strconv.Atoi(c.Params("id"))

	err := app.DeleteHeartBeat(uint(userId), uint(heartBeatID))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Successfully deleted heart beat",
		"status":  http.StatusOK,
	})
}

func DeleteBloodPressure(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	bloodPressureID, _ := strconv.Atoi(c.Params("id"))

	err := app.DeleteBloodPressure(uint(userId), uint(bloodPressureID))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Successfully deleted blood pressure",
		"status":  http.StatusOK,
	})
}

func DeleteBloodGlucose(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	bloodGlucoseID, _ := strconv.Atoi(c.Params("id"))

	err := app.DeleteBloodGlucose(uint(userId), uint(bloodGlucoseID))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Successfully deleted blood glucose",
		"status":  http.StatusOK,
	})
}

func DeleteSleepPattern(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	sleepPatternID, _ := strconv.Atoi(c.Params("id"))

	err := app.DeleteSleepPattern(uint(userId), uint(sleepPatternID))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Successfully deleted sleep pattern",
		"status":  http.StatusOK,
	})
}

func DeleteWeight(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	weightID, _ := strconv.Atoi(c.Params("id"))

	err := app.DeleteWeight(uint(userId), uint(weightID))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Successfully deleted weight",
		"status":  http.StatusOK,
	})
}

func DeleteHeight(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)
	heightID, _ := strconv.Atoi(c.Params("id"))

	err := app.DeleteHeight(uint(userId), uint(heightID))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"data": &fiber.Map{
				"message": err.Error(),
			},
			"message": err.Error(),
			"status":  fiber.StatusBadRequest,
		})
	}

	return c.Status(http.StatusOK).JSON(&fiber.Map{
		"message": "Successfully deleted height",
		"status":  http.StatusOK,
	})
}

func GetMetricsByDateRange(c *fiber.Ctx, app MetricApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	metricType := c.Params("type")
	filter := c.Query("filter", "weekly")
	date := c.Query("date")

	var err error
	var parsedDate time.Time

	if date == "" {
		// Default to today if date is not passed
		parsedDate = time.Now()
	} else {
		parsedDate, err = time.Parse("2006-01-02", date)
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{
				"status":  400,
				"message": "Invalid date format",
			})
		}
	}

	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"message": "Invalid date format",
		})
	}

	var startDate, endDate time.Time

	switch filter {
	case "weekly":
		year, week := parsedDate.ISOWeek()
		startDate = time.Date(year, 1, 1, 0, 0, 0, 0, parsedDate.Location())

		offset := int(time.Monday - startDate.Weekday())
		if offset > 0 {
			offset = -6
		}
		startDate = startDate.AddDate(0, 0, offset)

		startDate = startDate.AddDate(0, 0, (week-1)*7)
		endDate = startDate.AddDate(0, 0, 7)
	case "monthly":
		startDate = time.Date(parsedDate.Year(), parsedDate.Month(), 1, 0, 0, 0, 0, parsedDate.Location())
		endDate = startDate.AddDate(0, 1, 0)
	default:
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"message": "Invalid filter",
		})
	}

	var data interface{}
	switch metricType {
	case "pulse":
		data, err = app.GetPulseByDateRange(uint(userId), startDate, endDate)
	case "heartbeat":
		data, err = app.GetHeartBeatByDateRange(uint(userId), startDate, endDate)
	case "bloodpressure":
		data, err = app.GetBloodPressureByDateRange(uint(userId), startDate, endDate)
	case "bloodglucose":
		data, err = app.GetBloodGlucoseByDateRange(uint(userId), startDate, endDate)
	case "sleeppattern":
		data, err = app.GetSleepPatternByDateRange(uint(userId), startDate, endDate)
	case "weight":
		data, err = app.GetWeightByDateRange(uint(userId), startDate, endDate)
	case "height":
		data, err = app.GetHeightByDateRange(uint(userId), startDate, endDate)
	default:
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{
			"status":  400,
			"message": "Invalid metric type",
		})
	}

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{
			"status":  500,
			"message": "Error fetching metrics",
			"data":    err.Error(),
		})
	}

	return c.Status(http.StatusOK).JSON(fiber.Map{
		"status":  200,
		"message": "Successfully fetched metrics",
		"data":    data,
	})
}
