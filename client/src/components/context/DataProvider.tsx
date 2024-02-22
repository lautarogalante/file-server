import { useState } from "react";
import { DataContext } from "./DataContext";

interface DataContextProps {
    children: JSX.Element | JSX.Element[];
};

export const DataProvider = ({ children }: DataContextProps) => {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const toggleSelection = (itemName: string, ctrlKey: boolean) => {
        setSelectedItems(prevSelectedItems => {
            let newSelectedItems;
            if (ctrlKey) {
                console.log(selectedItems)
                if (prevSelectedItems.includes(itemName)) {
                    newSelectedItems = prevSelectedItems.filter(name => name !== itemName);
                } else {
                    newSelectedItems = [...prevSelectedItems, itemName];
                }
            } else {
                newSelectedItems = [itemName];
            }
            newSelectedItems = newSelectedItems.filter(item => item !== '');
            return newSelectedItems;
        });
    }

    return (
        <DataContext.Provider value={{ toggleSelection, selectedItems }}>
            {children}
        </DataContext.Provider>
    )
}
