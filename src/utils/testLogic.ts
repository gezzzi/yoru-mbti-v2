import { PersonalityType, TestResult, Question } from '../types/personality';
import { personalityTypes } from '../data/personalityTypes';
import { questions } from '../data/questions';

export const calculatePersonalityType = (answers: Record<string, number>): TestResult => {
  // Initialize score totals for each axis
  let ETotal = 0, LTotal = 0, ATotal = 0, L2Total = 0, OTotal = 0;
  let ECount = 0, LCount = 0, ACount = 0, L2Count = 0, OCount = 0;
  
  Object.entries(answers).forEach(([questionId, value]) => {
    const id = parseInt(questionId);
    const question = questions.find(q => q.id === id);
    
    if (!question) return;
    
    // Apply reverse calculation if needed (点数 = 6 - 点数)
    let adjustedValue = question.isReverse ? (6 - value) : value;
    
    // Categorize by axis and accumulate scores
    switch (question.axis) {
      case 'EI':
        ETotal += adjustedValue;
        ECount++;
        break;
      case 'LF':
        LTotal += adjustedValue;
        LCount++;
        break;
      case 'AS':
        ATotal += adjustedValue;
        ACount++;
        break;
      case 'LF2':
        L2Total += adjustedValue;
        L2Count++;
        break;
      case 'OS':
        OTotal += adjustedValue;
        OCount++;
        break;
    }
  });
  
  // Calculate percentage scores (0-100%)
  // 50%の場合は51%にする（仕様書より）
  const calculatePercentage = (total: number, count: number): number => {
    if (count === 0) return 51; // デフォルト値も51%に
    const percentage = Math.round((total / (count * 6)) * 100);
    return percentage === 50 ? 51 : percentage;
  };

  const E = calculatePercentage(ETotal, ECount);
  const L = calculatePercentage(LTotal, LCount);
  const A = calculatePercentage(ATotal, ACount);
  const L2 = calculatePercentage(L2Total, L2Count);
  const O = calculatePercentage(OTotal, OCount);
  
  // Determine personality type code based on which side is stronger
  // 50%の場合は51%になっているため、通常の比較で判定
  const typeCode = 
    (E > 50 ? 'E' : 'I') +
    (L > 50 ? 'L' : 'F') +
    (A > 50 ? 'A' : 'S') +
    (L2 > 50 ? 'L' : 'F');
  
  // Find matching personality type using 4-character code
  const personalityType = personalityTypes.find(type => type.code === typeCode) || personalityTypes[0];
  
  return {
    E,
    L,
    A,
    L2,
    O,
    type: personalityType
  };
};

export const getProgressPercentage = (currentQuestion: number, totalQuestions: number): number => {
  return Math.round((currentQuestion / totalQuestions) * 100);
};

export const getPersonalityTypeByCode = (code: string): PersonalityType | undefined => {
  return personalityTypes.find(type => type.code === code);
}; 