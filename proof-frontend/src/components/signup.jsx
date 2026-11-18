
import React, { useState } from "react";
import { apiRequest } from "../api";

function Signup({ setToken, setAuthPage }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSignup(e) {
        e.preventDefault();
        setError("");

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }

        try {
            const data = await apiRequest("/auth/signup", {
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
            <form onSubmit={handleSignup}>
                <h2>Create Account</h2>

                <input
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password (minimum 8 characters)"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Signup</button>

                {error && <p className="error">{error}</p>}

                <p>
                    Already registered?
                    <button
                        type="button"
                        onClick={() => setAuthPage("login")}
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Signup;
