import { PersonalityType, TestResult, Question } from '../types/personality';
import { personalityTypes } from '../data/personalityTypes';
import { questions } from '../data/questions';

export const calculatePersonalityType = (answers: Record<string, number>): TestResult => {
  // Initialize score totals for each axis
  let ETotal = 0, LTotal = 0, ATotal = 0, L2Total = 0, OTotal = 0;
  let ECount = 0, LCount = 0, ACount = 0, L2Count = 0, OCount = 0;
  
  // 追加軸の集計用
  let libidoTotal = 0, libidoCount = 0;
  let positionScores = { cozy: 0, adventurous: 0, flexible: 0, back: 0, chill: 0 };
  let gapTotal = 0, gapCount = 0;
  let tensionVocal = 0, tensionReactive = 0;
  let kissTotal = 0, kissCount = 0;
  let preferences: string[] = [];
  let tags: string[] = []; // タグのリスト
  let tagScores: { tag: string; score: number }[] = []; // タグとスコアのリスト
  
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
        if (question.tagName) {
          tagScores.push({ tag: question.tagName, score: value });
        }
        break;
    }
  });
  
  // タグを点数順にソートし、上位5つを選択（同率の場合はランダム）
  // まず点数でグループ化
  const scoreGroups = tagScores.reduce((groups, item) => {
    if (item.score >= 4) { // 4点以上のタグのみ対象
      if (!groups[item.score]) {
        groups[item.score] = [];
      }
      groups[item.score].push(item.tag);
    }
    return groups;
  }, {} as Record<number, string[]>);
  
  // 点数の高い順にソート
  const sortedScores = Object.keys(scoreGroups)
    .map(Number)
    .sort((a, b) => b - a);
  
  // 上位5つのタグを選択
  for (const score of sortedScores) {
    const tagsAtScore = scoreGroups[score];
    
    // 同率の場合はシャッフルしてから追加
    const shuffled = [...tagsAtScore].sort(() => Math.random() - 0.5);
    
    for (const tag of shuffled) {
      if (tags.length < 5) {
        tags.push(tag);
      } else {
        break;
      }
    }
    
    if (tags.length >= 5) {
      break;
    }
  }
  
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
  
  // S/M傾向の計算
  // LF軸のスコアと特定のタグで判定
  let smScore = 0;
  
  // LF軸（リード/フォロー）のスコア
  // Lが高い（>50）ならS傾向、低い（<50）ならM傾向
  if (L > 50) {
    smScore += 2; // S傾向
  } else if (L < 50) {
    smScore -= 2; // M傾向
  }
  
  // タグによる追加判定
  if (tags.includes('🔥 責めたい派')) {
    smScore += 2; // S傾向
  }
  if (tags.includes('🧸 甘やかされたい')) {
    smScore -= 2; // M傾向
  }
  if (tags.includes('🧷 軽SM耐性あり')) {
    // 軽SM耐性は両方の可能性があるので、他の要素に依存
    smScore += smScore > 0 ? 1 : -1;
  }
  
  const smTendency = smScore > 0 ? 'S' : smScore < 0 ? 'M' : 'Both';
  
  // 性欲レベルの計算
  // 質問11の回答値と特定のタグで判定
  let libidoScore = 0;
  
  // 質問11の回答値を基準にする（0-6の範囲）
  const question11Value = libidoCount > 0 ? libidoTotal / libidoCount : 3;
  libidoScore = question11Value;
  
  // タグによる追加判定（最大5に収まるように調整）
  const libidoTags = [
    '🌙 深夜エロス',
    '☀️ 朝型エロス', 
    '🔄 リピート求め派',
    '🧪 実験精神旺盛',
    '📱 デジタル前戯派'
  ];
  
  // 該当するタグの数をカウント
  const matchedLibidoTags = libidoTags.filter(tag => tags.includes(tag)).length;
  
  // 質問11の値（0-6）とタグの数（0-5）を組み合わせて最終的なレベルを決定
  // 質問11が高い（4以上）場合はタグでさらに強化
  // 質問11が低い（2以下）場合はタグの影響を抑える
  if (question11Value >= 4) {
    // ベースが高い場合：タグ1つにつき0.3追加
    libidoScore = question11Value + (matchedLibidoTags * 0.3);
  } else if (question11Value <= 2) {
    // ベースが低い場合：タグ1つにつき0.1追加
    libidoScore = question11Value + (matchedLibidoTags * 0.1);
  } else {
    // ベースが中間の場合：タグ1つにつき0.2追加
    libidoScore = question11Value + (matchedLibidoTags * 0.2);
  }
  
  // 1-5の範囲に収める
  const libidoLevel = Math.min(5, Math.max(1, Math.round(libidoScore))) as 1 | 2 | 3 | 4 | 5;
  
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