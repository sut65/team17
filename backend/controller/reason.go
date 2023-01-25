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

// GET /reasons
// เป็นการ list รายการของ Reason ออกมา
func ListReasons(c *gin.Context) {

	var reasons []entity.Reason

	if err := entity.DB().Raw("SELECT * FROM categories").Scan(&reasons).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": reasons})

}

// DELETE /reasons/:id
// เป็น function สำหรับลบ reason ด้วย ID
func DeleteReason(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM reasons WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "reson not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /reasons

func UpdateReason(c *gin.Context) {

	var reason entity.Reason
	if err := c.ShouldBindJSON(&reason); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", reason.ID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "category not found"})
		return
	}
	if err := entity.DB().Save(&reason).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reason})
}