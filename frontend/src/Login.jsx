import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("All fields are required.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3002/login", { email, password });

            if (response.data.message === "Success") {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("email", email);  // Save email in localStorage
                setLoginSuccess(true);
            } else {
                setError(response.data.message || "Login failed.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-4 rounded w-25 shadow">
                <h2 className="text-center">Login</h2>

                {error && <div className="alert alert-danger">{error}</div>}
                {loginSuccess && (
                    <div className="alert alert-success mb-3">Login successful!</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            name="password"
                            className="form-control rounded-0"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 rounded-0"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <button
                    onClick={() => navigate("/home")}
                    className="btn btn-outline-secondary w-100 rounded-0 mt-3"
                >
                    Continue as Guest
                </button>

                <p className="mt-3 text-center">Don't have an account?</p>
                <Link to="/register" className="btn btn-light border w-100 rounded-0 text-decoration-none text-center">
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;
