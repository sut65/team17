package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team17/entity"
)

// POST /titles

func CreateTitle(c *gin.Context) {

	var title entity.Title

	if err := c.ShouldBindJSON(&title); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	if err := entity.DB().Create(&title).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}

	c.JSON(http.StatusOK, gin.H{"data": title})

}

// GET /title/:id

func GetTitle(c *gin.Context) {

	var title entity.Title

	id := c.Param("id")

	if err := entity.DB().Raw("SELECT * FROMtitles WHERE id = ?", id).Scan(&title).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": title})

}

// GET /titles

func ListTitles(c *gin.Context) {

	var titles []entity.Title

	if err := entity.DB().Raw("SELECT * FROM titles").Scan(&titles).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": titles})

}

// PATCH /titles

func UpdateTitle(c *gin.Context) {

	var title entity.Title

	if err := c.ShouldBindJSON(&title); err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	if tx := entity.DB().Where("id = ?", title.ID).First(&title); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "title not found"})

		   return

	}



	if err := entity.DB().Save(&title).Error; err != nil {

		   c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": title})

}

// DELETE /titles/:id

func DeleteTitle(c *gin.Context) {

	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM titles WHERE id = ?", id); tx.RowsAffected == 0 {

		   c.JSON(http.StatusBadRequest, gin.H{"error": "title not found"})

		   return

	}



	c.JSON(http.StatusOK, gin.H{"data": id})

}