package controller

import (
	"net/http"

	"github.com/sut65/team17/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// POST /cleaning
func CreateCleaning(c *gin.Context) {

	var cleaning entity.Cleaning
	var user entity.User
	var room entity.Room
	var kind entity.Kind
	var area entity.Area

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร cleaning
	if err := c.ShouldBindJSON(&cleaning); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 10: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// 11: ค้นหา Kind ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.KindID).First(&kind); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Kind not found"})
		return
	}

	// 12: ค้นหา area ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.AreaID).First(&area); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "area not found"})
		return
	}

	// 12: สร้าง Cleaning
	bk := entity.Cleaning{
		User:         user, // โยงความสัมพันธ์กับ Entity User
		Room:         room, // โยงความสัมพันธ์กับ Entity Room
		Kind:         kind, // โยงความสัมพันธ์กับ Entity Kind
		Area:         area, // โยงความสัมพันธ์กับ Entity Area
		Detail:       cleaning.Detail,
		CleaningTime: cleaning.CleaningTime, // ตั้งค่าฟิลด์ CleaningTime
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(bk); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bk})
}

// GET /cleaning/:id
func GetCleaning(c *gin.Context) {
	var cleaning entity.Cleaning
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Room").Preload("Kind").Preload("Area").Raw("SELECT * FROM cleanings WHERE id = ?", id).Find(&cleaning).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cleaning})
}

// GET /cleanings
func ListCleanings(c *gin.Context) {
	var cleanings []entity.Cleaning
	if err := entity.DB().Preload("User").Preload("Room").Preload("Kind").Preload("Area").Raw("SELECT * FROM cleanings").Find(&cleanings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cleanings})
}

// DELETE /cleanings/:id
func DeleteCleaning(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM cleanings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cleaning not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// // PATCH /cleanings
// func UpdateCleaning(c *gin.Context) {
// 	var cleaning entity.Cleaning
// 	if err := c.ShouldBindJSON(&cleaning); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", cleaning.ID).First(&cleaning); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "cleaning not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&cleaning).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": cleaning})
// }

func UpdateCleaning(c *gin.Context) {

	var cleaning entity.Cleaning
	var user entity.User
	var room entity.Room
	var kind entity.Kind
	var area entity.Area

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร cleaning
	if err := c.ShouldBindJSON(&cleaning); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 10: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// 11: ค้นหา Kind ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.KindID).First(&kind); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Kind not found"})
		return
	}

	// 12: ค้นหา area ด้วย id
	if tx := entity.DB().Where("id = ?", cleaning.AreaID).First(&area); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "area not found"})
		return
	}

	// 12: สร้าง Cleaning
	update := entity.Cleaning{
		User:         user, // โยงความสัมพันธ์กับ Entity User
		Room:         room, // โยงความสัมพันธ์กับ Entity Room
		Kind:         kind, // โยงความสัมพันธ์กับ Entity Kind
		Area:         area, // โยงความสัมพันธ์กับ Entity Area
		Detail:       cleaning.Detail,
		CleaningTime: cleaning.CleaningTime, // ตั้งค่าฟิลด์ CleaningTime
	}

	// 13: บันทึก
	if err := entity.DB().Where("id = ?", cleaning.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data":update})
}

