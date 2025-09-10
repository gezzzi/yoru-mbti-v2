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
- **E/I**: 外向性 (Extroversion) / 内向性 (Introversion)
- **L/F**: リード (Lead) / フォロー (Follow) - mapped to L/F in code
- **A/S**: 冒険 (Adventure) / 安定 (Stable) - mapped to A/S in code
- **L2/F2**: ラブ (Love) / フリー (Free) - mapped to L2/F2 in code
- **O/S**: 開放 (Open) / 秘密 (Secret) - mapped to O/S in code

This creates 32 possible combinations, mapped to 16 personality types with production names:
- **Dom系**: 快楽王, 支配者, 愛情家, 調教師
- **Sub系**: 恋愛者, パーティーピーポー, 依存者, ムードメーカー
- **Introvert系**: 情熱家, 変態分析者, 守護者, 指揮者
- **妄想・回避系**: 妄想者, ドM者, ヒーラー, 提供者

### Core Data Flow
1. **Questions** (`src/data/questions.ts`): 40 questions total covering 5 axes
   - Questions 1-10: Axis questions (2 per axis, with isReverse flags)
   - Questions 11-35: Tag questions (25 tags total)
   - Questions 36-40: Additional metric questions
2. **Username Input**: 41st step - collects username for personality and compatibility tests
   - Separate component (`src/components/UsernameInput.tsx`) to prevent re-rendering issues
   - Required field - must be entered to see results
3. **Test Logic** (`src/utils/testLogic.ts`): Calculates personality type from answers
   - Processes 5 axes + additional metrics (libido, gap, tension, kiss importance)
   - Tag scoring system with top 2 tags selected based on scores
   - **50% threshold**: Values >= 50 map to first trait (E, L, A, L, O)
4. **Results Display**: Shows type with percentage bars, description, and sharing options
   - **Percentage display**: Shows stronger trait percentage (e.g., 80% for dominant trait)
   - Radar chart visualization for all 5 axes

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
- **48 Positions**: Recommends positions based on mood categories

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
- **Neon Text Effects**: Custom glowing text animations
- **Radar Charts**: Animated SVG charts for 5-axis visualization
- **QR Code Generation**: Built-in QR codes with logo for sharing
- **Responsive Design**: Mobile-first with custom tablet breakpoint (820px)

### Key Components Structure
- **Quiz Flow**: `test/page.tsx` → `components/Quiz.tsx` → `results/page.tsx`
- **Results**: `components/Results.tsx` with screenshot/QR code sharing
- **Compatibility**: `compatibility/page.tsx` → `CompatibilityPage.tsx` → `CompatibilityResults.tsx`
- **Navigation**: `components/NavigationWrapper.tsx` wraps the app
- **Footer**: Contains dev links to `/test-solo` and `/test-match`
- **Feedback Button**: Only shows on `/results` and `/compatibility/results` pages

### State Management
- React state hooks and URL parameters for state
- Test answers stored in `answerHistory` state during quiz
- Username in localStorage (`personality_test_username`)
- Results in localStorage (`personality_test_result`)
- Compatibility test uses URL params for both users' scores

### API Routes
- `/api/feedback`: Handles user feedback submission using Resend email service

### Styling Approach
- Tailwind CSS with custom animations in `tailwind.config.ts`
- Dark theme with purple/pink gradient aesthetics
- Custom viewport height handling (svh/lvh classes)
- Slider styling: 16px white thumb, pink/gray gradient track

## Important Implementation Details

### When Adding Features
- All UI text should be in Japanese
- Maintain the intimate/romantic theme
- Use existing color scheme (purples, pinks, dark backgrounds)
- Follow established component patterns

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
- **Add new question**: Update `src/data/questions.ts` (40 questions total)
- **Modify personality types**: Edit `src/data/personalityTypes.ts` (use production names)
- **Update test logic**: Modify `src/utils/testLogic.ts`
- **Adjust compatibility weights**: Edit weights in `CompatibilityResults.tsx:420-436`
- **Test different scenarios**: Use `/test-solo` and `/test-match` pages

### Critical Data Mappings
- **Axis codes in questions.ts**: 'EI', 'LF', 'AS', 'LF2', 'OS'
- **Question isReverse flags**: Determines how answers map to axis scores
  - Questions 1,3,5,10: isReverse=false
  - Questions 2,4,6,7,9: isReverse=true
  - Question 8: isReverse=false
- **Axis percentage calculation**: 
  - 50% threshold determines trait selection
  - Results page shows dominant trait percentage

### Performance Considerations
- Images optimized with Next.js Image component
- Sitemap auto-generated during build (nightpersonality.com)
- Google Analytics tracking (ID: G-HLM13T0M2K)
- Large components like `CompatibilityResults.tsx` (2100+ lines) may need offset/limit for reading