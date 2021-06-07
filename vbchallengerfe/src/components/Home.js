import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "../App.css";

export default function Home() {
    const [passcode, setPasscode] = useState({
        code: "",
    });

    const [waitlist, setWaitlist] = useState([]);

    const socket = io("http://localhost:4000");
    // const productSocket = io("https://example.com/product", { forceNew: true }); // the "product" namespace

    // This is receiving messages from the BE labeled "connection"
    useEffect(() => {
        socket.on("connection", (data) => {
            console.log("Connection from FE:", data);
            // socket.emit("sendPasscode", passcode);
        });
        socket.on("message", (data) => {
            console.log("FE receiving from BE in message:", data.code);
            // document.querySelector("h2").innerHTML = data.code;
            setWaitlist(data.code);
        });
        return () => socket.disconnect();
    }, [socket]);

    useEffect(() => {
        socket.on("disconnect", () => {
            socket.removeAllListeners();
        });
    }, []);

    const handleChange = (e) => {
        setPasscode({ code: e.target.value });
    };

    // This sends a message to the backend labeled "message"
    const handleSubmit = (e) => {
        e.preventDefault();
        // localStorage.setItem("passcode", passcode.code);
        // setWaitlist(passcode.code);
        socket.emit("sendPasscode", passcode);
    };

    return (
        <>
            <div className="App">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="passcode">Beach Passcode</label>
                    <input
                        type="text"
                        name="passcode"
                        value={passcode.code}
                        onChange={handleChange}
                    ></input>
                    <input type="submit"></input>
                </form>
                <h2>temp</h2>
                <h3>{waitlist}</h3>
            </div>
        </>
    );
}
