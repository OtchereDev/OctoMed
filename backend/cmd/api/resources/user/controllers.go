package user

import (
	"net/http"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	v "github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

// @Summary Get a user
// @Description Get details of a user by ID
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} models.User
// @Router /users/{id} [get]
func CreateUser(c *fiber.Ctx, app UserApp) error {
	var user models.User

	if err := c.BodyParser(&user); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "There was parsing body",
				"data": &fiber.Map{"errors": []string{err.Error()}}})
	}

	if validationErr := app.Validate.Struct(&user); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "Errors",
				"data": &fiber.Map{"errors": v.SerializeErrors(validationErr)}},
			)
	}

	response, err := app.CreateUser(user)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(), "statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{"data": response, "statusCode": http.StatusOK})
}

func LoginUser(c *fiber.Ctx, app UserApp) error {
	var loginData LoginRequestPayload

	if err := c.BodyParser(&loginData); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "There was parsing body",
				"data": &fiber.Map{"errors": []string{err.Error()}}})
	}

	if validationErr := app.Validate.Struct(&loginData); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "Errors",
				"data": &fiber.Map{"errors": v.SerializeErrors(validationErr)}})
	}

	at, u, err := app.LoginUser(loginData.Email, loginData.Password)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(), "statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{"statusCode": 200,
			"data":         map[string]string{"access_token": at},
			"user_details": u})
}

func EditUser(c *fiber.Ctx, app UserApp) error {
	var updatePayload UpdateUser
	userId, _ := c.ParamsInt("userId")

	if err := c.BodyParser(&updatePayload); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "There was parsing body",
				"data": &fiber.Map{"errors": []string{err.Error()}}})
	}

	if validationErr := app.Validate.Struct(&updatePayload); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "Errors",
				"data": &fiber.Map{"errors": v.SerializeErrors(validationErr)}})
	}

	user, err := app.EditUser(userId, updatePayload)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(), "statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"data":       user,
			"message":    "Successfully updated user",
			"statusCode": http.StatusOK})
}

func GetUserDetails(c *fiber.Ctx, app UserApp) error {
	userId, err := c.ParamsInt("userId")

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).
			JSON(fiber.Map{
				"status": fiber.StatusUnauthorized,
				"data":   &fiber.Map{"message": err.Error()}})
	}

	response, err := app.GetUserDetail(userId)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(), "statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"data":       response,
			"message":    "Successfully fetched user",
			"statusCode": http.StatusOK})
}

func RequestForgotPassword(c *fiber.Ctx, app UserApp) error {
	var updatePayload ForgotPasswordRequestPayload

	if err := c.BodyParser(&updatePayload); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "There was parsing body",
				"data": &fiber.Map{"errors": []string{err.Error()}}})
	}

	if validationErr := app.Validate.Struct(&updatePayload); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "Errors",
				"data": &fiber.Map{"errors": v.SerializeErrors(validationErr)}})
	}

	_ = app.RequestForgotPassword(updatePayload)

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "We have sent an email containing an reset password link",
			"statusCode": http.StatusOK})
}

func RequestPassword(c *fiber.Ctx, app UserApp) error {
	var updatePayload ResetPasswordPayload

	if err := c.BodyParser(&updatePayload); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "There was parsing body",
				"data": &fiber.Map{"errors": []string{err.Error()}}})
	}

	if validationErr := app.Validate.Struct(&updatePayload); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{"message": "Errors",
				"data": &fiber.Map{"errors": v.SerializeErrors(validationErr)}})
	}

	err := app.ResetPassword(updatePayload)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(),
				"statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "Password has successfully changed",
			"statusCode": http.StatusOK})
}
