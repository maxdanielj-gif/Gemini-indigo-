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
        onclose: (e) => console.log(model, "closed with", e),
        onerror: (err) => console.log(model, "error", err)
      }
    });

    const b64 = Buffer.alloc(16000*2).toString("base64");
    session.sendRealtimeInput([{
      data: b64, mimeType: "audio/pcm;rate=16000"
    }]);

    await new Promise(r => setTimeout(r, 2000));
    console.log(model, "connected");
    session.close();
  } catch(e) {
    console.log(model, "catch error:", e.message);
  }
}

test("gemini-3.1-flash-live-preview");
