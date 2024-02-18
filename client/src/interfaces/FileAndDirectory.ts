interface FileAndDirectory {
    Directories: DirectoryObj[];
    Files: FileObj[];
};

interface FileObj {
    name: string;
    size: string;
};

interface DirectoryObj {
    name: string;
    size: string;
}