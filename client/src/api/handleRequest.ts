import axios, { AxiosResponse } from "axios";
import { PathConfig } from '../api/basePathConfig'

const baseUrl = "http://127.0.0.1:8000"
const endpoint = "/home"

function getDataFromEndpoint(): Promise<FileAndDirectory> {
    const getDataUrl = `${baseUrl}${endpoint}?path=${encodeURIComponent(PathConfig.basePath)}&_=${Date.now()}`;
    return axios.get<FileAndDirectory>(getDataUrl)
        .then((response: AxiosResponse<FileAndDirectory>) => {
            return response.data;
        }).catch((error) => {
            console.error('Errot when send request: ', error);
            throw error;
        });

}

export default (getDataFromEndpoint);