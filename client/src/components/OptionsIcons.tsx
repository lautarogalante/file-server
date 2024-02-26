import Button from "./Button";
import { useContext } from 'react';
import "../styles/OptionsBar.css"
import { PathContext } from "../context/PathContext";
import { backOneLevel, backToHome } from "../utils/EventsButton";
import { useDataContext } from "../context/DataContext";

export const OptionsIcons = () => {
   const { changePathFlag, changePathValue, pathValue } = useContext(PathContext);
   const { selectedFiles, selectedDirs, handleSortedData, sortedData} = useDataContext();

    return (
        <div className="opt-icon-container">
            <div className="btns-opt">
                <Button id="back" onClick={backOneLevel({changePathFlag, changePathValue, pathValue}, selectedFiles, selectedDirs) } type='back' icon='fa fa-undo'/>
            </div>
            <div className="btns-opt">
                <Button id="home" onClick={backToHome({changePathFlag, changePathValue, pathValue}, selectedFiles, selectedDirs)} type='home' icon='fa fa-home'/>
            </div>
            <div className="path-opt">
                <span>{pathValue}</span>
            </div>
            <div className="sorted-opt">
                <Button id="sorted-btn" onClick={handleSortedData} type="sorted" icon={`${sortedData ? 'fa-solid fa-arrow-up' : 'fa-solid fa-arrow-down'}`}/>
            </div>
        </div>
    );
}
