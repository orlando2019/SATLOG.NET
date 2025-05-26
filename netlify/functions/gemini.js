const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    // Parse the incoming request body
    const body = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: 'API key no configurada' }) };
    }
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    // Determine payload based on request type
    let payload;
    if (body.prompt) {
      // Single-prompt request
      payload = { contents: [{ role: 'user', parts: [{ text: body.prompt }] }] };
    } else {
      // Chat conversation request
      payload = {
        contents: body.contents,
        generationConfig: body.generationConfig
      };
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errText = await res.text();
      return { statusCode: res.status, body: JSON.stringify({ error: errText }) };
    }
    const googleJson = await res.json();
    // Return different formats based on request
    if (body.prompt) {
      const text = googleJson.candidates?.[0]?.content?.parts?.[0]?.text;
      return { statusCode: 200, body: JSON.stringify({ text }) };
    }
    return { statusCode: 200, body: JSON.stringify(googleJson) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
