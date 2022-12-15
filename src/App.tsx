import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Results from "./Screens/Results";
import Search from './Screens/Search';
import background from "./background-img.jpeg"
import Header from "./Components/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="App" style={{ backgroundImage: `url(${background})` }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='/results' element={<Results />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
