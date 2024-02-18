package service

type ClientData struct {
	DirectoryName string   `json:"directory"`
	Path          string   `query:"path"`
	Files         []string `json:"files"`
	File          string   `json:"file"`
}
