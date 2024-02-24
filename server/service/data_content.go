package service

type File struct {
	Name     string `json:"name"`
	Size     string `json:"size"`
	Path     string `json:"path"`
	BaseName string `json:"basename"`
}

type Directory struct {
	Name     string `json:"name"`
	Size     string `json:"size"`
	Path     string `json:"path"`
	BaseName string `json:"basename"`
}

type FileAndDirectory struct {
	Files       []File
	Directories []Directory
}
