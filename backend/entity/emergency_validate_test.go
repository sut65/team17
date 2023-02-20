package entity

import (
	"testing"
    "time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestEmergencyValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check time is invalid", func(t *testing.T) {
		emergency := Emergency {
			Emergencytime:	time.Now().AddDate(0, 0, -1),
			
			Detail: "ก๊อกรั่ว(1), ทีวีจอแตก(1)",
		}

		ok, err := govalidator.ValidateStruct(emergency)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Date is invalid"))
	})

	t.Run("check detail cannot be blank", func(t *testing.T) {
		emergency := Emergency {
			Emergencytime:	time.Now(),
			
			Detail: "", 
		}

		ok, err := govalidator.ValidateStruct(emergency)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("โปรดระบุรายละเอียดเพิ่มเติม"))
	})

	
	
}