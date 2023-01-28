package entity

import (
	"gorm.io/gorm"
)

type Equipment struct {
	gorm.Model

	Equipment  		string
	Price        	int
	Furnitures 		[]Furniture `gorm:"foreignKey:EquipmentID"`
}