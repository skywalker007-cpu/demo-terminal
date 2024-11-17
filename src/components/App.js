// src/components/App.js
import React, { useEffect, useState } from 'react';
import TerminalComponent from './Terminal.js';
import ChatComponent from './Chat.js';

const App = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${protocol}//${window.location.host}`);
        setSocket(ws);

        return () => ws.close();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <h1>AI-Powered Terminal</h1>
            {socket && <TerminalComponent socket={socket} />}
            {socket && <ChatComponent socket={socket} />}
        </div>
    );
};

export default App;
