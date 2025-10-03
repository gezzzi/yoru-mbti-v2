# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 14 application called "夜の性格診断" (Night Personality Test) - a sophisticated Japanese psychological assessment application that determines intimate/romantic personality types using a unique 5-axis system (NOT traditional MBTI). The app is deployed at https://nightpersonality.com and serves Japanese-speaking users.

## Development Commands
```bash
# Development
npm run dev          # Start development server on port 3000 (or 3001 if occupied)

# Production
npm run build        # Build for production (also generates sitemap via next-sitemap)
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint for code quality checks

# Installation
npm install          # Install all dependencies
```

## Architecture & Key Concepts

### Personality System
The app uses a unique 5-axis system (not traditional MBTI):
- **E/I**: 社交的 (Extroversion) / マイペース (Introversion)
- **L/F**: 主導権を握る (Lead) / 相手に合わせる (Follow) - mapped to L/F in code
- **A/S**: 刺激好き (Adventure) / 安心重視 (Stable) - mapped to A/S in code
- **L2/F2**: 一途 (Love) / 自由 (Free) - mapped to L2/F2 in code
- **O/S**: オープン (Open) / 秘密主義 (Secret) - mapped to O/S in code

This creates 32 possible combinations, mapped to 16 personality types with production names:
- **Dom系**: 快楽王, 支配者, 愛情家, 調教師
- **Sub系**: 恋愛者, パーティーピーポー, 依存者, ムードメーカー
- **Introvert系**: 情熱家, 変態分析者, 守護者, 指揮者
- **妄想・回避系**: 妄想者, ドM者, ヒーラー, 提供者

### Core Data Flow
1. **Questions** (`src/data/questions.ts`): 40 questions total covering 5 axes
   - Questions 1-10: Axis questions (2 per axis, with isReverse flags)
   - Questions 11-35: Tag questions (25 tags total) - tags are internally calculated but NOT displayed on results page
   - Questions 36-40: Additional metric questions (secret compatibility questions)
   - **Question randomization**: Client-side shuffling with session persistence (uses `getShuffledQuestions()`)
   - **Question variations**: Questions 1-35 have 3 text variations each (selected via seeded random)
   - **Answer scale**: 6-point scale (0-5) without neutral option - removed "どちらでもない"
2. **Username Input**: 41st step - collects username for personality and compatibility tests
   - Separate component (`src/components/UsernameInput.tsx`) to prevent re-rendering issues
   - Required field with validation (1-20 characters)
   - Shows character count and error messages
3. **Test Logic** (`src/utils/testLogic.ts`): Calculates personality type from answers
   - Processes 5 axes + additional metrics (libido, gap, tension, kiss importance)
   - Tag scoring system with top 2 tags selected based on scores (used internally for personality descriptions)
   - **50% threshold**: Values >= 50 map to first trait (E, L, A, L, O)
   - **Score calculation**: Adjusted for 6-point scale (0-5), dividing by 5 instead of 6
   - **Tag thresholds**: Tags with score >= 3 are considered "possessed" (previously 4)
4. **Results Display** (`src/components/Results.tsx`): Shows type with percentage bars, description, and sharing options
   - **Percentage display**: Shows stronger trait percentage (e.g., 80% for dominant trait)
   - Bar graph visualization for all 5 axes with updated labels
   - Tags are calculated but hidden from display (commented out in lines 446-471)

### Key Features

#### Compatibility Test System
- **Partner Selection**: Two-path system - QR code scan or manual type selection
- **Compatibility Calculation**: (5-axis matches + tag matches) / (5 axes + tag union)
  - L/F axis is **complementary** - counts as match when different
  - All other axes are **similar** - count as match when same
  - Tags scored 4+ (on 0-6 scale) are considered "possessed"
- **Results Animations**:
  - 0-39%: Snowfall animation
  - 40-59%: Petal/sakura animation
  - 60-100%: Heart rain animation
  - 80%+: Additional fireworks animation
