import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testFormat(name, input) {
  return new Promise(async (resolve) => {
    try {
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: { responseModalities: [Modality.AUDIO] },
        callbacks: {
          onmessage: () => {},
          onclose: (e) => {
            console.log(name, "closed with code", e.code);
            resolve();
          },
          onerror: (err) => {
            console.log(name, "error", err);
          }
        }
      });
      session.sendRealtimeInput(input);
      setTimeout(() => {
        console.log(name, "still open after 1s");
        session.close();
      }, 1000);
    } catch(e) {}
  });
}

async function run() {
  const b64 = Buffer.alloc(16000*2).toString("base64");
  
  await testFormat("array format", [{ data: b64, mimeType: "audio/pcm;rate=16000" }]);
  await testFormat("mediaChunks format", { mediaChunks: [{ data: b64, mimeType: "audio/pcm;rate=16000" }] });
  await testFormat("audio wrapper format", { audio: { data: b64, mimeType: "audio/pcm;rate=16000" } });
  await testFormat("mediaChunks inside realtimeInput?", { realtimeInput: { mediaChunks: [{ data: b64, mimeType: "audio/pcm;rate=16000" }] } });
}
run();
