import '../styles/FileAndDirectory.css'
import { useContext, useEffect, useState } from "react";
import getDataFromEndpoint, { searchData } from "../api/handleRequest";
import { PathContext } from '../context/PathContext';
import { handleDirectoryClick } from "../utils/EventsButton";
import { useDataContext } from '../context/DataContext';
import { DirectoryListTypes, FileListTypes, FileAndDirectory } from '../interfaces/FileAndDirectory'
import { useEventContext } from '../context/EventContext';
import { searchObj } from '../utils/FileAndDirecotuObj';

function DataSection() {
    const [fileAndDirectory, setFileAndDirectory] = useState<FileAndDirectory | null>(null);
    const { pathFlag, changePathFlag, pathValue, changePathValue } = useContext(PathContext);
    const { selectedDir, selectedFiles, toggleSelectionDir, toggleSelectionFiles } = useDataContext();
    const { searchFlag, setSearchFlag } = useEventContext();

    let data: FileAndDirectory;
    
    useEffect(() => {
        if (searchFlag) {
            const searching = async () => {
                try {
                    data = await searchData(pathValue, searchObj.data);
                    setFileAndDirectory(data);
                }catch(error){
                    console.error(error);
                }
            }
            searching();
            setSearchFlag(false)
        }else {
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
                    />
                </>
            )}
        </div>
    );
}

const FileList = (({
    icon, files,
    selectedFiles,
    toggleSelectionFiles }: FileListTypes,

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(files) && files.map((file, index) => (
                    <div id="dir-file" className={`file ${selectedFiles.includes(file.name) ? 'selected' : 'file'}`}
                        key={index}
                        onClick={(e) => toggleSelectionFiles(file.name, e.ctrlKey)}
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

const DirectoryList = (({
    directories, icon,
    accessDir, selectedDir,
    toggleSelectionDir }: DirectoryListTypes,

) => {
    return (
        <div id="dir-file" className="dir-file-cont">
            <div id="dir-file">
                {Array.isArray(directories) && directories.map((directory, index) => (
                    <div id="dir-file" className={`dir ${selectedDir.includes(directory.name) ? 'selected' : 'dir'}`}
                        key={index}
                        onDoubleClick={() => accessDir(directory)}
                        onClick={(e) => toggleSelectionDir(directory.name, e.ctrlKey)}
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