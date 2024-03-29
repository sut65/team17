package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestCleaningBeBlank(t *testing.T) {

	g := NewGomegaWithT(t)
	
	t.Run("Check Detail cannot be blank ", func(t *testing.T) {
		cleaning := Cleaning{

			CleaningTime: time.Now(),
			Detail:	"",
		}
		
		ok, err := govalidator.ValidateStruct(cleaning)
	
		g.Expect(ok).ToNot(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
		g.Expect(err).ToNot(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
		g.Expect(err.Error()).To(Equal("Detail cannot be blank"))	//message err.Error ออกมา
	})

	t.Run("Check Time cannot past ", func(t *testing.T) {
		cleaning := Cleaning{

			CleaningTime: time.Now().AddDate(0, 0, -1),
			Detail:	"OK",
		}
		
		ok, err := govalidator.ValidateStruct(cleaning)
	
		g.Expect(ok).ToNot(BeTrue())									//ok ห้ามเป็น True คือไม่มี err
		g.Expect(err).ToNot(BeNil())									//err ต้องไม่เป็น null คือ ไม่มี err
		g.Expect(err.Error()).To(Equal("DateTime cannot be past"))		//message err.Error ออกมา
	})

	t.Run("Check Time cannot over seven day ", func(t *testing.T) {
		cleaning := Cleaning{

			CleaningTime: time.Now().AddDate(0, 0, +8),
			Detail:	"OK",
		}
		
		ok, err := govalidator.ValidateStruct(cleaning)
	
		g.Expect(ok).ToNot(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
		g.Expect(err).ToNot(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
		g.Expect(err.Error()).To(Equal("DateTime is valid"))		//message err.Error ออกมา
	})

	t.Run("Check pass all ", func(t *testing.T) {
		cleaning := Cleaning{

			CleaningTime: time.Now(),
			Detail:	"OK",
		}
		
		ok, err := govalidator.ValidateStruct(cleaning)
	
		g.Expect(ok).To(BeTrue())								//ok ห้ามเป็น True คือไม่มี err
		g.Expect(err).To(BeNil())								//err ต้องไม่เป็น null คือ ไม่มี err
	})
}