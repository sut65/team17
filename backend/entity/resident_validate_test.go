package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestResidentValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("check bail cannot be blank", func(t *testing.T) {
		resident := Resident {
			Bail: "",
			LeaseTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(resident)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).ToNot(BeNil())
		g.Expect(err.Error()).To(Equal("Bail cannot be blank"))
	})

	
}