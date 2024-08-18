package library

import (
	"net/http"
	"strconv"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

func GetAllResource(c *fiber.Ctx, app LibraryApp) error {
	search := c.Query("search")
	category := c.Query("category")
	page, _ := strconv.Atoi(c.Query("page", "1"))

	p := ResourceListParam{
		Page:     page,
		Category: category,
		Search:   search,
	}
	resources, err := app.GetAllResource(p)

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
			"message":   "Resources successfully fetched",
			"resources": resources,
		}})
}

func CreateAResource(c *fiber.Ctx, app LibraryApp) error {

	var resource models.Resource

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

	err := app.CreateAResource(resource)

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
			"message": "Resources successfully created",
		}})
}

func GetResourceDetail(c *fiber.Ctx, app LibraryApp) error {
	id := c.Params("id")

	resource, err := app.GetResourceDetail(id)

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
			"message":  "Resource successfully fetched",
			"resource": resource,
		}})
}
