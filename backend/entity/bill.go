package entity

import (
	"time"

	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	Cost     int `valid:"required~cost cannot be blank"`
	BillTime time.Time

	MeterID *uint
	Meter   Meter `gorm:"referenes:id" valid:"-"`

	FurnitureID *uint
	Furniture   Furniture `gorm:"referenes:id" valid:"-"`

	AdminID *uint
	Admin   Admin `gorm:"referenes:id" valid:"-"`
}
