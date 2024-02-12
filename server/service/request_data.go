package service

type ClientData struct {
	DirectoryName string   `json:"directory"`
	Path          string   `json:"path"`
	Files         []string `json:"files"`
	File          string   `json:"file"`
}
