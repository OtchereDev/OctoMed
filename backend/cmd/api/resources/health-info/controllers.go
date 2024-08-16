package healthinfo

import (
	"net/http"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/swagger"
	v "github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

// @Summary Get All condition
// @Description Return all allergies and health conditions
// @Tags health_conditions
// @Accept json
// @Produce json
// @Router /health-conditions [get]
func GeAllConditions(c *fiber.Ctx, app HealthApp) error {
	a, hc := app.GeAllConditions()

	return c.JSON(&fiber.Map{
		"status": 200,
		"data": &fiber.Map{
			"health_conditions": hc,
			"allergies":         a,
		},
	})
}

// @Summary Create Allergy
// @Description Create Allergy
// @Tags health_conditions
// @Accept json
// @Produce json
// @Param CreateAllergy body swagger.CreateAllergyPayloady true "Create Allergy"
// @Router /health-conditions/create/allergy [post]
func CreateAllergy(c *fiber.Ctx, app HealthApp) error {

	var payload swagger.CreateAllergyPayloady

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "There was parsing body",
				"data": &fiber.Map{"errors": []string{err.Error()}}})
	}

	if validationErr := app.Validate.Struct(&payload); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "Errors",
				"data": &fiber.Map{"errors": v.SerializeErrors(validationErr)}})
	}

	a := models.Allergy{
		Allergy: payload.Allergy,
	}

	err := app.AddAllergy(a)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(),
				"statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "Successfully created allergy",
			"statusCode": http.StatusOK,
		})
}

// @Summary Create Health condition
// @Description Create Health condition
// @Tags health_conditions
// @Accept json
// @Produce json
// @Param CreateHealthCondition body swagger.CreateHealthCondition true "Create Health Condition"
// @Router /health-conditions/create/health-condition [post]
func CreateHealthCondition(c *fiber.Ctx, app HealthApp) error {

	var payload swagger.CreateHealthCondition

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "There was parsing body",
				"data": &fiber.Map{"errors": []string{err.Error()}}})
	}

	if validationErr := app.Validate.Struct(&payload); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "Errors",
				"data": &fiber.Map{"errors": v.SerializeErrors(validationErr)}})
	}

	a := models.HealthCondition{
		HealthCondition: payload.HealthCondition,
	}

	err := app.AddHealthCondition(a)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(),
				"statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "Successfully created health condition",
			"statusCode": http.StatusOK,
		})
}
