import { getLength } from '../utils/FileAndDirecotuObj'
import '../styles/Downloading.css'

export const Download = () => {
    return (
        <div className="download-cont">
            <Downloading/>
        </div>
    )
}


const Downloading = () => {
    const cantidad = getLength();
    return (
        <div className="downloading">
            <span className="icon-sp"><i className="fa fa-compress"></i></span>
            <span className="title-sp">{`Comprimiendo ${cantidad} Archivos`}</span>
            <span className="spinner"><i className="fa fa-spinner"></i></span>
        </div>
    );
}