import { useEffect, useRef, useState } from "react";
import { RefContext } from "./RefContext";
import { useDataContext } from "./DataContext";

interface RefContextProps {
    children: JSX.Element | JSX.Element[]
};

export const RefProvider = ( { children } : RefContextProps) => {
    const [ showInput, setShowInput ] = useState<boolean>(false);
    const globalRef = useRef<HTMLDivElement>(null);
    const { toggleSelectionFiles, toggleSelectionDir } = useDataContext();

    const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.id !== "dir-file" && target.id !== "input" && target.id !== "download-btn"){
            toggleSelectionFiles('', false);
            toggleSelectionDir('', false);
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

        <RefContext.Provider value={{ globalRef, setShowInput, showInput, handleOutsideClick, callSetShowInput }}>
            { children }
        </RefContext.Provider>

    );

}