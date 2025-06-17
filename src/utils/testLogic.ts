import { PersonalityType, TestResult } from '../types/personality';
import { personalityTypes } from '../data/personalityTypes';

export const calculatePersonalityType = (answers: Record<string, number>): TestResult => {
  // Calculate scores for each axis
  let E = 0, D = 0, T = 0, R = 0, A = 0;
  
  // Count questions per axis
  let EICount = 0, DSCount = 0, TSCount = 0, RHCount = 0, ANCount = 0;
  
  Object.entries(answers).forEach(([questionId, value]) => {
    const id = parseInt(questionId);
    
    if (id <= 10) { // EI questions
      E += value;
      EICount++;
    } else if (id <= 20) { // DS questions
      D += value;
      DSCount++;
    } else if (id <= 30) { // TS questions
      T += value;
      TSCount++;
    } else if (id <= 40) { // RH questions
      R += value;
      RHCount++;
    } else if (id <= 50) { // AN questions
      A += value;
      ANCount++;
    }
  });
  
  // Average the scores
  E = EICount > 0 ? E / EICount : 0;
  D = DSCount > 0 ? D / DSCount : 0;
  T = TSCount > 0 ? T / TSCount : 0;
  R = RHCount > 0 ? R / RHCount : 0;
  A = ANCount > 0 ? A / ANCount : 0;
  
  // Determine personality type code
  const typeCode = 
    (E > 0 ? 'E' : 'I') +
    (D > 0 ? 'D' : 'S') +
    (T > 0 ? 'T' : 'S') +
    (R > 0 ? 'R' : 'H') +
    (A > 0 ? 'A' : 'N');
  
  // Find matching personality type
  const personalityType = personalityTypes.find(type => type.code === typeCode) || personalityTypes[0];
  
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