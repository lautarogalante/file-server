import { useState } from "react";
import { DataContext } from "./DataContext";

interface DataContextProps {
    children: JSX.Element | JSX.Element[];
};

export const DataProvider = ({ children }: DataContextProps) => {
    const [selectedDir, setSelectedDir] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

    const toggleSelectionDir = (dirName: string, ctrlKey: boolean) => {
        setSelectedDir(prevSelectedDir => {
            let newSelectedDir;
            if (ctrlKey) {
                if (prevSelectedDir.includes(dirName)) {
                    newSelectedDir = prevSelectedDir.filter(name => name !== dirName);
                } else {
                    newSelectedDir = [...prevSelectedDir, dirName];
                }
            } else {
                newSelectedDir = [dirName];
            }
            newSelectedDir = newSelectedDir.filter(item => item !== '');
            return newSelectedDir;
        });


    }
    const toggleSelectionFiles = (fileName: string, ctrlKey: boolean) => {
        setSelectedFiles(prevSelectedFiles => {
            let newSelectedFiles;
            if (ctrlKey) {
                if (prevSelectedFiles.includes(fileName)) {
                    newSelectedFiles = prevSelectedFiles.filter(name => name !== fileName);
                } else {
                    newSelectedFiles = [...prevSelectedFiles, fileName];
                }
            } else {
                newSelectedFiles = [fileName];
            }
            newSelectedFiles = newSelectedFiles.filter(item => item !== '');
            return newSelectedFiles;
        });

    }
    return (
        <DataContext.Provider value={{ toggleSelectionDir, toggleSelectionFiles, selectedDir, selectedFiles }}>
            {children}
        </DataContext.Provider>
    )
}
