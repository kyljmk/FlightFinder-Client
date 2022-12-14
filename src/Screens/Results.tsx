import FlightCard from "../Components/FlightCard";
import useInfo from "../Hooks/UseInfo";
import { InfoContextType } from "../Types";

function Results () {
    const {searchResults} = useInfo() as InfoContextType;

    const flightCards = searchResults[0].itineraries.map(({
        id, departureTime, arrivalTime, availableSeats, prices
    }) => {
        return (
            <FlightCard
                key={id}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
                availableSeats ={availableSeats}
                prices={prices}
            />
        )
    })

    return (
        <>
            <h1>Results</h1>
            <h2>List of Results</h2>
            {flightCards}
        </>
    )
}

export default Results;