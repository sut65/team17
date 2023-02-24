package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUsercorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "abc@gmail.com",
		Tel:          "0988888888",
		Password:     "123456789",
		Name:         "nameA",
		Address:      "bangkok",
		Personal:     "1306666666666",
		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}

	ok, err := govalidator.ValidateStruct(user)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}


func TestEmailisvalid(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "miss", //ว่าง
		Tel:          "0988888888",
		Password:     "123456789",
		Name:         "nameA",
		Address:      "bangkok",
		Personal:     "1306666666666",
		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email: miss does not validate as email"))

}



func TestEmailNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "", //ว่าง
		Tel:          "0988888888",
		Password:     "123456789",
		Name:         "nameA",
		Address:      "bangkok",
		Personal:     "1306666666666",
		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Email cannot be blank"))

}

func TestTelNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "abc@gmail.com",
		Tel:          "", //ว่าง
		Password:     "123456789",
		Name:         "nameA",
		Address:      "bangkok",
		Personal:     "1306666666666",
		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Tel: non zero value required"))

}

func TestPasswordNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "abc@gmail.com",
		Tel:          "0988888888",
		Password:     "", //ว่าง
		Name:         "nameA",
		Address:      "bangkok",
		Personal:     "1306666666666",
		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Password cannot be blank"))

}

func TestNameNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "abc@gmail.com",
		Tel:          "0988888888",
		Password:     "123456789",
		Name:         "", //ว่าง
		Address:      "bangkok",
		Personal:     "1306666666666",
		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Name cannot be blank"))

}

func TestAddressNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "abc@gmail.com",
		Tel:          "0988888888",
		Password:     "123456789",
		Name:         "nameA",
		Address:      "", //ว่าง
		Personal:     "1306666666666",
		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Address cannot be blank"))

}

// func TestPersonalNotnull(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	user := User{
// 		Email:        "abc@gmail.com",
// 		Tel:          "0988888888",
// 		Password:     "123456789",
// 		Name:         "nameA",
// 		Address:      "bangkok",
// 		Personal:     "",  //ว่าง
// 		BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
// 	}
// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(user)

// 	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).ToNot(BeTrue())

// 	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).ToNot(BeNil())

// 	// err.Error ต้องมี error message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("Personal cannot be blank"))

// }

func TestPhoneNumberInCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"A9",
		"B99",
		"Ccs55",
		"1592684886",
		"09558457789",
		"0955845778A",
	}

	for _, fixture := range fixtures {
		user := User{
			Email:        "abc@gmail.com",
			Tel:          fixture,
			Password:     "123456789",
			Name:         "nameA",
			Address:      "bangkok",
			Personal:     "1306666666666",
			BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
		}

		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
	}
}

func TestPersonalInCorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []string{
		"A9",
		"B99",
		"Ccs55",
		"1592684886",
		"09558457789",
		"0955845778A254",
		"0955845778A2545",
	}

	for _, fixture := range fixtures {
		user := User{
			Email:        "abc@gmail.com",
			Tel:          "0988888888",
			Password:     "123456789",
			Name:         "nameA",
			Address:      "bangkok",
			Personal:     fixture,
			BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
		}

		ok, err := govalidator.ValidateStruct(user)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())
	}
}

func TestBirthdayTimeIncorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Email:        "abc@gmail.com",
		Tel:          "0988888888",
		Password:     "123456789",
		Name:         "nameA",
		Address:      "bangkok",
		Personal:     "1306666666666",
		BirthdayTime: time.Now().Add(2 * time.Minute), //เช็คเวลาที่ผิด นาที
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Birthday not past"))

}
