# UB Smart — University of Bisha Digital Campus

A bilingual (English / Arabic, full RTL) AI-powered digital campus prototype
for the University of Bisha, built with **Vite + React + Tailwind CSS**,
deployable on **Vercel** with the UB Guide assistant powered by Claude
(Anthropic) via a small Vercel serverless function.

## Getting started (local)

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Everything
works except live UB Guide answers — plain `npm run dev` only runs the Vite
frontend, not the `/api` function, so UB Guide automatically falls back to
its offline quick-answer engine locally. That's expected; see "Testing the
AI feature locally" below if you want it working before deploying too.

```bash
npm run build      # production build
npm run preview    # preview that build
```

## Deploying to Vercel (GitHub → Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "UB Smart"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

The repo is safe to make public — `api/guide.js` is the only file that ever
touches your Claude API key, and it's never committed (it reads the key
from an environment variable at runtime, set in step 3, not from a file).

### 2. Import into Vercel

Go to https://vercel.com → **Add New → Project** → import your GitHub repo.
Vercel auto-detects this as a Vite project (build command `npm run build`,
output directory `dist`) and auto-detects `api/guide.js` as a serverless
function — no config file needed for either.

### 3. Add your API key

In the new project: **Settings → Environment Variables** → add:

```
Name:  ANTHROPIC_API_KEY
Value: your real key from https://console.anthropic.com/
```

This is the only place the key lives — not in your repo, not in any file
you commit. Click **Deploy** (or redeploy if it already ran once before you
added the variable).

That's it — your deployed URL will have a fully working UB Guide.

### Testing the AI feature locally too (optional)

Plain `npm run dev` won't run `/api/guide` (Vite alone doesn't execute
serverless functions). If you want UB Guide working locally as well:

```bash
npm i -g vercel        # one-time
vercel dev
```

This emulates Vercel's routing (frontend + `/api` functions) locally. Give
it a local key by creating a `.env` file in the project root:

```
ANTHROPIC_API_KEY=your_real_key_here
```

(`.env` is already git-ignored — this file is only for local testing and is
never deployed or committed; the production site uses the Vercel dashboard
variable from step 3 instead.)

## UB Guide — Claude integration

`UB Guide` (the AI assistant, `/app/ai`) calls Claude through
**`api/guide.js`**, a Vercel serverless function — the only place
`ANTHROPIC_API_KEY` is ever read. The frontend (`src/lib/ubGuideApi.js`) is
just a thin `fetch('/api/guide')` wrapper with zero Claude-specific logic
and no secrets, so it's safe in a public repo.

