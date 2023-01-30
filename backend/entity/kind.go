package entity

import (
	"gorm.io/gorm"
)

type Kind struct {
	gorm.Model
		
	Kind				string
	Cleanings			[]Cleaning 			`gorm:"foreignKey:KindID"`
	
}
