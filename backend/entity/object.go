package entity

import (
	

	"gorm.io/gorm"
)
type Object struct{
	gorm.Model
	Name				string
	      		 

	
	
	Repairs         	[]Repair		    `gorm:"foreignKey:ObjectID"`


}