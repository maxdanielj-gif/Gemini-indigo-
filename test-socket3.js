import dotenv from "dotenv";
dotenv.config();

const wsUrl = `ws://localhost:3000/api/live?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}&voice=Aoede`;
console.log("Connecting to", wsUrl);

import WebSocket from "ws";
const ws = new WebSocket(wsUrl);

ws.on("open", () => {
  console.log("Connected to server from mock client");
  setTimeout(() => {
    const b64 = Buffer.alloc(16000*2).toString("base64");
    ws.send(JSON.stringify({ audio: b64 }));
    console.log("Sent audio");
  }, 1000);
});

ws.on("message", (data) => {
  console.log("Message from server:", data.toString().substring(0, 50));
});

ws.on("close", (code, reason) => {
  console.log("Disconnected from server with code:", code, "reason:", reason.toString());
});

ws.on("error", (err) => {
  console.log("Error from server:", err.message);
});
