package service

import (
	"encoding/json"

	"github.com/gofiber/fiber/v2"
)

type File struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
	Type string `json:"type"`
}

type Result struct {
	Data []byte
	Err  error
}

func Upload(c *fiber.Ctx) Result {

	mp, err := c.Context().MultipartForm()
	if err != nil {
		return Result{nil, err}
	}

	files := mp.File["files"]

	filePropertiesList := make([]File, len(files))

	for i, file := range files {

		fileProperties := File{
			Name: file.Filename,
			Size: file.Size,
			Type: file.Header.Get("Content-Type"),
		}

		filePropertiesList[i] = fileProperties
	}

	jsonData, err := json.Marshal(filePropertiesList)
	if err != nil {
		return Result{nil, err}
	}

	return Result{jsonData, err}
}
