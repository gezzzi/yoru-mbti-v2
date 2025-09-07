# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 14 application called "夜の性格診断" (Night Personality Test) - an MBTI-style personality test focused on intimate/romantic personality aspects. The app is deployed at nightpersonality.com and serves Japanese-speaking users.

## Development Commands
```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production (also generates sitemap)
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture & Key Concepts

### Personality System
The app uses a unique 5-axis system (not traditional MBTI):
- **E/I**: エクスタシー (Ecstasy) / インティメート (Intimate)
- **D/S**: ドミナント (Dominant) / サブミッシブ (Submissive)
- **T/S**: テンダー (Tender) / ストリクト (Strict)
- **R/H**: リアリスト (Realist) / ヘドニスト (Hedonist)
- **A/N**: アナリティカル (Analytical) / ナチュラル (Natural)

This creates 32 possible combinations, mapped to 16 personality types (e.g., AURA_MYSTIC, SHADOW_EXPLORER).

### Core Data Flow
1. **Questions** (`src/data/questions.ts`): 25 base questions with 3 variations each, 5 per axis
2. **Test Logic** (`src/utils/testLogic.ts`): Calculates personality type from answers
   - Processes 5 axes + additional metrics (libido, gap, tension, kiss importance)
   - Tag scoring system (質問11-35) with top 2 tags selected based on scores
3. **Personality Types** (`src/data/personalityTypes.ts`): 16 personality type definitions
4. **Results Display**: Shows type with radar chart, description, and sharing options

### Key Features

#### Compatibility Test System
- **Partner Selection**: Two-path system - QR code scan or manual type selection
- **Compatibility Calculation**: 2値化ロジック - (5軸の共通数 + タグの共通数) / (5軸数 + タグの和集合)
  - L/F軸は補完軸（異なる場合に共通とカウント）
  - その他の軸は類似軸（同じ場合に共通とカウント）
  - タグは4点以上（0-6スケール）を「持っている」と判定
  - 重みづけシステム対応（現在は全て1.0）
- **Results Animations**: 
  - 0-39%: Snowfall animation (5 seconds)
  - 40-59%: Petal/sakura animation (1 second delay, 5.5 seconds duration)
  - 60-100%: Heart rain animation (5 seconds)
  - 80%+: Additional fireworks animation (4 seconds after initial animation)
- **Secret Questions**: Special intimate questions revealed after compatibility calculation
- **48 Positions**: Recommends positions based on mood categories (romantic/wild/playful/technical/foreplay)

#### Visual Components
- **Neon Text Effects**: Custom glowing text animations with usage limits
- **Radar Charts**: Animated SVG charts for visualizing 5-axis scores
- **QR Code Generation**: Built-in QR codes with logo for sharing results

### Key Components Structure
- **Quiz Flow**: `test/page.tsx` → `components/Quiz.tsx` → `results/page.tsx`
- **Results**: Uses `components/Results.tsx` with screenshot/QR code sharing
- **Compatibility**: `compatibility/page.tsx` → `CompatibilityPage.tsx` → `CompatibilityResults.tsx`
- **Navigation**: `components/NavigationWrapper.tsx` wraps the app navigation
- **Type Details**: Individual pages under `app/types/[typeId]/`
- **Animation Components**: `HeartRain.tsx`, `Fireworks.tsx`, `SnowfallAnimation.tsx`, `PetalAnimation.tsx`

### State Management
- Uses React state hooks and URL parameters for state
- Test answers stored in `answerHistory` state during quiz
- Results passed via URL query parameters
- Compatibility test uses extensive URL params for both users' scores

### API Routes
- `/api/feedback`: Handles user feedback submission using Resend email service

### Styling Approach
- Tailwind CSS with custom tablet breakpoint (820px)
- Dark theme with purple/pink gradient aesthetics
- Responsive design with mobile-first approach
- Custom animations defined in `tailwind.config.ts`

## Important Implementation Details

### When Adding Features
- All UI text should be in Japanese
- Maintain the intimate/romantic theme in content
- Use existing color scheme (purples, pinks, dark backgrounds)
- Follow the established component patterns

### Testing Considerations
- No test framework is currently set up
- Manual testing required for quiz flow and results calculation
- Check responsive design on mobile, tablet (820px), and desktop

### Environment Variables
Required for feedback system:
- `RESEND_API_KEY`: For sending feedback emails
- `FEEDBACK_TO`: Email address to receive feedback
- `FEEDBACK_FROM`: From address for feedback emails

### Common Tasks
- **Add new question**: Update `src/data/questions.ts` (maintain 5 questions per axis)
- **Modify personality types**: Edit `src/data/personalityTypes.ts`
- **Update test logic**: Modify `src/utils/testLogic.ts`
- **Add new pages**: Follow Next.js App Router conventions in `src/app/`
- **Modify animations**: Update animation components and timing in `CompatibilityResults.tsx`
- **Add new positions**: Update `src/data/positions48.ts`
- **Adjust compatibility weights**: Edit `axisWeights` and `tagWeights` in `CompatibilityResults.tsx:420-436`
- **Test compatibility**: Use `/test-match` page to test different scenarios

### Performance Considerations
- Images are optimized and use Next.js Image component
- Sitemap is auto-generated during build for SEO (nightpersonality.com)
- Google Analytics tracking is implemented (ID: G-HLM13T0M2K)
- Large components like `CompatibilityResults.tsx` (2100+ lines) may need offset/limit for reading
- Custom viewport height handling for mobile devices (svh/lvh classes)