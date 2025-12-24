const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

console.log("🔥🔥 AI-POWERED SERVER.JS ACTIVE 🔥🔥");

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// health check
app.get("/", (req, res) => {
  res.send("Backend is alive ✅");
});

// CHAT ROUTE
app.post("/chat", async (req, res) => {
  const { message, type } = req.body;

  try {
    // ---------------- QUERY (AI ANSWERS) ----------------
    if (type === "query") {
      const prompt = `
You are a college campus assistant.
Answer the student's question clearly and briefly.

Question: ${message}
      `;

      const result = await model.generateContent(prompt);
      const reply = result.response.text();

      return res.json({ response: reply });
    }

    // ---------------- COMPLAINT (AI ANALYSIS) ----------------
    if (type === "complaint") {
      const prompt = `
A student submitted this complaint:
"${message}"

1. Categorize it into ONE:
Transportation, Sanitation, Hostel, Facilities, Faculty, Laboratory

2. Assign priority:
High (safety / urgent)
Medium
Low

Respond ONLY in this format:
Category: <category>
Priority: <priority>
      `;

      const result = await model.generateContent(prompt);
      const analysis = result.response.text();

      return res.json({
        response: `Complaint registered ✅\n\n${analysis}`
      });
    }

    return res.json({ response: "Invalid request type" });

  } catch (error) {
    console.error(error);
    res.json({
      response: "AI service error. Please try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
