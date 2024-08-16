package healthinfo

import (
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
	"gorm.io/gorm"
)

var Allergies = []string{
	"Peanuts",
	"Shellfish",
	"Milk",
	"Eggs",
	"Wheat",
	"Soy",
	"Tree nuts (e.g., almonds, cashews)",
	"Fish",
	"Sesame seeds",
	"Latex",
}

var HealthConditions = []string{
	"Anemia",
	"Endocrine Disorder",
	"Angina",
	"Epilepsy",
	"Thyroid Disorder",
	"Asthma",
	"Fibroid",
	"Tuberculosis",
	"Back/Neck/Joint Problem",
	"Gall Bladder Disease",
	"Alcohol Abuse",
	"Lung Disease",
	"Cystic Fibrosis",
	"HIV Positive",
	"Malignant Cancer",
	"Stroke",
}

func MigrateHealthCondition(db *gorm.DB) {
	var allergies []models.Allergy
	var hc []models.HealthCondition

	db.Model(models.Allergy{}).Find(&allergies)
	db.Model(models.HealthCondition{}).Find(&hc)

	if len(allergies) == 0 {
		for _, v := range Allergies {
			var allergy = models.Allergy{
				Allergy: v,
			}

			db.Save(&allergy)
		}
	}

	if len(hc) == 0 {
		for _, v := range HealthConditions {
			var h = models.HealthCondition{
				HealthCondition: v,
			}

			db.Save(&h)
		}
	}
}

func (u HealthApp) AddHealthCondition(hc models.HealthCondition) error {

	db := u.DB

	result := db.Save(&hc)

	return result.Error
}

func (u HealthApp) AddAllergy(a models.Allergy) error {
	db := u.DB

	result := db.Save(&a)

	return result.Error
}

func (u HealthApp) GeAllConditions() ([]models.Allergy, []models.HealthCondition) {
	var allergies []models.Allergy
	var hc []models.HealthCondition

	db := u.DB

	db.Model(models.Allergy{}).Find(&allergies)
	db.Model(models.HealthCondition{}).Find(&hc)

	return allergies, hc
}
