package entity

import (

	"gorm.io/gorm"
)

type Method struct {
	gorm.Model
	Name string

	Payments []Payment `gorm:"foreignKey:MethodID"`
}