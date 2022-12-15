import FlightCard from "../Components/FlightCard";
import useInfo from "../Hooks/UseInfo";
import { InfoContextType } from "../Types";

function Results () {
    const { searchResults, flightSearch } = useInfo() as InfoContextType;

    const flightCards = searchResults[0].itineraries.map(({
        id, departureTime, arrivalTime, availableSeats, prices
    }) => {
        return (
            <FlightCard
                key={id}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
                prices={prices}
            />
        )
    })

    console.log(searchResults)

    return (
        <div className="results">
            <h1>Results</h1>
            <h2>List of Results For: {flightSearch.departureDestination} - {flightSearch.arrivalDestination} ({flightSearch.option})</h2>
            {flightCards}
        </div>
    )
}

export default Results;