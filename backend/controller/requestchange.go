package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"

	"github.com/sut65/team17/entity"
	
)


func CreateRequestchange(c *gin.Context) {

	var requestchange	entity.Requestchange
	var room entity.Room
	var reason entity.Reason
	var user	entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร requestchange
	if err := c.ShouldBindJSON(&requestchange); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", requestchange.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}
	

	// 10: ค้นหา reason ด้วย id
	if tx := entity.DB().Where("id = ?", requestchange.ReasonID).First(&reason); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reason not found"})
		return
	}

	// 11: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", requestchange.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}


	// 12: สร้าง Requestchange
	reqc := entity.Requestchange{
		Room:		room,					// โยงความสัมพันธ์กับ Entity Room
		Reason:		reason,					// โยงความสัมพันธ์กับ Entity Reason
		User:		user,               // โยงความสัมพันธ์กับ Entity User
		
		Detail:     requestchange.Detail,	
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(reqc); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&reqc).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reqc})
}

// GET /requestchange/:id
func GetRequestchange(c *gin.Context) {
	var requestchange entity.Requestchange
	id := c.Param("id")
	if err := entity.DB().Preload("Room").Preload("Reason").Preload("User").Raw("SELECT * FROM requestchanges WHERE id = ?", id).Find(&requestchange).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requestchange})
}

// GET /requestchanges
func ListRequestchanges(c *gin.Context) {
	var requestchanges []entity.Requestchange
	if err := entity.DB().Preload("Room").Preload("Reason").Preload("User").Raw("SELECT * FROM requestchanges").Find(&requestchanges).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requestchanges})
}

// DELETE /requestchanges/:id
func DeleteRequestchange(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM requestchanges WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestchange not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /requestchanges
func UpdateRequestchange(c *gin.Context) {
	var requestchange entity.Requestchange
	if err := c.ShouldBindJSON(&requestchange); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", requestchange.ID).First(&requestchange); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "requestchange not found"})
		return
	}

	if err := entity.DB().Save(&requestchange).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": requestchange})
}