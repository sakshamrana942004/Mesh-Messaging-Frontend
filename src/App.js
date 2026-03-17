import React, { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {

    // ✅ Socket.IO connection
    const s = io("https://mesh-messaging-backend.onrender.com", {
      transports: ["websocket"], // force websocket
    });

    s.on("connect", () => {
      console.log("✅ Connected to server");
    });

    s.on("disconnect", () => {
      console.log("❌ Disconnected");
    });

    // 👇 receive message
    s.on("chat", (data) => {
      setMessages(prev => [...prev, "Node: " + data]);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };

  }, []);

  const sendMessage = () => {

    if (!msg || !socket) return;

    // 👇 send message
    socket.emit("chat", msg);

    setMessages(prev => [...prev, "You: " + msg]);
    setMsg("");

  };

  return (

    <div className="container">

      <h1>🛰 LoRa Mesh Control Panel</h1>

      <div className="dashboard">

        <div className="panel">
          <h2>📡 LoRa Nodes</h2>
          <p>No LoRa nodes detected</p>
        </div>

        <div className="panel">
          <h2>📊 Telemetry</h2>
          <p>RSSI: --</p>
          <p>Battery: --</p>
          <p>GPS: --</p>
        </div>

        <div className="panel">
          <h2>🗺 Network Map</h2>
          <p>Map integration coming soon</p>
        </div>

      </div>

      <div className="chat">

        <h2>💬 Mesh Chat</h2>

        <div className="chatbox">

          {messages.map((m, i) => (
            <div key={i} className="msg">
              {m}
            </div>
          ))}

        </div>

        <div className="input">

          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type message..."
          />

          <button onClick={sendMessage}>
            Send
          </button>

        </div>

      </div>

    </div>

  );

}

export default App;