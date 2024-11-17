import { processWithAI } from '../src/utils/aiProcessor.js';

export const handleChatConnection = (ws) => {
    ws.on('message', async (message) => {
        const msg = JSON.parse(message);

        if (msg.type === 'chat-input') { // Distinct chat type
            try {
                const aiResponse = await processWithAI(msg.prompt);
                ws.send(JSON.stringify({ type: 'chat-response', response: aiResponse }));
            } catch (error) {
                ws.send(JSON.stringify({ type: 'error', message: error.message }));
            }
        }
    });

    ws.on('close', () => {
        console.log('Chat client disconnected');
    });
};
