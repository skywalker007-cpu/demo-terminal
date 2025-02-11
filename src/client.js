const socketProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const socketUrl = `${socketProtocol}//${window.location.host}`;
const socket = new WebSocket(socketUrl);

socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'chat-response') {
        // Handle AI response or command output from the server in chat
        console.log("AI Response:", data.response);
    } else if (data.type === 'terminal-output') {
        // display the actual output from the command from the server to the xterm.js (terminal)
        term.write(data.output);
    }
}

var term = new window.Terminal({
    cursorBlink: true
});
term.open(document.getElementById('terminal'));

function init() {
    if (term._initialized) {
        return;
    }

    term._initialized = true;

    term.prompt = () => {
        runCommand('\n');
    };
    setTimeout(() => {
        term.prompt();
    }, 300);

    term.onKey(keyObj => {
        runCommand(keyObj.key);
    });

    term.attachCustomKeyEventHandler((e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
            navigator.clipboard.readText().then(text => {
                runCommand(text);
            });
            return false;
        }
        return true;
    });
}

// used for typing command in the terminal
function runCommand(command) {
    socket.send(JSON.stringify({ type: 'command', command: command }));
}

function sendPrompt() {
    // set the prompt to chat type and send the prompt to the server
    const prompt = document.getElementById('chat-input').value;
    socket.send(JSON.stringify({ type: 'chat', prompt }));
}

init();
