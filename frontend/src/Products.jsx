import React from "react";
import {useEffect, useState} from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./welcome_style.css";
import axios from "axios";

function Products() {
  const [Makeup, setMakeup] = useState([]);

  useEffect(() => {
    console.log("Fetching products...");
    axios
      .get("http://localhost:3002/products")
      .then((response) => {
        console.log("Response data:", response.data);
        setMakeup(response.data);
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

const filteredMakeup = Makeup.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div>
    <header>
      <div className="search-containerW">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <Link to="/search" className="korean">
        Filter
      </Link>
      <Link to="/home" className="products">
        Home
      </Link>
      <Link to="/login" className="login">
        Register/Login
      </Link>
    </header>
    <div className="pinkbg">
      <table className="table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {filteredMakeup.length > 0 ? (
            filteredMakeup.map((makeup) => (
              <tr key={makeup.id || makeup.name}>
                <td>{makeup.brand}</td>
                <td>{makeup.name}</td>
                <td>{makeup.price}</td>
                <td>{makeup.description}</td>
                <td>
                  <img
                    src={makeup.api_featured_image}
                    alt={makeup.name}
                    width="100"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default Products;
