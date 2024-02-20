
export const handleDirectoryClick = (changePathFlag: () => void, changePathValue: (newPath: string) => void, pathValue: string) => (directory: DirectoryObj) => {
    if (changePathFlag){
        changePathFlag();
        pathValue += directory.name + '/'
        changePathValue(pathValue);
    }
}

export const backOneLevel = (changePathFlag: () => void, changePathValue: (newPath: string) => void, pathValue: string) => () => {
    if (changePathFlag){
        changePathFlag()
        let basePath = pathValue.trim();
        
        let newPath = basePath.replace(/\/[^/]+\/?$/, '/');
        pathValue = newPath 
        if (changePathValue)    {
            changePathValue(newPath);
        }
    }
}

export const backToHome = (changePathFlag: () => void, changePathValue: (newPath: string) => void, pathValue: string) => () => {
    if (changePathFlag) {
        changePathFlag(); 
        pathValue = "/home/lautaro/"
        if (changePathValue) {
            changePathValue(pathValue)
        }
    }
}

