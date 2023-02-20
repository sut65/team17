package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDetailCannotBlank(t *testing.T) {

	g := NewGomegaWithT(t)
	
	requestchange := Requestchange{
		Detail:	"",
	}
	
	ok, err := govalidator.ValidateStruct(requestchange)

	g.Expect(ok).ToNot(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
	g.Expect(err).ToNot(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
	g.Expect(err.Error()).To(Equal("Detail cannot be blank"))	//message err.Error ออกมา
}

func TestChangePass(t *testing.T) {

	g := NewGomegaWithT(t)
	
	requestchange := Requestchange{
		Detail:	"notthing",
	}
	
	ok, err := govalidator.ValidateStruct(requestchange)

	g.Expect(ok).To(BeTrue())								//ok เป็น True คือไม่มี err
	g.Expect(err).To(BeNil())								//err เป็น null คือ ไม่มี err
}

