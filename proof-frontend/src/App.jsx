
import React, { useState } from "react";

import Login from "./components/login";
import Signup from "./components/signup";
import Chat from "./components/chat";
import Logs from "./components/logs";
import Navbar from "./components/navbar";

import "./App.css";

function App() {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [authPage, setAuthPage] = useState("login");
    const [page, setPage] = useState("logs");

    function handleLogout() {
        localStorage.removeItem("token");
        setToken(null);
        setAuthPage("login");
    }

    return (
        <div>
            {!token ? (
                authPage === "login" ? (
                    <Login
                        setToken={setToken}
                        setAuthPage={setAuthPage}
                    />
                ) : (
                    <Signup
                        setToken={setToken}
                        setAuthPage={setAuthPage}
                    />
                )
            ) : (
                <>
                    <Navbar
                        onNavigate={setPage}
                        onLogout={handleLogout}
                    />

                    {page === "chat" && <Chat />}
                    {page === "logs" && <Logs />}
                </>
            )}
        </div>
    );
}

export default App;

