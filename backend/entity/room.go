package entity

import (
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	
	Number				string
	Manages				[]Manage				`gorm:"foreignKey:RoomID"`
	Requestouts			[]Requestout			`gorm:"foreignKey:RoomID"`
	Requestchange		[]Requestchange			`gorm:"foreignKey:RoomID"`
}