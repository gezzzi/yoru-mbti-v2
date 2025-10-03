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
    
    // Apply reverse calculation if needed (点数 = 5 - 点数) - now 6-point scale
    let adjustedValue = question.isReverse ? (5 - value) : value;
    
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
        if (value >= 3) { // 3以上で好みとみなす (6段階の場合)
          if (id === 34) preferences.push('腰使い');
          if (id === 35) preferences.push('アイコンタクト');
          if (id === 36) preferences.push('ロールプレイ');
          if (id === 37) preferences.push('前戯重視');
        }
        break;
      case 'TAG':
        // タグ質問は下で処理
        break;
    }
  });
  
  // すべてのタグ質問（質問11-35）のスコアを収集
  for (let i = 11; i <= 35; i++) {
    const question = questions.find(q => q.id === i);
    if (question && question.tag) {
      const value = answers[i.toString()] !== undefined ? answers[i.toString()] : 2; // 未回答は2（中央寄り）
      tagScores.push({ tag: question.tag, score: value });
    }
  }
  
  // タグを点数順にソートし、上位2つを選択（同率の場合はランダム）
  // まず点数でグループ化
  const scoreGroups = tagScores.reduce((groups, item) => {
    if (item.score >= 3) { // 3点以上のタグのみ対象 (6段階の場合)
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
  
  // 上位2つのタグを選択
  for (const score of sortedScores) {
    const tagsAtScore = scoreGroups[score];
    
    // 同率の場合はシャッフルしてから追加
    const shuffled = [...tagsAtScore].sort(() => Math.random() - 0.5);
    
    for (const tag of shuffled) {
      if (tags.length < 2) {
        tags.push(tag);
      } else {
        break;
      }
    }
    
    if (tags.length >= 2) {
      break;
    }
  }
  
  // Calculate percentage scores (0-100%)
  const calculatePercentage = (total: number, count: number): number => {
    if (count === 0) return 50; // デフォルト値
    const percentage = Math.round((total / (count * 5)) * 100); // 6段階評価(0-5)に変更
    return percentage;
  };

  const E = calculatePercentage(ETotal, ECount);
  const L = calculatePercentage(LTotal, LCount);
  const A = calculatePercentage(ATotal, ACount);
  const L2 = calculatePercentage(L2Total, L2Count);
  const O = calculatePercentage(OTotal, OCount);
  
  // Determine personality type code based on which side is stronger
  // 50%以上の場合は前者（E, L, A, L, O）側に振り分ける
  const typeCode = 
    (E >= 50 ? 'E' : 'I') +
    (L >= 50 ? 'L' : 'F') +
    (A >= 50 ? 'A' : 'S') +
    (L2 >= 50 ? 'L' : 'F') +
    '-' +
    (O >= 50 ? 'O' : 'S');
  
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
  // 中立の範囲を広げるため、より明確な差がある場合のみS/M判定
  if (L > 65) {
    smScore += 2; // 明確なS傾向
  } else if (L < 35) {
    smScore -= 2; // 明確なM傾向
  }
  // 35-65の範囲は中立寄り
  
  // タグによる追加判定
  if (tags.includes('⛏️ 開拓派')) {
    smScore += 2; // S傾向
  }
  if (tags.includes('🧷 軽SM耐性あり')) {
    // 軽SM耐性は両方の可能性があるので、他の要素に依存
    smScore += smScore > 0 ? 1 : -1;
  }
  
  // スコアが-1〜+1の範囲は中立
  const smTendency = smScore >= 2 ? 'S' : smScore <= -2 ? 'M' : 'Both';
  
  // 性欲レベルの計算
  // 質問11の回答値と特定のタグで判定
  let libidoScore = 0;

  // 質問11の回答値を基準にする（0-5の範囲）- 6段階評価
  const question11Value = libidoCount > 0 ? libidoTotal / libidoCount : 2.5;
  libidoScore = question11Value;
  
  // タグによる追加判定（最大5に収まるように調整）
  const libidoTags = [
    '🌙 深夜エロス',
    '☀️ 朝型エロス', 
    '🔄 リピート求め派',
    '⛏️ 開拓派',
    '📱 デジタル前戯派'
  ];
  
  // 該当するタグの数をカウント
  const matchedLibidoTags = libidoTags.filter(tag => tags.includes(tag)).length;

  // 質問11の値（0-5）とタグの数（0-5）を組み合わせて最終的なレベルを決定
  // 質問11が高い（3以上）場合はタグでさらに強化
  // 質問11が低い（1.5以下）場合はタグの影響を抑える
  if (question11Value >= 3) {
    // ベースが高い場合：タグ1つにつき0.3追加
    libidoScore = question11Value + (matchedLibidoTags * 0.3);
  } else if (question11Value <= 1.5) {
    // ベースが低い場合：タグ1つにつき0.1追加
    libidoScore = question11Value + (matchedLibidoTags * 0.1);
  } else {
    // ベースが中間の場合：タグ1つにつき0.2追加
    libidoScore = question11Value + (matchedLibidoTags * 0.2);
  }
  
  // 1-5の範囲に収める
  const libidoLevel = Math.min(5, Math.max(1, Math.round(libidoScore))) as 1 | 2 | 3 | 4 | 5;
  
  const gapLevel = gapCount > 0 ? Math.round((gapTotal / gapCount) / 5 * 100) : 50; // 6段階評価(0-5)

  const kissImportance = kissCount > 0 ? Math.round((kissTotal / kissCount) / 5 * 100) : 50; // 6段階評価(0-5)
  
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
        vocal: tensionVocal >= 3, // 6段階評価で3以上
        reactive: tensionReactive >= 3 // 6段階評価で3以上
      },
      kissImportance,
      preferences,
      tags,
      tagScores
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