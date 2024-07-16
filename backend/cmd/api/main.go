package main

import (
	"encoding/json"
	"flag"
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
	fiberSwagger "github.com/swaggo/fiber-swagger"
	"gorm.io/gorm"

	u "github.com/OtchereDev/ProjectAPI/cmd/api/resources/user"
	_ "github.com/OtchereDev/ProjectAPI/docs"
	db "github.com/OtchereDev/ProjectAPI/pkg/db/postgres"
)

type Application struct {
	DB    *gorm.DB
	Users *u.UserApp
}

// @title OctoMed
// @version 1.0
// @description This is the API documentation.
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host localhost:4000
// @BasePath /
func main() {

	err := godotenv.Load("configs/.env")
	if err != nil {
		log.Fatal(err)
	}

	addr := flag.String("addr", ":4000", "HTTP network address")
	flag.Parse()

	app := fiber.New(fiber.Config{
		JSONEncoder: json.Marshal,
		JSONDecoder: json.Unmarshal,
		ProxyHeader: fiber.HeaderXForwardedFor,
	})
	validate := validator.New()

	// middlewares
	app.Use(recover.New())
	app.Use(cors.New())

	db, err := db.OpenDB()
	if err != nil {
		log.Fatal(err)
	}

	s := &Application{
		DB: db,
		Users: &u.UserApp{
			DB:       db,
			App:      app,
			Validate: validate,
		},
	}

	// routes
	s.Users.UserRoutes()
	app.Get("/swagger/*", fiberSwagger.WrapHandler)

	app.Listen(*addr)

}
