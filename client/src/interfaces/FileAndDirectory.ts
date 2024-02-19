interface FileAndDirectory {
    Directories: DirectoryObj[];
    Files: FileObj[];
};

interface FileObj {
    name: string;
    size: string;
    path: string;
};

interface DirectoryObj {
    name: string;
    size: string;
    path: string;
    accessDir: () => void;
}

interface DataSectionProps {
    basePathUpdated: boolean;
    setBasePathUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionsIconsProps {
    updateBasePath: () => void;
}