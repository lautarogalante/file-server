import { useState } from "react";
import { PathContext } from "./PathContext";

const PathConfig = {
    basePath: "/home/lautaro/"
};

interface PathContextProps {
    children: JSX.Element | JSX.Element[];
}

export const PathProvider = ({ children }: PathContextProps) => {
    const [pathValue, setPathValue] = useState<string>(PathConfig.basePath);
    const [pathFlag, setPathFlag] = useState<boolean>(false)

    const changePathValue = (newPath: string) => {
        setPathValue(newPath);
    }

    const changePathFlag = () => {
        setPathFlag(!pathFlag);
    }

    return (
        <PathContext.Provider value={{pathValue, changePathValue, pathFlag, changePathFlag}}>
            { children }
        </PathContext.Provider>
    );
};