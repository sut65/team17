package entity

import (
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMeterValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	fixtures := []int{
		 0,
		-5,
		-4,
		-2,
	}

	for _, fixture := range fixtures {

			meter := Meter{
				Before: 	fixture,     
				After: 		100,          
				Total: 		200,           
				Unit:   	7,    
				Electric:	1400,         
				Water:		100,	           
				Metertime: 	time.Now(), 
		}
		ok, err := govalidator.ValidateStruct(meter)

		// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		g.Expect(ok).ToNot(BeTrue())

		// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		g.Expect(err).ToNot(BeNil())

		if err.Error() == "Before cannot be zero" {
			g.Expect(err.Error()).To(Equal("Before cannot be zero"))
		} else if err.Error() == "Before cannot be negative" {
			g.Expect(err.Error()).To(Equal("Before cannot be negative"))
		}
	}

}