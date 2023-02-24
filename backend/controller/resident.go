package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)


// POST /resident
func CreateResident(c *gin.Context) {

	var resident entity.Resident
	var manage entity.Manage
	var user entity.User
	var lease entity.Lease

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร resident
	if err := c.ShouldBindJSON(&resident); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", resident.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	

	// 10: ค้นหา manage ด้วย id
	if tx := entity.DB().Where("id = ?", resident.ManageID).First(&manage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "manage not found"})
		return
	}

	// 11: ค้นหา lease ด้วย id
	if tx := entity.DB().Where("id = ?", resident.LeaseID).First(&lease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "lease not found"})
		return
	}


	// 12: สร้าง Resident
	rm := entity.Resident{
		User:			user,					// โยงความสัมพันธ์กับ Entity User
		Manage:			manage,					// โยงความสัมพันธ์กับ Entity Manage
		Lease:			lease,					// โยงความสัมพันธ์กับ Entity Lease
		Bail: 			resident.Bail,
		LeaseTime:		resident.LeaseTime,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(rm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&rm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rm, "user_id": user.ID})
}

// GET /resident/:id
func GetResident(c *gin.Context) {
	var resident entity.Resident
	id := c.Param("id")
	if err := entity.DB().Preload("Manage.Room").Preload("Lease").Preload("User").Raw("SELECT * FROM residents WHERE id = ?", id).Find(&resident).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": resident})
}

// GET /residents
func ListResidents(c *gin.Context) {
	var residents []entity.Resident
	if err := entity.DB().Preload("Manage.Room").Preload("Lease").Preload("User").Raw("SELECT * FROM residents").Find(&residents).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": residents})
}

// DELETE /residents/:id
func DeleteResident(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM residents WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "resident not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /residents
func UpdateResident(c *gin.Context) {
	var resident entity.Resident
	var manage entity.Manage
	var user entity.User
	var lease entity.Lease

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร resident
	if err := c.ShouldBindJSON(&resident); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", resident.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	

	// 10: ค้นหา manage ด้วย id
	if tx := entity.DB().Where("id = ?", resident.ManageID).First(&manage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "manage not found"})
		return
	}

	// 11: ค้นหา lease ด้วย id
	if tx := entity.DB().Where("id = ?", resident.LeaseID).First(&lease); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "lease not found"})
		return
	}


	// 12: สร้าง Resident
	update := entity.Resident{
		User:			user,					// โยงความสัมพันธ์กับ Entity User
		Manage:			manage,					// โยงความสัมพันธ์กับ Entity Manage
		Lease:			lease,					// โยงความสัมพันธ์กับ Entity Lease
		Bail: 			resident.Bail,
		LeaseTime:		resident.LeaseTime,
	}



	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(update); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	

	// 13: บันทึก
	if err := entity.DB().Where("id = ?", resident.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update})
}
