package postgres

import (
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	healthinfo "github.com/OtchereDev/ProjectAPI/cmd/api/resources/health-info"
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func OpenDB() (*gorm.DB, error) {
	var DB *gorm.DB
	var err error

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Second,   // Slow SQL threshold
			LogLevel:                  logger.Silent, // Log level
			IgnoreRecordNotFoundError: true,          // Ignore ErrRecordNotFound error for logger
			ParameterizedQueries:      true,          // Don't include params in the SQL log
			Colorful:                  false,         // Disable color
		},
	)

	DBName := os.Getenv("DB_NAME")
	DBHost := os.Getenv("DB_HOST")
	DBPort := os.Getenv("DB_PORT")
	DBUser := os.Getenv("DB_USER")
	DBPass := os.Getenv("DB_PASS")
	DATABASEURL := os.Getenv("DATABASE_URL")

	if DATABASEURL == "" {
		if DBHost == "" ||
			DBUser == "" ||
			DBPass == "" ||
			DBPort == "" ||
			DBName == "" {
			DB, err = nil, errors.New("provide the correct database credentials")
			log.Fatal(err)
		}
	}

	dsn := fmt.Sprintf("host=%v user=%v password=%v dbname=%v port=%v",
		DBHost, DBUser, DBPass, DBName, DBPort)

	if DATABASEURL != "" {
		DB, err = gorm.Open(postgres.Open(DATABASEURL),
			&gorm.Config{
				DisableForeignKeyConstraintWhenMigrating: false,
				Logger:                                   newLogger,
			})
	} else {

		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
			DisableForeignKeyConstraintWhenMigrating: false,
			Logger:                                   newLogger,
		})
	}

	return DB, err
}

func MigrateDB(db *gorm.DB) {
	db.AutoMigrate(
		&models.User{},
		&models.BioData{},
		&models.ForgotPassword{},
		&models.Address{},
		&models.EmergencyContact{},
		&models.HealthCondition{},
		&models.Allergy{},
		&models.Doctor{},
		&models.Education{},
		&models.Experience{},
		&models.Appointment{},
		&models.Rating{},
		&models.Resource{},
		&models.BotChat{},
		&models.BotMessage{},
		&models.BloodGlucose{},
		&models.BloodPressure{},
		&models.SleepPattern{},
		&models.HeartBeat{},
		&models.Height{},
		&models.Weight{},
		&models.Pulse{},
		&models.WaterConsumption{},
		&models.Diet{},
		&models.Exercise{},
		&models.ExerciseInstruction{},
	)
	healthinfo.MigrateHealthCondition(db)
}
