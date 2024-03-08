import { useEventContext } from '../context/EventContext';
import '../styles/TopBar.css'
import { searchObj } from '../utils/FileAndDirectoryObj';
import { SwitchButton } from './SwitchTheme';

function TopBar() {
    const { setSearchFlag } = useEventContext();
    const getSearchTarget = () => {
        let value = (document.getElementById("search-ipt") as HTMLInputElement).value;
        if (value === "") {
            console.error('Se debe ingresar un valor a buscar')
        } else {
            searchObj.data = value;
            (document.getElementById("search-ipt") as HTMLInputElement).value = "";
            setSearchFlag(true);
        }
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            getSearchTarget();
        }
    }
    return (
        <div className="top-bar">
            <div className="input-container">
                <div onClick={getSearchTarget} className="search">
                    <span>
                        <i className='fa fa-search'></i>
                    </span>
                </div>
                <input id="search-ipt" type="text" placeholder="Buscar" onKeyDown={handleKeyPress} />
            </div>
            <SwitchButton />
        </div>
    );
}
export default TopBar