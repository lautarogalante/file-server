package service

import (
	"archive/zip"
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
	}

	return DownloadName{}
}

func bachFiles(name []string, path string) DownloadName {
	now := time.Now().UTC()
	formatted := now.Format("20060102T150405Z")
	zipFileName := "download-" + formatted + ".zip"
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
