package entity

import (
	"time"

	"gorm.io/gorm"
)

type Emergency struct{
	gorm.Model
	Emergencytime			time.Time
	Detail				string

	// PatientID เป็น FK
	UserID			*uint
	User				User
	// DepartmentID เป็น FK
	ResidentID		*uint
	Resident			Resident
	// SymptomID เป็น FK
	EmergencytypeID		*uint
	Emergencytype			  Emergencytype

}