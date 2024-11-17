import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { handleTerminalConnection, setSharedTerminalMode } from './terminal.js';
import { handleChatConnection } from './chat_server.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const terminalWss = new WebSocketServer({ noServer: true });
const chatWss = new WebSocketServer({ noServer: true });

setSharedTerminalMode(false);

// WebSocket handling for terminal
terminalWss.on('connection', handleTerminalConnection);

// WebSocket handling for chat
chatWss.on('connection', handleChatConnection);

// Upgrade WebSocket connections
server.on('upgrade', (request, socket, head) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

    if (pathname === '/terminal') {
        terminalWss.handleUpgrade(request, socket, head, (ws) => {
            terminalWss.emit('connection', ws, request);
        });
    } else if (pathname === '/chat') {
        chatWss.handleUpgrade(request, socket, head, (ws) => {
            chatWss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(6060, () => {
    console.log('Server running on http://localhost:6060');
});
