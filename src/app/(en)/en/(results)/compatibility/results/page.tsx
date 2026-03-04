import type { Metadata } from 'next';
import EnCompatibilityResultsContainer, {
  SampleAxisInsight,
  SampleCompatibilitySummary,
} from '@/components/en/CompatibilityResultsContainer';
import { personalityTypes } from '@/data/en/personalityTypes';
import type { TestResult } from '@/types/personality';
import { nightCompatibilityDescriptions } from '@/data/en/nightCompatibilityDescriptions';
import { getLegacyPersonalityCode } from '@/utils/personalityImage';

const ensurePersonalityType = (code: string) => {
  const base = personalityTypes.find((type) => type.code === code);
  return base ?? personalityTypes[0];
};

const sampleMyResult: TestResult = {
  E: 78,
  L: 68,
  A: 74,
  L2: 66,
  O: 62,
  type: {
    ...ensurePersonalityType('LAL'),
    code: 'LAL',
  },
};

const samplePartnerResult: TestResult = {
  E: 44,
  L: 34,
  A: 48,
  L2: 58,
  O: 42,
  type: {
    ...ensurePersonalityType('FSL'),
    code: 'FSL',
  },
};

const calculateCompatibilitySummary = (
  user: TestResult,
  partner: TestResult,
): SampleCompatibilitySummary => {
  const eScore = (100 - Math.abs(user.E - partner.E)) * 0.15;
  const lScore = (100 - Math.abs(user.L + partner.L - 100)) * 0.3;
  const aScore = (100 - Math.abs(user.A - partner.A)) * 0.25;
  const l2Score = (100 - Math.abs(user.L2 - partner.L2)) * 0.2;
  const oScore = (100 - Math.abs(user.O - partner.O)) * 0.1;

  const score = Math.max(0, Math.min(100, eScore + lScore + aScore + l2Score + oScore));

  if (score >= 80) {
    return {
      score: Math.round(score),
      description:
        'Your values and emotional wavelengths align beautifully. This pairing naturally fosters both comfort and excitement in the relationship.',
      tips: [
        'Leverage your shared strengths while occasionally switching roles to keep things fresh.',
        'Make it a habit to express gratitude in words at least once a week to keep each other\'s efforts visible.',
        'Create a shared calendar to align expectations and stay in sync.',
      ],
    };
  }

  if (score >= 60) {
    return {
      score: Math.round(score),
      description:
        'A fundamentally compatible pairing. Your differences can serve as healthy stimulation and room for growth.',
      tips: [
        'When your pace differs, decide upfront who will take the lead in that moment.',
        'Set aside one evening a week as a "couple check-in" to briefly share what you\'ve been feeling.',
        'Start conversations around shared values, then introduce one new idea to explore together.',
      ],
    };
  }

  if (score >= 40) {
    return {
      score: Math.round(score),
      description:
        'Your values differ noticeably, but clear role-sharing and ground rules can bridge the gap.',
      tips: [
        'Pick one daily routine to share so you have a common rhythm to build on.',
        'Use notes or cards to express feelings when words feel difficult — it helps fill the silence with warmth.',
        'Consciously appreciate each other\'s strengths and reframe differences as complementary assets.',
      ],
    };
  }

  return {
    score: Math.round(score),
    description:
      'A pairing with significant value differences. Establishing ground rules and seeking outside support when needed will help create stability.',
    tips: [
      'Create a shared "priority list" you can both refer to when things get complicated.',
      'Agree on a cool-down signal — like grabbing water or taking a deep breath — for when conversations get heated.',
      'Find a shared hobby or learning activity where you can cooperate comfortably and build trust.',
    ],
  };
};

const describeSimilarityAxis = (
  label: string,
  positiveLabel: string,
  negativeLabel: string,
  userScore: number,
  partnerScore: number,
): SampleAxisInsight => {
  const userOrientation = userScore >= 50 ? positiveLabel : negativeLabel;
  const partnerOrientation = partnerScore >= 50 ? positiveLabel : negativeLabel;
  const difference = Math.abs(userScore - partnerScore);

  let verdictBase = 'Values are closely aligned';
  let detail = 'A natural match where you can easily keep pace with each other.';

  if (difference > 30) {
    verdictBase = 'Significant temperature gap';
    detail = 'Your preferred tempos differ — setting clear signals and rules will help you stay in sync.';
  } else if (difference > 15) {
    verdictBase = 'Slight rhythm difference';
    detail = 'A little verbal check-in or eye contact goes a long way in turning differences into positive sparks.';
  }

  return {
    label,
    verdict: `${verdictBase} (${userOrientation} × ${partnerOrientation})`,
    detail,
  };
};

