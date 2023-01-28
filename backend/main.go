package main

import (
	"github.com/kingjokerbys/sa-65-exampled/controller"
	"github.com/kingjokerbys/sa-65-exampled/entity"
	"github.com/kingjokerbys/sa-65-exampled/middlewares"

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
			// user Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// resident Routes
			protected.GET("/residents", controller.ListResidents)
			protected.GET("/resident/:id", controller.GetResident)
			protected.POST("/residents", controller.CreateResident)
			protected.PATCH("/residents", controller.UpdateResident)
			protected.DELETE("/residents/:id", controller.DeleteResident)

			// Object Routes
			protected.GET("/objects", controller.ListObjects)
			protected.GET("/object/:id", controller.GetObject)
			protected.POST("/objects", controller.CreateObject)
			protected.PATCH("/objects", controller.UpdateObject)
			protected.DELETE("/objects/:id", controller.DeleteObject)

			// Repair Routes
			protected.GET("/repairs", controller.ListRepairs)
			protected.GET("/repair/:id", controller.GetRepair)
			protected.POST("/repairs", controller.CreateRepair)
			protected.PATCH("/repairs", controller.UpdateRepair)
			protected.DELETE("/repairs/:id", controller.DeleteRepair)

			// emergencytype
			protected.GET("/emergencytypes", controller.ListEmergencytypes)
			protected.GET("/emergencytype/:id", controller.GetEmergencytype)
			protected.POST("/emergencytypes", controller.CreateEmergencytype)
			protected.PATCH("/emergencytypes", controller.UpdateEmergencytype)
			protected.DELETE("/emergencytypes/:id", controller.DeleteEmergencytype)

			
			// emergency
			protected.GET("/emergencies", controller.ListEmergencys)
			protected.GET("/emergencie/:id", controller.GetEmergency)
			protected.POST("/emergencies", controller.CreateEmergency)
			protected.PATCH("/emergencies", controller.UpdateEmergency)
			protected.DELETE("/emergencies/:id", controller.DeleteEmergency)


			
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