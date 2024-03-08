import Button from "./Button";
import { useContext, useState } from 'react';
import "../styles/OptionsBar.css"
import { PathContext } from "../context/PathContext";
import { backOneLevel, backToHome } from "../utils/EventsButton";
import { useDataContext } from "../context/DataContext";
import { FileAndDirectory } from "../interfaces/FileAndDirectory";
import { deleteContent } from "../api/handleRequest";
import Success from "./Success";
import Error from "./Error";
import { cleanSelectDir, cleanSelectFile } from "../utils/FileAndDirectoryObj";

export const OptionsIcons = () => {
    const { changePathFlag, changePathValue, pathValue } = useContext(PathContext);
    const { selectedFiles, selectedDirs, handleSortedData, sortedData, toggleSelectionDir, toggleSelectionFiles } = useDataContext();
    const [ deleted, setDeleted ] = useState<'idle' | 'success' | 'error' | 'void'>('idle');

    const handleDeleteSelection = () => {
        let content: FileAndDirectory = {
            Directories: selectedDirs,
            Files: selectedFiles,
        };
        if (content.Directories.length === 0 && content.Files.length === 0) {
            setDeleted('void');
            setTimeout(() => setDeleted('idle'), 3000);
        } else {
            deleteContent(content).then(() => {
                setDeleted('success');
                changePathFlag();
                setTimeout(() => setDeleted('idle'), 5000);
                toggleSelectionDir(cleanSelectDir, false);
                toggleSelectionFiles(cleanSelectFile, false);
            }).catch(() => {
                setDeleted('error');
                setTimeout(() => setDeleted('idle'), 5000);
            })
        }

    }

    return (
        <div id="opt-bar" className="opt-icon-container">
            <div className="btns-opt">
                <Button id="back" onClick={backOneLevel({ changePathFlag, changePathValue, pathValue }, selectedFiles, selectedDirs)} type='back' icon='fa fa-undo' />
            </div>
            <div className="btns-opt">
                <Button id="home" onClick={backToHome({ changePathFlag, changePathValue, pathValue }, selectedFiles, selectedDirs)} type='home' icon='fa fa-home' />
            </div>
            <div className="path-opt">
                <span>{pathValue}</span>
            </div>
            <div className="sorted-opt">
                <Button id="sorted-btn" onClick={handleSortedData} type="sorted" icon={`${sortedData ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'}`} />
            </div>
            {(selectedFiles.length > 0 || selectedDirs.length > 0 ) && <Button id='delete-btn' onClick={handleDeleteSelection} type="delete" icon='fa-solid fa-trash' />}
            {deleted === 'success' && <Success icon='fa-solid fa-trash' text='Contenido eliminado' />}
            {deleted === 'error' && <Error icon='fa-solid fa-xmark' text='error al eliminar el contenido' />}
            {deleted === 'void' && <Error icon='fa-solid fa-xmark' text='Seleccione el contenido' />}
        </div>
    );
}
