import { PersonalityType, TestResult, Question } from '../types/personality';
import { personalityTypes } from '../data/personalityTypes';
import { questions } from '../data/questions';

export const calculatePersonalityType = (answers: Record<string, number>): TestResult => {
  // Initialize score totals for each axis
  let ETotal = 0, LTotal = 0, ATotal = 0, L2Total = 0, OTotal = 0;
  let ECount = 0, LCount = 0, ACount = 0, L2Count = 0, OCount = 0;
  
  // 追加軸の集計用
  let STotal = 0, MTotal = 0; // S/M傾向
  let libidoTotal = 0, libidoCount = 0;
  let positionScores = { cozy: 0, adventurous: 0, flexible: 0, back: 0, chill: 0 };
  let gapTotal = 0, gapCount = 0;
  let tensionVocal = 0, tensionReactive = 0;
  let kissTotal = 0, kissCount = 0;
  let preferences: string[] = [];
  let tags: string[] = []; // タグのリスト
  
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
        // S/M傾向の判定
        if (question.smTendency === 'S') {
          STotal += adjustedValue;
        } else if (question.smTendency === 'M') {
          MTotal += adjustedValue;
        }
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
      case 'LIBIDO':
        libidoTotal += value; // 逆転なし
        libidoCount++;
        break;
      case 'POSITION':
        if (question.additionalType === 'position_cozy') positionScores.cozy = value;
        if (question.additionalType === 'position_adventurous') positionScores.adventurous = value;
        if (question.additionalType === 'position_flexible') positionScores.flexible = value;
        if (question.additionalType === 'position_back') positionScores.back = value;
        if (question.additionalType === 'position_chill') positionScores.chill = value;
        break;
      case 'GAP':
        gapTotal += value;
        gapCount++;
        break;
      case 'TENSION':
        if (id === 30) tensionVocal = value; // 声の反応
        if (id === 31) tensionReactive = value; // リアクション
        break;
      case 'KISS':
        kissTotal += value;
        kissCount++;
        break;
      case 'PREFERENCE':
        if (value >= 4) { // 4以上で好みとみなす
          if (id === 34) preferences.push('腰使い');
          if (id === 35) preferences.push('アイコンタクト');
          if (id === 36) preferences.push('ロールプレイ');
          if (id === 37) preferences.push('前戯重視');
        }
        break;
      case 'TAG':
        if (value >= 4 && question.tagName) { // 4以上でタグを追加
          tags.push(question.tagName);
        }
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
    (L2 > 50 ? 'L' : 'F') +
    '-' +
    (O > 50 ? 'O' : 'S');
  
  // Find matching personality type using 4-character code (without 5th axis for lookup)
  const baseTypeCode = typeCode.split('-')[0];
  const personalityType = personalityTypes.find(type => type.code === baseTypeCode) || personalityTypes[0];
  
  // Add the full 5-character code to the personality type
  const personalityTypeWithFullCode = {
    ...personalityType,
    code: typeCode
  };
  
  // 追加結果の計算
  const smScore = STotal - MTotal;
  const smTendency = smScore > 0 ? 'S' : smScore < 0 ? 'M' : 'Both';
  
  const libidoAvg = libidoCount > 0 ? libidoTotal / libidoCount : 3;
  const libidoLevel = Math.min(5, Math.max(1, Math.round(libidoAvg))) as 1 | 2 | 3 | 4 | 5;
  
  const gapLevel = gapCount > 0 ? Math.round((gapTotal / gapCount) / 6 * 100) : 50;
  
  const kissImportance = kissCount > 0 ? Math.round((kissTotal / kissCount) / 6 * 100) : 50;
  
  return {
    E,
    L,
    A,
    L2,
    O,
    type: personalityTypeWithFullCode,
    additionalResults: {
      smTendency,
      smScore,
      libidoLevel,
      positionPreferences: positionScores,
      gapLevel,
      tensionFactors: {
        vocal: tensionVocal >= 4,
        reactive: tensionReactive >= 4
      },
      kissImportance,
      preferences,
      tags
    }
  };
};

export const getProgressPercentage = (currentQuestion: number, totalQuestions: number): number => {
  return Math.round((currentQuestion / totalQuestions) * 100);
};

export const getPersonalityTypeByCode = (code: string): PersonalityType | undefined => {
  // Handle both 4-character and 5-character codes
  const baseCode = code.split('-')[0];
  const personalityType = personalityTypes.find(type => type.code === baseCode);
  
  if (personalityType && code.includes('-')) {
    // Return with full 5-character code
    return {
      ...personalityType,
      code: code
    };
  }
  
  return personalityType;
}; 