import axios, { AxiosResponse } from "axios";
import { DownloadFiles, FileAndDirectory, MakeDir } from "../interfaces/FileAndDirectory";

const baseUrl = "http://127.0.0.1:8000"
const home = "/home"
const upload = "/upload"
const mkdir = "/mkdir"
const download = "/download"

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

export async function downloadData(data: DownloadFiles, path: string): Promise<void> {
    const downloadURL = `${baseUrl}${download}?queryPath=${encodeURIComponent(path)}&_=${Date.now()}`
    await axios.post(downloadURL, data, { responseType: 'blob' })
        .then((response: AxiosResponse) => {
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
        }).catch((error) => {
            console.error('No se encuentra: ', error)
        })

}


export default (getDataFromEndpoint);