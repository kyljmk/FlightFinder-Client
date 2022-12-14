import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";
import { InfoContextType, ISearchResults } from "../Types";

const InfoContext = createContext<InfoContextType | null>(null);

export const InfoProvider = ({ children }: {children: ReactNode}) => {
    const [searchResults, setSearchResults] = useState<ISearchResults[]>([{
        id: "",
        departureDestination: "",
        arrivalDestination: "",
        itineraries: []
    }])
   
    return (
        <InfoContext.Provider value={{
            searchResults,
            setSearchResults,
        }}>{children}</InfoContext.Provider>
    )
}

export default function useInfo() {
    return useContext(InfoContext);
}