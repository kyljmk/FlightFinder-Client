import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { FlightSearch } from "../Types";

function Search() {
    const [flightSearch, setFlightSearch] = useState<FlightSearch>({
        startDate: new Date(),
        endDate: new Date(),
        option: "Return",
        departure: "",
        arrival: "",
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

    return (
        <div>
            <h1>Search</h1>
            <div>
                <input type="text" name="departure" value={flightSearch.departure} onChange={handleChange} /> <br/>
                <input type="text" name="arrival" value={flightSearch.arrival} onChange={handleChange} />
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
          />
        </div>
    )
};

export default Search;