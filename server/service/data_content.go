package service

type File struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
	Type string `json:"type"`
}

type Directory struct {
	Name string `json:"name"`
	Size int64  `json:"size"`
}

type FileOrDirectory struct {
	Files       []File
	Directories []Directory
}
