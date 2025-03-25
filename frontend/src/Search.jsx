import React from "react";
import { Link } from "react-router-dom";
import "./Search_style.css";

const Search = () => {
  return (
    <div>
      <div className="navbar-container">
        <Link to="/home">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/services">Services</Link>
        <Link to="/shop">Shop</Link>
      </div>

      <div className="search-container">
        <label htmlFor="search"><strong>Search</strong></label>
        <input type="text" id="search" placeholder="Type here..." />
      </div>

      <div className="filter-options">
        <h2>Filter Options</h2>

        <label htmlFor="skinType"><strong>Skin Type</strong></label>
        <select id="skinType">
          <option value="all">All</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
          <option value="mix">Mix</option>
        </select>

        <label htmlFor="color"><strong>Color</strong></label>
        <select id="color">
          <option value="all">All</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>

        <label htmlFor="brand"><strong>Brand</strong></label>
        <select id="brand">
          <option value="all">All</option>
          <option value="nars">NARS</option>
          <option value="mac">MAC</option>
          <option value="nyx">NYX</option>
        </select>

        <label htmlFor="price"><strong>Price</strong></label>
        <select id="price">
          <option value="all">All</option>
          <option value="low">$</option>
          <option value="medium">$$</option>
          <option value="high">$$$</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
