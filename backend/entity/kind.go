package entity

import (
	"gorm.io/gorm"
)

type kind struct {
	gorm.Model
		
	kind				string
	Cleanings			[]Cleaning 			`gorm:"foreignKey:CategoryID"`
	
}
