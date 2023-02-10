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
		&User{}, &Room{}, &Category{}, &Size{}, &Lease{}, &Manage{}, &Resident{}, &Reason{}, &Requestout{}, &Requestchange{}, &Kind{}, &Area{}, &Cleaning{},
		&Banking{}, &Bill{}, &Payment{}, &Method{}, &Title{}, &Gender{}, &Status{}, &Amount{}, &Equipment{}, &Furniture{},
		&Admin{}, &Meter{}, &Bill{}, &Object{}, &Emergencytype{}, &Repair{}, &Emergency{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Admin{}).Create(&Admin{
		Name:     "Promporn Phinitphong",
		Email:    "Promporn@gmail.com",
		Tel:      "0932941944",
		Password: string(password),
		Role:     "admin",
	})

	db.Model(&Admin{}).Create(&Admin{
		Name:     	"Jakkrit Chaiwan",
		Email:   		"jackerchaiwan@gmail.com",
		Tel:      	"0610255279",
		Password: 	string(password),
		Role:		"admin",
	})

	var promporn Admin
	db.Raw("SELECT * FROM Admins WHERE email = ?", "promporn@gmail.com").Scan(&promporn)

	var jakkrit  		Admin
	db.Raw("SELECT * FROM Admins WHERE email = ?", "jackerchaiwan@gmail.com").Scan(&jakkrit)


	

	db.Model(&User{}).Create(&User{
		Name:     	"Wallaya Patisang",
		Email:   		"wallaya.1999@gmail.com",
		Tel: 		"0920000123",
		Password: 	string(password),
		Role:     	"user",
	})

	db.Model(&User{}).Create(&User{
		Name:  "Panadda Srisawat",
		Email: "panadda@gmail.com",

		Password: string(password),
		Role:     "user",
	})

	var wallaya  	User
	db.Raw("SELECT * FROM users WHERE email = ?", "wallaya@gmail.com").Scan(&wallaya)

	var panadda 	User
	db.Raw("SELECT * FROM users WHERE email = ?", "panadda@gmail.com").Scan(&panadda)

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

	// Equipment Data
	eq01 := Equipment{
		Equipment: "ทีวี",
		Price:     200,
	}
	db.Model(&Equipment{}).Create(&eq01)

	eq02 := Equipment{
		Equipment: "ตู้เย็น",
		Price:     300,
	}
	db.Model(&Equipment{}).Create(&eq02)

	eq03 := Equipment{
		Equipment: "พัดลม",
		Price:     100,
	}
	db.Model(&Equipment{}).Create(&eq03)

	eq04 := Equipment{
		Equipment: "ไมโครเวฟ",
		Price:     100,
	}
	db.Model(&Equipment{}).Create(&eq04)

	eq05 := Equipment{
		Equipment: "เตาไฟฟ้า",
		Price:     100,
	}
	db.Model(&Equipment{}).Create(&eq05)

	eq06 := Equipment{
		Equipment: "กระติกน้ำร้อน",
		Price:     100,
	}
	db.Model(&Equipment{}).Create(&eq06)

	eq07 := Equipment{
		Equipment: "เครื่องฟอกอากาศ",
		Price:     400,
	}
	db.Model(&Equipment{}).Create(&eq07)

	eq08 := Equipment{
		Equipment: "เครื่องดูดฝุ่น",
		Price:     200,
	}
	db.Model(&Equipment{}).Create(&eq08)

	// Amount Data
	am01 := Amount{
		Amount: "1",
	}
	db.Model(&Amount{}).Create(&am01)

	am02 := Amount{
		Amount: "2",
	}
	db.Model(&Amount{}).Create(&am02)

	am03 := Amount{
		Amount: "3",
	}
	db.Model(&Amount{}).Create(&am03)

	//---Banking Data
	Bangkok := Banking{
		Name: "ธนาคารกรุงเทพ",
	}
	db.Model(&Banking{}).Create(&Bangkok)

	Krungthai := Banking{
		Name: "ธนาคารกรุงไทย",
	}
	db.Model(&Banking{}).Create(&Krungthai)

	Krungsri := Banking{
		Name: "ธนาคารกรุงศรีอยุธยา",
	}
	db.Model(&Banking{}).Create(&Krungsri)

	Kasikorn := Banking{
		Name: "ธนาคารกสิกรไทย",
	}
	db.Model(&Banking{}).Create(&Kasikorn)

	SCB := Banking{
		Name: "ธนาคารไทยพาณิชย์",
	}
	db.Model(&Banking{}).Create(&SCB)

	//---Method Data
	ATM := Method{
		Name: "ATM (โอนจากตู้กดเงินสด)",
	}
	db.Model(&Method{}).Create(&ATM)

	CDM := Method{
		Name: "CDM (ฝากผ่านตู้ฝากเงินสด)",
	}
	db.Model(&Method{}).Create(&CDM)

	Counter_Cashier := Method{
		Name: "Counter Cashier (โอนเงินผ่านหน้าเว็บไซต์)",
	}
	db.Model(&Method{}).Create(&Counter_Cashier)

	Internet_Banking := Method{
		Name: "Internet Banking (โอนเงินผ่านหน้าเว็บไซต์)",
	}
	db.Model(&Method{}).Create(&Internet_Banking)

	Mobile_Banking := Method{
		Name: "Mobile Banking (โอนเงินผ่านแอพมือถือ)",
	}
	db.Model(&Method{}).Create(&Mobile_Banking)

	//---Status Data
	Single := Status{
		Name: "โสด",
	}
	db.Model(&Status{}).Create(&Single)

	Married := Status{
		Name: "สมรส ",
	}
	db.Model(&Status{}).Create(&Married)

	Widowed := Status{
		Name: "หม้าย ",
	}
	db.Model(&Status{}).Create(&Widowed)

	Divorce := Status{
		Name: "หย่า ",
	}
	db.Model(&Status{}).Create(&Divorce)

	Separated := Status{
		Name: "แยกกันอยู่",
	}
	db.Model(&Status{}).Create(&Separated)

	//---Title Data
	Mr := Title{
		Name: "นาย",
	}
	db.Model(&Title{}).Create(&Mr)

	Mrs := Title{
		Name: "นาง",
	}
	db.Model(&Title{}).Create(&Mrs)

	Miss := Title{
		Name: "นางสาว",
	}
	db.Model(&Title{}).Create(&Miss)

	//---Gender Data
	Male := Gender{
		Name: "ชาย",
	}
	db.Model(&Gender{}).Create(&Male)

	Female := Gender{
		Name: "หญิง",
	}
	db.Model(&Gender{}).Create(&Female)

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
