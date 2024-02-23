import LeftBar from "./AsideBar";
import DataSection from "./FileAndDirectory";
import { OptionsIcons } from "./OptionsIcons";
import PropertyBar from "./PropertyBar";
import TopBar from "./TopBar";
import '../styles/App.css'
import '../styles/DataSection.css'
import { Download } from "./Download";
import { useDownloadContext } from "../context/DownloadContext";

const MainApp = () => {
    const { isDownloading } = useDownloadContext();
    return (
        <div className='main-container'>
            <div className='left-bar-container'>
                <LeftBar />
            </div>
            <div className='main-section'>
                <TopBar icon='fa fa-search' />
                <OptionsIcons />
                <div id="data-section" className='data-section'>
                    <PropertyBar />
                    <div id="data-cont" className="data-container">
                        <DataSection />
                    </div>
                </div>
            </div>
            {isDownloading && <Download/>}
        </div>
    );
};

export default MainApp;

