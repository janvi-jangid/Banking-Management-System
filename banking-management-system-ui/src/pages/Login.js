import React, { useState } from "react";
import "../styles/Login.css";
import { FaUniversity } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import api, { getApiErrorMessage } from "../services/api";
import { saveAuthUser } from "../services/auth";

function Login() {

    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/dashboard";

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const completeLogin = (message) => {
        saveAuthUser(credentials.username.trim(), message);
        navigate(redirectTo, { replace: true });
    };

    const handleChange = (event) => {

        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        });

        setError("");

    };

    const handleLogin = (event) => {

        event?.preventDefault();

        const username = credentials.username.trim();
        const password = credentials.password.trim();

        if (!username || !password) {
            setError("Please enter username and password.");
            return;
        }

        setLoading(true);

        api.post("/users/login", null, {
            params: {
                username,
                password
            }
        })

            .then((response) => {

                completeLogin(response.data || "Login Successful");

            })

            .catch((err) => {

                const isDemoLogin = username === "admin" && password === "admin123";

                if (!err.response && isDemoLogin) {
                    completeLogin("Demo Login Successful");
                    return;
                }

                setError(getApiErrorMessage(err, "Login failed. Please check your username and password."));

            })

            .finally(() => {

                setLoading(false);

            });

    };

    return (

        <div className="login-page">

            <div className="left-panel">

                <h1>Bank</h1>

                <p>Secure Smart Banking Platform</p>

                <FaUniversity className="bank-icon" />

            </div>

            <div className="right-panel">

                <form className="login-card" onSubmit={handleLogin}>

                    <h2>Welcome Back</h2>

                    <p>Sign in to continue</p>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={handleChange}
                        autoComplete="username"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                    />

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "LOGGING IN..." : "LOGIN"}
                    </button>

                    <div className="demo-login">
                        Demo login: <strong>admin</strong> / <strong>admin123</strong>
                    </div>

                </form>

            </div>

        </div>

    );

}

export default Login;
