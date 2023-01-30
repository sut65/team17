package entity

import (
	"time"

	"gorm.io/gorm"
)

type Meter struct {
	gorm.Model
	Before    int
	After     int
	Total     int
	Unit      int
	Electric  int
	Water     int
	MeterTime time.Time

	// AdminID เป็น FK
	AdminID *uint
	// ข้อมูลของ Admin เมื่อ join ตาราง
	Admin Admin

	// UserID เป็น FK
	UserID *uint
	// ข้อมูลของ User เมื่อ join ตาราง
	User User

	// ManageID  เป็น FK
	ManageID *uint
	// ข้อมูลของ Manage เมื่อ join ตาราง
	Manage Manage

	Bills []Bill `gorm:"foreignKey:MeterID"`
}