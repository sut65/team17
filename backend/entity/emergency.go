package entity

import (
	"time"

	"gorm.io/gorm"
)

type Emergency struct{
	gorm.Model
	Emergencytime			time.Time                 
	Detail				string                     `valid:"required~โปรดระบุรายละเอียดเพิ่มเติม"`            

	// PatientID เป็น FK
	UserID			*uint
	User				User                       `gorm:"referenes:id" valid:"-"`
	// DepartmentID เป็น FK
	ResidentID		*uint
	Resident			Resident                   `gorm:"referenes:id" valid:"-"`
	// SymptomID เป็น FK
	EmergencytypeID		*uint
	Emergencytype			  Emergencytype          `gorm:"referenes:id" valid:"-"`

}