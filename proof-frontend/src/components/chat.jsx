import React, { useEffect, useState } from "react";
import { apiRequest, API } from "../api";

function Chat({ token }) {

    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [status, setStatus] = useState("Connecting...");

    useEffect(() => {

        let socket;

        async function loadMessages() {
            try {
                const data = await apiRequest(
                    "/messages?limit=50",
                    {},
                    token
                );

                setMessages(data.messages.reverse());

            } catch (error) {
                console.error(error.message);
            }
        }

        loadMessages();

        const wsURL = API.replace("http", "ws");

        socket = new WebSocket(
            `${wsURL}/ws?token=${encodeURIComponent(token)}`
        );

        socket.onopen = () => {
            setStatus("Connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "message") {
                setMessages(previous => {
                    if (previous.some(
                        msg => msg.id === data.message.id
                    )) {
                        return previous;
                    }

                    return [...previous, data.message];
                });
            }

            if (data.error) {
                console.error(data.error);
            }
        };

        socket.onerror = () => {
            setStatus("Connection error");
        };

        socket.onclose = () => {
            setStatus("Disconnected");
        };

        return () => {
            socket?.close();
        };

    }, [token]);

    function sendMessage(e) {
        e.preventDefault();

        if (!content.trim()) return;

        // Send the message through WebSocket
        // The backend saves it and broadcasts it.

        // We check the socket before sending.
        if (!socketRef.current ||
            socketRef.current.readyState !== WebSocket.OPEN) {
            setStatus("Not connected");
            return;
        }

        socketRef.current.send(
            JSON.stringify({ content })
        );

        setContent("");
    }

    return (
        <div className="chat-container">

            <h2>Proof Live Chat</h2>

            <p>Connection: {status}</p>

            <div className="messages">

                {messages.map(message => (
                    <div className="message" key={message.id}>
                        <strong>{message.username}</strong>
                        <p>{message.content}</p>
                        <small>{message.created_at}</small>
                    </div>
                ))}

            </div>

            <form onSubmit={sendMessage}>
                <input
                    placeholder="Type your message..."
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />

                <button type="submit">Send</button>
            </form>

        </div>
    );
}

export default Chat;