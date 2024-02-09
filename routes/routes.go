package routes

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
	"github.com/lautarogalante/file-server/service"
)

func LoadRoutes(app *fiber.App) {

	app.Post("/upload", func(c *fiber.Ctx) error {
		content, err := service.Upload(c)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).Send(c.Body())
		}

		jsonResponse, err := json.Marshal(content)
		if err != nil {
			return c.Status(fiber.StatusBadRequest).SendStatus(400)
		}

		return c.Status(fiber.StatusOK).Send(jsonResponse)

	})

}
