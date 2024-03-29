package service

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"

	"github.com/gofiber/fiber/v2"
)

func Search(c *fiber.Ctx) Result {
	var search RequestData
	if err := c.QueryParser(&search); err != nil {
		return Result{Err: fmt.Errorf("parsing query error: %v", err)}
	}
	content, err := searchImp(search.QueryPath, search.Target)
	if err != nil {
		return Result{Err: fmt.Errorf("search error: %v", err)}
	}
	jsonData, err := json.Marshal(content)
	if err != nil {
		return Result{Err: fmt.Errorf("error marshaling the data: %v", err)}
	}

	return Result{Data: jsonData, Err: nil}
}

func searchImp(path string, target string) (FileAndDirectory, error) {
	var directories []Directory
	var files []File

	err := filepath.WalkDir(path, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if strings.Contains(d.Name(), target) {
			if d.IsDir() {
				base := filepath.Base(path)
				parentPath := filepath.Dir(path)
				directory := Directory{Name: d.Name(), Size: "--", Path: parentPath, BaseName: base}
				directories = append(directories, directory)
			} else if !d.IsDir() {
				fileSize, err := os.Stat(path)
				if err != nil {
					return fmt.Errorf("error when obtaining stat: %v", err)
				}
				parentPath := filepath.Dir(path)
				base := filepath.Base(parentPath)
				file := File{
					Name:     d.Name(),
					Size:     convertSize(fileSize.Size()),
					Path:     parentPath,
					BaseName: base,
				}
				files = append(files, file)
			}
		}

		return nil
	})

	if err != nil {
		return FileAndDirectory{}, nil
	}

	content := FileAndDirectory{
		Files:       files,
		Directories: directories,
	}

	return content, nil
}
