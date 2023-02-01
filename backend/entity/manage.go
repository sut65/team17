package entity

import (
	"gorm.io/gorm"
)

type Manage struct {
	gorm.Model
	Stetus string	`valid:"required~Price cannot be blank"`
	Price  string	`valid:"required~Price cannot be blank"`
	Detail string	`valid:"required~Price cannot be blank"`

	//Entity Room
	RoomID *uint
	Room   Room

	CategoryID *uint
	Category   Category

	SizeID *uint
	Size   Size

	Residents []Resident `gorm:"foreignKey:ManageID"`
}
