import Button from "./Button";
import { useContext } from 'react';
import '../styles/OptionsBar.css'
import { PathContext } from './context/PathContext';
import { backOneLevel, backToHome } from "../utils/EventsButton";

export const OptionsIcons = () => {

   const {changePathFlag, changePathValue, pathValue} = useContext(PathContext);
    return (
        <div className="opt-icon-container">
            <div className="btns-opt">
                <Button onClick={backOneLevel(changePathFlag, changePathValue, pathValue) } type='back' icon='fa fa-undo'/>
            </div>
            <div className="btns-opt">
                <Button onClick={backToHome(changePathFlag, changePathValue, pathValue)} type='home' icon='fa fa-home'/>
            </div>
            <div className="path-opt">
                <span>{pathValue}</span>
            </div>
        </div>
    );
}
