package service

type File struct {
	Name string `json:"name"`
	Size string `json:"size"`
	Path string `json:"path"`
}

type Directory struct {
	Name string `json:"name"`
	Size string `json:"size"`
	Path string `json:"path"`
}

type FileAndDirectory struct {
	Files       []File
	Directories []Directory
}
