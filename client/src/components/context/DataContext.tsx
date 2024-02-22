import { createContext, useContext } from "react";

type DataContextType = {
    toggleSelection: (itemName: string, ctrlKey: boolean) => void;
    selectedItems: string[];
}


export const DataContext = createContext<DataContextType| undefined>(undefined);

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext debe ser utilizado dentro de un DataProvider');
    }
    return context;
};