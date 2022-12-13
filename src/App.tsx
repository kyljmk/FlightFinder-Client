import { BrowserRouter, Route, Routes } from "react-router-dom"
import './App.css';
import Search from './Screens/Search';

function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