- **Secret Questions**: Special intimate questions revealed after compatibility
- **48 Positions** (`src/data/positions.ts`): Recommends positions based on mood categories
  - Display format: 3-column grid on sm+ screens
  - Difficulty shown with heart symbols (♥) in pink color
  - Furigana displayed above kanji names

#### Development Testing Pages
- **`/test-solo`**: Individual personality test simulator
  - 5-axis sliders (0-100%) for direct manipulation
  - Slider position: left = first trait, right = second trait
  - Tag checkboxes for selecting personality tags
  - Uses `calculatePersonalityType` for consistent results
  - Custom CSS slider styling with pink/gray gradient
- **`/test-match`**: Compatibility test simulator with presets
  - Dual user configuration with independent sliders
  - Preset buttons for testing different compatibility scenarios
  - Custom slider.css for visual styling

#### Visual Components
- **Neon Text Effects**: Custom glowing text animations with optimized iPhone rendering
- **Bar Graphs**: Horizontal bars for 5-axis visualization in results
- **QR Code Generation**: Built-in QR codes with logo for sharing (html2canvas)
- **Responsive Design**: Mobile-first with custom tablet breakpoint (820px)
- **Background Starfield**: Fixed position with CSS animations (50 stars, 3s twinkle cycle)
- **Quiz UI Elements**:
  - 6 circular buttons for answers with size variation (larger at extremes)
  - Enhanced sizes: Mobile (w-11 to w-14), Desktop (md:w-14 to md:w-20)
  - Spacing: space-x-3 (mobile), md:space-x-6 (desktop)
  - Question text: text-xl (mobile), md:text-2xl (desktop)

### Key Components Structure
- **Quiz Flow**: `test/page.tsx` → `components/Quiz.tsx` → `results/page.tsx`
- **Results**: `components/Results.tsx` with screenshot/QR code sharing (html2canvas)
- **Compatibility**: `compatibility/page.tsx` → `CompatibilityPage.tsx` → `CompatibilityResults.tsx`
- **Navigation**: `components/NavigationWrapper.tsx` wraps the app
- **Footer**: Contains dev links to `/test-solo` and `/test-match`
- **Feedback Button**: Only shows on `/results` and `/compatibility/results` pages

### State Management
- **No global state library** - Pure React hooks + localStorage + URL parameters
- Test answers stored in `answerHistory` state during quiz
- Username in localStorage (`personality_test_username`)
- Results in localStorage (`personality_test_result`)
- Recommended positions cached in localStorage by personality type
- Question order persisted in sessionStorage during session
- Compatibility test uses URL params for both users' scores

### API Routes
- `/api/feedback`: Handles user feedback submission using Resend email service
- No authentication system implemented
- No database - all state is client-side or in URL params

### Legal & Compliance Pages
- `/privacy`: Privacy policy page (プライバシーポリシー)
- `/about`: About/operator information page (運営者情報)
- `/contact`: Contact page (お問い合わせ)
- **Affiliate disclosure**: Displayed on results page and footer
- **A8.net affiliate**: Integrated in results page with proper disclosure labels
  - Link text: "公式ストアで今すぐチェック" (Check now at official store)

### Styling Approach
- Tailwind CSS with custom animations in `tailwind.config.ts`
- Dark theme with purple/pink gradient aesthetics
- Custom viewport height handling (svh/lvh classes)
- Slider styling: 16px white thumb, pink/gray gradient track
- Position cards: white/10 background with hover effects

## Important Implementation Details

### When Adding Features
- All UI text should be in Japanese
- Maintain the intimate/romantic theme
- Use existing color scheme (purples, pinks, dark backgrounds)
- Follow established component patterns
- **Accessibility**: Keyboard navigation support (arrow keys for selection, 1-7 number keys)
- **Error handling**: Always wrap localStorage/sessionStorage access in try-catch blocks
- **SEO & Meta**: Comprehensive OpenGraph + Twitter cards + structured data (FAQ, Breadcrumb, WebSite schemas)

