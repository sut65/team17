package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/kingjokerbys/sa-65-exampled/entity"
)

// POST /appointment
func CreateEmergency(c *gin.Context) {
	var user entity.User
	var resident entity.Resident
	var emergencytype entity.Emergencytype
	var emergency   entity.Emergency

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร appointment
	if err := c.ShouldBindJSON(&emergency); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", emergency.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 9: ค้นหา patient ด้วย id
	if tx := entity.DB().Where("id = ?", emergency.ResidentID).First(&resident); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resident not found"})
		return
	}

	// 10: ค้นหา department ด้วย id
	if tx := entity.DB().Where("id = ?", emergency.EmergencytypeID).First(&emergencytype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "emergencytype not found"})
		return
	}

	
	// 12: สร้าง Emergency
	ap := entity.Emergency{
		User:            user,
		Emergencytype:   emergencytype,   // โยงความสัมพันธ์กับ Entity Patient
		Resident:        resident,     // โยงความสัมพันธ์กับ Entity Department
		Emergencytime:      emergency.Emergencytime,
		Detail:          emergency.Detail,
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
func GetEmergency(c *gin.Context) {
	var emergency entity.Emergency
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Emergencytype").Preload("Resident").Raw("SELECT * FROM emergencies WHERE id = ?", id).Find(&emergency).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emergency})
}

// GET /appointments
func ListEmergencys(c *gin.Context) {
	var emergencys []entity.Emergency
	if err := entity.DB().Preload("User").Preload("Emergencytype").Preload("Resident").Raw("SELECT * FROM emergencies").Find(&emergencys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": emergencys})
}

func DeleteEmergency(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM emergencies WHERE id = ?", id); tx.RowsAffected == 0 {

		c.JSON(http.StatusBadRequest, gin.H{"error": "emergency not found"})

		return

	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}

// PATCH /users

func UpdateEmergency(c *gin.Context) {

	var emergency entity.Emergency
	if err := c.ShouldBindJSON(&emergency); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", emergency.ID).First(&emergency); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "emergency not found"})
		return
	}
	if err := entity.DB().Save(&emergency).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": emergency})
}