const describeComplementAxis = (
  label: string,
  leadLabel: string,
  followLabel: string,
  userScore: number,
  partnerScore: number,
): SampleAxisInsight => {
  const userRole = userScore >= 50 ? leadLabel : followLabel;
  const partnerRole = partnerScore >= 50 ? leadLabel : followLabel;
  const balanceGap = Math.abs(100 - (userScore + partnerScore));

  let verdictBase = 'Ideal role balance';
  let detail = 'You can seamlessly exchange the lead without overthinking, keeping the energy flowing.';

  if (balanceGap > 30) {
    verdictBase = 'Role negotiation needed';
    detail = 'Communicate clearly about who takes the lead and establish comfort signals for both sides.';
  } else if (balanceGap > 15) {
    verdictBase = 'Slight role imbalance';
    detail = 'Switching between initiator and supporter depending on the situation helps restore equilibrium.';
  }

  return {
    label,
    verdict: `${verdictBase} (${userRole} × ${partnerRole})`,
    detail,
  };
};

const sampleSummary = calculateCompatibilitySummary(sampleMyResult, samplePartnerResult);

const sampleAxisInsights: SampleAxisInsight[] = [
  describeSimilarityAxis('Social / Reserved', 'Social-leaning', 'Reserved-leaning', sampleMyResult.E, samplePartnerResult.E),
  describeComplementAxis('Lead / Follow', 'Lead type', 'Follow type', sampleMyResult.L, samplePartnerResult.L),
  describeSimilarityAxis('Adventurous / Stable', 'Adventure-focused', 'Stability-focused', sampleMyResult.A, samplePartnerResult.A),
  describeSimilarityAxis('Devotion Style', 'Devotion-focused', 'Freedom-focused', sampleMyResult.L2, samplePartnerResult.L2),
  describeSimilarityAxis('Openness / Privacy', 'Open', 'Private', sampleMyResult.O, samplePartnerResult.O),
];

const sampleNightCompatibilityKey = `${(getLegacyPersonalityCode(sampleMyResult.type.code).toLowerCase() || 'elal')}×${(getLegacyPersonalityCode(samplePartnerResult.type.code).toLowerCase() || 'elal')}` as keyof typeof nightCompatibilityDescriptions;
const sampleNightCompatibility = nightCompatibilityDescriptions[sampleNightCompatibilityKey];
const sampleNightParagraphs = (sampleNightCompatibility ?? '')
  .split(/\n+/)
  .map((paragraph) => paragraph.trim())
  .filter(Boolean);

export const metadata: Metadata = {
  title: 'Couple Compatibility Results - Intimate Match Score | Night Personality Test',
  description:
    'See your intimate compatibility score and detailed analysis. Get personalized tips to improve your relationship based on your unique personality type combination across 5 intimate axes.',
  keywords: 'couple compatibility results, intimate match score, relationship compatibility analysis, couple quiz results, sexual compatibility score, partner match percentage',
  openGraph: {
    title: 'Your Intimate Compatibility Results | Night Personality Test',
    description: 'See how compatible you are with your partner across 5 intimate personality axes. Get personalized improvement tips.',
    url: 'https://nightpersonality.com/en/compatibility/results',
    siteName: 'Night Personality Test',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nightpersonality.com/en/compatibility/results',
    languages: {
      'ja': 'https://nightpersonality.com/compatibility/results',
      'en': 'https://nightpersonality.com/en/compatibility/results',
    },
  },
};

export default function EnCompatibilityResultsPage() {
  return (
    <EnCompatibilityResultsContainer
      sampleSummary={sampleSummary}
      sampleAxisInsights={sampleAxisInsights}
      sampleNightParagraphs={sampleNightParagraphs}
      sampleMyTypeName={sampleMyResult.type.name}
      samplePartnerTypeName={samplePartnerResult.type.name}
    />
  );
}
