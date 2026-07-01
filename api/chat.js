// api/chat.js
//
// This runs on Vercel's server, never in the visitor's browser.
// It reads GEMINI_API_KEY from an environment variable (set in the
// Vercel dashboard, and locally in a .env file that is NOT committed),
// so the key is never visible in your site's source code.

const SYSTEM_INSTRUCTION =
  "You are PodBot, a helpful assistant for Peas & Pods (a Pune-based consulting studio for NGOs and enterprises). You should be concise, helpful, and professional. You offer info on services: NGO Digital Transformation, IT, HR, Training, Web/App Dev, Cloud, and AI. Format output in plain text without markdown if possible.";

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Missing GEMINI_API_KEY environment variable');
    return res.status(500).json({ error: 'Server is not configured. Missing GEMINI_API_KEY.' });
  }

  let prompt = '';
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    prompt = String(body.prompt || '').trim();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Missing "prompt" in request body' });
  }
  if (prompt.length > 2000) {
    return res.status(400).json({ error: 'Prompt is too long' });
  }

  try {
    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error('Gemini API error:', JSON.stringify(data));
      return res.status(502).json({
        error: 'Upstream AI service error',
        detail: data?.error?.message || 'Unknown error'
      });
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error('Unexpected Gemini response shape:', JSON.stringify(data));
      return res.status(502).json({ error: 'No response from AI model' });
    }

    return res.status(200).json({ reply: text });
  } catch (err) {
    console.error('chat function crashed:', err);
    return res.status(500).json({ error: 'Network error contacting AI service' });
  }
};
