package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
	
)

// POST /bill
func CreateBill(c *gin.Context) {

	var bill entity.Bill
	var meter entity.Meter
	var furniture entity.Furniture


	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา meter ด้วย id
	if tx := entity.DB().Where("id = ?", bill.MeterID).First(&meter); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meter not found"})
		return
	}

	// 11: ค้นหา furniture ด้วย id
	if tx := entity.DB().Where("id = ?", bill.FurnitureID).First(&furniture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture not found"})
		return
	}

	// 12: สร้าง Meter
	bl := entity.Bill{
		Meter:     meter,     // โยงความสัมพันธ์กับ Entity User
		Furniture: furniture, // โยงความสัมพันธ์กับ Entity Furniture
		Cost:      bill.Cost,
		BillTime: bill.BillTime,
		

	}
	// // ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(bl); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bl).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bl})
}

// GET /bill/:id
func GetBill(c *gin.Context) {
	var bill entity.Bill
	id := c.Param("id")
	if err := entity.DB().Preload("Meter").Preload("Furniture").Raw("SELECT * FROM bills WHERE id = ?", id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// GET /bill
func ListBills(c *gin.Context) {
	var bills []entity.Bill
	if err := entity.DB().Preload("Meter.Manage.Room").Preload("Meter.User").Preload("Furniture").Raw("SELECT * FROM bills").Find(&bills).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// if err := entity.DB().Raw("SELECT * FROM bills b JOIN meters m ON b.meter_id = m.id JOIN manages ma ON m.manage_id = ma.id JOIN rooms r ON ma.room_id = r.id JOIN furnitures f ON b.furniture_id = f.id").Find(&bills).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }
	c.JSON(http.StatusOK, gin.H{"data": bills})
}


// GET /billByUser/:id
func GetBillByUser(c *gin.Context) {
	var bill []entity.Bill
	id := c.Param("id")
	if err := entity.DB().Preload("Meter.Manage.Room").Preload("Meter.User").Preload("Furniture").Raw("SELECT * FROM bills a JOIN meters b on a.meter_id = b.id JOIN manages c on b.manage_id = c.id  JOIN rooms d on c.room_id =  d.id WHERE b.user_id = ?", id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// DELETE /bills/:id
func DeleteBill(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bills WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bill
func UpdateBill(c *gin.Context) {

	var bill entity.Bill
	var meter entity.Meter
	var furniture entity.Furniture

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา meter ด้วย id
	if tx := entity.DB().Where("id = ?", bill.MeterID).First(&meter); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meter not found"})
		return
	}

	// 11: ค้นหา furniture ด้วย id
	if tx := entity.DB().Where("id = ?", bill.FurnitureID).First(&furniture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture not found"})
		return
	}

	// 12: สร้าง Meter
	update := entity.Bill{
		Meter:     meter,     // โยงความสัมพันธ์กับ Entity User
		Furniture: furniture, // โยงความสัมพันธ์กับ Entity Furniture
		Cost:      bill.Cost,
		BillTime: bill.BillTime,
	}


	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(update); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 13: update
if err := entity.DB().Where("id = ?", meter.ID).Updates(&update).Error; err != nil {
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	return
}
c.JSON(http.StatusOK, gin.H{"data": update})
}

