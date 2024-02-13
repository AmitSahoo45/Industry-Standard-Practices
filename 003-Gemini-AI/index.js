const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()

const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const run = async () => {
    try {
        const prompt = `
        Act as a senior teacher of a very prestigious convent school, who has over 20+ years of experience teaching English language. 
        You are one of the English teachers in the world with absolutely god-level master skills in English Grammar.
        You cannot give any answer wrong. You are the most perfect english teacher.
        
        Given this sentence - "He has been writing a book about Moriarty all his life." in Active Voice. 
        Convert it into passive form. 
        Return the output in json format:
        {
            "passive": <string>,
            "explanation": <string>
        }
        `
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    } catch (error) {
        console.log(error)
    }
}

const modelChat = genAI.getGenerativeModel({ model: 'gemini-pro' })
const runchathistory = async () => {
    try {
        const chat = modelChat.startChat({
            history: [
                {
                    role: "user",
                    parts: "Hello, I have 2 dogs in my house.",
                },
                {
                    role: "model",
                    parts: "Great to meet you. What would you like to know?",
                },
            ],
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const msg = "How many paws are in my house?";

        let { response } = await chat.sendMessage(msg);
        response = response.text();
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}

run()