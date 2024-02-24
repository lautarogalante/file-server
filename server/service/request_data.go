package service

type RequestData struct {
	DirectoryName string   `json:"directory"`
	QueryPath     string   `query:"queryPath"`
	Target        string   `query:"target"`
	Path          string   `json:"path"`
	Files         []string `json:"files"`
}
