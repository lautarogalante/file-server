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
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": content.Err.Error()})
		}

		return c.Status(fiber.StatusOK).Send(content.Data)
	})

	app.Post("/upload", func(c *fiber.Ctx) error {
		content := service.Upload(c)
		if content.Err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": content.Err.Error()})
		}

		return c.Status(fiber.StatusOK).Send(content.Data)
	})

	app.Post("/download", func(c *fiber.Ctx) error {
		content := service.Download(c)
		if content.Err != nil {
			log.Printf("%s\n", content.Err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": content.Err.Error()})
		}

		contentType := mime.TypeByExtension(filepath.Ext(content.Name))
		if contentType == "" {
			contentType = "application/octet-stream"
		}
		c.Set("Content-Type", contentType)
		c.Set("Content-Disposition", `attachment; filename="`+filepath.Base(content.Name)+`"`)
		c.Set("Access-Control-Expose-Headers", "Content-Disposition")
		if filepath.Ext(content.Name) == ".zip" {
			defer func() {
				if err := os.Remove(content.Name); err != nil {
					log.Println("Error removing zip file:", content.Name, err)
				}
			}()
		}
		return c.Status(fiber.StatusOK).SendFile(content.Name)

	})

	app.Post("/mkdir", func(c *fiber.Ctx) error {

		content := service.CreateDirectory(c)
		if content.Err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": content.Err.Error()})
		}
		return c.Status(fiber.StatusCreated).Send(content.Data)
	})

	app.Get("/search", func(c *fiber.Ctx) error {
		content := service.Search(c)
		if content.Err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": content.Err.Error()})
		}
		return c.Status(fiber.StatusOK).Send(content.Data)
	})

	app.Get("/disk", func(c *fiber.Ctx) error {
		disk := service.GetDiskStat(c)
		if disk.Err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": disk.Err.Error()})
		}
		return c.Status(fiber.StatusOK).Send(disk.Data)
	})

	app.Post("/delete", func(c *fiber.Ctx) error {
		content := service.Delete(c)
		if content.Err != nil {
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": content.Err.Error()})
		}
		return c.Status(fiber.StatusOK).Send(content.Data)
	})

}
