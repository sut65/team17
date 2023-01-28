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

	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&User{}, &Resident{}, &Object{}, &Repair{}, &Emergencytype{}, &Emergency{},
	)

	db = database

	//////////////////////////////////////////////////////////////////////

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&User{}).Create(&User{
		Name:     "Jakkrit Chaiwan",
		Email:    "jackerchaiwan@gmail.com",
		Tel:      "0610255279",
		Password: string(password),
		Role:     "user",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Wallaya Patisang",
		Email:    "wallaya.1999@gmail.com",
		Tel:      "0920000123",
		Password: string(password),
		Role:     "user",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Panadda Srisawat",
		Email:    "panadsada@gmail.com",
		Tel:      "0930000124",
		Password: string(password),
		Role:     "admin",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Promporn Phinitphong",
		Email:    "promporn@gmail.com",
		Password: string(password),
		Role:     "admin",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Thanawat Nitikarun",
		Email:    "thanawat@gmail.com",
		Password: string(password),
		Role:     "admin",
	})

	db.Model(&User{}).Create(&User{
		Name:     "Ratchapol Piyaman",
		Email:    "ratchapol@gmail.com",
		Password: string(password),
		Role:     "admin",
	})

	var jakkrit User
	var wallaya User
	var panadda User
	var promporn User
	var thanawat User
	var ratchapol User

	db.Raw("SELECT * FROM users WHERE email = ?", "jackerchaiwan@gmail.com").Scan(&jakkrit)
	db.Raw("SELECT * FROM users WHERE email = ?", "wallaya@gmail.com").Scan(&wallaya)
	db.Raw("SELECT * FROM users WHERE email = ?", "panadsada@gmail.com").Scan(&panadda)
	db.Raw("SELECT * FROM users WHERE email = ?", "promporn@gmail.com").Scan(&promporn)
	db.Raw("SELECT * FROM users WHERE email = ?", "thanawat@gmail.com").Scan(&thanawat)
	db.Raw("SELECT * FROM users WHERE email = ?", "ratchapol@gmail.com").Scan(&ratchapol)

	//Resident
	A := Resident{

		Room: "101",
	}
	db.Model(&Resident{}).Create(&A)
	B := Resident{

		Room: "202",
	}
	db.Model(&Resident{}).Create(&B)

	//Furniture
	C := Object{
		Name: "Tv",
	}
	db.Model(&Object{}).Create(&C)

	D := Object{

		Name: "Microwave",
	}

	db.Model(&Object{}).Create(&D)

	//Emergency

	E := Emergencytype{
		Name: "อัคคีภัย",
	}
	db.Model(&Emergencytype{}).Create(&E)

	F := Emergencytype{
		Name: "คนแปลกหน้า",
	}
	db.Model(&Emergencytype{}).Create(&F)

}
