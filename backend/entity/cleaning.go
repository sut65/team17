package entity

import (
	"time"

	"gorm.io/gorm"
)

type Cleaning struct {
	gorm.Model

	CleaningTime 		time.Time	
	Detail				string		`valid:"required~Detail cannot be blank"`

	UserID				*uint
	User				User

	RoomID				*uint
	Room				Room

	KindID				*uint
	Kind				Kind

	AreaID				*uint
	Area				Area
}
