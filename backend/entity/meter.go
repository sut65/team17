package entity

import (
	"time"

	"gorm.io/gorm"
)

type Meter struct {
	gorm.Model
	Before    int       `valid:"required~Before cannot be blank"`
	After     int       `valid:"required~After cannot be blank"`
	Total     int       `valid:"required~Total cannot be blank"`
	Unit      int       `valid:"required~Unit cannot be blank"`
	Electric  int       `valid:"required~Electric cannot be blank"`
	Water     int       `valid:"required~Water cannot be blank"`
	Metertime time.Time `valid:"required~Metertime cannot be blank"`

	// AdminID เป็น FK
	AdminID *uint
	// ข้อมูลของ Admin เมื่อ join ตาราง
	Admin Admin		`gorm:"referenes:id"`

	// UserID เป็น FK
	UserID *uint
	// ข้อมูลของ User เมื่อ join ตาราง
	User User		`gorm:"referenes:id"`

	// ManageID  เป็น FK
	ManageID *uint
	// ข้อมูลของ Manage เมื่อ join ตาราง
	Manage Manage	`gorm:"referenes:id"`

	Bills []Bill `gorm:"foreignKey:MeterID"`
}
