package entity

import (
	"time"

	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	Evidence       string			`valid:"required~Evidence cannot be blank"`
	PaymentTime	   time.Time

	// UserID เป็น FK
	UserID *uint
	// ข้อมูลของ User เมื่อ join ตาราง
	User User
	
	// BillID เป็น FK
	BillID *uint
	// ข้อมูลของ Bill เมื่อ join ตาราง
	Bill Bill

	// BankingID เป็น FK
	BankingID *uint
	// ข้อมูลของ Banking เมื่อ join ตาราง
	Banking Banking

	// MethodID เป็น FK
	MethodID *uint
	// ข้อมูลของ Method เมื่อ join ตาราง
	Method Method
}