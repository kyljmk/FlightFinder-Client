import React, { FormEvent, SyntheticEvent, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function Search() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [flightOption, setFlightOption] = useState<string>("");
  
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      };

      const handleSelect = (ranges: any) => {
        setStartDate(ranges.selection.startDate);
        if (flightOption == "One-Way") {
            setEndDate(ranges.selection.startDate);
        } else {
            setEndDate(ranges.selection.endDate);
        }
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlightOption(e.target.value)
      }

      console.log(startDate);
      console.log(endDate);

    return (
        <div>
            <h1>Search</h1>
            <div onChange={handleChange}>
                <input type="radio" value="One-Way" name="flightOption" />
                <input type="radio" value="Return" name="flightOption" />
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