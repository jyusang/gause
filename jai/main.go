package main

import (
	"github.com/gin-gonic/gin"
	"github.com/go-telegram-bot-api/telegram-bot-api/v5"
	"log"
	"net/http"
	"os"
)

func main() {
	routerChan := make(chan bool, 1)
	telegramBotChan := make(chan bool, 1)
	go startRouter(routerChan)
	go startTelegramBot(telegramBotChan)
	<-routerChan
}

func startRouter(done chan bool) {
	router := gin.Default()
	router.LoadHTMLGlob("templates/*")
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"body": "list",
		})
	})
	router.Run(":8080")
}

func startTelegramBot(done chan bool) {
	bot, err := tgbotapi.NewBotAPI(os.Getenv("TELEGRAM_API_TOKEN"))
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Authorized on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	for update := range updates {
		msg := tgbotapi.NewMessage(update.Message.Chat.ID, "")
		if update.Message.IsCommand() {
			switch update.Message.Command() {
			default:
				msg.Text = `¯⁠\⁠_⁠(⁠ツ⁠)⁠_⁠/⁠¯`
			}
		} else {
			msg.Text = "OK"
		}
		if _, err := bot.Send(msg); err != nil {
			log.Panic(err)
		}
	}
}
