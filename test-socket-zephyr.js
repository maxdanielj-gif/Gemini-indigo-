import dotenv from "dotenv";
dotenv.config();

const wsUrl = `ws://localhost:3000/api/live?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}&voice=Zephyr`;
console.log("Connecting to", wsUrl);

import WebSocket from "ws";
const ws = new WebSocket(wsUrl);

ws.on("open", () => {
  console.log("Connected");
});

ws.on("close", (code) => {
  console.log("Closed", code);
});
