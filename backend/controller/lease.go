package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /leases
// function CreateLease เป็นการทำงานแทนคำสั่ง insert ของ SQL
func CreateLease(c *gin.Context) {

	var lease entity.Lease
	if err := c.ShouldBindJSON(&lease); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&lease).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": lease})
}

// GET /lease/:id
// เพื่อดึงข้อมูล Lease ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetLease(c *gin.Context) {

	var lease entity.Lease
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM leases WHERE id = ?", id).Scan(&lease).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": lease})

}

// GET /leases
// เป็นการ list รายการของ Lease ออกมา
func ListLeases(c *gin.Context) {

	var leases []entity.Lease

	if err := entity.DB().Raw("SELECT * FROM leases").Scan(&leases).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": leases})

}

// DELETE /leases/:id
// เป็น function สำหรับลบ lease ด้วย ID
func DeleteLease(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM leases WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "lease not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /leases

func UpdateLease(c *gin.Context) {

	var lease entity.Lease
	if err := c.ShouldBindJSON(&lease); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", lease.ID).First(&lease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "lease not found"})
		return
	}
	if err := entity.DB().Save(&lease).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": lease})
}
