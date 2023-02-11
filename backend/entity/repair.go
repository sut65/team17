package entity

import (
	"time"

	"gorm.io/gorm"
)

type Repair struct{
	gorm.Model
	Repairtime			time.Time
	Detail				string             `valid:"required~โปรดระบุรายละเอียดเพิ่มเติม"`

	// PatientID เป็น FK
	UserID			*uint
	User				User               `gorm:"referenes:id" valid:"-"`
	// DepartmentID เป็น FK
	ResidentID		*uint
	Resident			Resident            `gorm:"referenes:id" valid:"-"`
	// SymptomID เป็น FK
	ObjectID		*uint
	Object			  Object               `gorm:"referenes:id" valid:"-"`

}