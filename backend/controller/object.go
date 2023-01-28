package controller

import (
	"net/http"

	
	"github.com/gin-gonic/gin"
	"github.com/kingjokerbys/sa-65-exampled/entity"
	
)

// POST /users
func CreateObject(c *gin.Context) { 

	var object entity.Object
	if err := c.ShouldBindJSON(&object); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	
	if err := entity.DB().Create(&object).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}
	c.JSON(http.StatusOK, gin.H{"data": object})
}

// GET /user/:id
// เพื่อดึงข้อมูล user ออกมาตาม primary key ที่กำหนด ผ่าน func DB.Raw(...)
func GetObject(c *gin.Context) {

	var object entity.Object
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM objects WHERE id = ?", id).Scan(&object).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": object})

}

// GET /users
// เป็นการ list รายการของ users ออกมา
func ListObjects(c *gin.Context) {

	var objects []entity.Object

	if err := entity.DB().Raw("SELECT * FROM objects").Scan(&objects).Error; err != nil {

		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": objects})

}

// DELETE /users/:id
// เป็น function สำหรับลบ user ด้วย ID
func DeleteObject(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM objects WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "object not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateObject(c *gin.Context) {

	var object entity.Object
	if err := c.ShouldBindJSON(&object); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", object.ID).First(&object); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "object not found"})
		return
	}
	if err := entity.DB().Save(&object).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": object})
}
