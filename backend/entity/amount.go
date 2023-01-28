package entity

import (
	"gorm.io/gorm"
)

type Amount struct {
	gorm.Model

	Amount     		string
	Furnitures 		[]Furniture `gorm:"foreignKey:AmountID"`
}