package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name         string		`valid:"required~Name cannot be blank"`
	Email        string		`valid:"required~Email cannot be blank"`
	Tel          string		`valid:"required~Tel cannot be blank"`
	Password     string		`valid:"required~Password cannot be blank"`
	Role         string		`valid:"required~Role cannot be blank"`
	Address      string		`valid:"required~Address cannot be blank"`
	Personal     string		`valid:"required~Personal cannot be blank"`
	BirthdayTime time.Time

	// StatusID เป็น FK
	StatusID *uint
	// ข้อมูลของ Status เมื่อ join ตาราง
	Status Status		

	// GenderID เป็น FK
	GenderID *uint
	// ข้อมูลของ Gender เมื่อ join ตาราง
	Gender Gender		`gorm:"referenes:id" valid:"-"`

	// TitleID เป็น FK
	TitleID *uint
	// ข้อมูลของ Title เมื่อ join ตาราง
	Title Title			 `gorm:"referenes:id" valid:"-"`

	Payments []Payment `gorm:"foreignKey:UserID"`

	Requestouts			[]Requestout			`gorm:"foreignKey:UserID"`
	Requestchange		[]Requestchange			`gorm:"foreignKey:UserID"`
}