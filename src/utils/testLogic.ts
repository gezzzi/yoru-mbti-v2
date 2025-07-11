import { PersonalityType, TestResult, Question } from '../types/personality';
import { personalityTypes } from '../data/personalityTypes';
import { questions } from '../data/questions';

export const calculatePersonalityType = (answers: Record<string, number>): TestResult => {
  // Initialize score totals for each axis
  let ETotal = 0, DTotal = 0, TTotal = 0, RTotal = 0, ATotal = 0;
  let ECount = 0, DCount = 0, TCount = 0, RCount = 0, ACount = 0;
  
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
      case 'DS':
        DTotal += adjustedValue;
        DCount++;
        break;
      case 'TS':
        TTotal += adjustedValue;
        TCount++;
        break;
      case 'RH':
        RTotal += adjustedValue;
        RCount++;
        break;
      case 'AN':
        ATotal += adjustedValue;
        ACount++;
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
  const D = calculatePercentage(DTotal, DCount);
  const T = calculatePercentage(TTotal, TCount);
  const R = calculatePercentage(RTotal, RCount);
  const A = calculatePercentage(ATotal, ACount);
  
  // Determine personality type code based on which side is stronger
  // 50%の場合は51%になっているため、通常の比較で判定
  const baseTypeCode = 
    (E > 50 ? 'E' : 'I') +
    (D > 50 ? 'D' : 'S') +
    (T > 50 ? 'T' : 'S') +
    (A > 50 ? 'A' : 'N');
  
  const rhSuffix = R > 50 ? 'R' : 'H';
  const fullTypeCode = baseTypeCode + '-' + rhSuffix;
  
  // Find matching personality type using base 4-character code
  const basePersonalityType = personalityTypes.find(type => type.code === baseTypeCode) || personalityTypes[0];
  
  // Create extended personality type with R/H suffix
  const personalityType = {
    ...basePersonalityType,
    code: fullTypeCode
  };
  
  return {
    E,
    D,
    T,
    R,
    A,
    type: personalityType
  };
};

export const getProgressPercentage = (currentQuestion: number, totalQuestions: number): number => {
  return Math.round((currentQuestion / totalQuestions) * 100);
};

export const getPersonalityTypeByCode = (code: string): PersonalityType | undefined => {
  return personalityTypes.find(type => type.code === code);
}; 