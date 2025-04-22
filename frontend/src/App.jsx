import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Home from './Home'; 
import Search from './Search'; 
import Products from './Products';
import Shop from './shop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} /> 
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
         <Route path='/home' element={<Home />} />  
        <Route path='/search' element={<Search />} /> 
        <Route path='/products' element={<Products/>} /> 
        <Route path='/shop' element={<Shop/>} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
