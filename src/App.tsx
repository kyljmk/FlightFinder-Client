import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Results from "./Screens/Results";
import Search from './Screens/Search';

function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search />} />
        <Route path='/results' element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
