package bot

import (
	"os"

	"github.com/sashabaranov/go-openai"
)

var Client = openai.NewClient(os.Getenv("OPENAI_KEY"))

func (u BotApp) GetAllMyChats() {
}

func (u BotApp) CreateChat() {
}

func (u BotApp) GetDetailsOfMyChat() {
}

func (u BotApp) MessageOpenAI() {

}
