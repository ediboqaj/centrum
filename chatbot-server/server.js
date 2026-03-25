import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error("Missing GROQ_API_KEY in .env");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are a knowledgeable tour guide assistant for Prizren, Kosovo, and specifically for Hotel Centrum Prizren.
Provide helpful, accurate information about:
- Prizren's history, culture, and tourist attractions
- Hotel Centrum Prizren services and amenities
- Local restaurants, activities, and recommendations
- Transportation and travel tips
Keep answers concise (2-3 sentences) and friendly.`;

app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              typeof item === "object" &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-8)
      : [];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...safeHistory,
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 200
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "Groq API request failed."
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(500).json({ error: "Invalid AI response." });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Something went wrong on the server." });
  }
});

app.post("/log", (req, res) => {
  try {
    const logData = {
      message: req.body.message,
      response: req.body.response,
      language: req.body.language,
      timestamp: new Date().toISOString(),
      ip: req.ip
    };

    fs.appendFileSync("logs.txt", JSON.stringify(logData) + "\n");

    res.json({ success: true });
  } catch (error) {
    console.error("Log error:", error);
    res.status(500).json({ error: "Logging failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
