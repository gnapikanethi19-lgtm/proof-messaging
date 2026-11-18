import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

function Logs({ token }) {

    const [logs, setLogs] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    async function loadLogs() {
        try {
            const data = await apiRequest(
                `/logs?q=${encodeURIComponent(search)}&limit=50`,
                {},
                token
            );

            setLogs(data.logs);
            setError("");
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        loadLogs();
    }, [search, token]);

    async function addLog(e) {
        e.preventDefault();

        try {
            await apiRequest("/logs", {
                method: "POST",
                body: JSON.stringify({ title, content })
            }, token);

            setTitle("");
            setContent("");
            loadLogs();

        } catch (err) {
            setError(err.message);
        }
    }

    async function editLog(log) {
        const newTitle = prompt("Enter new title", log.title);
        if (newTitle === null) return;

        const newContent = prompt("Enter new content", log.content);
        if (newContent === null) return;

        try {
            await apiRequest(`/logs/${log.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    title: newTitle,
                    content: newContent
                })
            }, token);

            loadLogs();

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="logs-container">

            <h2>Today's Work Logs</h2>

            <input
                placeholder="Search logs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <form onSubmit={addLog}>
                <input
                    placeholder="Log title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="What did you work on today?"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                />

                <button type="submit">Create Log</button>
            </form>

            <p>{error}</p>

            {logs.map(log => (
                <div className="log-card" key={log.id}>
                    <h3>{log.title}</h3>

                    <p>{log.content}</p>

                    <small>
                        By {log.username} · {log.created_at}
                    </small>

                    <button onClick={() => editLog(log)}>
                        Edit
                    </button>
                </div>
            ))}

        </div>
    );
}

export default Logs;