package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/asaskevich/govalidator"
	"github.com/sut65/team17/entity"
)

// POST /user
func CreateUser(c *gin.Context) {

	var status entity.Status
	var gender entity.Gender
	var user entity.User
	var title entity.Title

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", user.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	// 10: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	
	// 11: ค้นหา title ด้วย id
	if tx := entity.DB().Where("id = ?", user.TitleID).First(&title); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "title not found"})
		return
	}

	// 12: สร้าง user
	dt := entity.User{
		Role:  		 user.Role,
		Status:       status, // โยงความสัมพันธ์กับ Entity status
		Gender:       gender, // โยงความสัมพันธ์กับ Entity gender
		Title:        title,  // โยงความสัมพันธ์กับ Entity title
		Name:         user.Name,	
		Password: 	  user.Password,
		Personal:     user.Personal,
		Email:        user.Email,
		Tel:          user.Tel,
		Address:      user.Address,
		BirthdayTime: user.BirthdayTime,
	}

	// ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(dt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&dt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dt})
}

// GET /user/:id
func GetUser(c *gin.Context) {
	var user entity.User
	id := c.Param("id")
	if err := entity.DB().Preload("Status").Preload("Gender").Preload("Title").Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}


// GET /user /s
func ListUsers(c *gin.Context) {
	var user []entity.User
	if err := entity.DB().Preload("Status").Preload("Gender").Preload("Title").Raw("SELECT * FROM users").Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user})
}

// DELETE /user/:id
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}


func UpdateUser(c *gin.Context) {

	var status entity.Status
	var gender entity.Gender
	var user entity.User
	var title entity.Title

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร user
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา status ด้วย id
	if tx := entity.DB().Where("id = ?", user.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	// 10: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", user.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	
	// 11: ค้นหา title ด้วย id
	if tx := entity.DB().Where("id = ?", user.TitleID).First(&title); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "title not found"})
		return
	}

	// 12: สร้าง user
	update := entity.User{
		Role:  		 user.Role,
		Status:       status, // โยงความสัมพันธ์กับ Entity status
		Gender:       gender, // โยงความสัมพันธ์กับ Entity gender
		Title:        title,  // โยงความสัมพันธ์กับ Entity title
		Name:         user.Name,	
		Password: 	  user.Password,
		Personal:     user.Personal,
		Email:        user.Email,
		Tel:          user.Tel,
		Address:      user.Address,
		BirthdayTime: user.BirthdayTime,
	}

	// update
	if err := entity.DB().Where("id = ?", user.ID).Updates(&update).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update})
	
}