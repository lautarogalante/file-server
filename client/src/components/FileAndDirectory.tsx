import '../styles/FileAndDirectory.css'
import { Ref, forwardRef, useContext, useEffect, useState } from "react";
import getDataFromEndpoint from "../api/handleRequest";
import { PathContext } from '../context/PathContext';
import { handleDirectoryClick } from "../utils/EventsButton";
import { useDataContext } from '../context/DataContext';
import { DirectoryListTypes, FileListTypes, FileAndDirectory } from '../interfaces/FileAndDirectory'
import { useRefContext } from '../context/RefContext';

function DataSection() {
    const [fileAndDirectory, setFileAndDirectory] = useState<FileAndDirectory | null>(null);
    const { pathFlag, changePathFlag, pathValue, changePathValue } = useContext(PathContext);
    const { selectedDir, selectedFiles, toggleSelectionDir, toggleSelectionFiles } = useDataContext();
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
                        selectedFiles={selectedFiles}
                        toggleSelectionFiles={toggleSelectionFiles}
                    />

                    <DirectoryList
                        accessDir={handleDirectoryClick({ changePathFlag, changePathValue, pathValue }, selectedFiles, selectedDir)}
                        icon='fa fa-folder' 
                        directories={fileAndDirectory.Directories}
                        selectedDir={selectedDir}
                        toggleSelectionDir={toggleSelectionDir}
                        ref={globalRef}
                    />
                </>
            )}
        </div>
    );
}

const FileList = forwardRef(({
    icon, files,
    selectedFiles,
    toggleSelectionFiles }: FileListTypes,
    globalRef: Ref<HTMLDivElement>

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(files) && files.map((file, index) => (
                    <div id="dir-file" className={`file ${selectedFiles.includes(file.name) ? 'selected' : 'file'}`}
                        key={index}
                        onClick={(e) => toggleSelectionFiles(file.name, e.ctrlKey)}
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
    accessDir, selectedDir,
    toggleSelectionDir }: DirectoryListTypes,
    globalRef: Ref<HTMLDivElement>

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(directories) && directories.map((directory, index) => (
                    <div id="dir-file" className={`dir ${selectedDir.includes(directory.name) ? 'selected' : 'dir'}`}
                        key={index}
                        onDoubleClick={() => accessDir(directory)}
                        onClick={(e) => toggleSelectionDir(directory.name, e.ctrlKey)}
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