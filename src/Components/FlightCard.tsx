import React from 'react'
import useInfo from '../Hooks/UseInfo'
import { FlightCardProps, InfoContextType } from '../Types'

function FlightCard({ departureTime, arrivalTime, prices }: FlightCardProps) {
    const { flightSearch, setFlightSearch } = useInfo() as InfoContextType;
    
    // const adultCost: number = flightSearch.adults * prices.adult;
    // const childrenCost: number = flightSearch.children * prices.child;
    // const cost: number = adultCost + childrenCost;
    return (
        <div>
            <h2>Depart: {departureTime.toString().slice(11,16)} -- Arrive: {arrivalTime.toString().slice(11,16)}</h2>
            {/* <h3>{flightSearch.adults} Adult{flightSearch.adults != 1 ? "s" : ""} & {flightSearch.children} Child{flightSearch.children != 1 ? "ren" : ""}: {cost} {prices.currency}</h3> */}
        </div>
    )
}

export default FlightCard