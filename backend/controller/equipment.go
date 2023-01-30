package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /equipment
// function Createequipment เป็นการทำงานแทนคำสั่ง insert ของ SQL
func CreateEquipment(c *gin.Context) {

	var equipment entity.Equipment
	if err := c.ShouldBindJSON(&equipment); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&equipment).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipment})
}

// GET /equipment/:id
// เพื่อดึงข้อมูล equipment ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetEquipment(c *gin.Context) {

	var equipment entity.Equipment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM equipment WHERE id = ?", id).Scan(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipment})

}

// GET /equipments
// เป็นการ list รายการของ equipment ออกมา
func ListEquipments(c *gin.Context) {

	var equipments []entity.Equipment

	if err := entity.DB().Raw("SELECT * FROM equipment").Scan(&equipments).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": equipments})

}

// DELETE /equipments/:id
// เป็น function สำหรับลบ equipment ด้วย ID
func DeleteEquipment(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM equipment WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /equipments

func UpdateEquipment(c *gin.Context) {

	var equipment entity.Equipment
	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", equipment.ID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "equipment not found"})
		return
	}
	if err := entity.DB().Save(&equipment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": equipment})
}
