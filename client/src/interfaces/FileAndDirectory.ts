export interface FileAndDirectory {
    Directories: DirectoryObj[];
    Files: FileObj[];
};

export interface FileObj {
    name: string;
    size: string;
    path: string;
    basename: string;
};

export interface DirectoryObj {
    name: string;
    size: string;
    path: string;
    basename: string;
    accessDir: () => void;
};


export interface MakeDir {
    directory: string;
    path: string;
};

export interface DownloadFiles {
    files: string[];
};

export interface FileListTypes {
    files: FileObj[];
    icon: string;
    selectedFiles: string[];
    toggleSelectionFiles: (itemName: string, ctrlKey: boolean) => void;
};

export interface DirectoryListTypes {
    directories: DirectoryObj[], 
    icon: string, 
    accessDir: (directory: DirectoryObj) => void, 
    selectedDir: string[], 
    toggleSelectionDir: (itemName: string, ctrlKey: boolean) => void
};