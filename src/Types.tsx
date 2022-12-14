import { Dispatch, SetStateAction } from "react";

export interface IFlightSearch {
    startDate: Date,
    endDate: Date,
    option: string,
    departureDestination: string,
    arrivalDestination: string,
    adults: number | undefined,
    children: number | undefined
}

export interface ISearchResults {
    id: string,
    departureDestination: string,
    arrivalDestination: string,
    itineraries: Itinerary[]
}

export interface Itinerary {
    id: string,
    departureTime: Date,
    arrivalTime: Date,
    availableSeats: number,
    prices: Prices
}

export interface Prices {
    id: string,
    currency: string,
    adult: number,
    child: number
}

export interface InfoContextType {
    searchResults: ISearchResults[];
    setSearchResults: Dispatch<SetStateAction<ISearchResults[]>>;
    flightSearch: IFlightSearch;
    setFlightSearch: Dispatch<SetStateAction<IFlightSearch>>;
};

export interface FlightCardProps {
    departureTime: Date,
    arrivalTime: Date,
    prices: Prices
}