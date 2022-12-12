import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function Search() {
    const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      };

      const handleSelect = (ranges: any) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
      };

    return (
        <div>
            <h1>Search</h1>
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