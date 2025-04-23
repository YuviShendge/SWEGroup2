import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Importing external CSS file for styling

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('📤 Sending login request to backend...');
    console.log('🧾 Payload:', { email, password });

    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('📥 Received response:', data);

      if (response.ok) {
        console.log('✅ Login successful! Redirecting to /home...');
        navigate('/home');
      } else {
        console.warn('⚠️ Login failed:', data.error);
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('🚨 Error during login request:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <br />

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error-text">{error}</p>}
      </form>

      <button
        onClick={() => navigate('/register')}
        className="create-account-button"
      >
        Create an Account
      </button>
    </div>
  );
};

export default Login;
