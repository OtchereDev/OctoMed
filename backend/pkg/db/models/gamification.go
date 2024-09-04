package models

import "time"

type Streak struct {
	UserID    uint       `json:"-"`
	User      *User      `json:"-"`
	StartDate time.Time  `gorm:"not null" json:"start_date"`
	EndDate   *time.Time `json:"end_date"`
}
