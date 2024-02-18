import { useEffect, useState } from "react";
import getDataFromEndpoint from "../api/handleRequest";
import '../styles/FileAndDirectory.css'

function FileList({ icon, files }: { files: FileObj[], icon: string}) {
    return (
        <div className="file-cont">
            <div>
                {files.map((file , index) => (
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

function DirectoryList({ icon, directories }: { directories: DirectoryObj[], icon: string}) {
    return (
        <div className="dir-cont">
            <div>
                {directories.map((directory, index) => (
                    <div className="dir" key={index}> 
                        <span className="dir-icon"><i className={icon}></i></span>
                        <span className="dir-sp">{directory.name}</span> 
                        <span className="dir-sp">{directory.size}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FileAndDirectory() {
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
    }, []);
    return (
        <div className="fl-and-dr-container">
              {fileAndDirectory && (
                <>
                    <FileList icon='fa fa-file' files={fileAndDirectory.Files} />
                    <DirectoryList icon='fa fa-folder' directories={fileAndDirectory.Directories} />
                </>
            )}
        </div>
    );
}

export default FileAndDirectory