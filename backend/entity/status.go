package entity

import (

	"gorm.io/gorm"
)

type Status struct {
	gorm.Model
	Name string

	Users []User `gorm:"foreignKey:StatusID"`
}