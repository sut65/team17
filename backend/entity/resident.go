package entity

import (
	"time"

	"gorm.io/gorm"
)

type Resident struct {
	gorm.Model
	
	LeaseTime 		time.Time
	Bail				string 		`valid:"required~Bail cannot be blank"`

	UserID			*uint
	User				User			`gorm:"referenes:id" valid:"-"`

	LeaseID			*uint
	Lease			Lease		`gorm:"referenes:id" valid:"-"`

	ManageID			*uint
	Manage			Manage		`gorm:"referenes:id" valid:"-"`

	



}