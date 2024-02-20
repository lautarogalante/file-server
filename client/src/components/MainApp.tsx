import LeftBar from "./AsideBar";
import DataSection from "./FileAndDirectory";
import { OptionsIcons } from "./OptionsIcons";
import PropertyBar from "./PropertyBar";
import TopBar from "./TopBar";
import '../styles/App.css'
import '../styles/DataSection.css'

const MainApp = () => {
    return (
        <div className='main-container'>
            <div className='left-bar-container'>
                <LeftBar />
            </div>
            <div className='main-section'>
                <TopBar icon='fa fa-search' />
                <OptionsIcons />
                <div className='data-section'>
                    <PropertyBar />
                    <div className="data-container">
                        <DataSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainApp;

