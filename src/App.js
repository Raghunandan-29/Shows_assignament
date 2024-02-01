import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Showdetails from './Components/Showdetails';
import Previous from './Components/Previous';
import Form from './Components/Form';

function App() {
  return (
  <div>
    <BrowserRouter>
    <Routes>
     <Route path='/'  element={<Home/>}/>
     <Route path="/show-details/:id" element={<Showdetails/>}/>
     <Route path="/show-details/:id/show-details/previous/:id" element={<Previous/>}/>
     <Route path="/show-details/:id/book/:id" element={<Form/>}/>
     </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
