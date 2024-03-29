package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /payment
func CreatePayment(c *gin.Context) {

	var payment entity.Payment
	var user entity.User
	var banking entity.Banking
	var method entity.Method
	var bill entity.Bill

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", payment.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 9: ค้นหา banking ด้วย id
	if tx := entity.DB().Where("id = ?", payment.BankingID).First(&banking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "banking not found"})
		return
	}

	// 10: ค้นหา method ด้วย id
	if tx := entity.DB().Where("id = ?", payment.MethodID).First(&method); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})
		return
	}

	// 11: ค้นหา bill ด้วย id
	if tx := entity.DB().Where("id = ?", payment.BillID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	// 12: สร้าง Payment
	pm := entity.Payment{
		User:        user,    // โยงความสัมพันธ์กับ Entity user
		Banking:     banking, // โยงความสัมพันธ์กับ Entity banking
		Method:      method,  // โยงความสัมพันธ์กับ Entity method
		Bill:        bill,    // โยงความสัมพันธ์กับ Entity bill
		Evidence:    payment.Evidence,
		PaymentTime: payment.PaymentTime,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(pm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})
}

// GET /Payment/:id
func GetPayment(c *gin.Context) {
	var payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Banking").Preload("Method").Preload("Bill").Raw("SELECT * FROM paymentes WHERE id = ?", id).Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// GET /payment
func ListPayments(c *gin.Context) {
	var payment []entity.Payment
	if err := entity.DB().Preload("User").Preload("Banking").Preload("Method").Preload("Bill.Meter.Manage.Room").Preload("Bill.Furniture.Equipment").Raw("SELECT * FROM payments").Find(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": payment})
}

// DELETE /payment/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

func UpdatePayment(c *gin.Context) {

	var payment entity.Payment
	var user entity.User
	var banking entity.Banking
	var method entity.Method
	var bill entity.Bill

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร payment
	if err := c.ShouldBindJSON(&payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 8: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", payment.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 9: ค้นหา banking ด้วย id
	if tx := entity.DB().Where("id = ?", payment.BankingID).First(&banking); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "banking not found"})
		return
	}

	// 10: ค้นหา method ด้วย id
	if tx := entity.DB().Where("id = ?", payment.MethodID).First(&method); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})
		return
	}

	// 11: ค้นหา bill ด้วย id
	if tx := entity.DB().Where("id = ?", payment.BillID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	// 12: สร้าง Payment
	update := entity.Payment{
		User:        user,    // โยงความสัมพันธ์กับ Entity user
		Banking:     banking, // โยงความสัมพันธ์กับ Entity banking
		Method:      method,  // โยงความสัมพันธ์กับ Entity method
		Bill:        bill,    // โยงความสัมพันธ์กับ Entity bill
		Evidence:    payment.Evidence,
		PaymentTime: payment.PaymentTime,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(update); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// update
	if err := entity.DB().Where("id = ?", payment.ID).Updates(&payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update})
}
