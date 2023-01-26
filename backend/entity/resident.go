package entity

import (
	"time"

	"gorm.io/gorm"
)

type Resident struct {
	gorm.Model
	
	LeaseTime 		time.Time
	Bail				string

	UserID			*uint
	User				User

	LeaseID			*uint
	Lease			Lease

	ManageID			*uint
	Manage			Manage



}