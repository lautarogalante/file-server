import LeftBar from "./AsideBar";
import DataSection from "./ContentSection";
import { OptionsIcons } from "./OptionsIcons";
import PropertyBar from "./PropertyBar";
import TopBar from "./TopBar";
import '../styles/Main.css'
import '../styles/DataSection.css'
import '../styles/AsideBar.css'
import { Download } from "./Download";
import { useDownloadContext } from "../context/DownloadContext";
import { useState } from "react";
import Button from "./Button";

const MainApp = () => {
    const { isDownloading } = useDownloadContext();
    const [leftBarVisible, setLeftBarVisible] = useState(false);
    const toggleLeftBar = () => {
        setLeftBarVisible(!leftBarVisible);
    };

    return (
        <div className='app-container'>
            <div className='main-container'>
                <div className="top-bar-container">
                    <div className="menu-button-cont">
                        <Button id="menu" type='menu-button' onClick={toggleLeftBar} icon="fa-solid fa-bars" />
                    </div>
                    <div id="logo" className="logo-container">
                        <span><i className='fa-solid fa-cloud'></i></span>
                        <span>File Server</span>
                    </div>
                    <TopBar />
                </div>
                <div className="center-container">
                    <div className={`left-bar-container ${leftBarVisible ? 'visible' : 'hidden'}`}>
                        <div className='close-bar-cont'>
                            <Button id="close-bar" type='close-bar' onClick={toggleLeftBar} icon="fa-solid fa-xmark" />
                        </div>
                        <LeftBar />
                    </div>
                    <div className='main-section'>
                        <OptionsIcons />
                        <div id="data-section" className='data-section'>
                            <PropertyBar />
                            <div id="data-cont" className="data-container">
                                <DataSection />
                            </div>
                        </div>
                    </div>
                    {isDownloading && <Download />}
                </div>
            </div>
        </div>
    );
};

export default MainApp;

