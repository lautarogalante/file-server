package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lautarogalante/file-server/service"
)

func LoadRoutes(app *fiber.App) {

	app.Post("/upload", func(c *fiber.Ctx) error {
		content := service.Upload(c)
		if content.Err != nil {
			return c.Status(fiber.StatusBadRequest).Send(c.Body())
		}

		return c.Status(fiber.StatusOK).Send(content.Data)
	})

}
