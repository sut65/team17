package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email        string `valid:"required~Email cannot be blank"`
	Tel          string `valid:"required,matches(^[0]\\d{9}$)~Tel must be contain 10 numbers"`
	Password     string `valid:"required~Password cannot be blank"`
	Name         string `valid:"required~Name cannot be blank"`
	Role         string
	Address      string    `valid:"required~Address cannot be blank"`
	Personal     string    `valid:"required,matches(^\\d{13}$)~Personal must be contain 13 numbers"`
	BirthdayTime time.Time `valid:"past~Birthday not past"`

	// StatusID เป็น FK
	StatusID *uint
	// ข้อมูลของ Status เมื่อ join ตาราง
	Status Status `gorm:"referenes:id" valid:"-"`

	// GenderID เป็น FK
	GenderID *uint
	// ข้อมูลของ Gender เมื่อ join ตาราง
	Gender Gender `gorm:"referenes:id" valid:"-"`

	// TitleID เป็น FK
	TitleID *uint
	// ข้อมูลของ Title เมื่อ join ตาราง
	Title Title `gorm:"referenes:id" valid:"-"`

	Payments []Payment `gorm:"foreignKey:UserID"`

	Requestouts   []Requestout    `gorm:"foreignKey:UserID"`
	Requestchange []Requestchange `gorm:"foreignKey:UserID"`
}

//เงื่อนไขเวลาไม่เป็นอดีต
func init() {
	govalidator.CustomTypeTagMap.Set("past", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now())
	})
}
