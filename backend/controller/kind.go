package controller

import (
	"net/http"

	"github.com/sut65/team17/entity"
	"github.com/gin-gonic/gin"
)

// POST /kind
// function Createkind เป็นการทำงานแทนคำสั่ง insert ของ SQL
func CreateKind(c *gin.Context) {

	var kind entity.Kind
	if err := c.ShouldBindJSON(&kind); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&kind).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": kind})
}

// GET /kind/:id
// เพื่อดึงข้อมูล kind ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetKind(c *gin.Context) {

	var kind entity.Kind
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM kinds WHERE id = ?", id).Scan(&kind).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": kind})

}

// GET /kinds
// เป็นการ list รายการของ kind ออกมา
func ListKinds(c *gin.Context) {

	var kinds []entity.Kind

	if err := entity.DB().Raw("SELECT * FROM kinds").Scan(&kinds).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}
	c.JSON(http.StatusOK, gin.H{"data": kinds})

}

// DELETE /kinds/:id
// เป็น function สำหรับลบ kind ด้วย ID
func DeleteKind(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM kinds WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "kind not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /kinds

func UpdateKind(c *gin.Context) {

	var kind entity.Kind
	if err := c.ShouldBindJSON(&kind); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", kind.ID).First(&kind); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "kind not found"})
		return
	}
	if err := entity.DB().Save(&kind).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": kind})
}
