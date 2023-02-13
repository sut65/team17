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
	Room   Room					`gorm:"referenes:id" valid:"-"`

	AmountID *uint
	Amount   Amount				`gorm:"referenes:id" valid:"-"`

	EquipmentID *uint
	Equipment   Equipment		`gorm:"referenes:id" valid:"-"`

	Bills	[]Bill				`gorm:"foreignKey:FurnitureID"`
}

