package service

type RequestData struct {
	DirectoryName string   `json:"directory"`
	QueryPath     string   `query:"queryPath"`
	Path          string   `json:"path"`
	Files         []string `json:"files"`
	File          string   `json:"file"`
}

type SendFiles struct {
	Path string `json:"path"`
}
