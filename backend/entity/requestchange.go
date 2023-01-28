package entity

import (
	"gorm.io/gorm"
)

type Requestchange struct {
	gorm.Model

	Detail		string
	ReasonID	*uint
	Reason		Reason
	
	RoomID		*uint
	Room 		Room

	UserID		*uint
	User		User

	
}