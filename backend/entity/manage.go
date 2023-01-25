package entity

import (
	"gorm.io/gorm"
)

type Manage struct {
	gorm.Model

	Stetus				string
	Price				string
	Detail				string

	RoomID				*uint
	Room					Room

	CategoryID			*uint
	Category				Category

	SizeID				*uint
	Size					Size

	Residents				[]Resident				`gorm:"foreignKey:ManageID"`
				
}