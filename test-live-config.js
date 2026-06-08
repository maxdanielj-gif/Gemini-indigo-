import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    const session = await ai.live.connect({
      model: "gemini-3.1-flash-live-preview",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } }
        },
        systemInstruction: "You are a helpful and conversational AI assistant.",
      },
      callbacks: {
        onmessage: () => {},
        onclose: (e) => console.log("closed with code", e),
        onerror: (err) => console.log("error", err)
      }
    });

    setTimeout(() => {
      console.log("still open after 2s");
      session.close();
    }, 2000);
  } catch(e) {
    console.log("catch error:", e.message);
  }
}
test();
