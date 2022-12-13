import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { IFlightSearch } from "../Types";

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

    const now = new Date()
    console.log(now.toLocaleString("sv", { timeZone: "Europe/Paris"}));
  
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

    const handleClick = () => {
        console.log("Hello")
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
            minDate={new Date()}
            rangeColors={["#f7c9d4"]}
            onChange={handleSelect}
            /><br />
            <button onClick={handleClick}>Search</button>
        </div>
    )
};

export default Search;