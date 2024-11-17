// server/aiProcessor.js
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

export async function processWithAI(prompt, shell = 'bash') {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error('OpenAI API key is missing. Please set it in the .env file.');
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Convert this user request into a corresponding terminal command in ${shell}: ${prompt} without any break and explanation as comments.`
                }
            ],
            max_tokens: 50
        })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content.trim(); // Return the AI-generated command
    } else {
        throw new Error('No valid response from the AI service.');
    }
}
