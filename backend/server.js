import express from "express";
import { WebSocketServer } from "ws";
import { handleTerminalConnection, setSharedTerminalMode } from "./terminal.js";
import { processWithAI } from "./aiProcessor.js";
import dotenv from "dotenv";
import http from "http";
import cors from "cors"; // Ensure frontend can access API

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

const server = http.createServer(app);
const port = 6060;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// WebSocket setup
const wss = new WebSocketServer({ server });
wss.on("connection", handleTerminalConnection);

setSharedTerminalMode(false);

// API Endpoint to process AI commands
app.post("/process-ai", async (req, res) => {
    const { prompt } = req.body;
    try {
        const aiResponse = await processWithAI(prompt);
        res.json({ response: aiResponse });
    } catch (error) {
        res.status(500).json({ error: "AI processing failed" });
    }
});

app.get("/status", (req, res) => {
    res.send("Server is running!");
});
