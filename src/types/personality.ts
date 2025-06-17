export interface Question {
  id: number;
  axis: 'EI' | 'DS' | 'TS' | 'RH' | 'AN';
  text: string;
  options: {
    text: string;
    value: number; // -2 to 2 scale
  }[];
}

export interface PersonalityType {
  code: string;
  name: string;
  category: 'dom' | 'sub' | 'introvert' | 'fantasy';
  emoji: string;
  description: string;
  traits: string[];
  compatibility: string[];
  strengths: string[];
  weaknesses: string[];
  careers: string[];
}

export interface TestResult {
  E: number; // Extroversion vs Introversion
  D: number; // Dominance vs Submission  
  T: number; // Thrill-seeking vs Security-seeking
  R: number; // Shame-resistant vs Shame-sensitive
  A: number; // Attachment vs Non-attachment
  type: PersonalityType;
} 