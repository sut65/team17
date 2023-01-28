package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)


// POST /methods

func CreateMethod(c *gin.Context) {

	var method entity.Method

	if err := c.ShouldBindJSON(&method); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	if err := entity.DB().Create(&method).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}

	c.JSON(http.StatusOK, gin.H{"data": method})

}

// GET /method/:id

func GetMethod(c *gin.Context) {

	var method entity.Method

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROM methods WHERE id = ?", id).Scan(&method).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": method})

}

// GET /methods

func ListMethods(c *gin.Context) {

	var methods []entity.Method

	if err := entity.DB().Raw("SELECT * FROM methods").Scan(&methods).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": methods})

}

// PATCH /methods

func UpdateMethod(c *gin.Context) {

	var method entity.Method

	if err := c.ShouldBindJSON(&method); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	if tx := entity.DB().Where("id = ?", method.ID).First(&method); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})

		   return

	}



	if err := entity.DB().Save(&method).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": method})

}

// DELETE /methods/:id

func DeleteMethod(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM methods WHERE id = ?", id); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "method not found"})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": id})

}