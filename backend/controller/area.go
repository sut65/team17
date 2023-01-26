package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /area
// function CreateArea เป็นการทำงานแทนคำสั่ง insert ของ SQL
func CreateArea(c *gin.Context) {

	var area entity.Area
	if err := c.ShouldBindJSON(&area); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&area).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": area})
}

// GET /area/:id
// เพื่อดึงข้อมูล area ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetArea(c *gin.Context) {

	var area entity.Area
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM areas WHERE id = ?", id).Scan(&area).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": area})

}

// GET /areas
// เป็นการ list รายการของ Area ออกมา
func ListAreas(c *gin.Context) {

	var areas []entity.Area

	if err := entity.DB().Raw("SELECT * FROM areas").Scan(&areas).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": areas})

}

// DELETE /areas/:id
// เป็น function สำหรับลบ Area ด้วย ID
func DeleteArea(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM areas WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "area not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /areas

func UpdateArea(c *gin.Context) {

	var area entity.Area
	if err := c.ShouldBindJSON(&area); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", area.ID).First(&area); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "area not found"})
		return
	}
	if err := entity.DB().Save(&area).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": area})
}
