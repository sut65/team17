// package entity

// import (
// 	"testing"
// 	"time"

// 	"github.com/asaskevich/govalidator"
// 	. "github.com/onsi/gomega"
// )

// func FurnitureBeBlank (t *testing.T){

// 	g := NewGomegaWithT(t)

// 	t.Run("Check Time cannot past ", func(t *testing.T) {
// 		furniture := Furniture{

// 			FurnitureTime: time.Now().AddDate(0, 0, +8),

// 		}

// 		ok, err := govalidator.ValidateStruct(furniture)

// 		g.Expect(ok).ToNot(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
// 		g.Expect(err).ToNot(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
// 		g.Expect(err.Error()).To(Equal("DateTime is valid"))		//message err.Error ออกมา
// 	})
// }

package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestFurnitureBeBlank(t *testing.T) {

	g := NewGomegaWithT(t)

	t.Run("Check Time cannot over seven day ", func(t *testing.T) {
		furniture := Furniture{

			FurnitureTime: time.Now().AddDate(0, 0, +8),
		}

		ok, err := govalidator.ValidateStruct(furniture)

		g.Expect(ok).ToNot(BeTrue())                         //ok ห้ามเป็น True คือไม่มี err
		g.Expect(err).ToNot(BeNil())                         //err ต้องไม่เป็น null คือ ไม่มี err
		g.Expect(err.Error()).To(Equal("DateTime is valid")) //message err.Error ออกมา
	})

	t.Run("Check Time cannot past  ", func(t *testing.T) {
		furniture := Furniture{

			FurnitureTime: time.Now().AddDate(0, 0, -1),
		}

		ok, err := govalidator.ValidateStruct(furniture)

		g.Expect(ok).ToNot(BeTrue())                               //ok ห้ามเป็น True คือไม่มี err
		g.Expect(err).ToNot(BeNil())                               //err ต้องไม่เป็น null คือ ไม่มี err
		g.Expect(err.Error()).To(Equal("DateTime cannot be past")) //message err.Error ออกมา
	})

	t.Run("Check pass all ", func(t *testing.T) {
		furniture := Furniture{

			FurnitureTime: time.Now(),
		}

		ok, err := govalidator.ValidateStruct(furniture)

		g.Expect(ok).To(BeTrue()) //ok ห้ามเป็น True คือไม่มี err
		g.Expect(err).To(BeNil()) //err ต้องไม่เป็น null คือ ไม่มี err
	})
}
