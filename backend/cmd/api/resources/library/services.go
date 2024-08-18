package library

import (
	"github.com/OtchereDev/ProjectAPI/pkg/db/models"
)

func (u LibraryApp) GetAllResource(p ResourceListParam) ([]models.Resource, error) {
	var resources []models.Resource

	db := u.DB

	limit := 30
	offset := (p.Page - 1) * limit

	db = db.Order("created_at desc")
	if p.Search != "" {
		db = db.Where("title LIKE ?", "%"+p.Search+"%")
	}
	if p.Category != "" {
		db = db.Where("category = ?", p.Category)
	}

	result := db.Offset(offset).Limit(limit).Find(&resources)

	return resources, result.Error

}

func (u LibraryApp) CreateAResource(data models.Resource) error {
	db := u.DB

	result := db.Create(&data)

	return result.Error

}

func (u LibraryApp) GetResourceDetail(id string) (*models.Resource, error) {
	var resource models.Resource
	db := u.DB

	result := db.First(&resource, id)

	return &resource, result.Error
}
