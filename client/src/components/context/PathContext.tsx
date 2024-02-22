import {createContext } from "react";


export type PathContextType  = {
    pathFlag?: boolean;
    pathValue: string;
    changePathValue: (newPath: string) => void;
    changePathFlag: () => void;
 };

export const PathContext = createContext<PathContextType>({
    pathFlag: false,
    pathValue: "/home/lautaro",
    changePathValue: () => {},
    changePathFlag: () => {}
});


