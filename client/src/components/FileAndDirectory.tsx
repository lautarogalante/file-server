import '../styles/FileAndDirectory.css'
import { useEffect, useState } from "react";
import getDataFromEndpoint from "../api/handleRequest";
import  handleDirectoryClick from "../utils/DirectoryEvents";



function DataSection({ basePathUpdated, setBasePathUpdated }: DataSectionProps) {
    const [fileAndDirectory, setFileAndDirectory] = useState<FileAndDirectory | null>(null);

    useEffect(() => {
        const getData = async () => {
            try{
                const data = await getDataFromEndpoint();
                setFileAndDirectory(data)
            }catch(error) {
                console.error(error);
            }
        };
        getData();
    }, [basePathUpdated]);
    
 

    return (
        <div className="fl-and-dr-container">
              {fileAndDirectory && (
                <>
                    <FileList icon='fa fa-file' files={fileAndDirectory.Files} />
                    <DirectoryList  accessDir={handleDirectoryClick(() => setBasePathUpdated(prev => !prev))} icon='fa fa-folder' directories={fileAndDirectory.Directories} />
                    {/* <DirectoryList  accessDir={handleDirectoryClick(updateBasePath)} icon='fa fa-folder' directories={fileAndDirectory.Directories} /> */}
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