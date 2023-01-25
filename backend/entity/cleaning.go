package entity

import (
	"time"

	"gorm.io/gorm"
)

type Cleaning struct {
	gorm.Model

	CleaningTime 		time.Time
	Detail				string

	UserID				*uint
	User				User

	RoomID				*uint
	Room				Room

	CategoryID			*uint
	Category			Category

	AreaID				*uint
	Area				Area
}
