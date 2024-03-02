import '../styles/FileAndDirectory.css'
import { useContext, useEffect, useState } from "react";
import { getDataFromEndpoint, searchData } from "../api/handleRequest";
import { PathContext } from '../context/PathContext';
import { handleDirectoryClick } from "../utils/EventsButton";
import { useDataContext } from '../context/DataContext';
import { FileAndDirectory } from '../interfaces/FileAndDirectory'
import { useEventContext } from '../context/EventContext';
import { searchObj } from '../utils/FileAndDirectoryObj';
import { Spinner } from './Spinner';
import { FileList } from './Files';
import { DirectoryList } from './Directories';

function DataSection() {
    const [fileAndDirectory, setFileAndDirectory] = useState<FileAndDirectory | null>(null);
    const { pathFlag, changePathFlag, pathValue, changePathValue } = useContext(PathContext);
    const { selectedDirs, selectedFiles, toggleSelectionDir, toggleSelectionFiles, sortedData } = useDataContext();
    const { searchFlag, setSearchFlag } = useEventContext();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    let data: FileAndDirectory;

    useEffect(() => {
        if (searchFlag) {
            setIsLoading(true);
            const searching = async () => {
                try {
                    data = await searchData(pathValue, searchObj.data);
                    setFileAndDirectory(data);
                    setIsLoading(false);
                } catch (error) {
                    console.error(error);
                }
            }
            searching();
            setSearchFlag(false);
        } else {
            const getData = async () => {
                try {
                    data = await getDataFromEndpoint(pathValue);
                    setFileAndDirectory(data);
                } catch (error) {
                    console.error(error);
                }
            };
            getData();
        }
    }, [pathFlag, searchFlag]);

    const fileReversed = fileAndDirectory?.Files ? [...fileAndDirectory?.Files].reverse() : [];
    const directoryReversed = fileAndDirectory?.Directories ? [...fileAndDirectory?.Directories].reverse() : [];

    const fileList = fileAndDirectory && (
        <FileList
            icon='fa fa-file'
            files={sortedData ? fileAndDirectory.Files : fileReversed}
            selectedFiles={selectedFiles}
            toggleSelectionFiles={toggleSelectionFiles}
        />
    );

    const directoryList = fileAndDirectory && (
        <DirectoryList
            accessDir={handleDirectoryClick({ changePathFlag, changePathValue, pathValue }, selectedFiles, selectedDirs)}
            icon='fa fa-folder'
            directories={sortedData ? fileAndDirectory.Directories : directoryReversed}
            selectedDirs={selectedDirs}
            toggleSelectionDir={toggleSelectionDir}
        />
    );

    return (
        <div className="fl-and-dr-container">
            {isLoading ? (
                <div className="spinner-cont-dwn">
                    <Spinner />
                </div>
            ) : (
                <>
                    {sortedData ? fileList : directoryList}
                    {sortedData ? directoryList : fileList}
                </>
            )}

        </div >
    );

}

export default DataSection;