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