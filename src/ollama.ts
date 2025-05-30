import { Ollama } from "ollama";
import fetch from "cross-fetch";

const ollama = new Ollama({ host: 'http://localhost:11434', fetch: fetch });

function cleanResponse(response: string): string {
    return response
        .replace(/^(['"`]{3})(\w*\n)?/, '') // Remove starting triple quotes
        .replace(/(['"`]{3})$/, '')         // Remove ending triple quotes
        .trim();
}

export async function generateComment(prompt: string) {
    const t0 = performance.now();
    const req = await ollama.generate({
        model: "llama3",
        prompt: prompt,
    });

    const t1 = performance.now();
    console.log('LLM took: ', t1 - t0, ', seconds');
    return cleanResponse(req.response);
    // return req.response;
    
}