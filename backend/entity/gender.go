package entity

import (

	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	Name string

	Users []User `gorm:"foreignKey:GenderID"`
}