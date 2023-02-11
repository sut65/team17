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
	Admin   Admin

	UserID *uint
	User   User

	RoomID *uint
	Room   Room

	AmountID *uint
	Amount   Amount

	EquipmentID *uint
	Equipment   Equipment

	// BillID *uint
	// Bill   Bill `gorm:"references:ID" valid:"-"`

	// Bills []Bill `gorm:"foreignKey:FurnitureID"`

	// oderFurnitureID *uint
	// oderFurniture   Bill `gorm:"references:ID" valid:"-"`

}
