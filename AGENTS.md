# Repository Guidelines

## Project Structure & Module Organization
- Source routes live in `src/app`; route groups like `(star)` and `(results)` isolate layouts while sharing the root metadata in `layout.tsx`.
- Cross-cutting components, hooks, and utilities reside in `src/components`, `src/hooks`, and `src/utils`. Keep feature-specific helpers alongside their page when scope is narrow.
- Domain data and TypeScript contracts are paired under `src/data` and `src/types`; static media belongs in `public/`, and `.next/` must remain ignored.

## Build, Test, and Development Commands
- `npm run dev`: start the Next.js dev server with hot reload at `http://localhost:3000`.
- `npm run build`: output the production bundle and regenerate artifacts such as the sitemap.
- `npm run start`: serve the built bundle locally for smoke checks.
- `npm run lint`: execute ESLint; run before every PR to catch regressions early.

## Coding Style & Naming Conventions
- Write React components in TypeScript; default to server components unless client-only hooks or browser APIs require `"use client"`.
- Indent with two spaces, prefer camelCase for variables/functions, PascalCase for components, and descriptive filenames (e.g., `ResultsLayout.tsx`, `useScrollAnimation.ts`).
- Compose UI with Tailwind utility classes; extract reusable combinations into shared components. Import cross-module code via the `@/*` alias.

## Testing Guidelines
- Automated testing is not yet wired up. For complex logic, scaffold Jest + React Testing Library suites (`Component.test.tsx`, `logic.test.ts`) near the source.
- Document any manual QA steps—especially flows across `/`, `/test`, `/results`, and `/compatibility/results`—in PR descriptions until automated coverage exists.

## Commit & Pull Request Guidelines
- Follow the historical pattern of concise, imperative commit messages, often in Japanese (e.g., `背景の点滅時間を調整`). Keep commits focused; avoid mixing refactors with feature work.
- PRs should summarize intent, list behavioral/UI changes, link related issues, attach before/after screenshots for visual tweaks, and confirm `npm run lint` plus key flow smoke tests.

## Environment & Configuration Tips
- Store secrets in `.env.local` only. Update shared docs when introducing new variables.
- Validate visual changes on both desktop and mobile to preserve gradients, animations, and modal interactions.

## Agent Notes
- Codex must not perform git operations in this repository.
