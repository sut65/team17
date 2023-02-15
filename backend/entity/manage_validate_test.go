package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestManageValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check status cannot be blank", func(t *testing.T) {
		manage := Manage {
			Status:	"",
			Price:	5000,
			Detail: "โต๊ะ(1), เก้าอี้(1)",
		}

		ok, err := govalidator.ValidateStruct(manage)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Status cannot be blank"))
	})
	
	t.Run("check price is invalid range 3000-5000", func(t *testing.T) {
		manage := Manage {
			Status:	"ว่าง",
			Price:	2000,
			Detail: 	"โต๊ะ(1), เก้าอี้(1)",
		}

		ok, err := govalidator.ValidateStruct(manage)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Price is valid"))
	})
	
	t.Run("check detail cannot be blank", func(t *testing.T) {
		manage := Manage {
			Status:	"ว่าง",
			Price:	3000,
			Detail: 	"",
		}

		ok, err := govalidator.ValidateStruct(manage)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Detail cannot be blank"))
	})
}
