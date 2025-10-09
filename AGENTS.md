# Repository Guidelines

## Project Structure & Module Organization
- Application code lives under `src/app`, following Next.js routing conventions (`page.tsx`, nested layouts, segments such as `results/`).
- Reusable UI and logic sit in `src/components` and `src/utils`; keep shared hooks or helpers colocated with their domain when possible.
- Static assets (images, icons, manifest) reside in `public/`. Generated sitemap artifacts are output during build and should be ignored in commits.
- Legacy or exploratory code may be in `backup/`; treat it as read-only reference.

## Build, Test, and Development Commands
- `npm run dev`: launch the Next.js dev server with hot reload at `http://localhost:3000`.
- `npm run build`: create the production bundle and regenerate the sitemap via `next-sitemap`.
- `npm run start`: serve the compiled app locally to sanity-check the production build.
- `npm run lint`: run ESLint with the Next.js config; fix reported issues before submitting changes.

## Coding Style & Naming Conventions
- Use TypeScript and React functional components; prefer server components unless interactivity demands `"use client"`.
- Follow 2-space indentation, descriptive camelCase for variables/functions, PascalCase for components, and kebab-case for files in `public/`.
- Style with Tailwind CSS utility classes; extract shared patterns into components instead of long class strings when readability suffers.
- Respect the `@/*` path alias defined in `tsconfig.json` for cross-module imports.

## Testing Guidelines
- No automated test suite exists yet; add targeted Jest + Testing Library coverage when introducing complex logic (see `src/utils/testLogic.ts` for candidates).
- Co-locate tests with implementation (`component.test.tsx`, `logic.test.ts`) and ensure they run under `npm test` once the script is added.
- Document any manual QA steps in pull requests until automated coverage is established.

## Commit & Pull Request Guidelines
- Mirror the existing concise, action-focused commit style (often imperative Japanese, e.g., `背景の点滅時間を調整`). Keep commits scoped to a single concern.
- Pull requests should summarize intent, list functional changes, call out UI impacts with screenshots, and reference related issues or tasks.
- Flag breaking changes or migrations early and include rollout/backout notes when relevant.

## Environment & Configuration Tips
- Keep environment secrets out of the repo; load them via `.env.local` and document required keys in PRs.
- Verify visual changes across key routes such as `/`, `/test`, `/results`, and `/results/detail` to catch layout regressions.
