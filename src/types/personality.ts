export interface Question {
  id: number;
  axis: 'EI' | 'LF' | 'AS' | 'LF2' | 'OS' | 'LIBIDO' | 'POSITION' | 'GAP' | 'TENSION' | 'KISS' | 'PREFERENCE' | 'TAG' | null;
  text: string;
  isReverse: boolean; // 質問のベクトルが逆の場合true
  smTendency?: 'S' | 'M'; // LF軸の質問で使用
  additionalType?: string; // 追加軸の詳細タイプ
  tagName?: string; // タグ質問の場合のタグ名
  tag?: string | null; // タグ質問の場合のタグ名
  options: {
    text: string;
    value: number; // 0-6 scale (7段階評価)
  }[];
}

export interface PersonalityType {
  code: string;
  name: string;
  summary?: string; // 要約
  fullDescription?: string; // 全文
  category: 'dom' | 'sub' | 'introvert' | 'fantasy';
  emoji: string;
  description: string;
  traits: string[];
  compatibility: string[];
  strengths: string[];
  weaknesses: string[];
  // 新しい結果表示用プロパティ
  nightPersonality?: string; // 夜の性格キャッチコピー
  smTendency?: 'S' | 'M' | 'Both'; // S/M傾向
  libidoLevel?: 1 | 2 | 3 | 4 | 5; // 性欲レベル
  recommendedPositions?: string[]; // おすすめの体位
  bodyConfidence?: {
    level: string;
    parts: string[];
  };
  compatibleTraits?: string[]; // 相性のいいタイプの説明
  incompatibleTraits?: string[]; // 相性が悪いタイプの説明
  nightGapLevel?: string; // 夜のギャップ度
  sexualPreferences?: string[]; // セックスでのこだわり
  relationshipStyle?: string; // 関係性の理想スタイル
  shortcomingsAdvice?: {
    shortcoming: string;
    advice: string;
  };
}

export interface TestResult {
  E: number; // Extroversion vs Introversion
  L: number; // Lead vs Follow  
  A: number; // Adventure vs Stable
  L2: number; // Love vs Free
  O: number; // Open vs Secret
  type: PersonalityType;
  // 追加の計算結果
  additionalResults?: {
    smTendency: 'S' | 'M' | 'Both';
    smScore: number; // S/Mのスコア
    libidoLevel: 1 | 2 | 3 | 4 | 5;
    positionPreferences: {
      cozy: number;
      adventurous: number;
      flexible: number;
      back: number;
      chill: number;
    };
    gapLevel: number;
    tensionFactors: {
      vocal: boolean;
      reactive: boolean;
    };
    kissImportance: number;
    preferences: string[];
    tags?: string[]; // 該当するタグのリスト
    tagScores?: { tag: string; score: number }[]; // タグとスコアのリスト
  };
} 
