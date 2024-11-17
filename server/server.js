import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { handleTerminalConnection, setSharedTerminalMode } from './terminal.js';
import path from 'path';
import { fileURLToPath } from 'url';
// import { handleChatConnection } from './chat_server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

setSharedTerminalMode(false);

// wss.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         const msg = JSON.parse(message);

//         if (msg.type === 'chat-input') {
//             // Directly handle chat messages without overwriting terminal logic
//             handleChatConnection(ws);
//         } else if (msg.type === 'command') {
//             handleTerminalConnection(ws);
//         }
//     });

//     ws.on('close', () => {
//         console.log('WebSocket client disconnected');
//     });
// });
wss.on('connection', handleTerminalConnection);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(6060, () => {
    console.log('Server running on http://localhost:6060');
});
