import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import useInfo from "../Hooks/UseInfo";
import { IFlightSearch, InfoContextType } from "../Types";

function Search() {
    const [flightSearch, setFlightSearch] = useState<IFlightSearch>({
        startDate: new Date(),
        endDate: new Date(),
        option: "Return",
        departureDestination: "",
        arrivalDestination: "",
        adults: 0,
        children: 0
    })
  
    const selectionRange = {
        startDate: flightSearch.startDate,
        endDate: flightSearch.option === "One-Way" ? flightSearch.startDate : flightSearch.endDate,
        key: "selection",
      };

    const handleSelect = (ranges: any) => {
        setFlightSearch(prev => ({
            ...prev,
            startDate: ranges.selection.startDate,
            endDate: flightSearch.option === "One-Way" ? ranges.selection.startDate : ranges.selection.endDate
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target;
        setFlightSearch(prev => ({
            ...prev,
            [name] : value,
            endDate: flightSearch.startDate,
        }))
    }

    const formattedStartDate: string = (flightSearch.startDate.toLocaleString("sv", { timeZone: "Europe/Paris"})).slice(0,10);
    const formattedEndDate: string = (flightSearch.endDate.toLocaleString("sv", { timeZone: "Europe/Paris"})).slice(0,10);

    const { setSearchResults } = useInfo() as InfoContextType;
    const navigate = useNavigate();

    const handleClick = () => {
        if(flightSearch.option === "One-Way"){
            fetch(`http://localhost:5237/Flights?StartDate=${formattedStartDate}%2000%3A00%3A00.0000000&Option=${flightSearch.option}&Departure=${flightSearch.departureDestination}&Arrival=${flightSearch.arrivalDestination}&Adults=${flightSearch.adults}&Children=${flightSearch.children}`)
            .then(response => response.json())
            .then(data => setSearchResults(data));
        }
        if (flightSearch.option === "Return"){
            fetch(`http://localhost:5237/Flights?StartDate=${formattedStartDate}%2000%3A00%3A00.0000000&EndDate=${formattedEndDate}%2000%3A00%3A00.0000000&Option=${flightSearch.option}&Departure=${flightSearch.departureDestination}&Arrival=${flightSearch.arrivalDestination}&Adults=${flightSearch.adults}&Children=${flightSearch.children}`)
            .then(response => response.json())
            .then(data => setSearchResults(data));
        }
        navigate("/Results");
    }

    return (
        <div>
            <h1>Search</h1>
            <div>
                <input type="text" name="departureDestination" value={flightSearch.departureDestination} onChange={handleChange} /> <br/>
                <input type="text" name="arrivalDestination" value={flightSearch.arrivalDestination} onChange={handleChange} />
            </div>
            <div onChange={handleChange}>
                <input type="radio" value="Return" name="option" id="radio-return" defaultChecked={true} />
                <label htmlFor="radio-return">Return</label>
                <input type="radio" value="One-Way" name="option" id="radio-one-way" />
                <label htmlFor="radio-one-way">One-Way</label>
            </div>
            <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date('December 12, 2022')}
            maxDate={new Date('December 19, 2022')}
            rangeColors={["#f7c9d4"]}
            onChange={handleSelect}
            /><br />
            <button onClick={handleClick}>Search</button>
        </div>
    )
};

export default Search;