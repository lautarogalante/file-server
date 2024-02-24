import React, { createContext, useContext } from "react";

export type EventContextType = {
    globalRef: React.RefObject<HTMLDivElement>;
    setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
    showInput: boolean;
    setSearchFlag: React.Dispatch<React.SetStateAction<boolean>>;
    searchFlag: boolean;
    handleOutsideClick: (e: MouseEvent) => void;
    callSetShowInput: () => void;
}

export const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
    const conxtext = useContext(EventContext);
    if (!conxtext){ 
        throw new Error('useRefContext debe ser utilizado dentro de un  RefProvider')
    }
    return conxtext;
}


