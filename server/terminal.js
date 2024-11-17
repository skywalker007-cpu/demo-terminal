// server/terminal.js
import os from 'os';
import pty from 'node-pty';
import { processWithAI } from '../src/utils/aiProcessor.js';

let sharedPtyProcess = null;
let sharedTerminalMode = false;

// Determine shell type based on OS
const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

// Function to spawn a new shell process
const spawnShell = () => {
    return pty.spawn(shell, [], {
        name: 'xterm-color',
        env: process.env,
    });
};

// Exported function to toggle shared terminal mode
export const setSharedTerminalMode = (useSharedTerminal) => {
    sharedTerminalMode = useSharedTerminal;
    if (sharedTerminalMode && !sharedPtyProcess) {
        sharedPtyProcess = spawnShell();
    }
};

// Exported function to handle WebSocket connections
export const handleTerminalConnection = (ws) => {
    let ptyProcess = sharedTerminalMode ? sharedPtyProcess : spawnShell();

    // Handle incoming messages from the WebSocket
    ws.on('message', async (message) => {
        const msg = JSON.parse(message);
        if (msg.type === 'chat') {
            try {
                const aiResponse = await processWithAI(msg.prompt);
                ws.send(JSON.stringify({ type: 'chat-response', response: aiResponse }));
                // Process AI-generated command
                const chatCommand = commandProcessor(aiResponse);
                ptyProcess.write(chatCommand);
            } catch (error) {
                ws.send(JSON.stringify({ type: 'error', message: error.message }));
            }
        } else if (msg.type === 'command') {
            const processedCommand = commandProcessor(msg.command);
            ptyProcess.write(processedCommand);
        }
    });

    // Send terminal output back to WebSocket
    ptyProcess.on('data', (rawOutput) => {
        const processedOutput = outputProcessor(rawOutput);
        ws.send(JSON.stringify({ type: 'terminal-output', output: processedOutput }));
    });

    // Handle WebSocket closure
    ws.on('close', () => {
        if (!sharedTerminalMode) {
            ptyProcess.kill();
        }
    });
};

// Utility function to process commands
const commandProcessor = (command) => {
    return command; // Modify or sanitize commands if needed
};

// Utility function to process terminal output
const outputProcessor = (output) => {
    return output; // Modify output formatting if needed
};
