import { useEffect, useRef, useState } from "react";
import { EventContext } from "./EventContext";
import { useDataContext } from "./DataContext";
import { cleanSelectDir, cleanSelectFile } from "../utils/FileAndDirectoryObj";

interface EventContextProps {
    children: JSX.Element | JSX.Element[]
};

export const EventProvider = ( { children } : EventContextProps) => {
    const [ showInput, setShowInput ] = useState<boolean>(false);
    const [ searchFlag, setSearchFlag ] = useState<boolean>(false);

    const globalRef = useRef<HTMLDivElement>(null);
    const { toggleSelectionFiles, toggleSelectionDir } = useDataContext();

    const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.id !== "dir-file" && target.id !== "input" && target.id !== "download-btn" && target.id !== "delete-btn"){
            toggleSelectionFiles(cleanSelectFile, false);
            toggleSelectionDir(cleanSelectDir, false);
            setShowInput(false);
        }

    };

    const callSetShowInput = () => {
        setShowInput(prev => !prev);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };

    }, []);

    return (

        <EventContext.Provider value={{ 
            globalRef, setShowInput, 
            showInput, handleOutsideClick, 
            callSetShowInput, setSearchFlag, 
            searchFlag
        }}>
            { children }
        </EventContext.Provider>

    );

}