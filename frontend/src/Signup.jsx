import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';  // Importing external CSS file for styling

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3002/register", { name, email, password });

      if (response.data.success) {
        console.log("Registration successful:", response.data);
        // Redirect to login page after successful registration
        navigate('/login');
      } else {
        setError(response.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center">Register</h2>

      {error && <div className="error-text">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <label>Name:</label>
        <input
          type="text"
          placeholder="Enter Name"
          autoComplete="off"
          name="name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter Email"
          autoComplete="off"
          name="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          className="input-field"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-3 text-center">Already have an account?</p>

      <button
        onClick={() => navigate('/login')}
        className="create-account-button"
      >
        Login
      </button>
    </div>
  );
}

export default Signup;
