package entity

import (
	"time"

	"gorm.io/gorm"
)

type Requestout struct {
	gorm.Model
	
	
	ReasonID 	*uint
	Reason   	Reason

	RoomID 		*uint
	Room   		Room

	UserID		*uint
	User		User

	Outtime		time.Time
}
