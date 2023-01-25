package entity

import (
	"gorm.io/gorm"
)

type Area struct {
	gorm.Model
	
	Area				string
	Cleanings			[]Cleaning 			`gorm:"foreignKey:AreaID"`
	
}