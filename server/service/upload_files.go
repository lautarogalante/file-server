package service

import (
	"encoding/json"
	"io"
	"mime/multipart"
	"os"
	"path"

	"github.com/gofiber/fiber/v2"
)

func CreateDirectory(c *fiber.Ctx) Result {
	var reqData ClientData
	if err := c.BodyParser(&reqData); err != nil {
		return Result{nil, err}
	}

	fullPath := path.Join(reqData.Path, reqData.DirectoryName)
	os.Mkdir(fullPath, 0755)

	diretoryProperties := Directory{
		Name: reqData.DirectoryName,
	}

	jsonData, err := json.Marshal(diretoryProperties)
	if err != nil {
		return Result{nil, err}
	}

	return Result{jsonData, nil}
}

func SaveFiles(files []*multipart.FileHeader) error {

	homeDir, err := os.UserHomeDir()
	if err != nil {
		return err
	}

	for _, file := range files {

		uploadFile, err := file.Open()
		if err != nil {
			return err
		}
		defer uploadFile.Close()

		destinationPath := path.Join(homeDir, "backup", file.Filename)
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

	mp, err := c.Context().MultipartForm()
	if err != nil {
		return Result{nil, err}
	}

	files := mp.File["files"]
	if err = SaveFiles(files); err != nil {
		return Result{nil, err}
	}

	filePropertiesList := make([]File, len(files))

	for i, file := range files {

		fileProperties := File{
			Name: file.Filename,
			Size: convertSize(file.Size),
			/*Type: file.Header.Get("Content-Type"),*/
		}
		filePropertiesList[i] = fileProperties
	}

	jsonData, err := json.Marshal(filePropertiesList)
	if err != nil {
		return Result{nil, err}
	}

	return Result{jsonData, err}
}
