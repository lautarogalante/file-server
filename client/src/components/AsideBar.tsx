import '../styles/AsideBar.css'
import './Button'
import Button from './Button';
function LeftBar() {
    
    return (
        <div className="left-bar">
            <div className="logo-container">
                <span>My Cloud</span> 
            </div>
            <div className="button-container">
                <div className="upload-button-container">
                    <Button icon= 'fa-solid fa-plus' title='Nuevo' type='upload'/>
                </div>
                <div className="mkdir-button-container">
                    <Button icon='fa-solid fa-folder-plus' title='Crear carpeta' type='mkdir'/>
                </div>
            </div>
        </div>
    );

}
export default LeftBar