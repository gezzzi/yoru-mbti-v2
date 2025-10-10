# Repository Guidelines

## Project Structure & Module Organization
- Next.js app source lives in `src/app`, using route groups like `(star)` and `(results)` to swap global layouts cleanly.
- Shared UI, hooks, and logic are under `src/components`, `src/hooks`, and `src/utils`; keep feature-specific helpers colocated with their page when reasonable.
- Domain data (questions, tags, positions) is in `src/data`; update TypeScript types in `src/types` alongside any schema changes.
- Static assets, favicons, and generated QR images belong in `public/`; avoid importing from `node_modules` at runtime.

## Build, Test, and Development Commands
- `npm run dev` – start the Next.js dev server with hot reload at `http://localhost:3000`.
- `npm run build` – produce the production bundle and regenerate the sitemap.
- `npm run start` – serve the built app locally for pre-deploy smoke tests.
- `npm run lint` – run ESLint (Next.js preset) to enforce style and catch common errors.

## Coding Style & Naming Conventions
- Write React components in TypeScript using functional components; prefer server components unless interactivity requires `"use client"`.
- Use 2-space indentation, camelCase variables/functions, PascalCase components, and descriptive file names (`ResultsLayout.tsx`, `useScrollAnimation.ts`).
- Compose styling with Tailwind CSS utilities; extract repeated patterns into components rather than long inline class lists.
- Import cross-module code via the `@/*` alias configured in `tsconfig.json`.

## Testing Guidelines
- Automated tests are not yet configured; add Jest + React Testing Library when introducing complex logic (e.g., `src/utils/testLogic.ts`).
- Co-locate future specs (`component.test.tsx`, `logic.test.ts`) beside their source and document manual QA steps in PRs until the test runner is wired in.

## Commit & Pull Request Guidelines
- Follow the existing concise, imperative commit style (often Japanese), e.g., `背景の点滅時間を調整`.
- Keep commits focused on a single concern; avoid bundling unrelated formatting or dependency changes.
- PRs should explain intent, enumerate functional/UI changes, attach before/after screenshots for visual tweaks, and reference related tasks or issues.

## Environment & Configuration Tips
- Store secrets in `.env.local`; never commit API keys. Document required variables in PRs or a shared vault.
- Validate UX flows on key routes (`/`, `/test`, `/results`, `/results/detail`) after layout changes and ensure generated assets in `.next/` remain untracked.
