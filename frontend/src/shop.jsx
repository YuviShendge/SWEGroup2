import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./welcome_style.css";
import patrickImg from "./images/patrick.jpg";

const Shop = () => {
  const [cartItems, setCartItems] = useState([]);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handlePurchase = () => {
    localStorage.removeItem('cart');
    setCartItems([]);
    setPurchased(true);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    
    <div>
        <header>
        <div className="search-containerW">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" />
        </div>    
        <Link to="/home" className="products"> 
            <img src={patrickImg} alt="Patrick Star" className="logo" /> </Link>
        <Link to="/search" className="korean">Filter</Link>
        <Link to="/products" className="products">Products</Link>
        <Link to="/login" className="login">Register/Login</Link> {/* Updated Link */}
      </header>
      <div className="pinkbg"></div>
      {[...Array(9)].map((_, index) => (
        <div key={index} className={`yellow_circ${index + 1}`}></div>
      ))}
      <div className="cart-container">
  <h2>Your Shopping Cart</h2>
  {cartItems.map((item, idx) => (
    <div key={idx}>
      <p>{item.name} - ${item.price}</p>
    </div>
  ))}
  <h3>Total: ${total.toFixed(2)}</h3>
  <button onClick={handlePurchase}>Purchase</button>
  {purchased && <p>Items bought!</p>} </div>
    </div>
  );
};

export default Shop;
