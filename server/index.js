
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI('AIzaSyC9uGPdO9H1wszwXkR52upoojH9OH5Bqls');

app.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `Summarize the following browsing history in a few bullet points or a short paragraph:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: 'Failed to summarize.' });
  }
});

app.listen(port, () => {
  console.log(`Gemini summary server running on http://localhost:${port}`);
});
