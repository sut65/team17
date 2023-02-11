package controller

import (
	
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"

	"net/http"
)

// POST /requestout
func CreateRequestout(c *gin.Context) {

	var requestout	entity.Requestout
	var room entity.Room
	var reason entity.Reason
	var user	entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร requestout
	if err := c.ShouldBindJSON(&requestout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", requestout.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}
	

	// 10: ค้นหา reason ด้วย id
	if tx := entity.DB().Where("id = ?", requestout.ReasonID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reason not found"})
		return
	}

	// 11: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", requestout.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}


	// 12: สร้าง Requestout
	req := entity.Requestout{
		Room:		room,					// โยงความสัมพันธ์กับ Entity Room
		Reason:		reason,					// โยงความสัมพันธ์กับ Entity Reason
		User:		user,               // โยงความสัมพันธ์กับ Entity User
		Outtime:	requestout.Outtime,
		Detail:     requestout.Detail,	
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&req).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": req})
}

// GET /requestout/:id
func GetRequestout(c *gin.Context) {
	var requestout entity.Requestout
	id := c.Param("id")
	if err := entity.DB().Preload("Room").Preload("Reason").Preload("User").Raw("SELECT * FROM requestouts WHERE id = ?", id).Find(&requestout).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requestout})
}

// GET /requestouts
func ListRequestouts(c *gin.Context) {
	var requestouts []entity.Requestout
	if err := entity.DB().Preload("Room").Preload("Reason").Preload("User").Raw("SELECT * FROM requestouts").Find(&requestouts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requestouts})
}

// DELETE /requestouts/:id
func DeleteRequestout(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM requestouts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestout not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}




// PATCH /requestouts
func UpdateRequestout(c *gin.Context) {
	var requestout	entity.Requestout
	var room 		entity.Room
	var reason 		entity.Reason
	var user		entity.User

	

	if err := c.ShouldBindJSON(&requestout); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", requestout.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// 11: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", requestout.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	//ค้นหา reason ด้วย id
	if tx := entity.DB().Where("id = ?", requestout.ReasonID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reason not found"})
		return
	}

	// 12: สร้าง Requestout
	update := entity.Requestout{
		Room:		room,					// โยงความสัมพันธ์กับ Entity Room
		Reason:		reason,					// โยงความสัมพันธ์กับ Entity Reason
		User:		user,               // โยงความสัมพันธ์กับ Entity User
		Outtime:	requestout.Outtime,
		Detail:     requestout.Detail,	
	}


	// // ขั้นตอนการ validate ที่นำมาจาก unit test
	// if _, err := govalidator.ValidateStruct(update); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }


	// update
	if err := entity.DB().Where("id = ?", requestout.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update})

	
}

// // PATCH /requestouts
// func UpdateRequestout(c *gin.Context) {
// 	var requestout entity.Requestout
// 	if err := c.ShouldBindJSON(&requestout); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", requestout.ID).First(&requestout); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "requestout not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&requestout).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": requestout})
// }