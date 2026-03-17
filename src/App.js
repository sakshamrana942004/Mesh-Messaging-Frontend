import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {

    // ✅ WebSocket connection
    const socket = new WebSocket("wss://mesh-messaging-backend.onrender.com/ws");

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");
    };

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      // ✅ show both chat + join/leave messages
      if (data.type === "chat" || data.type === "info") {
        setMessages(prev => [...prev, data.message]);
      }

    };

    socket.onclose = () => {
      console.log("❌ WebSocket Disconnected");
    };

    setWs(socket);

  }, []);

  const sendMessage = () => {

    if (!msg || !ws) return;

    ws.send(msg);

    setMessages(prev => [...prev, "You: " + msg]);

    setMsg("");

  };

  return (

    <div className="container">

      <h1>🛰 LoRa Mesh Control Panel</h1>

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