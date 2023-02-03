package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /manage
func CreateManage(c *gin.Context) {

	var manage entity.Manage
	var size entity.Size
	var category entity.Category
	var room entity.Room

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร manage
	if err := c.ShouldBindJSON(&manage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", manage.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}
	

	// 10: ค้นหา size ด้วย id
	if tx := entity.DB().Where("id = ?", manage.SizeID).First(&size); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "size not found"})
		return
	}

	// 11: ค้นหา category ด้วย id
	if tx := entity.DB().Where("id = ?", manage.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}


	// 12: สร้าง Manage
	mn := entity.Manage{
		Room:		room,			// โยงความสัมพันธ์กับ Entity Room
		Size:		size,			// โยงความสัมพันธ์กับ Entity Size
		Category:		category,			// โยงความสัมพันธ์กับ Entity Category
		Detail: 		manage.Detail,
		Status: 		manage.Status,
		Price: 		manage.Price,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(mn); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&mn).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": mn})
}

// GET /manage/:id
func GetManage(c *gin.Context) {
	var manage entity.Manage
	id := c.Param("id")
	if err := entity.DB().Preload("Room").Preload("Size").Preload("Category").Raw("SELECT * FROM manages WHERE id = ?", id).Find(&manage).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": manage})
}

// GET /manages
func ListManages(c *gin.Context) {
	var manages []entity.Manage
	if err := entity.DB().Preload("Room").Preload("Size").Preload("Category").Raw("SELECT * FROM manages").Find(&manages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": manages})
}

// DELETE /manages/:id
func DeleteManage(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM manages WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "manage not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /manages
func UpdateManage(c *gin.Context) {
	var manage entity.Manage
	var size entity.Size
	var category entity.Category
	var room entity.Room

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร manage
	if err := c.ShouldBindJSON(&manage); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", manage.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}
	

	// 10: ค้นหา size ด้วย id
	if tx := entity.DB().Where("id = ?", manage.SizeID).First(&size); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "size not found"})
		return
	}

	// 11: ค้นหา category ด้วย id
	if tx := entity.DB().Where("id = ?", manage.CategoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}


	// 12: สร้าง Manage
	update := entity.Manage{
		Room:		room,			// โยงความสัมพันธ์กับ Entity Room
		Size:		size,			// โยงความสัมพันธ์กับ Entity Size
		Category:		category,			// โยงความสัมพันธ์กับ Entity Category
		Detail: 		manage.Detail,
		Status: 		manage.Status,
		Price: 		manage.Price,
	}



	// 13: update
	if err := entity.DB().Where("id = ?", manage.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update})
}
