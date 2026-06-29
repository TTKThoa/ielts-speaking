const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const GROQ_API_KEY = process.env.GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE';

app.post('/api/score', async (req, res) => {
  const { part, question, answer } = req.body;
  if (!answer || answer.trim().split(/\s+/).length < 5) {
    return res.status(400).json({ error: 'Câu trả lời quá ngắn.' });
  }

  const prompt = `You are a strict, professional IELTS Speaking examiner. Evaluate this Part ${part} response according to official IELTS Speaking band descriptors.

Question: "${question}"
Candidate answer: "${answer}"

Return ONLY valid JSON with NO markdown fences:
{
  "overall": <number 1.0–9.0 in 0.5 steps>,
  "criteria": {
    "Fluency & Coherence": <number>,
    "Lexical Resource": <number>,
    "Grammatical Range & Accuracy": <number>,
    "Pronunciation": <number>
  },
  "comment": "<1 Vietnamese sentence summarizing performance>",
  "strengths": ["<strength 1 in Vietnamese>", "<strength 2>"],
  "improvements": ["<improvement 1 in Vietnamese>", "<improvement 2>", "<improvement 3>"],
  "vocab_suggestions": [
    {"word": "...", "type": "verb/noun/adj/phrase", "meaning_vi": "...", "example": "..."},
    {"word": "...", "type": "...", "meaning_vi": "...", "example": "..."},
    {"word": "...", "type": "...", "meaning_vi": "...", "example": "..."},
    {"word": "...", "type": "...", "meaning_vi": "...", "example": "..."},
    {"word": "...", "type": "...", "meaning_vi": "...", "example": "..."}
  ],
  "sample_answer": "<A natural band 7+ English answer to the same question, 3–5 sentences>"
}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    const raw = data.choices[0].message.content.replace(/```json|```/g, '').trim();
    const result = JSON.parse(raw);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Lỗi khi gọi AI. Thử lại sau.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
