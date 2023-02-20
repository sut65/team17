package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	."github.com/onsi/gomega"
)

func TestPaymentcorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	currentTime := time.Now()
		currentTime.Format("2006-1-2 15:4:5")


	payment := Payment{
		Evidence: 		"",
		PaymentTime:	currentTime,

		// Email:        "abc@gmail.com",
		// Tel:          "0988888888",
		// Password:     "123456789",
		// Name:         "nameA",
		// Address:      "bangkok",
		// Personal:     "1306666666666",
		// BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}

	ok, err := govalidator.ValidateStruct(user)

	g.Expect(ok).To(BeTrue())

	g.Expect(err).To(BeNil())

}

func TestEvidenceNotnull(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Evidence: 		"",//ว่าง
		PaymentTime:	time.Date(2023, 2, 11, 0, 0, 0, 0, time.Local),

		// Email:        "", 
		// Tel:          "0988888888",
		// Password:     "123456789",
		// Name:         "nameA",
		// Address:      "bangkok",
		// Personal:     "1306666666666",
		// BirthdayTime: time.Date(1999, 5, 12, 0, 0, 0, 0, time.Local),
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Evidence cannot be blank"))

}


func TestPaymentTimeIncorrect(t *testing.T) {
	g := NewGomegaWithT(t)

	user := User{
		Evidence: 		"",//ว่าง
		PaymentTime: 	time.Now().Add(2 * time.Minute), //เช็คเวลาที่ผิด นาที
	}
	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("PaymentTime not past"))

}
