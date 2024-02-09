package service

import (
	"github.com/gofiber/fiber/v2"
)

func Upload(c *fiber.Ctx) (string, error) {

	return string(c.Body()), nil
}
