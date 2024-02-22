package service

import (
	"archive/zip"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Download(c *fiber.Ctx) DownloadName {
	var clientData RequestData
	var queryParams RequestData

	if err := c.QueryParser(&queryParams); err != nil {
		return DownloadName{
			Err: err,
		}

	}

	if err := c.BodyParser(&clientData); err != nil {
		return DownloadName{
			Err: err,
		}
	}

	filePath := filepath.Join(queryParams.QueryPath, clientData.Files[0])

	if len(clientData.Files) > 1 || isDirectory(filePath) {
		zipFile := bachFiles(clientData.Files, queryParams.QueryPath)
		if zipFile.Err != nil {
			return DownloadName{
				Err: zipFile.Err,
			}
		}
		return DownloadName{Name: zipFile.Name, Err: nil}
	} else if len(clientData.Files) == 1 && !isDirectory(filePath) {
		_, err := os.Stat(filePath)
		if err != nil {
			if os.IsNotExist(err) {
				return DownloadName{Err: fmt.Errorf("the file: %s\n not exist", clientData.Files[0])}
			}

		}
		return DownloadName{Name: filePath, Err: nil}
	}
	return DownloadName{}
}

func isDirectory(path string) bool {
	fileInfo, err := os.Stat(path)
	if err != nil {
		return false
	}
	return fileInfo.IsDir()
}

func bachFiles(name []string, path string) DownloadName {
	now := time.Now().UTC()
	formatted := now.Format("20060102T150405Z")
	zipFileName := "download-" + formatted + ".zip"
	zipFile, err := os.Create(zipFileName)

	if len(name) == 1 && name[0] == "" {
		return DownloadName{Err: fmt.Errorf("cannot compress an empty file")}
	}

	if err != nil {
		return DownloadName{
			Err: err,
		}
	}

	defer zipFile.Close()
	zipWriter := zip.NewWriter(zipFile)
	defer zipWriter.Close()

	for _, filename := range name {
		fileNamePath := filepath.Join(path, filename)
		if _, err := os.Stat(fileNamePath); err != nil {
			if os.IsNotExist(err) {
				return DownloadName{Err: fmt.Errorf("the file: %s\n not exist", filename)}
			} else {
				log.Printf("%s\n", err.Error())
			}
		}

		if isDirectory(fileNamePath) {
			if err := recursiveDirCompress(zipWriter, fileNamePath, path); err != nil {
				return DownloadName{Err: err}
			}
		} else {
			if err := compressFiles(zipWriter, fileNamePath, filename); err != nil {
				return DownloadName{Err: err}
			}
		}
	}
	return DownloadName{Name: zipFileName, Err: nil}
}

func recursiveDirCompress(zipWriter *zip.Writer, fileNamePath string, path string) error {

	return filepath.Walk(fileNamePath, func(filePath string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		relativePath, err := filepath.Rel(path, filePath)
		if err != nil {
			return err
		}
		log.Printf("%s\n", relativePath)
		header, err := zip.FileInfoHeader(info)
		if err != nil {
			return err
		}

		header.Name = relativePath
		if info.IsDir() {
			header.Name += "/"
		} else {
			header.Method = zip.Deflate
		}
		writer, err := zipWriter.CreateHeader(header)
		if err != nil {
			return err
		}
		if !info.IsDir() {
			file, err := os.Open(filePath)
			if err != nil {
				return err
			}
			defer file.Close()
			_, err = io.Copy(writer, file)
		}
		return err
	})

}

func compressFiles(zipWriter *zip.Writer, fileNamePath string, filename string) error {
	fd, err := os.Open(fileNamePath)
	if err != nil {
		return err
	}
	defer fd.Close()
	zipEntry, err := zipWriter.Create(filename)
	if err != nil {
		fd.Close()
		return err
	}

	_, err = io.Copy(zipEntry, fd)
	return err
}
