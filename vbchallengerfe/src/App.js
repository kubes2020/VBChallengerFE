import "./App.css";
import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";

function App() {
    const socket = io("http://localhost:4000");
    // const productSocket = io("https://example.com/product", { forceNew: true }); // the "product" namespace

    // This is receiving messages from the BE labeled "connection"
    useEffect(() => {
        socket.on("connection", (data) => {
            console.log("Connection from FE", data);
            socket.on("message", (data) => {
                document.querySelector("h2").innerHTML = data;
            });
        });
    }, []);

    const [greeting, setGreeting] = useState("");

    const handleChange = (e) => {
        setGreeting(e.target.value);
    };

    // This sends a message to the backend labeled "message"
    const handleSubmit = (e) => {
        // e.preventDefaut();
        socket.emit("message", greeting);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="greeting"
                    value={greeting}
                    onChange={handleChange}
                ></input>
                <input type="submit"></input>
            </form>
            <h2>temp</h2>
        </div>
    );
}

export default App;
