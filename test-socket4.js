import dotenv from "dotenv";
dotenv.config();

const wsUrl = `ws://localhost:3000/api/live`;
import WebSocket from "ws";
const ws = new WebSocket(wsUrl);

ws.on("open", () => {
  console.log("Connected to server from mock client");
  ws.send(JSON.stringify({
    setup: true,
    key: process.env.GEMINI_API_KEY,
    voice: "Aoede",
    systemInstruction: "Say hello!"
  }));
});

ws.on("message", (data) => {
  const msg = JSON.parse(data.toString());
  if (msg.connected) {
    console.log("Got connected signal");
    // Send dummy audio
    const b64 = Buffer.alloc(16000*2).toString("base64");
    ws.send(JSON.stringify({ audio: b64 }));
    setTimeout(() => ws.close(), 1000);
  }
  if (msg.text) {
    console.log("Got text from model:", msg.text);
  }
  if (msg.error) {
    console.log("Got error:", msg.error);
  }
});

ws.on("close", (code, reason) => {
  console.log("Disconnected from server with code:", code, "reason:", reason.toString());
});
