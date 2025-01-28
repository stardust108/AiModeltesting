const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// OpenAI Configuration
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// Chat route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: "Error communicating with OpenAI API." });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
