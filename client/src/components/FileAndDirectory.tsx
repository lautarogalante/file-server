import '../styles/FileAndDirectory.css'
import { useContext, useEffect, useState } from "react";
import getDataFromEndpoint from "../api/handleRequest";
import { PathContext } from './context/PathContext';
import  {handleDirectoryClick} from "../utils/EventsButton";

function DataSection() {
    const [fileAndDirectory, setFileAndDirectory] = useState<FileAndDirectory | null>(null);
    const { pathFlag, changePathFlag, pathValue, changePathValue} = useContext(PathContext);

    useEffect(() => {
        const getData = async () => {
            try{
                const data = await getDataFromEndpoint(pathValue);
                setFileAndDirectory(data)
            }catch(error) {
                console.error(error);
            }
        };
        getData();
    }, [pathFlag]);
    
 

    return (
        <div className="fl-and-dr-container">
              {fileAndDirectory && (
                <>
                    <FileList icon='fa fa-file' files={fileAndDirectory.Files} />
                    <DirectoryList  accessDir={handleDirectoryClick(changePathFlag, changePathValue, pathValue)} icon='fa fa-folder' directories={fileAndDirectory.Directories} />
                </>
            )}
        </div>
    );
}

function FileList({ icon, files }: { files: FileObj[], icon: string}) {
    return (
        <div className="file-cont">
            <div>
                {files && files.map((file , index) => (
                    <div className="file" key={index}>
                        <span className="fl-icon"><i className={icon}></i></span>
                        <span className="fl-sp">{file.name}</span> 
                        <span className="fl-sp">{file.size}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DirectoryList({ directories, icon, accessDir }: { directories: DirectoryObj[], icon: string, accessDir: (directory: DirectoryObj) => void}) {
    return (
        <div className="dir-cont">
            <div>
                {directories && directories.map((directory, index) => (
                    <div className="dir" key={index} onDoubleClick={() => accessDir(directory)}> 
                        <span className="dir-icon"><i className={icon}></i></span>
                        <span className="dir-sp">{directory.name}</span> 
                        <span className="dir-sp">{directory.size}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataSection;