import { DirectoryObj } from "../interfaces/FileAndDirectory";
import { PathContextType } from "../context/PathContext";

export const handleDirectoryClick = ({ changePathFlag, changePathValue, pathValue }: PathContextType, selectedFiles: string[], selectedDir: string[]) => (directory: DirectoryObj) => {
    if (changePathFlag) {
        changePathFlag();
        if (directory.name == directory.basename) {
            pathValue = directory.path + '/'
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

export const backOneLevel = ({ changePathFlag, changePathValue, pathValue }: PathContextType, selectedFiles: string[], selectedDir: string[]) => () => {
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

export const backToHome = ({ changePathFlag, changePathValue, pathValue }: PathContextType, selectedFiles: string[], selectedDir: string[]) => () => {
    if (changePathFlag) {
        changePathFlag();
        selectedFiles.length = 0;
        selectedDir.length = 0;
        pathValue = "/home/lautaro/"
        if (changePathValue) {
            changePathValue(pathValue)
        }
    }
}

// export function restorePath(dir: DirectoryObj): [string, string] {
//     return [dir.basename, dir.path]
// }
