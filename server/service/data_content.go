package service

type File struct {
	Name string `json:"name"`
	Size string `json:"size"`
}

type Directory struct {
	Name string `json:"name"`
	Size string `json:"size"`
}

type FileAndDirectory struct {
	Files       []File
	Directories []Directory
}
