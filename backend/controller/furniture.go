package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /furniture
func CreateFurniture(c *gin.Context) {

	var furniture entity.Furniture
	// var admin entity.Admin
	var user entity.User
	var room entity.Room
	var equipment entity.Equipment
	var amount entity.Amount

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร furniture
	if err := c.ShouldBindJSON(&furniture); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // 9: ค้นหา Admin ด้วย id
	// if tx := entity.DB().Where("id = ?", furniture.AdminID).First(&admin); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Admin not found"})
	// 	return
	// }

	// 10: ค้นหา room ด้วย id
	if tx := entity.DB().Where("id = ?", furniture.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// 11: ค้นหา Equipment ด้วย id
	if tx := entity.DB().Where("id = ?", furniture.EquipmentID).First(&equipment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Equipment not found"})
		return
	}

	// 12: ค้นหา Amount ด้วย id
	if tx := entity.DB().Where("id = ?", furniture.AmountID).First(&amount); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Amount not found"})
		return
	}

	// 13: ค้นหา User ด้วย id
	if tx := entity.DB().Where("id = ?", furniture.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User not found"})
		return
	}
	// 14: สร้าง furniture
	bk := entity.Furniture{
		// Admin:        	admin,		// โยงความสัมพันธ์กับ Entity Admin
		User:          user,      // โยงความสัมพันธ์กับ Entity User
		Room:          room,      // โยงความสัมพันธ์กับ Entity Room
		Equipment:     equipment, // โยงความสัมพันธ์กับ Entity Equipment
		Amount:        amount,
		Total:         furniture.Total,         // โยงความสัมพันธ์กับ Entity Total
		FurnitureTime: furniture.FurnitureTime, // ตั้งค่าฟิลด์ furnitureTime
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(bk); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 15: บันทึก
	if err := entity.DB().Create(&bk).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bk})
}

// GET /furniture/:id
func GetFurniture(c *gin.Context) {
	var furniture entity.Furniture
	id := c.Param("id")
	if err := entity.DB().Preload("Admin").Preload("User").Preload("Room").Preload("Equipment").Preload("Amount").Raw("SELECT * FROM furnitures WHERE room_id = ? GROUP BY room_id", id).Scan(&furniture).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": furniture})
}

// GET /furnitures
func ListFurnitures(c *gin.Context) {
	var furnitures []entity.Furniture
	if err := entity.DB().Preload("Admin").Preload("User").Preload("Room").Preload("Equipment").Preload("Amount").Raw("SELECT * FROM furnitures").Find(&furnitures).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": furnitures})
}

// DELETE /furnitures/:id
func DeleteFurniture(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM furnitures WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /furnitures
func UpdateFurniture(c *gin.Context) {
	var furniture entity.Furniture
	if err := c.ShouldBindJSON(&furniture); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", furniture.ID).First(&furniture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture not found"})
		return
	}

	if err := entity.DB().Save(&furniture).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": furniture})
}
