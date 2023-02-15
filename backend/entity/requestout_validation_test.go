package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestDetailCannotBeBlank(t *testing.T) {

	g := NewGomegaWithT(t)
	
	requestout := Requestout{
		Detail:	"",
	}
	
	ok, err := govalidator.ValidateStruct(requestout)

	g.Expect(ok).ToNot(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
	g.Expect(err).ToNot(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
	g.Expect(err.Error()).To(Equal("Detail cannot be blank"))	//message err.Error ออกมา
}