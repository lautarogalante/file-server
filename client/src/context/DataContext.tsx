import { createContext, useContext } from "react";
import { DirectoryObj, FileObj } from "../interfaces/FileAndDirectory";

type DataContextType = {
    toggleSelectionDir: (directory: DirectoryObj, ctrlKey: boolean) => void;
    toggleSelectionFiles: (filevalue: FileObj, ctrlKey: boolean) => void;
    selectedDirs: DirectoryObj[];
    selectedFiles: FileObj[];
}


export const DataContext = createContext<DataContextType| undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext debe ser utilizado dentro de un DataProvider');
    }
    return context;
};