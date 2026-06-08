import dotenv from "dotenv";
dotenv.config();

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=` + apiKey);
  const json = await res.json();
  console.log(JSON.stringify(json.models.map(m => m.name), null, 2));
}
run();
