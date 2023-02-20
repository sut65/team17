package entity

import (
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDetailCannotBeBlank(t *testing.T) {

	g := NewGomegaWithT(t)
	
	requestout := Requestout{
		Detail:	"",
		Outtime: time.Now(),   //ปัจจุบัน
		
	}
	
	ok, err := govalidator.ValidateStruct(requestout)

	g.Expect(ok).ToNot(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
	g.Expect(err).ToNot(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
	g.Expect(err.Error()).To(Equal("Detail cannot be blank"))	//message err.Error ออกมา
}


func TestOutPass(t *testing.T) {

	g := NewGomegaWithT(t)
	
	requestout := Requestout{
		Detail:	"pass",
		Outtime: time.Now(),   //ปัจจุบัน
	}
	
	ok, err := govalidator.ValidateStruct(requestout)

	g.Expect(ok).To(BeTrue())								//ok เป็น True คือไม่มี err
	g.Expect(err).To(BeNil())								//err เป็น null คือ ไม่มี err
}


func TestDatenotpast(t *testing.T) {

	g := NewGomegaWithT(t)
	
	requestout := Requestout{
		Detail:	"pass",
		Outtime: time.Now().AddDate(0, 0, -1),   //เป็นอดีต
	}
	
	ok, err := govalidator.ValidateStruct(requestout)

	g.Expect(ok).ToNot(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
	g.Expect(err).ToNot(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
	g.Expect(err.Error()).To(Equal("Date not past"))	//message err.Error ออกมา
}