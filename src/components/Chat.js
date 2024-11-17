// src/components/Chat.js
import React, { useState, useEffect } from 'react';

const ChatComponent = ({ socket }) => {
    const [prompt, setPrompt] = useState('');

    const sendPrompt = () => {
        if (prompt) {
            socket.send(JSON.stringify({ type: 'chat', prompt }));
            setPrompt('');
        }
    };

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [socket]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt"
                style={{ width: '100%', height: '100px' }}
            />
            <button onClick={sendPrompt}>Send</button>
        </div>
    );
};

export default ChatComponent;
