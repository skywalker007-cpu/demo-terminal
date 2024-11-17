// src/components/Terminal.js
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

const TerminalComponent = ({ socket }) => {
    const terminalRef = useRef(null);

    useEffect(() => {
        const term = new Terminal({ cursorBlink: true });
        term.open(terminalRef.current);

        // Handle terminal input
        term.onKey(({ key }) => {
            socket.send(JSON.stringify({ type: 'command', command: key }));
        });

        // Handle terminal output
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'terminal-output') {
                term.write(data.output);
            }
        };

        // Clean up
        return () => term.dispose();
    }, [socket]);

    return <div ref={terminalRef} style={{ height: '400px', width: '100%' }} />;
};

export default TerminalComponent;
