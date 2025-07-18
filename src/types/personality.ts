export interface Question {
  id: number;
  axis: 'EI' | 'LF' | 'AS' | 'LF2' | 'OS';
  text: string;
  isReverse: boolean; // 質問のベクトルが逆の場合true
  options: {
    text: string;
    value: number; // 0-6 scale (7段階評価)
  }[];
}

export interface PersonalityType {
  code: string;
  name: string;
  ruby?: string; // フリガナ
  summary?: string; // 要約
  fullDescription?: string; // 全文
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
  L: number; // Lead vs Follow  
  A: number; // Adventure vs Stable
  L2: number; // Love vs Free
  O: number; // Open vs Secret
  type: PersonalityType;
} 