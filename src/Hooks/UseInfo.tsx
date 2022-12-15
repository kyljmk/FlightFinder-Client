import { ReactNode, useState } from "react";
import { createContext, useContext } from "react";
import { IFlightSearch, InfoContextType, ISearchResults } from "../Types";

const InfoContext = createContext<InfoContextType | null>(null);

export const InfoProvider = ({ children }: {children: ReactNode}) => {
    const [searchResults, setSearchResults] = useState<ISearchResults[]>([{
        id: "",
        departureDestination: "",
        arrivalDestination: "",
        itineraries: []
    }]);
    const [flightSearch, setFlightSearch] = useState<IFlightSearch>({
        startDate: new Date(),
        endDate: new Date(),
        option: "Return",
        departureDestination: "",
        arrivalDestination: "",
        adults: 0,
        children: 0
    })
   
    return (
        <InfoContext.Provider value={{
            searchResults,
            setSearchResults,
            flightSearch,
            setFlightSearch
        }}>{children}</InfoContext.Provider>
    )
}

export default function useInfo() {
    return useContext(InfoContext);
}