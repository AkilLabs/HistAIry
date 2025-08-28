
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI('AIzaSyC9uGPdO9H1wszwXkR52upoojH9OH5Bqls');

// Store conversation history in memory (for demo purposes)
const conversations = new Map();

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

app.post('/chat', async (req, res) => {
  try {
    const { message, sessionId, historyContext } = req.body;

    // Get or create conversation history
    if (!conversations.has(sessionId)) {
      conversations.set(sessionId, []);
    }
    
    const conversation = conversations.get(sessionId);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    // Build context with history and conversation
    let contextPrompt = "You are a helpful assistant that can answer questions about browsing history and general topics. ";
    contextPrompt += "When mentioning URLs or websites, always include the full URL so they can be clicked. ";
    contextPrompt += "Format your responses clearly with proper structure using bullet points and paragraphs. ";
    contextPrompt += "When referencing specific websites or repositories, include their full URLs. ";
    
    if (historyContext && historyContext.length > 0) {
      contextPrompt += `\n\nHere is the user's recent browsing history for context:\n${historyContext.map(item => `- ${item.title}: ${item.url}`).join('\n')}\n\n`;
    }
    
    // Add conversation history
    if (conversation.length > 0) {
      contextPrompt += "Previous conversation:\n";
      conversation.slice(-10).forEach(msg => { // Keep last 10 messages for context
        contextPrompt += `${msg.role}: ${msg.content}\n`;
      });
    }
    
    contextPrompt += `\nUser: ${message}\nAssistant:`;

    const result = await model.generateContent(contextPrompt);
    const response = result.response.text();

    // Store conversation
    conversation.push({ role: 'User', content: message });
    conversation.push({ role: 'Assistant', content: response });

    res.json({ 
      response,
      sessionId 
    });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ response: 'Sorry, I encountered an error. Please try again.' });
  }
});

app.get('/chat/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const conversation = conversations.get(sessionId) || [];
  res.json({ conversation });
});

app.delete('/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  conversations.delete(sessionId);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`HistAIry server running on http://localhost:${port}`);
});
