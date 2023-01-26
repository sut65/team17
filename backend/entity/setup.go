package entity

import (
	//"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("se-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&User{}, &Room{}, &Category{}, &Size{}, &Lease{}, &Manage{}, &Resident{}, &Reason{}, &Requestout{},&Kind{}, &Area{}, &Cleaning{},
	)

	db = database


	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&User{}).Create(&User{
		Name:     	"Jakkrit Chaiwan",
		Email:   	"jackerchaiwan@gmail.com",
		Tel:      	"0610255279",
		Password: 	string(password),
		Role:		"user",
	})

	db.Model(&User{}).Create(&User{
		Name:     	"Wallaya Patisang",
		Email:   	"wallaya.1999@gmail.com",
		Tel: 		"0920000123",
		Password: 	string(password),
		Role:     	"admin",
	})

	var jakkrit		User
	db.Raw("SELECT * FROM users WHERE email = ?", "jackerchaiwan@gmail.com").Scan(&jakkrit)

	var wallaya  	User
	db.Raw("SELECT * FROM users WHERE email = ?", "wallaya@gmail.com").Scan(&wallaya)


	// Room Data
	Room101 := Room{
		Number: "101",
	}
	db.Model(&Room{}).Create(&Room101)

	Room102 := Room{
		Number: "102",
	}
	db.Model(&Room{}).Create(&Room102)

	Room103 := Room{
		Number: "103",
	}
	db.Model(&Room{}).Create(&Room103)

	Room201 := Room{
		Number: "201",
	}
	db.Model(&Room{}).Create(&Room201)

	Room202 := Room{
		Number: "202",
	}
	db.Model(&Room{}).Create(&Room202)

	Room203 := Room{
		Number: "203",
	}
	db.Model(&Room{}).Create(&Room203)

	Room301 := Room{
		Number: "301",
	}
	db.Model(&Room{}).Create(&Room301)

	Room302 := Room{
		Number: "302",
	}
	db.Model(&Room{}).Create(&Room302)

	Room303 := Room{
		Number: "303",
	}
	db.Model(&Room{}).Create(&Room303)


	// Size Data

	size1 := Size{
		Size: "ห้องเล็ก",
	}
	db.Model(&Size{}).Create(&size1)

	size2 := Size{
		Size: "ห้องกลาง",
	}
	db.Model(&Size{}).Create(&size2)

	size3 := Size{
		Size: "ห้องใหญ่",
	}
	db.Model(&Size{}).Create(&size3)


	// Category Data

	cate01 := Category{
		Category: "ห้องพัดลม",
	}
	db.Model(&Category{}).Create(&cate01)

	cate02 := Category{
		Category: "ห้องแอร์",
	}
	db.Model(&Category{}).Create(&cate02)


	// Lease Data

	lease1 := Lease{
		Lease: "3เดือน",
	}
	db.Model(&Lease{}).Create(&lease1)

	lease2 := Lease{
		Lease: "6เดือน",
	}
	db.Model(&Lease{}).Create(&lease2)
	
	lease3 := Lease{
		Lease: "1ปี",
	}
	db.Model(&Lease{}).Create(&lease3)







	// Reason Data

	Reason1 := Reason{
		Reason: "ต้องการย้ายหอพัก",
	}
	db.Model(&Reason{}).Create(&Reason1)



	Reason2 := Reason{
		Reason: "มีปัญหาส่วนตัว",
	}
	db.Model(&Reason{}).Create(&Reason2)


	Reason3 := Reason{
		Reason: "ห้องพักมีปัญหา",
	}
	db.Model(&Reason{}).Create(&Reason3)



	Reason4 := Reason{
		Reason: "อื่นๆ",
	}
	db.Model(&Reason{}).Create(&Reason4)
	
	


	// Kind Data

	kind01 := Kind{
		Kind: "ดูดฝุ่น",
	}
	db.Model(&Kind{}).Create(&kind01)

	kind02 := Kind{
		Kind: "กวาด",
	}
	db.Model(&Kind{}).Create(&kind02)

	kind03 := Kind{
		Kind: "กวาด/ถู",
	}
	db.Model(&Kind{}).Create(&kind03)

	kind04 := Kind{
		Kind: "ดูดฝุ่น",
	}
	db.Model(&Kind{}).Create(&kind04)

	kind05 := Kind{
		Kind: "เก็บขยะ/เก็บของ",
	}
	db.Model(&Kind{}).Create(&kind05)

	kind06 := Kind{
		Kind: "จัดห้อง",
	}
	db.Model(&Kind{}).Create(&kind06)

	kind07 := Kind{
		Kind: "ล้าง",
	}
	db.Model(&Kind{}).Create(&kind07)

	kind08 := Kind{
		Kind: "ปัดหยากไย่",
	}
	db.Model(&Kind{}).Create(&kind08)

	// Area Data

	area01 := Area{
		Area: "ห้องนอน",
	}
	db.Model(&Area{}).Create(&area01)

	area02 := Area{
		Area: "ห้องโถง",
	}
	db.Model(&Area{}).Create(&area02)

	area03 := Area{
		Area: "ห้องน้ำ",
	}
	db.Model(&Area{}).Create(&area03)

	area04 := Area{
		Area: "ระเบียง",
	}
	db.Model(&Area{}).Create(&area04)

	area05 := Area{
		Area: "ทั้งห้อง",
	}
	db.Model(&Area{}).Create(&area05)

}