- **Scope-locked**: a short system instruction covers *any* question about
  UB Bisha (not just the student's own record), and personalized advice
  using their profile — but refuses anything unrelated. Refusals are tagged
  `[OUT_OF_SCOPE]` by the model and parsed into `{ refused: true }`, which
  the UI shows as the existing "I didn't quite understand that" card.
- **Student-aware, but trimmed for cost**: instead of sending the student's
  entire bilingual profile object (schedule, all fields in both languages),
  `compactProfile()` sends just name, program, level, GPA, credits, standing,
  courses, and recent grades — resolved to plain strings in the current UI
  language. Roughly a third of the tokens for the same personalization.
- **Kept cheap on purpose**: uses `claude-haiku-4-5-20251001` (Anthropic's
  fastest/cheapest current model), caps replies at 300 tokens, and only
  sends the last exchange of conversation history (not the whole thread) —
  deliberate token-cost reductions for a no-budget school project. Swap the
  `MODEL` constant in `api/guide.js` if you want smarter (pricier) answers.
- **Markdown rendering**: replies render through `react-markdown` +
  `remark-gfm` (bold, lists, headings, safe external links, code blocks).
- **Offline fallback**: if the call fails (function not running, no key set,
  rate limit), the UI falls back to the original local keyword-matching
  engine (`src/lib/aiEngine.js`, unchanged) with a visible warning banner —
  the assistant never just goes blank, locally or in production.

### Testing it

1. Deploy (or run `vercel dev` locally with a `.env`), log in as either demo
   student, open **UB Guide**.
2. Try "How can I improve my CGPA?" — should reference your actual GPA.
3. Try "What's the capital of France?" — should be politely refused.
4. To see the offline fallback deliberately, remove the Vercel environment
   variable (or use plain `npm run dev`) and ask again — you should get the
   warning banner and a canned offline answer instead of a silent failure.

Since this sandbox has no internet access, I couldn't make a real deployed
call to Claude myself. I mocked `fetch` and Vercel's `(req, res)` and ran 12
assertions directly against the actual `api/guide.js` handler instead —
correct status codes for missing key/wrong method/missing message, correct
use of `process.env.ANTHROPIC_API_KEY`, refusal-tag parsing, and history
capped to the last exchange. All passed. The live deployed call is the one
thing only you can verify.

## Blackboard AI Learning Companion (frontend prototype — zero API calls)

A **self-contained, hard-coded frontend prototype**, deliberately kept
separate from the real UB Guide AI integration. It makes **no network or API
calls of any kind** — `api/guide.js`, `src/lib/ubGuideApi.js`, and
`ANTHROPIC_API_KEY` are never touched by this feature.

- **`/app/blackboard`** (`src/pages/Blackboard.jsx`) — a live-class-style
  page: a looping demo lecture video with custom play/pause, mute/volume,
  and fullscreen controls (loops for ~2 minutes to simulate a full lecture
  from a ~10s clip, then shows a "recording ended" state with replay), a
  live class info card (course, instructor, LIVE badge, students online),
  a **direct "Open in Blackboard" link** (also on the Dashboard), and five
  AI actions: What Did I Miss, Summarize, Generate Notes, an interactive
  Quiz (click an answer, get instant right/wrong feedback), and interactive
  click-to-flip Flashcards.
- **All AI responses are hard-coded** in `src/lib/blackboardData.js`
  (bilingual EN/AR markdown text, quiz questions/answers, flashcards).
  Clicking an action just renders that static content after a simulated
  500–1000ms local delay (`setTimeout`, no `fetch`) so the interaction still
  feels real without risking the working deployment.
- **No new environment variables, no new dependencies** — reuses
  `react-markdown`/`remark-gfm` (already installed) to render the hard-coded
  responses with the same visual style as UB Guide's real answers, and the
  native HTML5 `<video>` element for the lecture player.
- **Nothing existing was modified to build this** beyond three minimal,
  additive edits from the previous round: one route in `App.jsx`, one nav
  item in `Sidebar.jsx`, one card on `Dashboard.jsx`. `api/guide.js` and
  every other existing file remain byte-for-byte unchanged (verified by
  checksum before/after this change).

## Avatars, dark theme, and Arabic fixes

- **Avatars**: `src/lib/assistant.js` centralizes UB Guide's bilingual name
  and avatar photo; `src/data/students.js` carries each demo student's
  photo. A shared `src/components/ui/Avatar.jsx` renders them (with an
  initials fallback) in the sidebar, topbar, login picker, and profile page.
- **Dark theme**: real, working dark mode — not just a visual toggle.
  `tailwind.config.js`'s `sand`/`ink`/`line`/`surface` colors are now backed
  by CSS variables (`src/index.css`, `:root` vs `html.dark`), so the existing
  `.dark` class (already supported by `darkMode: 'class'`) re-themes the
  whole app without needing `dark:` variants sprinkled through every
  component. Toggle it via the sun/moon button in the topbar, or the full
  Light/Dark/System control in Settings (`system` follows the OS preference
  live). Semantic/brand colors (navy, teal, success/warning/danger/info) stay
  fixed in both themes by design.
- **Arabic fixes**: UB Guide's name, the quick-ask suggestion chips, and a
  few other labels were hardcoded English strings that ignored the language
  switch — these are now bilingual. The suggestion chips also now *send*
  the Arabic question text when the UI is in Arabic, which was the main
  reason replies sometimes came back in English even in Arabic mode.
- The chat input clears once a response (or offline fallback) arrives,
  instead of staying populated with the last question.

## What's inside

- **`/` — Landing page**: hero, feature grid, "how it works", AI preview,
  services preview, notifications preview, footer.
- **`/login` — Demo login**: university account / Nafath buttons (visual
  only) plus a working **Demo Student Login** with 2 personas (Shah Fahad —
  Cybersecurity, Malak Abdu Rahman — Sharia).
- **`/app/*` — Authenticated app shell** (sidebar + topbar + mobile bottom
  nav):
  - `dashboard` — GPA/level/credits/attendance stats, today's schedule,
    academic progress, deadlines, recent grades, AI insight card,
    recommended events.
  - `ai` — **UB Guide**: Claude-backed assistant (see above), with an
    offline local keyword-matching fallback engine
    (`src/lib/aiEngine.js`) covering 11 fixed intents.
  - `services` / `services/:id` — full services catalog with category
    filters, detail pages (eligibility, steps, documents, FAQ accordion,
    related regulation).
  - `services/:id/request` — digital request form with validation and a
    generated `UB-2026-XXXXXX` request ID that auto-advances through its
    lifecycle for demo purposes.
  - `tracker` — request tracker with a horizontal status timeline.
  - `notifications` — Smart Alerts + Today/Earlier notification list.
  - `profile` — academic info + editable contact fields + demo profile
    switcher.
  - `settings` — language, notification toggles, font size, reduced
    motion, and theme controls (font size and reduced motion are wired to
    real global CSS classes; theme is a visual toggle, as in the original
    prototype).

## Project structure

```
api/
  guide.js        Vercel serverless function — the only place ANTHROPIC_API_KEY
                  is read (model, system prompt, request/response, all self-contained)
src/
  assets/         Processed logo/emblem/hero/avatar images
  i18n/           translations.js — full EN/AR dictionary (225 keys)
  data/           students.js, services.js, regulations.js, deadlines.js, seed.js
  lib/            ubGuideApi.js (thin fetch('/api/guide') wrapper, no secrets),
                  aiEngine.js (offline fallback), assistant.js (bilingual name/avatar), utils.js
  context/        LanguageContext (EN/AR + RTL), AuthContext (demo login),
                  AppStateContext (requests, notifications, settings/theme, toast)
  components/
    ui/           Button, Card, Badge, Toast, Avatar, StatCard, EmptyState, Skeleton
    layout/       PublicNavbar, Footer, Sidebar, Topbar, BottomNav, AppShell,
                  FloatingAIButton
  pages/          Landing, Login, Dashboard, AIAssistant (UB Guide), Services,
                  ServiceDetail, RequestForm, Tracker, Notifications,
                  Profile, Settings
```

## Notes

- All app data (mock students, requests, notifications) lives in memory via
  React context and resets on page reload — there is no database. The
  serverless function is stateless too; it holds no session or history
  beyond what the frontend sends with each request.
- RTL is handled by setting `dir="rtl"` on `<html>` when Arabic is active.
  Direction-dependent layout (like the sidebar's off-canvas position) is
  computed in JS rather than via stacked Tailwind `rtl:`/`md:` classes,
  since those compile to selectors with different specificity and can
  silently fight each other.
- Colors, type, and spacing follow the same design tokens as the original
  prototype (navy `#143D75`, teal `#0BB8C4`, sand backgrounds, Cairo +
  IBM Plex Mono).

