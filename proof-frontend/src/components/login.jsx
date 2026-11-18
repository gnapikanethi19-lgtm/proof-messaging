import React, { useState } from "react";
import { apiRequest } from "../api";

function Login({ setToken, setAuthPage }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const data = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    username,
                    password
                })
            });

            localStorage.setItem("token", data.token);
            setToken(data.token);

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="auth-container">
            <form onSubmit={handleLogin}>
                <h2>Welcome Back</h2>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>

                <p>{error}</p>

                <p>
                    New user?
                    <button
                        type="button"
                        onClick={() => setAuthPage("signup")}
                    >
                        Signup
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Login;