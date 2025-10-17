# Repository Guidelines

## Project Structure & Module Organization
The Next.js source sits in `src/app`, organized with route groups such as `(star)` and `(results)` to isolate layouts. Shared building blocks live in `src/components`, `src/hooks`, and `src/utils`; co-locate feature-specific helpers beside their page when scope is narrow. Domain datasets (questions, tags, compatibility copy) are housed in `src/data`, with matching TypeScript contracts in `src/types`. Static assets and generated media belong in `public/`; anything in `.next/` is build output and must stay untracked.

## Build, Test, and Development Commands
- `npm run dev` – launch the development server at `http://localhost:3000` with hot reload.
- `npm run build` – create the production bundle and regenerate ancillary files like the sitemap.
- `npm run start` – serve the compiled bundle locally for smoke testing.
- `npm run lint` – execute ESLint using the Next.js config; run before every PR to surface regressions early.

## Coding Style & Naming Conventions
Write React components in TypeScript, defaulting to server components unless client-only features require `"use client"`. Indent with 2 spaces. Prefer camelCase for variables/functions, PascalCase for components, and descriptive filenames (e.g., `ResultsLayout.tsx`, `useScrollAnimation.ts`). Compose UI with Tailwind utility classes; when combinations grow unwieldy, extract reusable components. Import cross-module code via the `@/*` alias defined in `tsconfig.json`.

## Testing Guidelines
Automated testing is not yet wired up. When implementing complex logic (utilities, hooks), scaffold Jest + React Testing Library suites alongside the source (`Component.test.tsx`, `logic.test.ts`). Until the harness is active, document manual QA steps in your PR descriptions so reviewers can reproduce checks.

## Commit & Pull Request Guidelines
Existing history favors concise, imperative commit messages—often Japanese phrases such as `背景の点滅時間を調整`. Keep each commit focused; avoid mixing refactors with feature work. Pull requests should summarize intent, enumerate UI or behavioral changes, reference related issues, and include before/after screenshots for visual updates. Confirm `npm run lint` passes and that key flows (`/`, `/test`, `/results`, `/compatibility/results`) were smoke-tested.

## Environment & Configuration Tips
Secrets belong in `.env.local` and must never be committed. When adding new variables, update shared documentation. If a change touches rendering or theming, validate across desktop and mobile breakpoints to ensure animations, gradients, and modal flows remain smooth.
