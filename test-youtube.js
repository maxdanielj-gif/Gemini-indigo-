import dotenv from "dotenv";
dotenv.config();

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;

  const body = {
    contents: [{
      role: "user",
      parts: [
        { text: "What happens in this video?" },
        { fileData: { fileUri: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", mimeType: "video/mp4" } }
      ]
    }]
  };

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=` + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}
run();
