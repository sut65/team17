package entity

import (
	"gorm.io/gorm"
)
//dw
type Room struct {
	gorm.Model
	
	Number				string
	Manages				[]Manage				`gorm:"foreignKey:RoomID"`
	Furnitures				[]Furniture				`gorm:"foreignKey:RoomID"`
	Requestouts			[]Requestout			`gorm:"foreignKey:RoomID"`
	Requestchanges		[]Requestchange			`gorm:"foreignKey:RoomID"`
}