package doctor

import (
	"errors"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type DoctorApp struct {
	DB       *gorm.DB
	App      *fiber.App
	Validate *validator.Validate
}

type DoctorListParam struct {
	Page     int
	Category string
	Search   string
}

func ValidateExperience(exp models.Experience) error {
	if exp.CurrentPosition {
		if !exp.EndYear.IsZero() {
			return errors.New("end_year should be empty if current_position is true")
		}
	} else {
		if !exp.EndYear.IsZero() && exp.EndYear.Before(exp.StartYear) {
			return errors.New("end_year should be after start_year")
		}
	}
	return nil
}

func ValidateEducation(edu models.Education) error {
	if edu.CurrentEducation {
		if !edu.EndYear.IsZero() {
			return errors.New("end_year should be empty if current_education is true")
		}
	} else {
		if !edu.EndYear.IsZero() && edu.EndYear.Before(edu.StartYear) {
			return errors.New("end_year should be after start_year")
		}
	}
	return nil
}
