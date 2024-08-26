package bot

import (
	"context"
	"strings"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/sashabaranov/go-openai"
	"gorm.io/gorm"
)

// generateChatTitle generates a title for the chat using OpenAI based on the first message's content
func generateChatTitle(chat *models.BotChat, db *gorm.DB, client *openai.Client) error {
	if chat.Title != "New chat" {
		return nil
	}

	if len(chat.Messages) > 0 {
		firstMessage := chat.Messages[0].Content

		// Send the first message to OpenAI to generate a suitable title
		resp, err := client.CreateChatCompletion(context.Background(), openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    "system",
					Content: "Generate a concise and descriptive title based on the following conversation:",
				},
				{
					Role:    "user",
					Content: firstMessage,
				},
			},
			MaxTokens:   10, // Limit the number of tokens for the title
			Temperature: 0.7,
		})
		if err != nil {
			return err
		}

		chatTitle := strings.TrimSpace(resp.Choices[0].Message.Content)

		// Update the chat title in the database if a valid title was generated
		if chatTitle != "" {
			chat.Title = chatTitle
			db.Model(&chat).Update("title", chat.Title)
		}
	}
	return nil
}

func (u BotApp) GetAllMyChats(userID int) ([]models.BotChat, error) {
	db := u.DB

	var chats []models.BotChat
	result := db.Where("user_id = ?", userID).Order("created_at DESC").Find(&chats)

	return chats, result.Error
}

func (u BotApp) CreateChat(userID int) (models.BotChat, error) {
	db := u.DB
	var botChat models.BotChat

	initialMessage := models.BotMessage{
		Role:    "system",
		Content: "Please note: You are only allowed to provide symptom diagnostics to the patient.",
	}

	botChat.Messages = append(botChat.Messages, initialMessage)
	botChat.Title = "New chat"
	botChat.UserID = uint(userID)

	result := db.Create(&botChat)

	return botChat, result.Error

}

func (u BotApp) GetDetailsOfMyChat(chatID string, userID int) (models.BotChat, error) {
	db := u.DB

	var chat models.BotChat
	result := db.Preload("Messages").
		Preload("User").
		Where("user_id = ?", userID).
		Where("id = ?", chatID).
		First(&chat)

	return chat, result.Error
}

func (u BotApp) MessageOpenAI(req ChatRequest) (models.BotMessage, error) {
	var chat models.BotChat
	var userMessage models.BotMessage

	db := u.DB

	if err := db.Preload("Messages").
		Where("id = ? AND user_id = ?", req.ChatID, req.UserID).
		First(&chat).Error; err != nil {
		return userMessage, err
	}

	// Save the user's message to the database
	userMessage = models.BotMessage{
		Role:      "user",
		Content:   req.Content,
		BotChatID: chat.ID,
	}

	if err := db.Create(&userMessage).Error; err != nil {
		return userMessage, err
	}

	chat.Messages = append(chat.Messages, userMessage)
	// Generate a chat title using OpenAI, if necessary
	if err := generateChatTitle(&chat, db, u.OpenAIClient); err != nil {
		return userMessage, err
	}

	var messages []openai.ChatCompletionMessage
	for _, msg := range chat.Messages {
		messages = append(messages, openai.ChatCompletionMessage{
			Role:    msg.Role,
			Content: msg.Content,
		})
	}

	// Append the latest user message
	messages = append(messages, openai.ChatCompletionMessage{
		Role:    "user",
		Content: req.Content,
	})

	resp, err := u.OpenAIClient.CreateChatCompletion(context.Background(), openai.ChatCompletionRequest{
		Model:    openai.GPT4oMini,
		Messages: messages,
	})
	if err != nil {
		return userMessage, err
	}

	botContent := resp.Choices[0].Message.Content

	// Save the bot's response to the database
	botMessage := models.BotMessage{
		Role:      "assistant",
		Content:   botContent,
		BotChatID: chat.ID,
	}

	err = db.Create(&botMessage).Error

	return botMessage, err

}
