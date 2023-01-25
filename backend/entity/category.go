package entity

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	
	Category			string
	Manages			[]Manage				`gorm:"foreignKey:CategoryID"`

}