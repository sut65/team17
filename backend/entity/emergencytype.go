package entity

import (
	

	"gorm.io/gorm"
)
type  Emergencytype struct{
	gorm.Model
	Name				string
	      		 

	
	
	Emergencys         	[]Emergency		    `gorm:"foreignKey:EmergencytypeID"`


}