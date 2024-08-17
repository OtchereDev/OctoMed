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

	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/appointment"
	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/bot"
	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/doctor"
	healthinfo "github.com/OtchereDev/ProjectAPI/cmd/api/resources/health-info"
	"github.com/OtchereDev/ProjectAPI/cmd/api/resources/storage"
	u "github.com/OtchereDev/ProjectAPI/cmd/api/resources/user"
	_ "github.com/OtchereDev/ProjectAPI/docs"
	"github.com/OtchereDev/ProjectAPI/pkg/db/postgres"
	"github.com/OtchereDev/ProjectAPI/pkg/middlewares"
)

type Application struct {
	Users       *u.UserApp
	HealthInfo  *healthinfo.HealthApp
	Doctor      *doctor.DoctorApp
	Appointment *appointment.AppointmentApp
	BotApp      *bot.BotApp
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
	middlewares.SetupMiddleAuthMiddleware()

	db, err := postgres.OpenDB()
	if err != nil {
		log.Fatal(err)
	}

	// migrate DB
	postgres.MigrateDB(db)

	// start storage
	storage.SetupCloudinary()

	s := &Application{
		Users: &u.UserApp{
			DB:       db,
			App:      app,
			Validate: validate,
		},
		HealthInfo: &healthinfo.HealthApp{
			DB:       db,
			App:      app,
			Validate: validate,
		},
		Doctor: &doctor.DoctorApp{
			DB:       db,
			App:      app,
			Validate: validate,
		},
		Appointment: &appointment.AppointmentApp{
			DB:       db,
			App:      app,
			Validate: validate,
		},
		BotApp: &bot.BotApp{
			DB:       db,
			App:      app,
			Validate: validate,
		},
	}

	// routes
	s.Users.UserRoutes()
	s.HealthInfo.HealthConditionRoutes()
	s.Doctor.DoctorRoutes()
	s.Appointment.AppointmentRoutes()
	s.BotApp.BotRoutes()
	app.Get("/swagger/*", fiberSwagger.WrapHandler)

	app.Listen(*addr)

}
