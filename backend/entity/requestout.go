package entity

import (
	"time"

	"gorm.io/gorm"
)

type Requestout struct {
	gorm.Model
	
	Detail		string		`valid:"required~Detail cannot be blank"`
	
	ReasonID 	*uint
	Reason   	Reason

	RoomID 		*uint
	Room   		Room

	UserID		*uint
	User		User

	Outtime		time.Time
}
