package entity

import (
	"gorm.io/gorm"
)

type Lease struct {
	gorm.Model
	
	Lease				string
	Residents				[]Resident				`gorm:"foreignKey:LeaseID"`

}