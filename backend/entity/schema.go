package entity

import (
	"time"

	"gorm.io/gorm"

	"github.com/asaskevich/govalidator"
)

type Admin struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqeIndex"`
	Password string
	Tel      string
	Role     string

	Meters []Meter `gorm:"foreignKey:AdminID"`
	Bills  []Bill  `gorm:"foreignKey:AdminID"`
}

type Bill struct {
	gorm.Model
	Cost     int       `valid:"required~cost cannot be zero, Cost~cost cannot be negative"`
	BillTime time.Time `valid:"timenotpast~Date is invalid"`

	MeterID *uint
	Meter   Meter `gorm:"referenes:id" valid:"-"`

	FurnitureID *uint
	Furniture   Furniture `gorm:"referenes:id" valid:"-"`

	AdminID *uint
	Admin   Admin `gorm:"referenes:id" valid:"-"`
}

type Meter struct {
	gorm.Model
	Before    int       `valid:"required~Before cannot be zero, Before~Before cannot be negative"`
	After     int       `valid:"required~After cannot be zero, After~After cannot be negative"`
	Total     int       `valid:"required~Total cannot be zero, Total~Total cannot be negative"`
	Unit      int       `valid:"required~Unit cannot be zero, Unit~Unit cannot be negative"`
	Electric  int       `valid:"required~Electric cannot be zero, Electric~Electric cannot be negative"`
	Water     int       `valid:"required~Water cannot be zero, Water~Water cannot be negative"`
	Metertime time.Time `valid:"timenotpast~Date is invalid"`

	// AdminID เป็น FK
	AdminID *uint
	// ข้อมูลของ Admin เมื่อ join ตาราง
	Admin Admin `gorm:"referenes:id" valid:"-"`

	// UserID เป็น FK
	UserID *uint
	// ข้อมูลของ User เมื่อ join ตาราง
	User User `gorm:"referenes:id" valid:"-"`

	// ManageID  เป็น FK
	ManageID *uint
	// ข้อมูลของ Manage เมื่อ join ตาราง
	Manage Manage `gorm:"referenes:id" valid:"-"`

	Bills []Bill `gorm:"foreignKey:MeterID"`
}

type Room struct {
	gorm.Model

	Number         string
	Manages        []Manage        `gorm:"foreignKey:RoomID"`
	Furnitures     []Furniture     `gorm:"foreignKey:RoomID"`
	Requestouts    []Requestout    `gorm:"foreignKey:RoomID"`
	Requestchanges []Requestchange `gorm:"foreignKey:RoomID"`
}

type Lease struct {
	gorm.Model

	Lease     string
	Residents []Resident `gorm:"foreignKey:LeaseID"`
}

type Size struct {
	gorm.Model

	Size    string
	Manages []Manage `gorm:"foreignKey:SizeID"`
}

type Manage struct {
	gorm.Model
	Status string `valid:"required~Status cannot be blank"`
	Price  string `valid:"required~Price cannot be blank"`
	Detail string `valid:"required~Detail cannot be blank"`

	//Entity Room
	RoomID *uint
	Room   Room

	CategoryID *uint
	Category   Category `gorm:"referenes:id" valid:"-"`

	SizeID *uint
	Size   Size `gorm:"referenes:id" valid:"-"`

	Residents []Resident `gorm:"foreignKey:ManageID"`
	Meters    []Meter    `gorm:"foreignKey:ManageID"`
}

type Resident struct {
	gorm.Model

	LeaseTime time.Time `valid:"timenotpast~Date is invalid"`
	Bail      string    `valid:"required~Bail cannot be blank"`

	UserID *uint
	User   User `gorm:"referenes:id" valid:"-"`

	LeaseID *uint
	Lease   Lease `gorm:"referenes:id" valid:"-"`

	ManageID *uint
	Manage   Manage `gorm:"referenes:id" valid:"-"`
}

type Requestout struct {
	gorm.Model

	Detail string `valid:"required~Detail cannot be blank"`

	ReasonID *uint
	Reason   Reason `gorm:"referenes:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"referenes:id" valid:"-"`

	UserID *uint
	User   User `gorm:"referenes:id" valid:"-"`

	Outtime time.Time `valid:"timenotpast~Date not past"`
}

type Requestchange struct {
	gorm.Model

	Detail string `valid:"required~Detail cannot be blank"`

	ReasonID *uint
	Reason   Reason `gorm:"referenes:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"referenes:id" valid:"-"`

	UserID *uint
	User   User `gorm:"referenes:id" valid:"-"`
}

