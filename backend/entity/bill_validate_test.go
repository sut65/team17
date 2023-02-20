package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	"time"
)

func TestBillValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("cost cannot be zero", func(t *testing.T) {
		fixtures := []int{
			0,
			-5,
			-4,
			-2,
		}

		for _, fixture := range fixtures {

			bill := Bill{
				Cost:     fixture,
				BillTime: time.Now(),
			}
			ok, err := govalidator.ValidateStruct(bill)

			// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
			g.Expect(ok).NotTo(BeTrue())

			// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
			g.Expect(err).ToNot(BeNil())

			if err.Error() == "cost cannot be zero" {
				g.Expect(err.Error()).To(Equal("cost cannot be zero"))
			} else if err.Error() == "cost cannot be negative" {
				g.Expect(err.Error()).To(Equal("cost cannot be negative"))
			}
		}
	})


	t.Run("check Date is invalid", func(t *testing.T) {
		bill := Bill {
			Cost:     6630,
			BillTime: time.Now().AddDate(0, 0, -1),
		}

		ok, err := govalidator.ValidateStruct(bill)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Date is invalid"))
	})

}
