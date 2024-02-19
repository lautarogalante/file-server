import { PathConfig } from '../api/basePathConfig'

const handleDirectoryClick = (updateBasePath: () => void, changePathValue?: (newValue: string) => void) => (directory: DirectoryObj) => {
    updateBasePath();
    let newPath = PathConfig.basePath += directory.name + '/'
    if (changePathValue)  {
        changePathValue(newPath)
    }
}

export const backOneLevel = (updateBasePath?: () => void, changePathValue?: (newValue: string) => void) => () => {
    if (updateBasePath){
        updateBasePath();
        let basePath = PathConfig.basePath.trim();
        
        let newPath = basePath.replace(/\/[^/]+\/?$/, '/');
        PathConfig.basePath = newPath 
        if (changePathValue)    {
            changePathValue(newPath);
        }
    }
}

export const backToHome = (updateBasePath?: () => void, changePathValue?: (newValue: string) => void) => () => {
    if (updateBasePath) {
        updateBasePath();
        PathConfig.basePath = "/home/lautaro/"
        if (changePathValue) {
            changePathValue(PathConfig.basePath)
        }
    }
}


export default handleDirectoryClick