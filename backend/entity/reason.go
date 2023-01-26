package entity

import (
	"gorm.io/gorm"
)

type Reason struct {
	gorm.Model

	Reason string
	

	Requestouts []Requestout `gorm:"foreignKey:ReasonID"`
}
