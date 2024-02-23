import React, { createContext, useContext } from "react";

type DownloadContextType = {
    isDownloading: boolean;
    setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DownloadContext = createContext<DownloadContextType | undefined>(undefined);

export const useDownloadContext = () => {

    const context = useContext(DownloadContext);

    if(!context) {
        throw new Error('useDownloadContext debe ser utilizado dentro de un DownloadProvider')
    }
    return context;
}