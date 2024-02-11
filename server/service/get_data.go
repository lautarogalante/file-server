package service

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

func GetData(c *fiber.Ctx) Result {
	var clientData ClientData
	if err := c.BodyParser(&clientData); err != nil {
		return Result{nil, err}
	}

	data, err := iterateDir(clientData.Path)
	if err != nil {
		//return Result{nil, err}
		fmt.Println(err)
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
		//return Result{nil, err}
	}

	return Result{jsonData, nil}
}

func iterateDir(path string) (FileOrDirectory, error) {

	content, err := os.ReadDir(path)
	if err != nil {
		return FileOrDirectory{}, err
	}

	var files []File
	var directories []Directory

	for _, data := range content {

		if data.IsDir() {
			directory := Directory{Name: data.Name()}
			directories = append(directories, directory)
		} else {
			filePath := filepath.Join(path, data.Name())
			fileSize, err := os.Stat(filePath)
			if err != nil {
				return FileOrDirectory{}, err
			}
			file := File{Name: data.Name(), Size: fileSize.Size()}
			files = append(files, file)
		}
	}

	filesAndDirectories := FileOrDirectory{
		Files:       files,
		Directories: directories,
	}

	return filesAndDirectories, nil
}
