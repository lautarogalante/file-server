import '../styles/FileAndDirectory.css'
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import getDataFromEndpoint from "../api/handleRequest";
import { PathContext } from './context/PathContext';
import { handleDirectoryClick } from "../utils/EventsButton";
import { useDataContext } from './context/DataContext';
import { DirectoryListTypes, FileListTypes, FileAndDirectory } from '../interfaces/FileAndDirectory'
import { useRefContext } from './context/RefContext';

function DataSection() {
    const [fileAndDirectory, setFileAndDirectory] = useState<FileAndDirectory | null>(null);
    const { pathFlag, changePathFlag, pathValue, changePathValue } = useContext(PathContext);
    const { selectedItems, toggleSelection } = useDataContext();
    const { globalRef } = useRefContext();

    useEffect(() => {

        const getData = async () => {
            try {
                const data = await getDataFromEndpoint(pathValue);
                setFileAndDirectory(data)
            } catch (error) {
                console.error(error);
            }
        };
        getData();

    }, [pathFlag]);


    return (
        <div className="fl-and-dr-container">
            {fileAndDirectory && (
                <>
                    <FileList
                        icon='fa fa-file'
                        files={fileAndDirectory.Files}
                        selectedItems={selectedItems}
                        toggleSelection={toggleSelection}
                    />

                    <DirectoryList
                        accessDir={handleDirectoryClick({ changePathFlag, changePathValue, pathValue }, selectedItems)}
                        icon='fa fa-folder' directories={fileAndDirectory.Directories}
                        selectedItems={selectedItems}
                        toggleSelection={toggleSelection}
                        ref={globalRef}
                    />
                </>
            )}
        </div>
    );
}

const FileList = forwardRef(({
    icon, files,
    selectedItems,
    toggleSelection }: FileListTypes,
    globalRef: Ref<HTMLDivElement>

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(files) && files.map((file, index) => (
                    <div id="dir-file" className={`file ${selectedItems.includes(file.name) ? 'selected' : 'file'}`}
                        key={index}
                        onClick={(e) => toggleSelection(file.name, e.ctrlKey)}
                        ref={globalRef}
                    >
                        <span id="dir-file" className="fl-icon"><i className={icon}></i></span>
                        <span id="dir-file" className="fl-sp">{file.name}</span>
                        <span id="dir-file" className="fl-sp">{file.size}</span>
                    </div>
                ))}
            </div>
        </div>
    );
});

const DirectoryList = forwardRef(({
    directories, icon,
    accessDir, selectedItems,
    toggleSelection }: DirectoryListTypes,
    globalRef: Ref<HTMLDivElement>

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(directories) && directories.map((directory, index) => (
                    <div id="dir-file" className={`dir ${selectedItems.includes(directory.name) ? 'selected' : 'dir'}`}
                        key={index}
                        onDoubleClick={() => accessDir(directory)}
                        onClick={(e) => toggleSelection(directory.name, e.ctrlKey)}
                        ref={globalRef}
                    >
                        <span id="dir-file" className="dir-icon"><i className={icon}></i></span>
                        <span id="dir-file" className="dir-sp">{directory.name}</span>
                        <span id="dir-file" className="dir-sp">{directory.size}</span>
                    </div>
                ))}
            </div>
        </div>

    );
});

export default DataSection;