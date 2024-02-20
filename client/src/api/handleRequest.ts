import axios, { AxiosResponse } from "axios";

const baseUrl = "http://127.0.0.1:8000"
const endpoint = "/home"

function getDataFromEndpoint(path: string): Promise<FileAndDirectory> {
    const getDataUrl = `${baseUrl}${endpoint}?path=${encodeURIComponent(path)}&_=${Date.now()}`;
    return axios.get<FileAndDirectory>(getDataUrl)
        .then((response: AxiosResponse<FileAndDirectory>) => {
            return response.data;
        }).catch((error) => {
            console.error('Errot when send request: ', error);
            throw error;
        });

}

export default (getDataFromEndpoint);