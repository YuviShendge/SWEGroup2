import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search_style.css";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    brand: "all",
    price: "all",
    productType: "all"
  });

  useEffect(() => {
    axios.get("http://localhost:3002/products")
      .then((res) => {
        console.log("Fetched products:", res.data);
        setProducts(res.data);
        setFilteredProducts(res.data); // initial view
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  useEffect(() => {
    let results = products;

    if (filters.searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.brand !== "all") {
      results = results.filter(product =>
        product.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters.productType !== "all") {
      results = results.filter(product =>
        product.product_type.toLowerCase() === filters.productType.toLowerCase()
      );
    }

    if (filters.price !== "all") {
      switch (filters.price) {
        case "low":
          results = results.filter(product => product.price < 15);
          break;
        case "medium":
          results = results.filter(product => product.price >= 15 && product.price < 30);
          break;
        case "high":
          results = results.filter(product => product.price >= 30);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(results);
  }, [filters, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="search-page">
      <div className="navbar-containerS">
        <Link to="/home">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/services">Services</Link>
        <Link to="/shop">Shop</Link>
      </div>

      <div className="search-containerS">
        <label htmlFor="search"><strong>Search</strong></label>
        <input
          type="text"
          id="search"
          name="searchTerm"
          placeholder="Type here..."
          value={filters.searchTerm}
          onChange={handleFilterChange}
        />
      </div>

      <div className="filter-options">
        <h2>Filter Options</h2>

        <label htmlFor="productType"><strong>Product Type</strong></label>
        <select id="productType" name="productType" value={filters.productType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="lipstick">Lipstick</option>
          <option value="blush">Blush</option>
          <option value="foundation">Foundation</option>
          <option value="eyeliner">Eyeliner</option>
          <option value="mascara">Mascara</option>
        </select>

        <label htmlFor="brand"><strong>Brand</strong></label>
        <select id="brand" name="brand" value={filters.brand} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="nars">NARS</option>
          <option value="mac">MAC</option>
          <option value="nyx">NYX</option>
          <option value="c'est moi">C'est moi</option>
          <option value="colourpop">Colourpop</option>
        </select>

        <label htmlFor="price"><strong>Price</strong></label>
        <select id="price" name="price" value={filters.price} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="low">$ (Under $15)</option>
          <option value="medium">$$ ($15 - $30)</option>
          <option value="high">$$$ (Over $30)</option>
        </select>
      </div>

      <div className="table-container">
        <h3 className="results-title">Results ({filteredProducts.length})</h3>
        {filteredProducts.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id || product.name}>
                  <td>{product.brand}</td>
                  <td>{product.name}</td>
                  <td>{product.product_type}</td>
                  <td>${product.price?.toFixed(2)}</td>
                  <td>{product.description?.slice(0, 50)}...</td>
                  <td>
                    <img
                      src={product.api_featured_image}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
