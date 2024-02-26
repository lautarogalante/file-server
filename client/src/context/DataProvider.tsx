import { useState } from "react";
import { DataContext } from "./DataContext";
import { DirectoryObj, FileObj } from "../interfaces/FileAndDirectory";

interface DataContextProps {
    children: JSX.Element | JSX.Element[];
};

export const DataProvider = ({ children }: DataContextProps) => {
    const [selectedDirs, setSelectedDir] = useState<DirectoryObj[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<FileObj[]>([]);
    const [sortedData, setSortedData] = useState<boolean>(false);

    const handleSortedData = () => {
        setSortedData(prev => !prev);

    }

    const toggleSelectionDir = (directory: DirectoryObj, ctrlKey: boolean) => {
        setSelectedDir(prevSelectedDir => {
            let newSelectedDir: DirectoryObj[] = [...prevSelectedDir];
            const alreadySelected = newSelectedDir.some(dir => dir.name === directory.name);
            if (ctrlKey) {
                if (alreadySelected) {
                    newSelectedDir = prevSelectedDir.filter(dir => dir.name !== directory.name);
                } else {
                    newSelectedDir.push({
                        name: directory.name, 
                        size: directory.size,
                        path: directory.path,
                        basename: directory.basename,
                        accessDir: () => {}
                    })
                }
            } else {
                newSelectedDir = [{
                    name: directory.name, 
                    size: directory.size,
                    path: directory.path,
                    basename: directory.basename,
                    accessDir: () => {}
                }];
            }
            newSelectedDir = newSelectedDir.filter(item => item.name !== '');
            return newSelectedDir;
        });
    }

    const toggleSelectionFiles = (filevalue: FileObj, ctrlKey: boolean) => {
        setSelectedFiles(prevSelectedFiles => {
            let newSelectedFiles: FileObj[] = [...prevSelectedFiles];
            const alreadySelected = newSelectedFiles.some(file => file.name === filevalue.name);
            if (ctrlKey) {
                if (alreadySelected) {
                    newSelectedFiles = prevSelectedFiles.filter(name => name.name !== filevalue.name);
                } else {
                    newSelectedFiles.push({
                        name: filevalue.name,
                        size: filevalue.size,
                        path: filevalue.path,
                        basename: filevalue.basename,
                    });
                }
            } else {
                newSelectedFiles = [{
                    name: filevalue.name,
                    size: filevalue.size,
                    path: filevalue.path,
                    basename: filevalue.basename,
                }];
            }
            newSelectedFiles = newSelectedFiles.filter(item => item.name !== '');
            return newSelectedFiles;
        });

    }
    return (
        <DataContext.Provider value={{ 
            toggleSelectionDir, toggleSelectionFiles, 
            selectedDirs, selectedFiles, 
            sortedData, handleSortedData 
        }}>
            {children}
        </DataContext.Provider>
    )
}
