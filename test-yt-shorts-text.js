import dotenv from "dotenv";
dotenv.config();

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=` + apiKey, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        role: "user",
        parts: [
          { text: "Can you analyze this video? https://youtube.com/shorts/dQw4w9WgXcQ" },
          { fileData: { fileUri: "https://youtube.com/shorts/dQw4w9WgXcQ", mimeType: "video/mp4" } }
        ]
      }]
    })
  });

  const json = await res.json();
  console.log("3.5-flash result:", JSON.stringify(json, null, 2));
}
run();
