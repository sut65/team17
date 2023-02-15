package entity

import (

	"time"
	"gorm.io/gorm"
)

type Room struct {
	gorm.Model
	
	Number			string
	Manages			[]Manage				`gorm:"foreignKey:RoomID"`
	Furnitures		[]Furniture			`gorm:"foreignKey:RoomID"`
	Requestouts		[]Requestout			`gorm:"foreignKey:RoomID"`
	Requestchanges		[]Requestchange		`gorm:"foreignKey:RoomID"`
}

type Lease struct {
	gorm.Model
	
	Lease			string
	Residents			[]Resident		`gorm:"foreignKey:LeaseID"`

}

type Size struct {
	gorm.Model
	
	Size				string
	Manages			[]Manage			`gorm:"foreignKey:SizeID"`

}

type Manage struct {
	gorm.Model
	Status 			string 			`valid:"required~Status cannot be blank"`
	Price  			string 			`valid:"required~Price cannot be blank"`
	Detail 			string 			`valid:"required~Detail cannot be blank"`

	//Entity Room
	RoomID 			*uint
	Room   			Room

	CategoryID 		*uint
	Category   		Category			`gorm:"referenes:id" valid:"-"`

	SizeID 			*uint
	Size   			Size				`gorm:"referenes:id" valid:"-"`

	Residents 		[]Resident 		`gorm:"foreignKey:ManageID"`
	Meters    		[]Meter    		`gorm:"foreignKey:ManageID"`
}

type Resident struct {
	gorm.Model
	
	LeaseTime 		time.Time
	Bail				string 			`valid:"required~Bail cannot be blank"`

	UserID			*uint
	User				User				`gorm:"referenes:id" valid:"-"`

	LeaseID			*uint
	Lease			Lease			`gorm:"referenes:id" valid:"-"`

	ManageID			*uint
	Manage			Manage			`gorm:"referenes:id" valid:"-"`

}

