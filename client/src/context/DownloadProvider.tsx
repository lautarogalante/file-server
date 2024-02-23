import { useState } from "react";
import { DownloadContext } from "./DownloadContext";

interface DownloadContextProps {
    children: JSX.Element | JSX.Element[]
};

export const DownloadProvider = ({ children }: DownloadContextProps) => {
    const [ isDownloading, setIsDownloading ] = useState<boolean>(false);


    return (
        <DownloadContext.Provider value={ { isDownloading, setIsDownloading } }>
            { children }
        </DownloadContext.Provider>

    );
}