type Reason struct {
	gorm.Model

	Reason string

	Requestouts   []Requestout    `gorm:"foreignKey:ReasonID"`
	Requestchange []Requestchange `gorm:"foreignKey:ReasonID"`
}

type Area struct {
	gorm.Model

	Area      string
	Cleanings []Cleaning `gorm:"foreignKey:AreaID"`
}

type Kind struct {
	gorm.Model

	Kind      string
	Cleanings []Cleaning `gorm:"foreignKey:KindID"`
}

type Cleaning struct {
	gorm.Model

	CleaningTime time.Time `valid:"Vatime~DateTime is valid,timenotpast~DateTime cannot be past"`

	Detail string `valid:"required~Detail cannot be blank"`

	UserID *uint
	User   User `gorm:"referenes:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"referenes:id" valid:"-"`

	KindID *uint
	Kind   Kind `gorm:"referenes:id" valid:"-"`

	AreaID *uint
	Area   Area `gorm:"referenes:id" valid:"-"`
}

type Amount struct {
	gorm.Model

	Amount     string
	Furnitures []Furniture `gorm:"foreignKey:AmountID"`
}

type Equipment struct {
	gorm.Model

	Equipment  string
	Price      int
	Furnitures []Furniture `gorm:"foreignKey:EquipmentID"`
}

type Furniture struct {
	gorm.Model

	FurnitureTime time.Time `valid:"Vatime~DateTime is valid,timenotpast~DateTime cannot be past"`
	Total         *uint

	AdminID *uint
	Admin   Admin `gorm:"referenes:id" valid:"-"`

	UserID *uint
	User   User `gorm:"referenes:id" valid:"-"`

	RoomID *uint
	Room   Room `gorm:"referenes:id" valid:"-"`

	AmountID *uint
	Amount   Amount `gorm:"referenes:id" valid:"-"`

	EquipmentID *uint
	Equipment   Equipment `gorm:"referenes:id" valid:"-"`

	Bills []Bill `gorm:"foreignKey:FurnitureID"`
}

type Repair struct {
	gorm.Model
	Repairtime time.Time `valid:"timenotpast~Date is invalid"`
	Detail     string    `valid:"required~โปรดระบุรายละเอียดเพิ่มเติม"`

	// PatientID เป็น FK
	UserID *uint
	User   User `gorm:"referenes:id" valid:"-"`
	// DepartmentID เป็น FK
	ResidentID *uint
	Resident   Resident `gorm:"referenes:id" valid:"-"`
	// SymptomID เป็น FK
	ObjectID *uint
	Object   Object `gorm:"referenes:id" valid:"-"`
}

type Object struct {
	gorm.Model
	Name string

	Repairs []Repair `gorm:"foreignKey:ObjectID"`
}

type Emergencytype struct {
	gorm.Model
	Name string

	Emergencys []Emergency `gorm:"foreignKey:EmergencytypeID"`
}

type Emergency struct {
	gorm.Model
	Emergencytime time.Time `valid:"timenotpast~Date is invalid"`
	Detail        string    `valid:"required~โปรดระบุรายละเอียดเพิ่มเติม"`

	// PatientID เป็น FK
	UserID *uint
	User   User `gorm:"referenes:id" valid:"-"`
	// DepartmentID เป็น FK
	ResidentID *uint
	Resident   Resident `gorm:"referenes:id" valid:"-"`
	// SymptomID เป็น FK
	EmergencytypeID *uint
	Emergencytype   Emergencytype `gorm:"referenes:id" valid:"-"`
}

func init() {

	govalidator.CustomTypeTagMap.Set("Before", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})

	govalidator.CustomTypeTagMap.Set("After", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})

	govalidator.CustomTypeTagMap.Set("Total", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})

	govalidator.CustomTypeTagMap.Set("Unit", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})

	govalidator.CustomTypeTagMap.Set("Electric", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})

	govalidator.CustomTypeTagMap.Set("Water", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})

	govalidator.CustomTypeTagMap.Set("Vatime", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// ล่วงหน้าไม่เกิน 7 วัน
		return t.Before(time.Now().AddDate(0, 0, +7))
	})

	govalidator.CustomTypeTagMap.Set("timeNow", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// วันเวลาปัจจุบัน
		return t.Equal(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("timenotpast", func(i interface{}, o interface{}) bool {
		t := i.(time.Time)
		// วันเวลาปัจจุบัน ห้ามเป็นอดีต
		return t.After(time.Now().AddDate(0, 0, -1))
	})

	govalidator.CustomTypeTagMap.Set("Cost", func(i interface{}, o interface{}) bool {
		a := i.(int)
		return a >= 1
	})

}
