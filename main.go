package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lautarogalante/file-server/routes"
)

func main() {
	app := fiber.New()
	routes.LoadRoutes(app)
	app.Listen(":8000")
}
