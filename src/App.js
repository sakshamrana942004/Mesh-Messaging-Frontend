import React, { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {

    const socket = new WebSocket("ws://localhost:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {

      try{

        const data = JSON.parse(event.data);

        if(data.type === "chat"){
          setMessages(prev => [...prev, "Node: " + data.message]);
        }

      }catch{

        setMessages(prev => [...prev, event.data]);

      }

    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    setWs(socket);

  }, []);


  const sendMessage = () => {

    if(!msg || !ws) return;

    ws.send(msg);

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

          {messages.map((m,i)=>(
            <div key={i} className="msg">
              {m}
            </div>
          ))}

        </div>

        <div className="input">

          <input
          value={msg}
          onChange={(e)=>setMsg(e.target.value)}
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