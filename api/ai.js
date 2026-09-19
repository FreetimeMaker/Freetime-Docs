const DEFAULT_MODEL = process.env.AI_MODEL || 'gemini-2.5-flash'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'AI assistant is not configured. Set GEMINI_API_KEY in Vercel.' })
  }

  const { question, page, path, context } = req.body || {}
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'A question is required.' })
  }

  const prompt = [
    'You are Freetime Docs AI, the documentation assistant for Freetime Maker projects.',
    'Answer using the supplied documentation context. Do not invent undocumented project behavior.',
    'If the context is insufficient, say that clearly and suggest what documentation section to check.',
    'Keep answers concise and technical.',
    '',
    `Current page: ${page || 'Unknown'}`,
    `Path: ${path || 'Unknown'}`,
    '',
    'Documentation context:',
    String(context || '').slice(0, 16000),
    '',
    'Question:',
    question.slice(0, 2000)
  ].join('\n')

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(DEFAULT_MODEL)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 900 }
        })
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({ error: data?.error?.message || 'AI provider request failed.' })
    }

    const answer = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join('')
      .trim()

    if (!answer) return res.status(502).json({ error: 'The AI provider returned no answer.' })
    return res.status(200).json({ answer, model: DEFAULT_MODEL })
  } catch {
    return res.status(502).json({ error: 'Could not reach the AI provider.' })
  }
}
