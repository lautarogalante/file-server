import { createContext, useContext } from "react";

export type RefContextType = {
    globalRef: React.RefObject<HTMLDivElement>
    setShowInput: React.Dispatch<React.SetStateAction<boolean>>
    showInput: boolean;
    handleOutsideClick: (e: MouseEvent) => void;
    callSetShowInput: () => void;
}

export const RefContext = createContext<RefContextType | undefined>(undefined);

export const useRefContext = () => {
    const conxtext = useContext(RefContext);
    if (!conxtext){ 
        throw new Error('useRefContext debe ser utilizado dentro de un  RefProvider')
    }
    return conxtext;
}


