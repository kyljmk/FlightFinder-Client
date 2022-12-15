import React, { useState } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import useInfo from "../Hooks/UseInfo";
import { InfoContextType } from "../Types";

function Search() {
    const [displayOrder, setDisplayOrder] = useState<number>(0);
    const { flightSearch, setFlightSearch, setSearchResults } = useInfo() as InfoContextType;
    const navigate = useNavigate();
    
    const formattedStartDate: string = (flightSearch.startDate.toLocaleString("sv", { timeZone: "Europe/Paris"})).slice(0,10);
    const formattedEndDate: string = (flightSearch.endDate.toLocaleString("sv", { timeZone: "Europe/Paris"})).slice(0,10);
  
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

    const handleNext = () => {
        setDisplayOrder(prev => prev + 1);
    }

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
        <div className="search">
            <div>
                {displayOrder === 0 && <input type="text" name="departureDestination" value={flightSearch.departureDestination} onChange={handleChange} />}
                {displayOrder === 1 && <input type="text" name="arrivalDestination" value={flightSearch.arrivalDestination} onChange={handleChange} />}
                {displayOrder === 2 && <input type="number" name="adults" value={flightSearch.adults} onChange={handleChange} />}
                {displayOrder === 3 && <input type="number" name="children" value={flightSearch.children} onChange={handleChange} />}
            </div>
            {displayOrder === 4 && (<div onChange={handleChange}>
                <input type="radio" value="Return" name="option" id="radio-return" defaultChecked={true} />
                <label htmlFor="radio-return">Return</label>
                <input type="radio" value="One-Way" name="option" id="radio-one-way" />
                <label htmlFor="radio-one-way">One-Way</label>
            </div>)}
            {displayOrder === 5 && 
            <>
                <DateRange
                    ranges={[selectionRange]}
                    minDate={new Date('December 12, 2022')}
                    maxDate={new Date('December 19, 2022')}
                    rangeColors={["#f7c9d4"]}
                    onChange={handleSelect}
                    className="search--dateRange"
                />
                <button onClick={handleClick}>Search</button>
            </>}
            <button onClick={handleNext}>Next</button>
        </div>
    )
};

export default Search;