package entity

import (
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMeterValidate(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run("Before cannot be zero", func(t *testing.T) {
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
				   Unit:   	      7,    
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
	})


	t.Run("After cannot be zero", func(t *testing.T) {
		fixtures := []int{
			0,
		   -5,
		   -4,
		   -2,
	   }
   
	   for _, fixture := range fixtures {
   
			   meter := Meter{
				   Before: 		100,     
				   After: 		fixture,          
				   Total: 		200,           
				   Unit:   		7,    
				   Electric:	1400,         
				   Water:		100,	           
				   Metertime: 	time.Now(), 
		   }
		   ok, err := govalidator.ValidateStruct(meter)
   
		   // ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		   g.Expect(ok).ToNot(BeTrue())
   
		   // err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		   g.Expect(err).ToNot(BeNil())
   
		   if err.Error() == "After cannot be zero" {
			   g.Expect(err.Error()).To(Equal("After cannot be zero"))
		   } else if err.Error() == "After cannot be negative" {
			   g.Expect(err.Error()).To(Equal("After cannot be negative"))
		   }
	   }
	})

	t.Run("Total cannot be zero", func(t *testing.T) {
		fixtures := []int{
			0,
		   -5,
		   -4,
		   -2,
	   }
   
	   for _, fixture := range fixtures {
   
			   meter := Meter{
				   Before: 		100,     
				   After: 		200,          
				   Total: 		fixture,           
				   Unit:   		7,    
				   Electric:	1400,         
				   Water:		100,	           
				   Metertime: 	time.Now(), 
		   }
		   ok, err := govalidator.ValidateStruct(meter)
   
		   // ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		   g.Expect(ok).ToNot(BeTrue())
   
		   // err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		   g.Expect(err).ToNot(BeNil())
   
		   if err.Error() == "Total cannot be zero" {
			   g.Expect(err.Error()).To(Equal("Total cannot be zero"))
		   } else if err.Error() == "Total cannot be negative" {
			   g.Expect(err.Error()).To(Equal("Total cannot be negative"))
		   }
	   }
	})


	t.Run("Unit cannot be zero", func(t *testing.T) {
		fixtures := []int{
			0,
		   -5,
		   -4,
		   -2,
	   }
   
	   for _, fixture := range fixtures {
   
			   meter := Meter{
				   Before: 		100,     
				   After: 		200,          
				   Total: 		100,           
				   Unit:   		fixture,    
				   Electric:	1400,         
				   Water:		100,	           
				   Metertime: 	time.Now(), 
		   }
		   ok, err := govalidator.ValidateStruct(meter)
   
		   // ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		   g.Expect(ok).ToNot(BeTrue())
   
		   // err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		   g.Expect(err).ToNot(BeNil())
   
		   if err.Error() == "Unit cannot be zero" {
			   g.Expect(err.Error()).To(Equal("Unit cannot be zero"))
		   } else if err.Error() == "Unit cannot be negative" {
			   g.Expect(err.Error()).To(Equal("Unit cannot be negative"))
		   }
	   }
	})


	t.Run("Electric cannot be zero", func(t *testing.T) {
		fixtures := []int{
			0,
		   -5,
		   -4,
		   -2,
	   }
   
	   for _, fixture := range fixtures {
   
			   meter := Meter{
				   Before: 		100,     
				   After: 		200,          
				   Total: 		100,           
				   Unit:   		7,    
				   Electric:	fixture,         
				   Water:		100,	           
				   Metertime: 	time.Now(), 
		   }
		   ok, err := govalidator.ValidateStruct(meter)
   
		   // ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
		   g.Expect(ok).ToNot(BeTrue())
   
		   // err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
		   g.Expect(err).ToNot(BeNil())
   
		   if err.Error() == "Electric cannot be zero" {
			   g.Expect(err.Error()).To(Equal("Electric cannot be zero"))
		   } else if err.Error() == "Electric cannot be negative" {
			   g.Expect(err.Error()).To(Equal("Electric cannot be negative"))
		   }
	   }
	})

}