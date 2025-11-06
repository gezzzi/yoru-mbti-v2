# Repository Guidelines

## Project Structure & Module Organization
- Source routes live in `src/app`. Route groups like `(star)` and `(results)` isolate layouts while inheriting root metadata from `layout.tsx`.
- Shared UI lives under `src/components`, hooks in `src/hooks`, and utilities in `src/utils`. Keep feature-specific helpers near their pages.
- Domain data is in `src/data`, TypeScript contracts in `src/types`, and static media in `public/`. The `.next/` build output stays ignored.

## Build, Test, and Development Commands
- `npm run dev`: Start the Next.js dev server at `http://localhost:3000` with hot reload.
- `npm run build`: Produce the production bundle and regenerate artifacts like the sitemap.
- `npm run start`: Serve the built app locally for smoke-testing.
- `npm run lint`: Run ESLint; execute before every PR to catch regressions early.

## Coding Style & Naming Conventions
- React components are written in TypeScript; default to server components unless client-only hooks or browser APIs require `'use client'`.
- Indent with two spaces, use camelCase for functions/variables, PascalCase for components, and adopt descriptive filenames (e.g., `ResultsLayout.tsx`).
- Compose UI with Tailwind utility classes; extract reusable patterns into shared components. Import cross-module code via the `@/*` alias.

## Testing Guidelines
- Automated testing is not yet wired up. For complex logic, scaffold Jest + React Testing Library suites (e.g., `Component.test.tsx`) beside the source.
- Document manual QA flows—especially across `/`, `/test`, `/results`, and `/compatibility/results`—in PR descriptions until automated coverage exists.

## Commit & Pull Request Guidelines
- Follow the repository’s precedent of concise, imperative commit messages, often in Japanese (e.g., `背景の点滅時間を調整`).
- PRs should summarize intent, list behavioural/UI changes, reference related issues, attach before/after screenshots for visual tweaks, and confirm `npm run lint` plus key flow smoke tests. Keep commits focused—avoid mixing refactors with feature work.

## Security & Configuration Tips
- Store secrets only in `.env.local`; update shared docs when introducing new variables.
- Validate visual changes on both desktop and mobile to preserve gradients, animations, and modal interactions.
