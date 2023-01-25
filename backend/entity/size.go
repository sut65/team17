package entity

import (
	"gorm.io/gorm"
)

type Size struct {
	gorm.Model
	
	Size				string
	Manages			[]Manage				`gorm:"foreignKey:SizeID"`

}