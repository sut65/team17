package entity

import (

	"gorm.io/gorm"
)

type Banking struct {
	gorm.Model
	Name string

	Payments []Payment `gorm:"foreignKey:BankingID"`
}