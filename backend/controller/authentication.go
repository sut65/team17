package controller

import (
	"net/http"

	// "github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/service"
	"github.com/sut65/team17/entity"
	"golang.org/x/crypto/bcrypt"
)

// LoginPayload login body
type LoginPayload struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
// LoginPayload login body
type LoginPayloadAdmin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload struct {
	Name     string `json:"name" valid:"required~Name cannot be blank"`
	Email    string `json:"email" valid:"email"`
	Password string `json:"password" valid:"required~Password cannot be blank"`
	Role     string `json:"role" valid:"required~Role cannot be blank"`
}


// LoginResponse token response
type LoginResponse struct {
	Role		string	`json:"role"`
	Token 	string 	`json:"token"`
	ID    	uint   	`json:"id"`
}

// POST /login
func Login(c *gin.Context) {
	var payload LoginPayload
	var user entity.User

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย email ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM users WHERE email = ?", payload.Email).Scan(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user credentials"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Role:	user.Role,
		Token: signedToken,
		ID:    user.ID,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /adminLogin
func LoginAdmin(c *gin.Context) {
	var payloadAdmin LoginPayloadAdmin
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payloadAdmin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา admin ด้วย username ที่ผู้ใช้กรอกเข้ามา
	if err := entity.DB().Raw("SELECT * FROM admins WHERE email = ?", payloadAdmin.Email).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบรหัสผ่าน
	err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(payloadAdmin.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is incorrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(admin.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error signing token"})
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
		ID:    admin.ID,
		Role:	admin.Role,
	}

	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}


