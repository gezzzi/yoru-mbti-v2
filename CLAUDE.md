# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 14 application called "夜の性格診断" (Night Personality Test) - an MBTI-style personality test focused on intimate/romantic personality aspects. The app is deployed at nightpersonality.com and serves Japanese-speaking users.

## Development Commands
```bash
# Development
npm run dev          # Start development server (usually on port 3000 or 3001)

# Production
npm run build        # Build for production (also generates sitemap)
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture & Key Concepts

### Personality System
The app uses a unique 5-axis system (not traditional MBTI):
- **E/I**: エクスタシー (Ecstasy) / インティメート (Intimate) - Extroversion/Introversion equivalent
- **D/S**: ドミナント (Dominant) / サブミッシブ (Submissive) - **Complementary axis** (L/F in code)
- **T/S**: テンダー (Tender) / ストリクト (Strict) - Adventure/Stable (A/S in code)
- **R/H**: リアリスト (Realist) / ヘドニスト (Hedonist) - Love/Free (L2/F2 in code)
- **A/N**: アナリティカル (Analytical) / ナチュラル (Natural) - Open/Secret (O/S in code)

This creates 32 possible combinations, mapped to 16 personality types with production names:
- **Dom系**: 快楽王, 支配者, 愛情家, 調教師
- **Sub系**: 恋愛者, パーティーピーポー, 依存者, ムードメーカー
- **Introvert系**: 情熱家, 変態分析者, 守護者, 指揮者
- **妄想・回避系**: 妄想者, ドM者, ヒーラー, 提供者

### Core Data Flow
1. **Questions** (`src/data/questions.ts`): 40 questions total (質問1-40) covering 5 axes
   - Questions 1-10: Axis questions (2 per axis, with isReverse flags)
   - Questions 11-35: Tag questions (25 tags total)
   - Questions 36-40: Additional metric questions
2. **Username Input**: 41st step - collects username for personality and compatibility tests
   - Separate component (`src/components/UsernameInput.tsx`) to prevent re-rendering issues
   - Required field (no default value) - must be entered to see results
3. **Test Logic** (`src/utils/testLogic.ts`): Calculates personality type from answers
   - Processes 5 axes + additional metrics (libido, gap, tension, kiss importance)
   - Tag scoring system (質問11-35) with top 2 tags selected based on scores
4. **Personality Types** (`src/data/personalityTypes.ts`): 16 personality type definitions
5. **Results Display**: Shows type with radar chart, description, and sharing options

### Key Features

#### Compatibility Test System
- **Partner Selection**: Two-path system - QR code scan or manual type selection
- **Compatibility Calculation**: Binary logic - (5-axis matches + tag matches) / (5 axes + tag union)
  - D/S axis (L/F in code) is **complementary** - counts as match when different
  - All other axes are **similar** - count as match when same
  - Tags scored 4+ (on 0-6 scale) are considered "possessed"
  - Weight system supported (currently all weights = 1.0)
  - Threshold: 50% determines which side of axis
- **Results Animations**: 
  - 0-39%: Snowfall animation (5 seconds)
  - 40-59%: Petal/sakura animation (1 second delay, 5.5 seconds duration)
  - 60-100%: Heart rain animation (5 seconds)
  - 80%+: Additional fireworks animation (4 seconds after initial animation)
- **Secret Questions**: Special intimate questions revealed after compatibility calculation
- **48 Positions**: Recommends positions based on mood categories (romantic/wild/playful/technical/foreplay)

#### Development Testing Pages
- **`/test-solo`**: Individual personality test simulator
  - 5-axis sliders (0-100%) for direct manipulation
  - Tag checkboxes for selecting personality tags
  - Generates proper answer data using `calculatePersonalityType`
- **`/test-match`**: Compatibility test simulator with presets
  - Perfect match (100%): D/S axis complementary (80/20)
  - Good match (60-80%): D/S axis complementary (70/35)
  - Poor match (0-39%): D/S axis same side (80/85)

#### Visual Components
- **Neon Text Effects**: Custom glowing text animations with usage limits
- **Radar Charts**: Animated SVG charts for visualizing 5-axis scores
- **QR Code Generation**: Built-in QR codes with logo for sharing results
- **Responsive Breakpoints**: Mobile-first with custom tablet breakpoint (820px)

### Key Components Structure
- **Quiz Flow**: `test/page.tsx` → `components/Quiz.tsx` (includes `UsernameInput.tsx`) → `results/page.tsx`
- **Results**: Uses `components/Results.tsx` with screenshot/QR code sharing
  - Username displayed at top (stored in localStorage)
  - No longer collects username on results page
- **Compatibility**: `compatibility/page.tsx` → `CompatibilityPage.tsx` → `CompatibilityResults.tsx`
- **Navigation**: `components/NavigationWrapper.tsx` wraps the app navigation
- **Type Details**: Individual pages under `app/types/[typeId]/`
- **Animation Components**: `HeartRain.tsx`, `Fireworks.tsx`, `SnowfallAnimation.tsx`, `PetalAnimation.tsx`

### State Management
- Uses React state hooks and URL parameters for state
- Test answers stored in `answerHistory` state during quiz
- Username stored in localStorage (`personality_test_username`)
- Results stored in localStorage (`personality_test_result`)
- Compatibility test uses extensive URL params for both users' scores

### API Routes
- `/api/feedback`: Handles user feedback submission using Resend email service

### Styling Approach
- Tailwind CSS with custom animations defined in `tailwind.config.ts`
- Dark theme with purple/pink gradient aesthetics
- Custom viewport height handling for mobile devices (svh/lvh classes)

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
- **Add new question**: Update `src/data/questions.ts` (40 questions total)
- **Modify personality types**: Edit `src/data/personalityTypes.ts` (use production names)
- **Update test logic**: Modify `src/utils/testLogic.ts`
- **Add new pages**: Follow Next.js App Router conventions in `src/app/`
- **Modify animations**: Update animation components and timing in `CompatibilityResults.tsx`
- **Add new positions**: Update `src/data/positions48.ts`
- **Adjust compatibility weights**: Edit `axisWeights` and `tagWeights` in `CompatibilityResults.tsx:420-436`
- **Username input issues**: Username component is separated in `UsernameInput.tsx` to prevent re-rendering/focus loss
- **Test compatibility**: Use `/test-match` page to test different scenarios with presets

### Critical Data Mappings
- **Axis codes in questions.ts**: 'EI', 'LF', 'AS', 'LF2', 'OS'
- **Question isReverse flags**: Determines how answers map to axis scores
  - Questions 1,3,5,10: isReverse=false
  - Questions 2,4,6,7,9: isReverse=true
  - Question 8: isReverse=false
- **L2/F2 axis mapping**: 
  - L2 > 50 = 'L' (Love/リアリスト) - deep relationships
  - L2 < 50 = 'F' (Free/ヘドニスト) - casual relationships

### Performance Considerations
- Images are optimized and use Next.js Image component
- Sitemap is auto-generated during build for SEO (nightpersonality.com)
- Google Analytics tracking is implemented (ID: G-HLM13T0M2K)
- Large components like `CompatibilityResults.tsx` (2100+ lines) may need offset/limit for reading