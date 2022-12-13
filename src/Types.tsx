export interface IFlightSearch {
    startDate: Date,
    endDate: Date,
    option: string,
    departureDestination: string,
    arrivalDestination: string,
    adults: number,
    children: number
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