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
	User				User	`gorm:"referenes:id" valid:"-"`	

	RoomID				*uint
	Room				Room	`gorm:"referenes:id" valid:"-"`

	KindID				*uint	
	Kind				Kind	`gorm:"referenes:id" valid:"-"`	

	AreaID				*uint
	Area				Area	
}
