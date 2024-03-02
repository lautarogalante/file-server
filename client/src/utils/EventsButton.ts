import { DirectoryObj, FileObj } from "../interfaces/FileAndDirectory";
import { PathContextType } from "../context/PathContext";

export const handleDirectoryClick = ({ changePathFlag, changePathValue, pathValue }: PathContextType, selectedFiles: FileObj[], selectedDir: DirectoryObj[]) => (directory: DirectoryObj) => {
    if (changePathFlag) {
        changePathFlag();
        if (directory.name == directory.basename) {
            pathValue = directory.path + '/' + directory.basename + '/'
            selectedFiles.length = 0;
            selectedDir.length = 0;
            changePathValue(pathValue);
        }else {
            selectedFiles.length = 0;
            selectedDir.length = 0;
            pathValue += directory.name + '/'
            changePathValue(pathValue);
        }
    }

}

export const backOneLevel = ({ changePathFlag, changePathValue, pathValue }: PathContextType, selectedFiles: FileObj[], selectedDir: DirectoryObj[]) => () => {
    if (changePathFlag) {
        changePathFlag()
        selectedFiles.length = 0;
        selectedDir.length = 0;
        let basePath = pathValue.trim();
        let newPath = basePath.replace(/\/[^/]+\/?$/, '/');
        pathValue = newPath
        if (changePathValue) {
            changePathValue(newPath);
        }
    }
}

export const backToHome = ({ changePathFlag, changePathValue, pathValue }: PathContextType, selectedFiles: FileObj[], selectedDir: DirectoryObj[]) => () => {
    if (changePathFlag) {
        changePathFlag();
        selectedFiles.length = 0;
        selectedDir.length = 0;
        pathValue = import.meta.env.VITE_STORAGE_PATH || '/home/'
        
        if (changePathValue) {
            changePathValue(pathValue)
        }
    }
}
