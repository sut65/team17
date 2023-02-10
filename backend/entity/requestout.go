package entity

import (
	"time"

	"gorm.io/gorm"
)

type Requestout struct {
	gorm.Model
	
	Detail		string		`valid:"required~Detail cannot be blank"`
	
	ReasonID 	*uint
	Reason   	Reason		`gorm:"referenes:id" valid:"-"`

	RoomID 		*uint
	Room   		Room		`gorm:"referenes:id" valid:"-"`

	UserID		*uint
	User		User		`gorm:"referenes:id" valid:"-"`

	Outtime		time.Time
}
