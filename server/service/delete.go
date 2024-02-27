package service

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

func Delete(c *fiber.Ctx) Result {
	var resources FileAndDirectory
	c.BodyParser(&resources)

	if len(resources.Directories) > 0 {
		for _, dir := range resources.Directories {
			path := filepath.Join(dir.Path, dir.Name)
			if err := os.RemoveAll(path); err != nil {
				return Result{Err: fmt.Errorf("the directory %s cannot be deleted: %v", dir.Name, err)}
			}
		}
	}

	if len(resources.Files) > 0 {
		for _, file := range resources.Files {
			path := filepath.Join(file.Path, file.Name)
			if err := os.Remove(path); err != nil {
				return Result{Err: fmt.Errorf("the file %s cannot be deleted: %v", file.Name, err)}
			}
		}
	}

	msj := "Deleted Successfully"
	data, err := json.Marshal(msj)
	if err != nil {
		return Result{Err: fmt.Errorf("marshaling error: %v", err)}
	}

	return Result{Data: data, Err: nil}
}
