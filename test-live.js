import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test(model) {
  try {
    const session = await ai.live.connect({ model });
    console.log(model, "connected");
    session.close();
  } catch(e) {
    console.log(model, "error:", e.message);
  }
}

async function run() {
  await test("gemini-3.5-flash");
  await test("gemini-3.1-flash-live-preview");
  await test("gemini-2.0-flash");
  await test("gemini-2.5-flash");
}
run();
