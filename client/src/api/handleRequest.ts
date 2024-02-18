import axios, { AxiosResponse } from "axios";

const baseUrl = "http://127.0.0.1:8000"
const endpoint = "/home"
const path = "/home/lautaro";
const getDataUrl = `${baseUrl}${endpoint}?path=${encodeURIComponent(path)}`;

function getDataFromEndpoint(): Promise<FileAndDirectory> {
    return axios.get<FileAndDirectory>(getDataUrl)
        .then((response: AxiosResponse<FileAndDirectory>) => {
            return response.data;
        }).catch((error) => {
            console.error('Errot when send request: ', error);
            throw error;
        });

}

export default (getDataFromEndpoint);