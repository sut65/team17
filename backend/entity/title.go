package entity

import (

	"gorm.io/gorm"
)

type Title struct {
	gorm.Model
	Name string

	Users []User `gorm:"foreignKey:TitleID"`
}