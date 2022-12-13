import React, { ReactNode, useState } from "react";
import { createContext, useContext } from "react";

const InfoContext = createContext({});

export const InfoProvider = ({ children }: {children: ReactNode}) => {
    const [searchResults, setSearchResults] = useState({})
   
    return <InfoContext.Provider value={{}}>{children}</InfoContext.Provider>
}

export default function useInfo() {
    return useContext(InfoContext);
}