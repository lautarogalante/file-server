import '../styles/AsideBar.css'
import './Button'
import Button from './Button';
import { downloadData, sendDataToServer } from '../api/handleRequest'
import { cleanSelectDir, cleanSelectFile, fileAndDirectory, setValue } from '../utils/FileAndDirectoryObj';
import { useContext, useState } from 'react';
import { PathContext } from '../context/PathContext';
import InputComp from './Input';
import { useDataContext } from '../context/DataContext';
import { useEventContext } from '../context/EventContext';
import { useDownloadContext } from '../context/DownloadContext';
import Success from './Success';
import Error from './Error';
import Disk from './DiskStat';

function LeftBar() {
    const { pathValue, changePathFlag } = useContext(PathContext);
    const { selectedFiles, selectedDirs, toggleSelectionDir, toggleSelectionFiles } = useDataContext();
    const { showInput, callSetShowInput } = useEventContext();
    const { setIsDownloading } = useDownloadContext();
    const [ uploadStatus, setUploadStatus ] = useState<'idle' | 'success' | 'error'>('idle')

    const handleUploadButtonClick = () => {
        const fileInput = document.getElementById('send-files') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    }

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = event.target.files;
        sendDataToServer(files, pathValue)
            .then(() => {
                changePathFlag();
                setUploadStatus('success');
                setTimeout(() => setUploadStatus('idle'), 5000)
            })
            .catch(() => {
                setUploadStatus('error')
                setTimeout(() => setUploadStatus('idle'), 5000)
            });
    }

    const handleDownloadButtonClick = async () => {

        if (selectedFiles.length > 0 || selectedDirs.length > 0) {
            const selectedData: string[] = [...selectedFiles.map(file => file.name), ...selectedDirs.map(dir => dir.name)];
            setValue(selectedData);
            if (selectedData.length === 0) {
                console.log('No se selecciono ningun archivo o directorio');
                return
            } else {
                if (selectedDirs.length >= 1) {
                    setIsDownloading(true);
                    if (await downloadData(fileAndDirectory, selectedDirs[0].path)) {
                        setIsDownloading(false);
                        toggleSelectionDir(cleanSelectDir, false);
                        toggleSelectionFiles(cleanSelectFile, false);
                    }
                } else if (selectedFiles.length > 1) {
                    setIsDownloading(true);
                    if (await downloadData(fileAndDirectory, selectedFiles[0].path)) {
                        setIsDownloading(false);
                        toggleSelectionFiles(cleanSelectFile, false);
                    }
                } else {
                    downloadData(fileAndDirectory, selectedFiles[0].path);
                    toggleSelectionFiles(cleanSelectFile, false);
                }
            }
        }
    }

    return (
        <div id="left-bar" className="left-bar">
            <div className="button-container">
                <div className="upload-button-container">
                    <Button id='upload-btn' textClass='upload-sp' iconSpClass='i-sp-upload' onClick={handleUploadButtonClick} icon='fa-solid fa-plus' title='Subir Archivo' type='upload' />
                    <input multiple type="file" id="send-files" className='input-files' onChange={handleFileInputChange} />
                </div>
                <div className="mkdir-button-container">
                    <Button id='mkdir-btn' textClass='mkdir-sp' iconSpClass='i-sp-mkdir' onClick={callSetShowInput} icon='fa-solid fa-folder-plus' title='Crear carpeta' type='mkdir' />
                </div>
                {showInput && <InputComp/>}
                <div className="download-button-container">
                    <Button id='download-btn' textClass='dwn-sp' iconSpClass='i-sp-dwn' onClick={handleDownloadButtonClick} icon='fa fa-cloud-arrow-down' title='Descargar' type='download' />
                </div>
            </div>
            <Disk Icon='fa-solid fa-hard-drive' Text='Almacenamiento'/>    
            { uploadStatus === 'success' && <Success icon='fa-solid fa-file-circle-check' text='Archivos Subidos'/>}
            { uploadStatus === 'error' && <Error icon='fa-solid fa-xmark' text='Error al subir archivos'/> }
        </div>
    );
}
export default LeftBar