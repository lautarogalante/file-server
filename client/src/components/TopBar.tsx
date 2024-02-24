import { useEventContext } from '../context/EventContext';
import '../styles/TopBar.css'
import { searchObj } from '../utils/FileAndDirecotuObj';
import Button from './Button';

function TopBar({icon }: { icon: string}) {
    const { setSearchFlag } = useEventContext();
    const getSearchTarget = () => {
        let value = (document.getElementById("search-ipt") as HTMLInputElement).value;
        searchObj.data = value;
        (document.getElementById("search-ipt") as HTMLInputElement).value = "";
        setSearchFlag(true);
    }

    return (
        <div className="top-bar-container">
            <div className="input-container">
                <input id="search-ipt" type="text" placeholder="Buscar"/>
                <Button id="search" textClass="search-sp" onClick={getSearchTarget} type='search' icon={icon}/>
            </div>
        </div>
    ); 
}
export default TopBar