import axios, { AxiosResponse } from "axios";
import { DownloadFiles, FileAndDirectory, MakeDir } from "../interfaces/FileAndDirectory";

const baseUrl = "http://127.0.0.1:8000"
const home = "/home"
const upload = "/upload"
const mkdir = "/mkdir"
const download = "/download"
const search = "/search"

async function getDataFromEndpoint(path: string): Promise<FileAndDirectory> {
    const getDataUrl = `${baseUrl}${home}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}`;
    return axios.get<FileAndDirectory>(getDataUrl)
        .then((response: AxiosResponse<FileAndDirectory>) => {
            return response.data;
        }).catch((error) => {
            console.error('Errot when send request: ', error);
            throw error;
        });

}


export async function sendDataToServer(files: FileList | null, path: any): Promise<AxiosResponse> {
    const uploadUrl = `${baseUrl}${upload}`
    if (!files) {
        return Promise.reject("No se han selecionado archivos");
    }

    const formData = new FormData();
    formData.append('path', path);

    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }
    return axios.post(uploadUrl, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },

    }).then((response: AxiosResponse) => {
        return response.data
    }).catch((error) => {
        throw error
    })
}

export async function createDirectory(data: MakeDir): Promise<AxiosResponse> {
    const mkdirUrl = `${baseUrl}${mkdir}`
    return await axios.post(mkdirUrl, data, {}).then((response: AxiosResponse) => {
        return response.data
    }).catch((error) => {
        throw error
    })
}

export async function downloadData(data: DownloadFiles, path: string): Promise<boolean> {
    const downloadURL = `${baseUrl}${download}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}`
    console.log(path, data);
    try {
        const response: AxiosResponse = await axios.post(downloadURL, data, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let filename = response.headers['content-disposition'].split('filename=')[1].trim();
        if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename="(.+)"/i);
            if (filenameMatch && filenameMatch.length === 2)
                filename = filenameMatch[1];
        }
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove()
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function searchData(path: string, target: string): Promise<FileAndDirectory> {
    const searchURL = `${baseUrl}${search}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}&target=${target}`
    return await axios.get<FileAndDirectory>(searchURL)
    .then((response: AxiosResponse) => {
        return response.data
    }).catch((error) => {
        console.error('searching error: ', error)
        throw error
    }) 
}

export default (getDataFromEndpoint);