import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./search.css";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    skinType: "all",
    color: "all",
    brand: "all",
    price: "all",
    productType: "all"
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3002/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
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
        product.product_type?.toLowerCase().includes(filters.productType.toLowerCase())
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
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...currentCart, product];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
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

      {/* <div className="filter-options">
        <h2>Filter Options</h2>
        
        <label htmlFor="skinType"><strong>Skin Type</strong></label>
        <select id="skinType" name="skinType" value={filters.skinType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="oily">Oily</option>
          <option value="dry">Dry</option>
          <option value="mix">Mix</option>
        </select>

        <label htmlFor="color"><strong>Color</strong></label>
        <select id="color" name="color" value={filters.color} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
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
      </div> */}
      <div className="filter-options">
  {/* <h2>Filter</h2> */}

  <label htmlFor="searchTerm"><strong>FILTER</strong></label>
  {/* <input
    type="text"
    id="searchTerm"
    name="searchTerm"
    value={filters.searchTerm}
    placeholder="Search products..."
    onChange={handleFilterChange}
  /> */}

  <label htmlFor="brand"><strong>Brand</strong></label>
  <select id="brand" name="brand" value={filters.brand} onChange={handleFilterChange}>
    <option value="all">All</option>
    <option value="boosh">boosh</option>
    <option value="nyx">NYX</option>
    <option value="deciem">deciem</option>
    <option value="zorah biocosmetiques">zorah biocosmetiques	</option>
    <option value="colourpop">ColourPop</option>
    <option value="sally b's skin yummies">sally b's skin yummies</option>

  </select>

  <label htmlFor="price"><strong>Price</strong></label>
  <select id="price" name="price" value={filters.price} onChange={handleFilterChange}>
    <option value="all">All</option>
    <option value="low">Low (under $15)</option>
    <option value="medium">Medium ($15 - $30)</option>
    <option value="high">High (over $30)</option>
  </select>

  
  <label htmlFor="productType"><strong>Type</strong></label>
<select id="productType" name="productType" value={filters.productType} onChange={handleFilterChange}>
  <option value="all">All</option>
  <option value="foundation">Foundation</option>
  <option value="lip">Lip</option>
  <option value="eye">Eye</option>
  <option value="blush">Blush</option>
  <option value="mascara">Mascara</option>
  <option value="eyeliner">Eyeliner</option>
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
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id || product.name}>
                  <td>{product.brand}</td>
                  <td>{product.name}</td>
                  <td>${product.price?.toFixed(2)}</td>
                  <td>{product.description?.substring(0, 50)}...</td>
                  <td>
                    {product.api_featured_image && (
                      <img src={product.api_featured_image} alt={product.name} className="product-image" />
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </td>

                </tr>
                
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-results">No products match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
