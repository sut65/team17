package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /meter
func CreateMeter(c *gin.Context) {

	var meter entity.Meter
	var user entity.User
	var manage entity.Manage

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร meter
	if err := c.ShouldBindJSON(&meter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", meter.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 11: ค้นหา manage ด้วย id
	if tx := entity.DB().Where("id = ?", meter.ManageID).First(&manage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}


	// 12: สร้าง Meter
	bk := entity.Meter{
		User:			user,             		// โยงความสัมพันธ์กับ Entity User
		Manage:			manage,					// โยงความสัมพันธ์กับ Entity Manage
		MeterTime:	meter.MeterTime,	// ตั้งค่าฟิลด์ MeterTime
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(bk); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bk})
}

// GET /Meter/:id
func GetMeter(c *gin.Context) {
	var meter entity.Meter
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Admin").Preload("Manage").Raw("SELECT * FROM meters WHERE id = ?", id).Find(&meter).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": meter})
}

// GET /Meters
func ListMeters(c *gin.Context) {
	var meters []entity.Meter
	if err := entity.DB().Preload("User").Preload("Admin").Preload("Manage").Raw("SELECT * FROM meters").Find(&meters).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": meters})
}

// DELETE /Meters/:id
func DeleteMeter(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM meters WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meter not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /Meters
func UpdateMeter(c *gin.Context) {
	var meter entity.Meter
	if err := c.ShouldBindJSON(&meter); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", meter.ID).First(&meter); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meter not found"})
		return
	}

	if err := entity.DB().Save(&meter).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": meter})
}