
import React from "react";

function Navbar({ onNavigate, onLogout }) {
    return (
        <nav className="navbar">
            <h2>Proof Messaging</h2>

            <div>
                <button onClick={() => onNavigate("chat")}>
                    Chat
                </button>

                <button onClick={() => onNavigate("logs")}>
                    Logs
                </button>

                <button onClick={onLogout}>
                    Log out
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

