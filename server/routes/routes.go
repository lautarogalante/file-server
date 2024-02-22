package routes

import (
	"log"
	"mime"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/lautarogalante/file-server/service"
)

func LoadRoutes(app *fiber.App) {

	app.Get("/home", func(c *fiber.Ctx) error {
		content := service.GetData(c)
		if content.Err != nil {
			return c.Status(fiber.StatusBadRequest).Send(c.Body())
		}

		return c.Status(fiber.StatusOK).Send(content.Data)
	})

	app.Post("/upload", func(c *fiber.Ctx) error {
		content := service.Upload(c)
		if content.Err != nil {
			log.Printf("Error en la carga: %s\n", content.Err.Error())
			return c.Status(fiber.StatusBadRequest).Send(c.Body())
		}

		return c.Status(fiber.StatusOK).Send(content.Data)
	})

	app.Post("/download", func(c *fiber.Ctx) error {
		files := service.Download(c)
		if files.Err != nil {
			log.Printf("%s\n", files.Err)
			return c.JSON(fiber.Map{"error": files.Err.Error()})
		}

		contentType := mime.TypeByExtension(filepath.Ext(files.Name))
		if contentType == "" {
			contentType = "application/octet-stream"
		}
		c.Set("Content-Type", contentType)
		c.Set("Content-Disposition", "attachment; filename="+filepath.Base(files.Name))
		c.Set("Access-Control-Expose-Headers", "Content-Disposition")
		if filepath.Ext(files.Name) == ".zip" {
			defer func() {
				if err := os.Remove(files.Name); err != nil {
					log.Println("Error removing zip file:", files.Name, err)
				}
			}()
		}
		return c.Status(fiber.StatusOK).SendFile(files.Name)

	})

	app.Post("/mkdir", func(c *fiber.Ctx) error {

		directory := service.CreateDirectory(c)
		if directory.Err != nil {
			return c.Status(fiber.StatusBadRequest).Send(c.Body())
		}
		return c.Status(fiber.StatusCreated).Send(directory.Data)
	})

}
