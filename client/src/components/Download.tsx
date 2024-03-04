import { getLength } from '../utils/FileAndDirectoryObj'
import '../styles/Downloading.css'
import { useDataContext } from '../context/DataContext'

export const Download = () => {
    return (
        <div className="download-cont">
            <Downloading/>
        </div>
    )
}

const Downloading = () => {
    const { selectedDirs, selectedFiles } = useDataContext(); 
    let data = "Directorio"; 
    if (selectedDirs.length > 1 && selectedFiles.length === 0) {
        data = "Directorios" 
    }else if (selectedFiles.length > 1 && selectedDirs.length === 0) {
        data = "Archivos"
    }
    const cantidad = getLength();

    return (
        <> 
            <div className="downloading">
                <span className="icon-sp"><i className="fa-solid fa-file-zipper"></i></span>
                <span className="title-sp">{`Comprimiendo ${cantidad} ${data}`}</span>
            </div>
            <div className="spinner-cont">
                <span className="spinner"><i className="fa fa-spinner"></i></span>
            </div>
        </>
    );
}