---
id: 14
title: Revert Better Auth Origin to Single String
stage: green
date: 2025-12-09
surface: agent
model: gemini
feature: 1-robotics-textbook-auth
branch: {{BRANCH}}
user: {{USER}}
command: when i click on signup button invalid origin error appears and the in backend dir where i run npm start the shows this error ERROR [Better Auth]: Invalid origin: http://localhost:3000
labels: ["cors", "backend", "bugfix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - backend/auth.ts
tests:
  - null
---

## Prompt

when i click on signup button invalid origin error appears and the in backend dir where i run npm start the shows this error ERROR [Better Auth]: Invalid origin: http://localhost:3000

## Response snapshot

I have reverted the 'better-auth' origin configuration in `backend/auth.ts` to a single string: 'http://localhost:3000', as the library likely does not support an array of origins.

## Outcome

- ✅ Impact: Reverted the 'better-auth' origin configuration to a single string, which should resolve the "Invalid origin" error if the frontend is indeed running on http://localhost:3000.
- 🧪 Tests: Manual verification on running app.
- 📁 Files: backend/auth.ts
- 🔁 Next prompts: User to confirm frontend URL or provide further debugging information.
- 🧠 Reflection: The 'better-auth' library's `origin` property likely does not support an array, leading to an incorrect configuration in the previous step.

## Evaluation notes (flywheel)

- Failure modes observed: 'Better Auth' invalid origin error.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
