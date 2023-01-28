package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/kingjokerbys/sa-65-exampled/entity"
)

// POST /appointment
func CreateRepair(c *gin.Context) {
	var user entity.User
	var resident entity.Resident
	var object entity.Object
	var repair   entity.Repair

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร appointment
	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", repair.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 9: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", repair.ResidentID).First(&resident); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resident not found"})
		return
	}

	// 10: ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", repair.ObjectID).First(&object); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "object not found"})
		return
	}

	
	// 12: สร้าง Appointment
	ap := entity.Repair{
		User:         user,
		Object:       object,    // โยงความสัมพันธ์กับ Entity Patient
		Resident:     resident,     // โยงความสัมพันธ์กับ Entity Department
		Repairtime:   repair.Repairtime,
		Detail:       repair.Detail,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(ap); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ap).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ap})
}

// GET /Appointment/:id
func GetRepair(c *gin.Context) {
	var repair entity.Repair
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Object").Preload("Resident").Raw("SELECT * FROM repairs WHERE id = ?", id).Find(&repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repair})
}

// GET /appointments
func ListRepairs(c *gin.Context) {
	var repairs []entity.Repair
	if err := entity.DB().Preload("User").Preload("Object").Preload("Resident").Raw("SELECT * FROM repairs").Find(&repairs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": repairs})
}

func DeleteRepair(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM repairs WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "repair not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateRepair(c *gin.Context) {

	var repair entity.Repair
	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", repair.ID).First(&repair); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "repair not found"})
		return
	}
	if err := entity.DB().Save(&repair).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": repair})
}
