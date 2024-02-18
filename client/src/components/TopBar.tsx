import '../styles/TopBar.css'
import Button from './Button';

function TopBar({icon }: { icon: string}) {
    return (
        <div className="top-bar-container">
            <div className="input-container">
                <input type="text" placeholder="Buscar"/>
                <Button type='search' icon={icon}/>
            </div>
        </div>
    ); 
}
export default TopBar