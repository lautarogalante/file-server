import { DirectoryObj } from "../interfaces/FileAndDirectory";
import { PathContextType } from "../components/context/PathContext";
 
export const handleDirectoryClick = ({changePathFlag, changePathValue, pathValue}: PathContextType, selectedItems: string[]) => (directory: DirectoryObj) => {
    if (changePathFlag){
        changePathFlag();
        selectedItems.length = 0;
        pathValue += directory.name + '/'
        changePathValue(pathValue);
    }
}

export const backOneLevel = ({changePathFlag, changePathValue, pathValue}: PathContextType, selectedItems: string[]) => () => {
    if (changePathFlag){
        changePathFlag()
        selectedItems.length = 0;
        let basePath = pathValue.trim();
        let newPath = basePath.replace(/\/[^/]+\/?$/, '/');
        pathValue = newPath 
        if (changePathValue)    {
            changePathValue(newPath);
        }
    }
}

export const backToHome = ({changePathFlag, changePathValue, pathValue }: PathContextType, selectedItems: string[]) => () => {
    if (changePathFlag) {
        changePathFlag(); 
        selectedItems.length = 0;
        pathValue = "/home/lautaro/"
        if (changePathValue) {
            changePathValue(pathValue)
        }
    }
}

