package entity

import (
	"time"

	"gorm.io/gorm"
)

type Furniture struct {
	gorm.Model

	FurnitureTime time.Time

	AdminID *uint
	Admin   Admin

	UserID *uint
	User   User

	RoomID *uint
	Room   Room

	AmountID *uint
	Amount   Amount

	EquipmentID *uint
	Equipment   Equipment
}
