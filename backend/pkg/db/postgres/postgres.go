package postgres

import (
	"errors"
	"fmt"
	"log"
	"os"

	healthinfo "github.com/OtchereDev/ProjectAPI/cmd/api/resources/health-info"
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func OpenDB() (*gorm.DB, error) {
	var DB *gorm.DB
	var err error

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
			})
	} else {

		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
			DisableForeignKeyConstraintWhenMigrating: false,
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
	)
	healthinfo.MigrateHealthCondition(db)
}
