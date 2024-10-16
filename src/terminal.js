import os from 'os';
import pty from 'node-pty';
import { processWithAI } from './aiProcessor.js';

let sharedPtyProcess = null;
let sharedTerminalMode = false;

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

const spawnShell = () => {
    return pty.spawn(shell, [], {
        name: 'xterm-color',
        env: process.env,
    });
};

export const setSharedTerminalMode = (useSharedTerminal) => {
    sharedTerminalMode = useSharedTerminal;
    if (sharedTerminalMode && !sharedPtyProcess) {
        sharedPtyProcess = spawnShell();
    }
};

export const handleTerminalConnection = (ws) => {
    let ptyProcess = sharedTerminalMode ? sharedPtyProcess : spawnShell();

    ws.on("message", async (message) => {
        const msg = JSON.parse(message);
        if (msg.type === 'chat') {
            const ai_response = await processWithAI(msg.prompt);
            ws.send(JSON.stringify({ type: 'chat-response', response: ai_response }));
            // process the ai command 
            const chat_command = commandProcessor(ai_response);
            ptyProcess.write(chat_command);
        } else if (msg.type === 'command') {
            const processedCommand = commandProcessor(msg.command);
            ptyProcess.write(processedCommand);
        }
    });

    ptyProcess.on('data', (rawOutput) => {
        const processedOutput = outputProcessor(rawOutput);
        ws.send(JSON.stringify({ type: 'terminal-output', output: processedOutput }));
    });

    ws.on('close', () => {
        if (!sharedTerminalMode) {
            ptyProcess.kill();
        }
    });
};

// Utility function to process commands
const commandProcessor = (command) => {
    return command;
};

// Utility function to process output
const outputProcessor = (output) => {
    return output;
};
