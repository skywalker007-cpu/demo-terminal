import React, { useEffect, useState, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

const socketProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const socketUrl = `${socketProtocol}//${window.location.hostname}:6060`;
const socket = new WebSocket(socketUrl);

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    if (!term.current) {
      term.current = new Terminal({ cursorBlink: true });
      term.current.open(terminalRef.current);
      // always open for key press unless close the current. 
      term.current.onKey(({ key }) => {
        runCommand(key);
      });
    }
  }, []);


  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat-response") {
        setAiResponse(data.response);
      } else if (data.type === "terminal-output") {
        term.current.write(data.output);
      }
    };
  }, []);

  const runCommand = (command) => {
    socket.send(JSON.stringify({ type: "command", command }));
  };

  const sendPrompt = async () => {
    try {
      const response = await fetch("http://localhost:6060/process-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setAiResponse(data.response);
      runCommand(data.response);
    } catch (error) {
      console.error("Error processing AI response", error);
    }
    setPrompt("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh" }}>
      <div ref={terminalRef} style={{ marginTop: "10px", width: "50%", border: "1px solid black", overflow: "hidden" }}></div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
        style={{ width: "50%", height: "80px", marginTop: "10px", borderRadius: "5px" }}
      />
      <button onClick={sendPrompt} style={{ marginTop: "10px" }}>Send</button>
      <p>AI Response: {aiResponse}</p>
    </div >
  );
};

export default TerminalComponent;
