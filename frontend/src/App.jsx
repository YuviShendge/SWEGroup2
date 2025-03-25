import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home'; 
// import Search from './Search'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} /> 
        <Route path='/home' element={<Home />} /> 
{ /*    <Route path='/search' element={<Search />} />             */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
