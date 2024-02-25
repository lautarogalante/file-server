package service

import (
	"encoding/json"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

func GetData(c *fiber.Ctx) Result {
	var clientData RequestData
	if err := c.QueryParser(&clientData); err != nil {
		return Result{nil, err}
	}

	data, err := iterateDir(clientData.QueryPath)
	if err != nil {
		return Result{nil, err}
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return Result{nil, err}
	}

	return Result{jsonData, nil}
}

func iterateDir(path string) (FileAndDirectory, error) {

	content, err := os.ReadDir(path)
	if err != nil {
		return FileAndDirectory{}, err
	}

	var files []File
	var directories []Directory

	for _, data := range content {

		if data.IsDir() {
			// fullPath := filepath.Join(path, data.Name())
			directory := Directory{Name: data.Name(), Size: "--", Path: path}
			directories = append(directories, directory)
		} else {
			filePath := filepath.Join(path, data.Name())
			fileSize, err := os.Stat(filePath)
			if err != nil {
				return FileAndDirectory{}, err
			}
			if err != nil {
				return FileAndDirectory{}, err
			}
			file := File{Name: data.Name(), Size: convertSize(fileSize.Size()), Path: path}
			files = append(files, file)
		}
	}

	filesAndDirectories := FileAndDirectory{
		Files:       files,
		Directories: directories,
	}

	return filesAndDirectories, nil
}

func convertSize(size int64) string {

	if size <= 1000 {
		sizeInBytes := strconv.FormatInt(size, 10) + " bytes"
		return sizeInBytes
	} else if size >= 1000 && size < 1.0e6 {
		sizeInKb := size / 1000
		sizeInKbRounded := strconv.FormatInt(sizeInKb, 10) + " kB"
		return sizeInKbRounded
	} else if size >= 1.0e6 && size < 1.0e9 {
		sizeInMg := float64(size) / 1.0e6
		sizeInMgRounded := strconv.FormatFloat(sizeInMg, 'f', 1, 64) + " MB"
		return sizeInMgRounded
	} else {
		sizeInGb := float64(size) / 1.0e9
		sizeInGbRounded := strconv.FormatFloat(sizeInGb, 'f', 1, 64) + " GB"
		return sizeInGbRounded
	}

}
