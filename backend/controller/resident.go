package controller

import (
	"net/http"

	
	"github.com/gin-gonic/gin"
	"github.com/kingjokerbys/sa-65-exampled/entity"
	
)

// POST /users
func CreateResident(c *gin.Context) { 

	var resident entity.Resident
	if err := c.ShouldBindJSON(&resident); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	
	if err := entity.DB().Create(&resident).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resident})
}

// GET /user/:id
// เพื่อดึงข้อมูล user ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetResident(c *gin.Context) {

	var resident entity.Resident
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM residents WHERE id = ?", id).Scan(&resident).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resident})

}

// GET /users
// เป็นการ list รายการของ users ออกมา
func ListResidents(c *gin.Context) {

	var residents []entity.Resident

	if err := entity.DB().Raw("SELECT * FROM residents").Scan(&residents).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": residents})

}

// DELETE /users/:id
// เป็น function สำหรับลบ user ด้วย ID
func DeleteResident(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM residents WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "resident not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateResident(c *gin.Context) {

	var resident entity.Resident
	if err := c.ShouldBindJSON(&resident); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", resident.ID).First(&resident); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resident not found"})
		return
	}
	if err := entity.DB().Save(&resident).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resident})
}