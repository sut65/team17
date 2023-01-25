package entity

import (
	"gorm.io/gorm"
)

type Reason struct {
	gorm.Model

	rea string

	Requestouts []Requestout `gorm:"foreignKey:ReasonID"`
}
