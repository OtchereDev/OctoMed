package bot

import (
	"net/http"
	"strconv"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	"github.com/OtchereDev/ProjectAPI/pkg/validate"
	"github.com/gofiber/fiber/v2"
)

func GetAllMyChats(c *fiber.Ctx, app BotApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	chats, err := app.GetAllMyChats(userId)

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
			"message": "Chats successfully fetched",
			"chats":   chats,
		}})
}

func CreateChat(c *fiber.Ctx, app BotApp) error {
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	chat, err := app.CreateChat(userId)

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
			"chat":    chat,
			"message": "Chats successfully created",
		}})
}

func GetDetailsOfMyChat(c *fiber.Ctx, app BotApp) error {

	id := c.Params("id")
	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	chat, err := app.GetDetailsOfMyChat(id, userId)

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
			"message": "Chat successfully fetched",
			"chat":    chat,
		}})
}

func MessageOpenAI(c *fiber.Ctx, app BotApp) error {
	id, _ := c.ParamsInt("id")

	user, _ := utils.SerializeRequestUser(c)
	userId, _ := strconv.Atoi(user.UserID)

	var message models.BotMessage

	if err := c.BodyParser(&message); err != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "There was parsing body",
				"data":    &fiber.Map{"errors": []string{err.Error()}}},
			)
	}

	if validationErr := app.Validate.Struct(&message); validationErr != nil {
		return c.Status(http.StatusBadRequest).
			JSON(fiber.Map{
				"status":  400,
				"message": "Errors",
				"data":    &fiber.Map{"errors": validate.SerializeErrors(validationErr)}},
			)
	}

	req := ChatRequest{
		UserID:  uint(userId),
		ChatID:  uint(id),
		Content: message.Content,
	}

	message, err := app.MessageOpenAI(req)

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
			"message":  "Chats successfully fetched",
			"response": message,
		}})
}
