import dotenv from 'dotenv';
import fetch from 'node-fetch';
import os from 'os';

//load env;
dotenv.config();

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';

export async function processWithAI(prompt) {
    const apiKey = process.env.OPENAI_API_KEY;
    // Here you can integrate any AI service, like OpenAI's GPT model
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `In ${shell}, provide only the simplest terminal command for: ${prompt}. Do not include any explanations, descriptions, or additional text. Output only the command itself.` }],
            max_tokens: 50
        })
    });

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content.trim(); // Return AI-generated command
    } else {
        throw new Error('No choices available in API response');
    }
}
