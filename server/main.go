package main

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/lautarogalante/file-server/routes"
)

func main() {
	app := fiber.New(fiber.Config{
		BodyLimit: 1000 << 20,
	})

	hostUrl := os.Getenv("HOST_URL")
	port := os.Getenv("CLIENT_PORT")
	allowOrigin := hostUrl + ":" + port

	app.Use(cors.New(cors.Config{
		AllowOrigins: allowOrigin,
		AllowHeaders: "Origin, Content-Type, Accept, Content-Disposition Accept-Language, Content-Length",
		AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH",
	}))

	routes.LoadRoutes(app)
	app.Listen(":8000")
}
