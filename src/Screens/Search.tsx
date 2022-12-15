import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
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
        if((displayOrder === 0 && flightSearch.departureDestination === "")
        || (displayOrder === 1 && flightSearch.arrivalDestination === "")
        || (displayOrder === 3 && flightSearch.adults === undefined && flightSearch.children === undefined)){
            return;
        }
        if(displayOrder === 4){
            if(flightSearch.adults === undefined)
            {
                setFlightSearch(prev => ({
                    ...prev,
                    adults: 0
                }))
            }
            if(flightSearch.children === undefined)
            {
                setFlightSearch(prev => ({
                    ...prev,
                    children: 0
                }))
            }
        }
        setDisplayOrder(prev => prev + 1);
    }

    const handleBack = () => {
        setDisplayOrder(prev => prev - 1);
    }

    const handleSearch = () => {
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
        setDisplayOrder(0);
    }

    return (
        <div className="search">
            {displayOrder === 0 && <input 
                type="text"
                name="departureDestination"
                value={flightSearch.departureDestination}
                onChange={handleChange}
                className="search--departure--input"
                autoComplete="off"
                placeholder="where are you flying from?"
            />}
            {displayOrder === 1 && <input
                type="text"
                name="arrivalDestination"
                value={flightSearch.arrivalDestination}
                onChange={handleChange}
                className="search--arrival--input"
                autoComplete="off"
                placeholder="and where are you flying to?"
            />}
            {displayOrder === 2 && <input
                type="number"
                name="adults"
                value={flightSearch.adults}
                onChange={handleChange}
                placeholder="how many adults are flying?"
                className="search--adults--input"
                />}
            {displayOrder === 3 && <input
                type="number"
                name="children"
                value={flightSearch.children}
                onChange={handleChange}
                className="search--children--input"
                placeholder="any children under 12?"
                />}
        
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
            </>}
            <div className="search--buttons">
                {displayOrder > 0 && <button className="search--buttons--back" onClick={handleBack}>back</button>}
                {displayOrder < 5 && <button className="search--buttons--next" onClick={handleNext}>next</button>}
                {displayOrder === 5 && <button className="search--buttons--search" onClick={handleSearch}>search</button>}
            </div>
        </div>
    )
};

export default Search;