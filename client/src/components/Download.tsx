import { getLength } from '../utils/FileAndDirecotuObj'
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
    const { selectedDir, selectedFiles } = useDataContext(); 
    let data = "Directorio"; 
    if (selectedDir.length > 1) {
       data = "Directorios" 
    }else if (selectedFiles.length > 1) {
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