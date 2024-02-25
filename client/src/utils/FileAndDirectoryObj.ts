import { DirectoryObj, FileObj } from "../interfaces/FileAndDirectory";

export let fileAndDirectory = {
    files: [""],
};

export function setValue(value: string[]) {
    fileAndDirectory['files'] = value;
}

export function getValue() {
    return fileAndDirectory['files'];
};

export function getLength() {
    return fileAndDirectory.files.length;
}

export let searchObj = {
    data: "",
};

export let cleanSelectDir: DirectoryObj;
cleanSelectDir = {
    name: '',
    size: '',
    path: '',
    basename: '',
    accessDir: () => { }
}

export let cleanSelectFile: FileObj;
cleanSelectFile = {
    name: '',
    size: '',
    path: '',
    basename: '',
}