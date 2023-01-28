package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	
	Name				string
	Email				string			`gorm:"uniqeIndex"`
	Tel					string			`gorm:"uniqeIndex"`
	Password			string
	Role				string

	
	Repairs         	[]Repair		    `gorm:"foreignKey:UserID"`


}

type Resident struct{
	gorm.Model
	
	Room     		    string 

	
	
	Repairs         	[]Repair		    `gorm:"foreignKey:ResidentID"`


}
type Object struct{
	gorm.Model
	Name				string
	      		 

	
	
	Repairs         	[]Repair		    `gorm:"foreignKey:ObjectID"`


}

type Repair struct{
	gorm.Model
	Repairtime			time.Time
	Detail				string

	// PatientID เป็น FK
	UserID			*uint
	User				User
	// DepartmentID เป็น FK
	ResidentID		*uint
	Resident			Resident
	// SymptomID เป็น FK
	ObjectID		*uint
	Object			  Object

}

type Emergencytype struct{
	gorm.Model
	Name				string
	      		 

	
	
	Emergencys         	[]Emergency		    `gorm:"foreignKey:EmergencytypeID"`

}

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
	Emergencytype			 Emergencytype

}