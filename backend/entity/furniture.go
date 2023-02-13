package entity

import (
	"time"

	"gorm.io/gorm"
)

type Furniture struct {
	gorm.Model

	FurnitureTime time.Time
	Total         *uint

	AdminID *uint
	Admin   Admin				`gorm:"referenes:id" valid:"-"`

	UserID *uint
	User   User					`gorm:"referenes:id" valid:"-"`

	RoomID *uint
	Room   Room

	AmountID *uint
	Amount   Amount

	EquipmentID *uint
	Equipment   Equipment

	Bills	[]Bill	`gorm:"foreignKey:FurnitureID"`
}

