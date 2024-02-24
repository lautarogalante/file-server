package service

import (
	"encoding/json"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"

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
	regex, err := regexp.Compile(regexp.QuoteMeta(target))
	if err != nil {
		return FileAndDirectory{}, fmt.Errorf("error compiling regex: %v", err)
	}

	var directories []Directory
	var files []File

	err = filepath.WalkDir(path, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if regex.MatchString(d.Name()) {
			if d.IsDir() {
				base := filepath.Base(path)
				directory := Directory{Name: d.Name(), Size: "--", Path: path, BaseName: base}
				directories = append(directories, directory)
			} else if !d.IsDir() {
				fileSize, err := os.Stat(path)
				if err != nil {
					return fmt.Errorf("error when obtaining stat: %v", err)
				}
				dirPath := filepath.Dir(path)
				base := filepath.Base(dirPath)
				file := File{
					Name:     d.Name(),
					Size:     convertSize(fileSize.Size()),
					Path:     dirPath,
					BaseName: base,
				}
				files = append(files, file)
			}
		}

		return nil
	})

	content := FileAndDirectory{
		Files:       files,
		Directories: directories,
	}

	return content, nil
}
