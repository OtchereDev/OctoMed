package user

import (
	"net/http"
	"strconv"
	"time"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/swagger"
	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	v "github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

// @Summary Create a user with email and password
// @Description Create a user with email and password provider
// @Tags users
// @Accept json
// @Produce json
// @Param CreateUserRequest body swagger.SignupDTO true "Create User Request"
// @Router /users/create [post]
func CreateUser(c *fiber.Ctx, app UserApp) error {
	var user swagger.SignupDTO

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

	d, _ := time.Parse(time.RFC3339, user.DOB)

	newUser := models.User{
		FullName:    user.FullName,
		Email:       user.Email,
		PhoneNumber: user.PhoneNumber,
		Password:    user.Password,
		DOB:         d,
	}

	response, err := app.CreateUser(newUser)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(), "statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{"data": response, "statusCode": http.StatusOK})
}

// @Summary Login
// @Description Login
// @Tags users
// @Accept json
// @Produce json
// @Param LoginPayload body swagger.LoginRequestPayload true "Login Request"
// @Router /users/login [post]
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
			"data": map[string]any{"access_token": at, "user_details": u},
		})
}

// @Summary Edit User Detail
// @Description Edit User Detail
// @Tags users
// @Accept json
// @Produce json
// @Param UpdateUser body UpdateUser true "Update User"
// @Router /users/details/edit [put]
func EditUser(c *fiber.Ctx, app UserApp) error {
	var updatePayload UpdateUser
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

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

	details, err := app.EditUser(userId, updatePayload)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(), "statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"data":       details,
			"message":    "Successfully updated user",
			"statusCode": http.StatusOK})
}

// @Summary Get User Details
// @Description User Details
// @Tags users
// @Accept json
// @Produce json
// @Router /users/details [get]
func GetUserDetails(c *fiber.Ctx, app UserApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

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

// @Summary Request for password reset
// @Description Request for password reset
// @Tags users
// @Accept json
// @Produce json
// @Param ForgotPasswordRequestPayload body ForgotPasswordRequestPayload true "Request Reset password"
// @Router /users/request-forgot-password [post]
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

// @Summary Password reset
// @Description Password reset
// @Tags users
// @Accept json
// @Produce json
// @Param ResetPasswordPayload body ResetPasswordPayload true "Reset password"
// @Router /users/reset-password [post]
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

// @Summary Skip onboarding
// @Description Skip onboarding
// @Tags users
// @Accept json
// @Produce json
// @Router /users/skip-onboarding [post]
func SkipOnboarding(c *fiber.Ctx, app UserApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	err := app.SkipOnboarding(userId)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(),
				"statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "Successfully skipped onboarding process",
			"statusCode": http.StatusOK})
}

// @Summary Onboarding for biodata
// @Description Onboarding for biodata
// @Tags users
// @Accept json
// @Produce json
// @Param swagger.BioDataPayload body swagger.BioDataPayload true "Biodata"
// @Router /users/onboarding/biodata [post]
func OnboardingBiodata(c *fiber.Ctx, app UserApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	var payload swagger.BioDataPayload

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

	err := app.OnboardingBiodata(userId, payload)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(),
				"statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "Successfully added biodata",
			"statusCode": http.StatusOK,
		})
}

// @Summary Onboarding for location
// @Description Onboarding for location
// @Tags users
// @Accept json
// @Produce json
// @Param swagger.LocationPayload body swagger.LocationPayload true "Location"
// @Router /users/onboarding/location [post]
func OnboardingLocation(c *fiber.Ctx, app UserApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	var payload swagger.LocationPayload

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

	err := app.OnboardingLocation(userId, payload)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(),
				"statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "Successfully added location information",
			"statusCode": http.StatusOK,
		})
}

// @Summary Onboarding for health condition
// @Description Onboarding for health condition
// @Tags users
// @Accept json
// @Produce json
// @Param swagger.HealthConditionPayload body swagger.HealthConditionPayload true "Health Condition"
// @Router /users/onboarding/health-information [post]
func OnboardingHealthDetails(c *fiber.Ctx, app UserApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	var payload swagger.HealthConditionPayload

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

	err := app.OnboardingHealthDetails(userId, payload)

	if err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(&fiber.Map{"message": err.Error(),
				"statusCode": http.StatusBadRequest})
	}

	return c.Status(http.StatusOK).
		JSON(&fiber.Map{
			"message":    "Successfully added health information",
			"statusCode": http.StatusOK,
		})
}
