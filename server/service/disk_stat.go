package service

import (
	"encoding/json"
	"fmt"
	"syscall"

	"github.com/gofiber/fiber/v2"
)

type DiskStats struct {
	Total uint64 `total:"json"`
	Used  uint64 `used:"json"`
	Free  uint64 `free:"json"`
}

func GetDiskStat(c *fiber.Ctx) Result {
	var diskStat RequestData
	if err := c.QueryParser(&diskStat); err != nil {
		return Result{Err: fmt.Errorf("query parsing error: %v\n", err)}
	}
	path := diskStat.QueryPath
	var fs = syscall.Statfs_t{}

	err := syscall.Statfs(path, &fs)
	if err != nil {
		return Result{Err: fmt.Errorf("statfs systemcall error: %v\n", err)}
	}

	total := fs.Blocks * uint64(fs.Bsize)
	free := fs.Bfree * uint64(fs.Bsize)
	used := fs.Blocks*uint64(fs.Bsize) - fs.Bfree*uint64(fs.Bsize)

	diskStats := DiskStats{
		Total: total,
		Free:  free,
		Used:  used,
	}

	diskStatJson, err := json.Marshal(diskStats)
	if err != nil {
		return Result{Err: fmt.Errorf("marshaling error: %v\n", err)}
	}

	return Result{Data: diskStatJson, Err: nil}
}

// func convertDiskSize(size uint64) string {
// 	if size <= 1000 {
// 		sizeInBytes := strconv.FormatInt(int64(size), 10) + " bytes"
// 		return sizeInBytes
// 	} else if size >= 1000 && size < 1.0e6 {
// 		sizeInKb := size / 1000
// 		sizeInKbRounded := strconv.FormatInt(int64(sizeInKb), 10) + " kB"
// 		return sizeInKbRounded
// 	} else if size >= 1.0e6 && size < 1.0e9 {
// 		sizeInMb := float64(size) / 1.0e6
// 		sizeInMgRounded := strconv.FormatFloat(sizeInMb, 'f', 1, 64) + " MB"
// 		return sizeInMgRounded
// 	} else {
// 		sizeInGb := float64(size) / 1.0e9
// 		sizeInGbRounded := strconv.FormatFloat(sizeInGb, 'f', 1, 64) + " GB"
// 		return sizeInGbRounded
// 	}

// }
