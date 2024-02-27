package service

import (
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

func CreateDirectory(c *fiber.Ctx) Result {
	var reqData RequestData
	if err := c.BodyParser(&reqData); err != nil {
		return Result{nil, fmt.Errorf("body parser error: %v\n", err)}
	}

	fullPath := filepath.Join(reqData.Path, reqData.DirectoryName)
	os.Mkdir(fullPath, 0755)

	diretoryProperties := Directory{
		Name: reqData.DirectoryName,
	}

	jsonData, err := json.Marshal(diretoryProperties)
	if err != nil {
		return Result{nil, fmt.Errorf("marshaling error: %v\n", err)}
	}

	return Result{jsonData, nil}
}

func SaveFiles(files []*multipart.FileHeader, pathDestination string) error {
	for _, file := range files {

		uploadFile, err := file.Open()
		if err != nil {
			return err
		}
		defer uploadFile.Close()

		destinationPath := filepath.Join(pathDestination, file.Filename)
		destinationFile, err := os.Create(destinationPath)
		if err != nil {
			return err
		}
		defer destinationFile.Close()

		if _, err = io.Copy(destinationFile, uploadFile); err != nil {
			return err
		}
	}

	return nil
}

func Upload(c *fiber.Ctx) Result {
	path := c.FormValue("path")

	mp, err := c.Context().MultipartForm()
	if err != nil {
		return Result{nil, fmt.Errorf("error to instanciate multipartform: %v\n", err)}
	}

	files := mp.File["files"]
	if err = SaveFiles(files, path); err != nil {
		return Result{nil, fmt.Errorf("error to obtain multipart files: %v\n", err)}
	}

	filePropertiesList := make([]File, len(files))

	for i, file := range files {

		fileProperties := File{
			Name: file.Filename,
			Size: convertSize(file.Size),
		}
		filePropertiesList[i] = fileProperties
	}

	jsonData, err := json.Marshal(filePropertiesList)
	if err != nil {
		return Result{nil, fmt.Errorf("marshaling error: %v\n", err)}
	}

	return Result{jsonData, err}
}
