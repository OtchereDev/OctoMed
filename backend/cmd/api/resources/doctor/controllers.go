package doctor

import (
	"math"
	"net/http"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	v "github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

func GetAllProviders(c *fiber.Ctx, app DoctorApp) error {
	p := DoctorListParam{}

	page := c.QueryInt("page")
	category := c.Query("category")
	search := c.Query("search")

	p.Page = page
	p.Category = category
	p.Search = search

	count, doctors := app.GetAllProviders(p)

	return c.JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"doctors":    doctors,
			"total_page": math.Ceil(float64(count) / 30),
		}})
}

func CreateProvider(c *fiber.Ctx, app DoctorApp) error {
	var user models.Doctor

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&user); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": v.SerializeErrors(validationErr)}},
			)
	}

	err := app.CreateDoctor(user)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err.Error(),
			}})
	}

	return c.JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Doctor successfully created"}})
}

func GetProviderDetail(c *fiber.Ctx, app DoctorApp) error {
	p, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": "Provide a doctor id",
			},
		})
	}

	response := app.GetProviderDetail(p)

	return c.JSON(&fiber.Map{"status": 200,
		"data": &fiber.Map{"doctor": response},
	})
}

func CreateExperience(c *fiber.Ctx, app DoctorApp) error {
	var experience models.Experience
	p, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": "Provide a doctor id",
			},
		})
	}

	if err := c.BodyParser(&experience); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Validate the experience data
	if validationErr := app.Validate.Struct(&experience); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": v.SerializeErrors(validationErr)}},
			)
	}
	if err := ValidateExperience(experience); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	experience.DoctorID = uint(p)

	err = app.CreateExperience(experience)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err,
			}})
	}

	return c.JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Doctor experience successfully created"}})
}

func CreateEducation(c *fiber.Ctx, app DoctorApp) error {
	var education models.Education
	p, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": "Provide a doctor id",
			},
		})
	}

	if err := c.BodyParser(&education); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Validate the experience data
	if validationErr := app.Validate.Struct(&education); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data": &fiber.Map{
					"errors": v.SerializeErrors(validationErr)}},
			)
	}
	if err := ValidateEducation(education); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	education.DoctorID = uint(p)

	err = app.CreateEducation(education)

	if err != nil {
		return c.Status(400).JSON(&fiber.Map{
			"status": 400,
			"data": &fiber.Map{
				"message": err,
			}})
	}

	return c.JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"message": "Doctor education successfully created"}})
}
