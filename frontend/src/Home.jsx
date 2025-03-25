import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./welcome_style.css";
import aadithiImg from "./images/aadithi.JPG";
import patrickImg from "./images/patrick.jpg";

const Home = () => {
  return (
    <div>
      <header>
        <div className="search-containerW">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search" />
        </div>
        <a href="#" className="korean">Color Match</a>
        <a href="#" className="products">Products</a>
        <Link to="/login" className="login">Register/Login</Link> {/* Updated Link */}
      </header>

      <div className="pinkbg"></div>
      {[...Array(9)].map((_, index) => (
        <div key={index} className={`yellow_circ${index + 1}`}></div>
      ))}

      <div className="image-container">
        <img src={aadithiImg} alt="Friends Hugging" className="main-image" />
      </div>

      <div className="slay-frame">
        <img src={patrickImg} alt="Patrick Star" className="logo" />
      </div>
    </div>
  );
};

export default Home;
