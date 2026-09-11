// Vercel Serverless Function — deploys automatically at POST /api/guide.
// This is the ONLY place ANTHROPIC_API_KEY is ever read. Set it in:
//   Vercel dashboard → your project → Settings → Environment Variables
// It is never committed to the repo and never sent to the browser.
//
// (For local testing with the Vercel CLI's `vercel dev`, a local .env file
// with ANTHROPIC_API_KEY=... works too — that's optional, only needed if
// you want the AI feature to work under local dev as well as deployed.)

const MODEL = 'claude-haiku-4-5-20251001'; // Anthropic's fastest/cheapest current model
const MAX_TOKENS = 300;
const HISTORY_TURNS_KEPT = 2; // last exchange only — keeps token cost down

const SYSTEM_PROMPT = `You are "UB Guide", the AI assistant of the University of Bisha (UB) digital campus, Saudi Arabia.

Scope: answer anything about UB — programs, admissions, campus life, facilities, contact info, even minor details — and personalized academic help using the student profile given to you (GPA, program, level, grades, courses): e.g. how to raise their GPA, course/workshop/book suggestions, study tips, UB Smart services.

Refuse only questions unrelated to UB or the student's education there. If refusing, reply with ONLY the tag "[OUT_OF_SCOPE]" followed by one short warm sentence redirecting them to ask about UB.

Be honest: if unsure of a specific fact (dates, fees, numbers), say so instead of guessing.

Reply in the same language the student used (Arabic or English). Keep it concise (a short paragraph or a few bullet points). Never say what company or model you're built on — you are just "UB Guide".`;

function compactProfile(student, lang) {
  if (!student) return null;
  const pick = (v) => (v && typeof v === 'object' ? v[lang] || v.en : v);
  return {
    name: pick(student.name),
    program: pick(student.program),
    level: student.level,
    gpa: student.gpa,
    creditsDone: student.creditsDone,
    creditsTotal: student.creditsTotal,
    standing: pick(student.standing),
    courses: student.courses,
    recentGrades: (student.grades || []).map((g) => `${pick(g.course)}: ${g.grade}`),
  };
}

function extractText(data) {
  const blocks = data?.content || [];
  return blocks.filter((b) => b.type === 'text').map((b) => b.text).join('');
}

function parseReply(rawText) {
  const text = (rawText || '').trim();
  if (text.startsWith('[OUT_OF_SCOPE]')) {
    return { refused: true, reply: text.replace('[OUT_OF_SCOPE]', '').trim(), serviceId: null };
  }
  return { refused: false, reply: text, serviceId: null };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('[UB Guide] ANTHROPIC_API_KEY is not set in this environment.');
    return res.status(500).json({
      ok: false,
      error: 'AI service is not configured. Add ANTHROPIC_API_KEY in Vercel → Settings → Environment Variables and redeploy.',
    });
  }

  const { message, student, uiLanguage, history } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ ok: false, error: 'A non-empty "message" string is required.' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ ok: false, error: 'Message is too long (max 2000 characters).' });
  }

  const lang = uiLanguage === 'ar' ? 'ar' : 'en';
  const contextBlock = [
    `Student profile: ${JSON.stringify(compactProfile(student, lang))}`,
    `Question: ${message}`,
  ].join('\n');

  const trimmedHistory = Array.isArray(history) ? history.slice(-HISTORY_TURNS_KEPT) : [];
  const messages = [
    ...trimmedHistory.map((h) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.text })),
    { role: 'user', content: contextBlock },
  ];

  if (typeof fetch !== 'function') {
    // Native fetch is only a global in Node 18+. If this fires, the
    // function is running on an older runtime — see vercel.json /
    // package.json "engines", and redeploy after checking Vercel's
    // Project Settings → General → Node.js Version.
    console.error('[UB Guide] global fetch is not available in this runtime.');
    return res.status(500).json({ ok: false, error: 'Server runtime issue: fetch is unavailable (Node.js version too old). Check Vercel project Node.js version.' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        // No browser-access header needed here — this call is server-to-server.
      },
      body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system: SYSTEM_PROMPT, messages }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      console.error('[UB Guide] Anthropic API error:', data);
      return res.status(502).json({ ok: false, error: data?.error?.message || `Claude API error (${upstream.status}).` });
    }

    return res.status(200).json({ ok: true, ...parseReply(extractText(data)), source: 'claude' });
  } catch (err) {
    // Surface the real error instead of a generic message — a network
    // failure, a DNS issue, and a JSON-parse issue all look identical to
    // the user otherwise, which makes this impossible to debug from the UI.
    console.error('[UB Guide] Request to Claude failed:', err);
    return res.status(502).json({ ok: false, error: `Could not reach Claude API: ${err?.message || 'unknown error'}` });
  }
}
