import { personalityTypes } from '@/data/personalityTypes';
import type { TestResult } from '@/types/personality';

const resolveType = (code: string) => {
  const base = personalityTypes.find((type) => type.code === code);
  return base ?? personalityTypes[0];
};

export const sampleResult: TestResult = {
  E: 62,
  L: 74,
  A: 58,
  L2: 45,
  O: 68,
  type: {
    ...resolveType('LAL'),
    code: 'LAL',
  },
  additionalResults: {
    smTendency: 'S',
    smScore: 68,
    libidoLevel: 4,
    positionPreferences: {
      cozy: 62,
      adventurous: 58,
      flexible: 44,
      back: 51,
      chill: 47,
    },
    gapLevel: 36,
    tensionFactors: {
      vocal: true,
      reactive: true,
    },
    kissImportance: 5,
    preferences: ['丁寧な前戯', 'ロマンチックな演出'],
    tags: ['🕯 ロマン重視', '⚡️ スピード勝負派'],
    tagScores: [
      { tag: '🕯 ロマン重視', score: 85 },
      { tag: '⚡️ スピード勝負派', score: 72 },
    ],
  },
};
