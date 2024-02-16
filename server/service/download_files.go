package service

import (
	"archive/zip"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Download(c *fiber.Ctx) DownloadName {
	var clientData ClientData
	if err := c.BodyParser(&clientData); err != nil {
		return DownloadName{
			Err: err,
		}
	}

	if clientData.Files != nil {
		zipFile := bachFiles(clientData.Files, clientData.Path)
		if zipFile.Err != nil {
			return DownloadName{
				Err: zipFile.Err,
			}
		}
		return DownloadName{Name: zipFile.Name, Err: nil}
	} else {
		filePath := filepath.Join(clientData.Path, clientData.File)
		if _, err := os.Stat(filePath); err != nil {
			if os.IsNotExist(err) {
				return DownloadName{Err: fmt.Errorf("the file not exist")}
			}

		}
		return DownloadName{Name: filePath, Err: nil}
	}

}

func bachFiles(name []string, path string) DownloadName {
	now := time.Now().UTC()
	formatted := now.Format("20060102T150405Z")
	zipFileName := "download-" + formatted + ".zip" //TODO: crear una carpeta para guardar el zip
	zipFile, err := os.Create(zipFileName)
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
				return DownloadName{Err: fmt.Errorf("the file not exist")}
			}
		}

		fd, err := os.Open(fileNamePath)
		if err != nil {
			return DownloadName{Err: err}
		}

		zipEntry, err := zipWriter.Create(filename)
		if err != nil {
			fd.Close()
			return DownloadName{Err: err}
		}

		if _, err = io.Copy(zipEntry, fd); err != nil {
			fd.Close()
			return DownloadName{Err: err}
		}
		fd.Close()
	}
	return DownloadName{Name: zipFileName, Err: nil}
}
