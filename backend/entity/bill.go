package entity

import (
	"time"

	"gorm.io/gorm"
)

type Bill struct {
	gorm.Model
	Cost     int
	BillTime time.Time

	MeterID *uint
	Meter   Meter

	FurnitureID *uint
	Furniture   Furniture

	AdminID *uint
	Admin   Admin
}