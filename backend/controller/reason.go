package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/sut65/team17/entity"
)

// POST /reason
// function CreateReason เป็นการทำงานแทนคำสั่ง insert ของ SQL
func CreateReason(c *gin.Context) {

	var reason entity.Reason
	if err := c.ShouldBindJSON(&reason); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&reason).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reason})
}

// GET /reason/:id
// เพื่อดึงข้อมูล reason ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetReason(c *gin.Context) {

	var reason entity.Reason
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM reasons WHERE id = ?", id).Scan(&reason).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reason})

}

// GET /categories
// เป็นการ list รายการของ Category ออกมา
func ListCategories(c *gin.Context) {

	var categories []entity.Category

	if err := entity.DB().Raw("SELECT * FROM categories").Scan(&categories).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": categories})

}

// DELETE /categories/:id
// เป็น function สำหรับลบ category ด้วย ID
func DeleteCategory(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM categories WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /categories

func UpdateCategory(c *gin.Context) {

	var category entity.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", category.ID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}
	if err := entity.DB().Save(&category).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": category})
}
