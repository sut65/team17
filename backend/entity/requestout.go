package entity

import (
	"gorm.io/gorm"
)

type Requestout struct {
	gorm.Model
	Name string

	ReasonID *uint
	Reason   Reason

	RoomID *uint
	Room   Room
}