### Testing Considerations
- No test framework currently set up
- Manual testing required for quiz flow and results
- Check responsive design on mobile, tablet (820px), and desktop

### Environment Variables
Required for feedback system:
- `RESEND_API_KEY`: For sending feedback emails
- `FEEDBACK_TO`: Email address to receive feedback
- `FEEDBACK_FROM`: From address for feedback emails

### Common Tasks
- **Add new question**: Update `src/data/questions.ts` (40 questions total, do not exceed)
- **Modify personality types**: Edit `src/data/personalityTypes.ts` (use production names)
- **Update test logic**: Modify `src/utils/testLogic.ts`
- **Adjust compatibility weights**: Edit weights in `CompatibilityResults.tsx` calculateCompatibility function
- **Test different scenarios**: Use `/test-solo` and `/test-match` pages
- **Update 48 positions data**: Edit `src/data/positions.ts`
- **Modify animations**: Check `tailwind.config.ts` for custom animation definitions
- **Update affiliate links**: Edit Results.tsx lines 1103-1117 (A8.net affiliate links with nofollow, noopener, sponsored attributes)

### Critical Data Mappings
- **Axis codes in questions.ts**: 'EI', 'LF', 'AS', 'LF2', 'OS'
- **Question isReverse flags**: Determines how answers map to axis scores
  - Questions 1,3,5,10: isReverse=false
  - Questions 2,4,6,7,9: isReverse=true
  - Question 8: isReverse=false
- **Axis percentage calculation**:
  - 50% threshold determines trait selection
  - Results page shows dominant trait percentage
  - Now using 6-point scale (0-5) calculations throughout
- **Axis label updates in Results.tsx**:
  - Lines 230-284: Dimension definitions with new Japanese labels
  - Line 410-414: isReverse conditions updated for new label names

### Performance Considerations
- Images optimized with Next.js Image component
- Sitemap auto-generated during build via next-sitemap
- Google Analytics tracking (ID: G-HLM13T0M2K)
- Large components like `CompatibilityResults.tsx` (2100+ lines) may need offset/limit for reading
- **No SSR for quiz state** - all client-side rendering (prevents hydration issues)
- Screenshot generation can be memory-intensive on mobile devices
- **Memory optimization**: Common options array shared across all 40 questions (reduces ~280 duplicates to 1)
- **Client-side question shuffling**: Uses sessionStorage to maintain order during session
- **Graceful fallbacks**: Unsupported viewport units (svh/lvh) fall back to vh

### Deployment Notes
- Production URL: https://nightpersonality.com
- Next.js 14 with App Router
- Static generation for most pages
- Dynamic routes for results and compatibility pages

### Recent UI Changes
- **Quiz answer system**: Changed from 7-point to 6-point scale (removed neutral option)
- **Circle button sizes**: Enhanced for better visibility
  - Mobile: w-11 to w-14 (based on position)
  - Desktop: md:w-14 to md:w-20 (based on position)
- **Question text size**: Increased to text-xl (mobile) and md:text-2xl (desktop)
- Tag display removed from results page (lines 446-471 commented out)
- Axis labels updated to more descriptive Japanese terms
- Position recommendations unified between personal and compatibility results
- Furigana positioning moved above kanji in position cards
- Difficulty indicators changed from stars to hearts with pink color
- Question randomization implemented client-side (no longer fixed order)
- Keyboard navigation updated for 6 options (keys 1-6)
- Username validation with character counter added
- Natural scroll delay increased from 30ms to 150ms
- Affiliate link text updated to "公式ストアで今すぐチェック"
- Legal pages added with consistent UI styling (privacy, about, contact)
- Footer includes affiliate disclosure statement
- Accordion menus removed from results page - all sections now always visible
- Results page card padding/margin adjusted for better mobile display
- Font sizes increased across personality card sections (text-base sm:text-lg)