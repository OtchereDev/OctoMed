package doctor

import (
	"errors"
	"fmt"
	"strings"

	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"github.com/OtchereDev/ProjectAPI/pkg/utils"
	"gorm.io/gorm"
)

func (u DoctorApp) GetAllProviders(p DoctorListParam) (int64, []models.Doctor) {
	var count int64
	var doctors []models.Doctor

	if p.Page == 0 {
		p.Page = 1
	}

	db := u.DB
	db = db.Model(&models.Doctor{})

	if p.Category != "" {
		db = db.Where("specialty = ?", p.Category)
	}

	if p.Search != "" {
		db = db.Where("LOWER(name) ILIKE ?", fmt.Sprintf("%%%s%%", strings.ToLower(p.Search)))
	}

	db.Count(&count)
	db.Offset((p.Page - 1) * 30).Limit(30).Find(&doctors)

	return count, doctors
}

func (u DoctorApp) CreateDoctor(data models.Doctor) error {
	db := u.DB

	var existingDoc models.Doctor

	db.Find(&existingDoc, "email = ?", strings.ToLower(data.Email))

	if existingDoc.Email != "" {
		return errors.New("doctor with this email already exists")
	}

	hashedPassword, err := utils.HashPassword(data.UserPass)

	if err != nil {
		return err
	}

	data.Password = string(hashedPassword)
	data.UserPass = ""

	result := db.Save(&data)

	return result.Error
}

func (u DoctorApp) GetProviderDetail(id int) models.Doctor {
	db := u.DB
	var doctor models.Doctor

	db.Preload("Experiences", func(db *gorm.DB) *gorm.DB {
		return db.Order("current_position DESC").Order("end_year DESC NULLS FIRST").Order("start_year ASC")
	}).Preload("Educations", func(db *gorm.DB) *gorm.DB {
		return db.Order("current_education DESC").Order("end_year DESC NULLS FIRST").Order("start_year ASC")
	}).Preload("Ratings", func(db *gorm.DB) *gorm.DB {
		return db.Order("created_at DESC")
	}).Preload("Ratings.User").First(&doctor, id)

	return doctor
}

func (u DoctorApp) CreateEducation(data models.Education) error {
	db := u.DB
	result := db.Create(&data)
	return result.Error
}

func (u DoctorApp) CreateExperience(data models.Experience) error {
	db := u.DB
	result := db.Create(&data)
	return result.Error
}
