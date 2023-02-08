package controller

// import (
// 	// "log"
// 	"net/http"

// 	// "fmt"
// 	"github.com/asaskevich/govalidator"
// 	"github.com/gin-gonic/gin"
// 	"github.com/sut65/team17/entity"
// )

// // POST /bill
// func CreateBill(c *gin.Context) {

// 	var bill entity.Bill
// 	var meter entity.Meter
// 	// var admin entity.Admin
// 	var furniture entity.Furniture

// 	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร cleaning
// 	if err := c.ShouldBindJSON(&bill); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// 9: ค้นหา meter ด้วย id
// 	if tx := entity.DB().Where("id = ?", bill.MeterID).First(&meter); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "meter not found"})
// 		return
// 	}

// 	// 10: ค้นหา admin ด้วย id
// 	// if tx := entity.DB().Where("id = ?", bill.AdminID).First(&admin); tx.RowsAffected == 0 {
// 	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
// 	// 	return
// 	// }

// 	// 11: ค้นหา furniture ด้วย id
// 	if tx := entity.DB().Where("id = ?", bill.FurnitureID).First(&furniture); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture not found"})
// 		return
// 	}

// 	// 12: สร้าง Bill
// 	bl := entity.Bill{
// 		// Admin:     admin,         // โยงความสัมพันธ์กับ Entity Admin
// 		Cost:      bill.Cost,
// 		Meter:     meter,         // โยงความสัมพันธ์กับ Entity Meter
// 		Furniture: furniture,     // โยงความสัมพันธ์กับ Entity Furniture
// 		BillTime:  bill.BillTime, // ตั้งค่าฟิลด์ BillTime
// 	}
// 	// log.Print("BL.Cost value: ", bl.Cost)
// 	// log.Print("BL.Meter: ", bl.Meter)
// 	// log.Print("BL.Furniture: ", bl.Furniture)
// 	// log.Print("BL.BillTime: ", bl.BillTime)

// 	// ขั้นตอนการ validate ที่นำมาจาก unit test
// 	if _, err := govalidator.ValidateStruct(bl); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		//error here มันไปเข้าvalidate ของตัว manage
// 		return
// 	}

// 	// 13: บันทึก
// 	if err := entity.DB().Create(&bl).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": bl})
// }

// // GET /bill/:id
// func GetBill(c *gin.Context) {
// 	var bill entity.Bill
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Meter").Preload("Admin").Preload("Furniture").Raw("SELECT * FROM bills WHERE id = ?", id).Find(&bill).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": bill})
// }

// // GET /bills
// func ListBills(c *gin.Context) {
// 	var bills []entity.Bill
// 	if err := entity.DB().Preload("Meter").Preload("Admin").Preload("Furniture").Preload("Area").Raw("SELECT * FROM bills").Find(&bills).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": bills})
// }

// // DELETE /bills/:id
// func DeleteBill(c *gin.Context) {
// 	id := c.Param("id")
// 	if tx := entity.DB().Exec("DELETE FROM bills WHERE id = ?", id); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": id})
// }

// // PATCH /bills
// func UpdateBill(c *gin.Context) {
// 	var bill entity.Bill
// 	if err := c.ShouldBindJSON(&bill); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", bill.ID).First(&bill); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&bill).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": bill})
// }
import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /bill
func CreateBill(c *gin.Context) {

	var bill entity.Bill
	var meter entity.Meter
	var furniture entity.Furniture

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา meter ด้วย id
	if tx := entity.DB().Where("id = ?", bill.MeterID).First(&meter); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "meter not found"})
		return
	}

	// 11: ค้นหา furniture ด้วย id
	if tx := entity.DB().Where("id = ?", bill.FurnitureID).First(&furniture); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "furniture not found"})
		return
	}

	// 12: สร้าง Meter
	bl := entity.Bill{
		Meter:     meter,     // โยงความสัมพันธ์กับ Entity User
		Furniture: furniture, // โยงความสัมพันธ์กับ Entity Furniture
		Cost:      bill.Cost,
	}
	// // ขั้นตอนการ validate ที่นำมาจาก unit test
	if _, err := govalidator.ValidateStruct(bl); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&bl).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bl})
}

// GET /bill/:id
func GetBill(c *gin.Context) {
	var bill entity.Bill
	id := c.Param("id")
	if err := entity.DB().Preload("Meter").Preload("Furniture").Raw("SELECT * FROM bills WHERE id = ?", id).Find(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bill})
}

// GET /bill
func ListBills(c *gin.Context) {
	var bills []entity.Bill
	if err := entity.DB().Preload("Meter.Manage.Room").Preload("Meter.User").Preload("Furniture").Raw("SELECT * FROM bills").Find(&bills).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bills})
}

// DELETE /bills/:id
func DeleteBill(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bills WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /bill
func UpdateBill(c *gin.Context) {
	var bill entity.Bill
	if err := c.ShouldBindJSON(&bill); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", bill.ID).First(&bill); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bill not found"})
		return
	}

	if err := entity.DB().Save(&bill).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bill})
}
