package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)


// POST /bankings

func CreateBanking(c *gin.Context) {

	var banking entity.Banking

	if err := c.ShouldBindJSON(&banking); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	if err := entity.DB().Create(&banking).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}

	c.JSON(http.StatusOK, gin.H{"data": banking})

}

// GET /banking/:id

func GetBanking(c *gin.Context) {

	var banking entity.Banking

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM bankings WHERE id = ?", id).Scan(&banking).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": banking})

}

// GET /bankings

func ListBankings(c *gin.Context) {

	var bankings []entity.Banking

	if err := entity.DB().Raw("SELECT * FROM bankings").Scan(&bankings).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": bankings})

}

// PATCH /bankings

func UpdateBanking(c *gin.Context) {

	var banking entity.Banking

	if err := c.ShouldBindJSON(&banking); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	if tx := entity.DB().Where("id = ?", banking.ID).First(&banking); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "banking not found"})

		   return

	}



	if err := entity.DB().Save(&banking).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": banking})

}

// DELETE /bankings/:id

func DeleteBanking(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM bankings WHERE id = ?", id); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "banking not found"})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": id})

}