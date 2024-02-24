import '../styles/AsideBar.css'
import './Button'
import Button from './Button';
import { downloadData, sendDataToServer } from '../api/handleRequest'
import { fileAndDirectory, setValue } from '../utils/FileAndDirecotuObj';
import { useContext } from 'react';
import { PathContext } from '../context/PathContext';
import InputComp from './Input';
import { useDataContext } from '../context/DataContext';
import { useRefContext } from '../context/RefContext';
import { useDownloadContext } from '../context/DownloadContext';

function LeftBar() {
    const { pathValue, changePathFlag } = useContext(PathContext);
    const { selectedFiles, selectedDir, toggleSelectionDir, toggleSelectionFiles} = useDataContext();
    const { showInput, callSetShowInput } = useRefContext();
    const { setIsDownloading } = useDownloadContext();

    const handleUploadButtonClick = () => {
        const fileInput = document.getElementById('send-files') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;

        changePathFlag();
        sendDataToServer(files, pathValue)
            .then((data) => {
                console.log("Archivos subidos exitosamente: ", data);
            })
            .catch((error) => {
                console.error("Error al subir archivos: ", error);
            });

    }

    const handleDownloadButtonClick = async () => {
        console.log(selectedFiles, selectedDir)
        if (selectedFiles.length > 0 || selectedDir.length > 0) {
            let selectedData = selectedFiles.concat(selectedDir);
            setValue(selectedData);
            if (selectedData.length === 0) {
                console.log('No se selecciono ningun archivo o directorio');
                return
            } else {
                if (selectedDir.length >= 1) {
                    setIsDownloading(true);
                    if (await downloadData(fileAndDirectory, pathValue)) {
                        setIsDownloading(false);
                        toggleSelectionDir('', false);
                        toggleSelectionFiles('', false);

                    }
                } else if (selectedFiles.length > 1) {
                    console.log(selectedFiles)
                    setIsDownloading(true);
                    if (await downloadData(fileAndDirectory, pathValue)) {
                        setIsDownloading(false);
                        toggleSelectionFiles('', false);
                    }
                } else {
                    console.log(selectedFiles)
                    downloadData(fileAndDirectory, pathValue);
                    console.log(selectedFiles.length);
                    toggleSelectionFiles('', false);
                }
            }
        }
    }

    return (
        <div className="left-bar">
            <div className="logo-container">
                <span>My Cloud</span>
            </div>
            <div className="button-container">
                <div className="upload-button-container">
                    <Button id='upload-btn' textClass='upload-sp' iconSpClass='i-sp-upload' onClick={handleUploadButtonClick} icon='fa-solid fa-plus' title='Subir Archivo' type='upload' />
                    <input multiple type="file" id="send-files" className='input-files' onChange={handleFileInputChange} />
                </div>
                <div className="mkdir-button-container">
                    <Button id='mkdir-btn' textClass='mkdir-sp' iconSpClass='i-sp-mkdir' onClick={callSetShowInput} icon='fa-solid fa-folder-plus' title='Crear carpeta' type='mkdir' />
                </div>
                {showInput && <InputComp></InputComp>}
                <div className="download-button-container">
                    <Button id='download-btn' textClass='dwn-sp' iconSpClass='i-sp-dwn' onClick={handleDownloadButtonClick} icon='fa fa-cloud-arrow-down' title='Descargar' type='download' />
                </div>
            </div>
        </div>
    );

}
export default LeftBar