// Talks to the Vercel serverless function at /api/guide (see api/guide.js
// at the project root), which is the only place ANTHROPIC_API_KEY is ever
// read. This file never sees the key — safe to commit to a public repo.
//
// Note for local development: plain `npm run dev` (Vite only) does not run
// the /api function, so this call will fail locally and the UI will fall
// back to the offline quick-answer engine automatically — that's expected.
// To test the live AI feature locally too, use the Vercel CLI's
// `vercel dev` instead, with ANTHROPIC_API_KEY in a local .env file.
export async function askUBGuide({ message, student, uiLanguage, history }) {
  let res;
  try {
    res = await fetch('/api/guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, student, uiLanguage, history: (history || []).slice(-2) }),
    });
  } catch (networkErr) {
    const err = new Error('Could not reach the AI service.');
    err.cause = networkErr;
    throw err;
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('The AI service returned an unexpected response.');
  }

  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || `The AI service returned an error (${res.status}).`);
  }

  // { reply, refused, serviceId, source: 'claude' }
  return data;
}
