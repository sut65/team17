package entity

import (

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqeIndex"`
	Password string
	Tel      string
	Role     string

	Meters []Meter `gorm:"foreignKey:AdminID"`
	Bills  []Bill  `gorm:"foreignKey:AdminID"`
}