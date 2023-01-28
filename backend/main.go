package main

import (
	"github.com/sut65/team17/controller"
	"github.com/sut65/team17/entity"
	"github.com/sut65/team17/middlewares"

	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// User Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Manage Routes
			protected.GET("/manages", controller.ListManages)
			protected.GET("/manage/:id", controller.GetManage)
			protected.POST("/manages", controller.CreateManage)
			protected.PATCH("/manages", controller.UpdateManage)
			protected.DELETE("/manages/:id", controller.DeleteManage)

			// Category Routes
			protected.GET("/categories", controller.ListCategories)
			protected.GET("/category/:id", controller.GetCategory)
			protected.POST("/categories", controller.CreateCategory)
			protected.PATCH("/categories", controller.UpdateCategory)
			protected.DELETE("/categories/:id", controller.DeleteCategory)

			// Size Routes
			protected.GET("/sizes", controller.ListSizes)
			protected.GET("/size/:id", controller.GetSize)
			protected.POST("/sizes", controller.CreateSize)
			protected.PATCH("/sizes", controller.UpdateSize)
			protected.DELETE("/sizes/:id", controller.DeleteSize)

			// Lese Routes
			protected.GET("/leases", controller.ListLeases)
			protected.GET("/lease/:id", controller.GetLease)
			protected.POST("/leases", controller.CreateLease)
			protected.PATCH("/leases", controller.UpdateLease)
			protected.DELETE("/leases/:id", controller.DeleteLease)

			// Resident Routes
			protected.GET("/residents", controller.ListResidents)
			protected.GET("/resident/:id", controller.GetResident)
			protected.POST("/residents", controller.CreateResident)
			protected.PATCH("/residents", controller.UpdateResident)
			protected.DELETE("/residents/:id", controller.DeleteResident)

			// Room Routes
			protected.GET("/rooms", controller.ListRooms)
			protected.GET("/room/:id", controller.GetRoom)
			protected.POST("/rooms", controller.CreateRoom)
			protected.PATCH("/rooms", controller.UpdateRoom)
			protected.DELETE("/rooms/:id", controller.DeleteRoom)

			// Requestout Routes
			protected.GET("/requestouts", controller.ListRequestouts)
			protected.GET("/requestout/:id", controller.GetRequestout)
			protected.POST("/requestouts", controller.CreateRequestout)
			protected.PATCH("/requestouts", controller.UpdateRequestout)
			protected.DELETE("/requestouts/:id", controller.DeleteRequestout)

			// Reason Routes
			protected.GET("/reasons", controller.ListReasons)
			protected.GET("/reason/:id", controller.GetReason)
			protected.POST("/reasons", controller.CreateReason)
			protected.PATCH("/reaons", controller.UpdateReason)
			protected.DELETE("/reasons/:id", controller.DeleteReason)

			// Kind Routes
			protected.GET("/kinds", controller.ListKinds)
			protected.GET("/kind/:id", controller.GetKind)
			protected.POST("/kinds", controller.CreateKind)
			protected.PATCH("/kinds", controller.UpdateKind)
			protected.DELETE("/kinds/:id", controller.DeleteKind)

			// Area Routes
			protected.GET("/areas", controller.ListAreas)
			protected.GET("/area/:id", controller.GetArea)
			protected.POST("/areas", controller.CreateArea)
			protected.PATCH("/areas", controller.UpdateArea)
			protected.DELETE("/areas/:id", controller.DeleteArea)

			// Cleaning Routes
			protected.GET("/cleanings", controller.ListCleanings)
			protected.GET("/cleaning/:id", controller.GetCleaning)
			protected.POST("/cleanings", controller.CreateCleaning)
			protected.PATCH("/cleanings", controller.UpdateCleaning)
			protected.DELETE("/cleanings/:id", controller.DeleteCleaning)

			// Equipment Routes
			protected.GET("/equipments", controller.ListEquipments)
			protected.GET("/equipment/:id", controller.GetEquipment)
			protected.POST("/equipments", controller.CreateEquipment)
			protected.PATCH("/equipments", controller.UpdateEquipment)
			protected.DELETE("/equipments/:id", controller.DeleteEquipment)

			// Amount Routes
			protected.GET("/amounts", controller.ListAmounts)
			protected.GET("/amount/:id", controller.GetAmount)
			protected.POST("/amounts", controller.CreateAmount)
			protected.PATCH("/amounts", controller.UpdateAmount)
			protected.DELETE("/amounts/:id", controller.DeleteAmount)

			// Furniture Routes
			protected.GET("/furnitures", controller.ListFurnitures)
			protected.GET("/furniture/:id", controller.GetFurniture)
			protected.POST("/furnitures", controller.CreateFurniture)
			protected.PATCH("/furnitures", controller.UpdateFurniture)
			protected.DELETE("/furnitures/:id", controller.DeleteFurniture)
		}
	}

	// users Routes
	r.POST("/users", controller.CreateUser)

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
