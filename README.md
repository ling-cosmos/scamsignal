# ScamSignal

## Portfolio deployment

The original Next.js app is hosted at https://scamsignal-portfolio.vercel.app/ with `PORTFOLIO_DEMO=true`. This explicit mode uses the original deterministic message rules with English, Filipino and Bisaya explanations. Its visible banner identifies that AI analysis is disabled. It makes no paid model calls. Removing the flag restores the original Claude API configuration requirements; the missing-key error is preserved outside demo mode.

ScamSignal is a standalone scam checker for suspicious SMS, links, and GCash-style payment messages. It combines deterministic checks with a Claude assessment and returns a low, medium, or high risk signal with reasons and next steps.

## File structure

```text
app/                         # Next.js routes and page entry points
components/scam-signal/      # client-side checker UI
features/scam-check/
├── domain/                  # URL extraction, scam rules, response contracts
├── infrastructure/          # server-only Claude adapter
└── presentation/            # English / Filipino / Bisaya copy
```

## Run locally

```bash
npm ci
cp .env.example .env.local
# add ANTHROPIC_API_KEY to .env.local
npm run dev
```

## Verify and build

```bash
npm test
npm run build
```

## Deploy on Vercel

Import this repository as a Next.js project using the repository root. Add `ANTHROPIC_API_KEY` under Project Settings → Environment Variables, then deploy. The `/api/check` route runs on Vercel’s server runtime; the key is never sent to the browser.
