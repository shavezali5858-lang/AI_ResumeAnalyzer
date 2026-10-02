require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function test() {
    try {
        const models = await gemini.models.list();

        for await (const model of models) {
            console.log(model.name);
        }
    } catch (error) {
        console.log(error.message);
    }
}

test();