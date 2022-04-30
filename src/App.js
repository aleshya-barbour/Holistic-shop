import React from 'react';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import {
 
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './pages/Checkout'
import Cart from './components/Cart';


const App = () => {

    return (
      <div className="app">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='checkout' element={<Checkout />} />
        {/* add cart={Cart} to checkout */}
      </Routes>

        <footer>
          Holistic Shop Created By Aleshya Barbour &copy; 2022
        </footer>

      </div>
    
     
    );
    
  
 
};



export default App;
