import '../styles/AsideBar.css'
import './Button'
import Button from './Button';
import { downloadData, sendDataToServer } from '../api/handleRequest'
import { useContext } from 'react';
import { PathContext } from './context/PathContext';
import InputComp from './Input';
import { useDataContext } from './context/DataContext';
import { DownloadFiles } from '../interfaces/FileAndDirectory';
import { useRefContext } from './context/RefContext';

function LeftBar() {
    const { pathValue, changePathFlag } = useContext(PathContext);
    const { selectedItems } =  useDataContext();
    const { showInput, callSetShowInput } = useRefContext();

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

    const handleDownloadButtonClick = () => {
        const filesArray: DownloadFiles =  {
            files: selectedItems
        };
        if (filesArray.files.length === 0 || filesArray.files[0] === '') {
        }else{
            downloadData(filesArray, pathValue)
        }
    }

    return (
        <div className="left-bar">
            <div className="logo-container">
                <span>My Cloud</span>
            </div>
            <div className="button-container">
                <div className="upload-button-container">
                    <Button id='upload-btn' onClick={handleUploadButtonClick} icon='fa-solid fa-plus' title='Subir Archivo' type='upload' />
                    <input multiple type="file" id="send-files" className='input-files' onChange={handleFileInputChange} />
                </div>
                <div className="mkdir-button-container">
                    <Button id='mkdir-btn' onClick={callSetShowInput} icon='fa-solid fa-folder-plus' title='Crear carpeta' type='mkdir' />
                </div>
                {showInput && <InputComp></InputComp>}
                <div className="download-button-container">
                    <Button id='download-btn' onClick={handleDownloadButtonClick} icon='fa fa-cloud-download' title='Descargar' type='download'/>
                </div>
            </div>
        </div>
    );

}
export default LeftBar