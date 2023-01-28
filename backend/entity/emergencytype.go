package controller

import (
	"net/http"

	
	"github.com/gin-gonic/gin"
	"github.com/kingjokerbys/sa-65-exampled/entity"
	
)

// POST /users
func CreateEmergencytype(c *gin.Context) { 

	var emergencytype entity.Emergencytype
	if err := c.ShouldBindJSON(&emergencytype); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	if err := entity.DB().Create(&emergencytype).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emergencytype})
}

// GET /user/:id
// เพื่อดึงข้อมูล user ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetEmergencytype(c *gin.Context) {

	var emergencytype entity.Emergencytype
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM emergencytypes WHERE id = ?", id).Scan(&emergencytype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emergencytype})

}

// GET /users
// เป็นการ list รายการของ users ออกมา
func ListEmergencytypes(c *gin.Context) {

	var emergencytypes []entity.Emergencytype

	if err := entity.DB().Raw("SELECT * FROM emergencytypes").Scan(&emergencytypes).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": emergencytypes})

}

// DELETE /users/:id
// เป็น function สำหรับลบ user ด้วย ID
func DeleteEmergencytype(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM emergencytypes WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "emergencytype not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateEmergencytype(c *gin.Context) {

	var emergencytype entity.Emergencytype
	if err := c.ShouldBindJSON(&emergencytype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", emergencytype.ID).First(&emergencytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "emergencytype not found"})
		return
	}
	if err := entity.DB().Save(&emergencytype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emergencytype})
}