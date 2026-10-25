const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.send("JARVIS está online!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Escreve uma mensagem válida."
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const result = await openai.responses.create({
      model: "gpt-4.1-mini",
      instructions:
        "És o JARVIS, um assistente pessoal inteligente. " +
        "Fala sempre em português de Portugal. " +
        "Sê educado, eficiente e direto.",
      input: message,
      max_output_tokens: 500
    });

    res.json({ reply: result.output_text });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      error: "Não consegui contactar a inteligência artificial."
    });
  }
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("JARVIS iniciado!");
});
