package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name         string
	Email        string
	Tel          string
	Password     string
	Role         string
	Address      string
	Personal     string
	BirthdayTime time.Time

	// StatusID เป็น FK
	StatusID *uint
	// ข้อมูลของ Status เมื่อ join ตาราง
	Status Status

	// GenderID เป็น FK
	GenderID *uint
	// ข้อมูลของ Gender เมื่อ join ตาราง
	Gender Gender

	// TitleID เป็น FK
	TitleID *uint
	// ข้อมูลของ Title เมื่อ join ตาราง
	Title Title

	Payments []Payment `gorm:"foreignKey:UserID"`
}