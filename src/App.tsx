import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Search from "./screen/Search"
import './App.css';

function App() {
  useEffect(() => {
    fetch("http://localhost:5237/flights")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
