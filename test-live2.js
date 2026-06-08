import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test(model) {
  try {
    const session = await ai.live.connect({
      model,
      config: {
        responseModalities: [Modality.AUDIO],
      },
      callbacks: {
        onmessage: (msg) => console.log(model, "msg"),
        onclose: () => console.log(model, "closed"),
        onerror: (err) => console.log(model, "error", err.message)
      }
    });

    session.sendRealtimeInput({
      audio: { data: "base64dummydata==", mimeType: "audio/pcm;rate=16000" }
    });

    await new Promise(r => setTimeout(r, 2000));
    console.log(model, "connected");
    session.close();
  } catch(e) {
    console.log(model, "catch error:", e.message);
  }
}

async function run() {
  await test("gemini-3.5-flash");
  await test("gemini-3.1-flash-live-preview");
}
run();
