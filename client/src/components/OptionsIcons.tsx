import Button from "./Button";
import '../styles/OptionsBar.css'
import { backOneLevel, backToHome } from "../utils/DirectoryEvents";
import { useState } from "react";
import { PathConfig } from "../api/basePathConfig";



export const OptionsIcons: React.FC<OptionsIconsProps> = ({updateBasePath}) => {
    const [pathValue, setPathValue] = useState<string>(PathConfig.basePath);
    const changePathValue = (newValue: string) => {
        setPathValue(newValue);
    }; 
    
    return (
        <div className="opt-icon-container">
            <div className="btns-opt">
                <Button onClick={backOneLevel(updateBasePath, changePathValue) } type='back' icon='fa fa-undo'/>
            </div>
            <div className="btns-opt">
                <Button onClick={backToHome(updateBasePath, changePathValue)} type='home' icon='fa fa-home'/>
            </div>
            <div className="path-opt">
                <span>{pathValue}</span>
            </div>
        </div>
    );
}