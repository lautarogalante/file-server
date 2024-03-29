import axios, { AxiosResponse } from "axios";
import { DownloadFiles, FileAndDirectory, MakeDir } from "../interfaces/FileAndDirectory";
import { DiskStat } from "../interfaces/DiskStat";

const baseUrl = import.meta.env.VITE_HOST_URL;
const port = import.meta.env.VITE_SERVER_PORT;

const home = "/home"
const upload = "/upload"
const mkdir = "/mkdir"
const download = "/download"
const search = "/search"
const disk = "/disk"
const dlt = "/delete"


export async function getDataFromEndpoint(path: string): Promise<FileAndDirectory> {
    const getDataUrl = `${baseUrl}:${port}${home}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}`;
    return axios.get<FileAndDirectory>(getDataUrl)
        .then((response: AxiosResponse<FileAndDirectory>) => {
            return response.data;
        }).catch((error) => {
            console.error('Errot when send request: ', error);
            throw error;
        });

}


export async function sendDataToServer(files: FileList | null, path: any): Promise<AxiosResponse> {
    const uploadUrl = `${baseUrl}:${port}${upload}`
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
    const mkdirUrl = `${baseUrl}:${port}${mkdir}`
    return await axios.post(mkdirUrl, data, {}).then((response: AxiosResponse) => {
        return response.data
    }).catch((error) => {
        throw error
    })
}

export async function downloadData(data: DownloadFiles, path: string): Promise<boolean> {
    const downloadURL = `${baseUrl}:${port}${download}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}`
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
    const searchURL = `${baseUrl}:${port}${search}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}&target=${target}`
    return await axios.get<FileAndDirectory>(searchURL)
    .then((response: AxiosResponse) => {
        return response.data
    }).catch((error) => {
        console.error('searching error: ', error)
        throw error
    }) 
}

export async function getDiskStat(path: string): Promise<DiskStat> {
    const diskStatURL = `${baseUrl}:${port}${disk}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}`
    return await axios.get<DiskStat>(diskStatURL)
    .then((response: AxiosResponse) => {
        return response.data
    }).catch((error) => {
        console.error('error when obtain diskStats: ', error)
        throw error
    });
}

export async function deleteContent(content: FileAndDirectory): Promise<AxiosResponse> {
    const deleteURL = `${baseUrl}:${port}${dlt}`
    return await axios.post(deleteURL, content, {})
    .then((response: AxiosResponse) => {
        return response.data
    }).catch((error) => {
        throw error
    })
}