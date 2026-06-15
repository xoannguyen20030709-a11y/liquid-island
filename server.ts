import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
} catch (e) {
  console.error("Failed to initialize Gemini:", e);
}

// ----------------------------------------------------
// AI Endpoints
// ----------------------------------------------------

app.post("/api/ai/high", async (req, res) => {
  if (!ai) return res.status(500).json({ error: "Gemini API Key missing." });
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudgetTokens: 1024 }, // Thinking enabled for HIGH
      }
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("High AI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai/flash", async (req, res) => {
  if (!ai) return res.status(500).json({ error: "Gemini API Key missing." });
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Flash AI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/ai/quick", async (req, res) => {
  if (!ai) return res.status(500).json({ error: "Gemini API Key missing." });
  try {
    const { prompt } = req.body;
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });
    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Quick AI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ----------------------------------------------------
// Vite & Static Serving Configuration
// ----------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
