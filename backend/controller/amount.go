package controller

import (
	"net/http"

	"github.com/sut65/team17/entity"
	"github.com/gin-gonic/gin"
)

// POST /amount
// function Createamount เป็นการทำงานแทนคำสั่ง insert ของ SQL
func CreateAmount(c *gin.Context) {

	var amount entity.Amount
	if err := c.ShouldBindJSON(&amount); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&amount).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": amount})
}

// GET /amount/:id
// เพื่อดึงข้อมูล amount ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetAmount(c *gin.Context) {

	var amount entity.Amount
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM categories WHERE id = ?", id).Scan(&amount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": amount})

}

// GET /categories
// เป็นการ list รายการของ amount ออกมา
func ListAmounts(c *gin.Context) {

	var categories []entity.Amount

	if err := entity.DB().Raw("SELECT * FROM categories").Scan(&categories).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": categories})

}

// DELETE /categories/:id
// เป็น function สำหรับลบ amount ด้วย ID
func DeleteAmount(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM categories WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "amount not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /categories

func UpdateAmount(c *gin.Context) {

	var amount entity.Amount
	if err := c.ShouldBindJSON(&amount); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", amount.ID).First(&amount); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "amount not found"})
		return
	}
	if err := entity.DB().Save(&amount).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": amount})
}
