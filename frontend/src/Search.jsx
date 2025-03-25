import React from "react";
import { Link } from "react-router-dom";
import "./Search_style.css";

const Search = () => {
  return (
    <div>
      <div className="navbar-containerS">
        <Link to="/home">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/services">Services</Link>
        <Link to="/shop">Shop</Link>
      </div>

      <div className="search-containerS">
        <labelS htmlFor="search"><strong>Search</strong></labelS>
        <inputS type="text" id="search" placeholder="Type here..." />
      </div>

      <div className="filter-options">
        <h2>Filter Options</h2>

        <labelS htmlFor="skinType"><strong>Skin Type</strong></labelS>
        <select id="skinType">
          <option value="all">All</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
          <option value="mix">Mix</option>
        </select>

        <labelS htmlFor="color"><strong>Color</strong></labelS>
        <select id="color">
          <option value="all">All</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
        </select>

        <labelS htmlFor="brand"><strong>Brand</strong></labelS>
        <select id="brand">
          <option value="all">All</option>
          <option value="nars">NARS</option>
          <option value="mac">MAC</option>
          <option value="nyx">NYX</option>
        </select>

        <labelS htmlFor="price"><strong>Price</strong></labelS>
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
