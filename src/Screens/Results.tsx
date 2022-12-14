import useInfo from "../Hooks/UseInfo";
import { InfoContextType } from "../Types";

function Results () {
    const {searchResults} = useInfo() as InfoContextType;

    const handleClick = () => {
        console.log(searchResults);
    }

    return (
        <>
            <h1>Results</h1>
            <h2>List of Results</h2>
            <button onClick={handleClick}>Log</button>
        </>
    )
}

export default Results;