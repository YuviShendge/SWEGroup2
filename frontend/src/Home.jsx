import React from "react";
import { Link } from "react-router-dom";
import "./welcome_style.css";
import aadithiImg from "./images/aadithi.JPG";
import patrickImg from "./images/patrick.jpg";

const Home = () => {
  // Retrieve the email from localStorage
  const email = localStorage.getItem("email") || "Guest";  // Default to "Guest" if not logged in

  return (
    <div>
      <header>
        <div className="search-containerW">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" />
        </div>
        <Link to="/search" className="korean">Filter</Link>
        <Link to="/products" className="products">Products</Link>
        <Link to="/login" className="login">Register/Login</Link>
      </header>

      <div className="pinkbg"></div>

      {[...Array(9)].map((_, index) => (
        <div key={index} className={`yellow_circ${index + 1}`}></div>
      ))}

      <div className="image-and-text">
        <div className="image-container">
          <img src={aadithiImg} alt="Friends Hugging" className="main-image" />
        </div>
        <div className="text-box">
          <h2>Welcome {email}!</h2>
          <p>
            Our mission is to help you discover and share amazing products, stories,
            and experiences. Whether you're browsing, searching, or contributing—
            you're in the right place!
          </p>
        </div>
      </div>

      <div className="slay-frame">
        <img src={patrickImg} alt="Patrick Star" className="logo" />
      </div>
    </div>
  );
};

export default Home;
