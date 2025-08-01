// タグ相性計算の改善ロジック

// タグの重要度定義（一致時と減点時で別々）
export const tagImportance: Record<string, { match: number; penalty: number }> = {
  '🔥 欲望の炎': {
    match: 1.5,    // 一致時は重要（情熱の共有は大切）
    penalty: 0.8   // 減点時は中程度（違いがあっても致命的ではない）
  },
  '💋 キス魔': {
    match: 1.2,    // 一致時は重要
    penalty: 0.5   // 減点時は軽め（キスの好みの違いは調整可能）
  },
  '🕯 ロマン重視': {
    match: 1.4,    // 一致時は重要（雰囲気の共有は大切）
    penalty: 1.2   // 減点時も重要（ロマンチックさの違いは影響大）
  },
  '⚡️ スピード勝負派': {
    match: 0.8,    // 一致時は中程度
    penalty: 1.3   // 減点時は重要（テンポの違いはストレスになる）
  },
  '🛁 アフターケア必須': {
    match: 1.3,    // 一致時は重要（ケアの価値観の一致）
    penalty: 1.0   // 減点時も標準的に重要
  },
  '💬 言語プレイ派': {
    match: 1.1,    // 一致時は中程度の重要性
    penalty: 0.6   // 減点時は軽め（なくても問題ない）
  },
  '☀️ 朝型エロス': {
    match: 0.9,    // 一致時は中程度
    penalty: 0.7   // 減点時は軽め（時間帯は調整可能）
  },
  '🌙 夜型エロス': {
    match: 0.9,    // 一致時は中程度
    penalty: 0.7   // 減点時は軽め
  },
  '🔄 リピート求め派': {
    match: 1.2,    // 一致時は重要
    penalty: 0.9   // 減点時は中程度
  },
  '🗣 下ネタOK': {
    match: 0.8,    // 一致時は中程度
    penalty: 0.4   // 減点時は軽め（コミュニケーションスタイルの違い）
  },
  '🪞 鏡プレイ好き': {
    match: 1.0,    // 一致時は標準
    penalty: 0.3   // 減点時は軽め（特殊な好みなので違いは想定内）
  },
  '🎮 ゲーム派': {
    match: 0.9,    // 一致時は中程度
    penalty: 0.4   // 減点時は軽め
  },
  '🎭 ロールプレイ好き': {
    match: 1.1,    // 一致時は中程度の重要性
    penalty: 0.5   // 減点時は軽め
  },
  '🧥 コスプレ派': {
    match: 1.0,    // 一致時は標準
    penalty: 0.4   // 減点時は軽め
  },
  '💪 フィジカル重視': {
    match: 1.2,    // 一致時は重要
    penalty: 0.8   // 減点時は中程度
  },
  '🧠 メンタル重視': {
    match: 1.3,    // 一致時は重要（精神的繋がりの重視）
    penalty: 0.9   // 減点時は中程度
  },
  '🎯 一点集中派': {
    match: 0.9,    // 一致時は中程度
    penalty: 0.6   // 減点時は軽め
  },
  '🌈 バリエーション派': {
    match: 1.0,    // 一致時は標準
    penalty: 0.7   // 減点時は軽め
  },
  '🔐 秘密主義': {
    match: 1.1,    // 一致時は中程度の重要性
    penalty: 1.0   // 減点時は標準
  },
  '📢 オープン派': {
    match: 0.9,    // 一致時は中程度
    penalty: 0.8   // 減点時は中程度
  },
  '🌹 一途派': {
    match:1.4,    // 一致時は重要（価値観の一致）
    penalty: 1.1   // 減点時も重要
  },
  '🦋 自由恋愛派': {
    match: 1.3,    // 一致時は重要
    penalty: 1.2   // 減点時も重要（価値観の違いは大きい）
  },
  '🏃‍♀️ 即行動派': {
    match: 0.8,    // 一致時は中程度
    penalty: 0.7   // 減点時は軽め
  },
  '🧘‍♀️ じっくり派': {
    match: 0.9,    // 一致時は中程度
    penalty: 0.7   // 減点時は軽め
  },
  '🎪 サプライズ好き': {
    match: 0.9,    // 一致時は中程度
    penalty: 0.5   // 減点時は軽め
  }
};

// デフォルトの重要度（定義されていないタグ用）
const defaultImportance = {
  match: 1.0,
  penalty: 0.7
};

// タグのカテゴリ分類
export const tagCategories = {
  intensity: ['🔥 欲望の炎', '⚡️ スピード勝負派', '💋 キス魔', '💪 フィジカル重視'],
  romantic: ['🕯 ロマン重視', '🛁 アフターケア必須', '🌹 一途派', '🧠 メンタル重視'],
  playful: ['🎮 ゲーム派', '🎭 ロールプレイ好き', '🧥 コスプレ派', '🪞 鏡プレイ好き', '🎪 サプライズ好き'],
  communication: ['💬 言語プレイ派', '🗣 下ネタOK', '🔐 秘密主義', '📢 オープン派'],
  timing: ['☀️ 朝型エロス', '🌙 夜型エロス', '🏃‍♀️ 即行動派', '🧘‍♀️ じっくり派'],
  style: ['🔄 リピート求め派', '🎯 一点集中派', '🌈 バリエーション派', '🌹 一途派', '🦋 自由恋愛派']
};

// タグ間の相性マトリックス（1.0が標準、高いほど相性良好）
export const tagCompatibilityMatrix: { [key: string]: { [key: string]: number } } = {
  '🔥 欲望の炎': {
    '🔥 欲望の炎': 1.3,          // 同じ情熱レベルは最高
    '⚡️ スピード勝負派': 1.2,    // 情熱とスピードは相性良好
    '💋 キス魔': 1.1,            // 情熱とキスは良い組み合わせ
    '🕯 ロマン重視': 0.8,        // 情熱とロマンはやや不一致
  },
  '🕯 ロマン重視': {
    '🕯 ロマン重視': 1.3,        // ロマンチック同士は最高
    '⚡️ スピード勝負派': 0.5,    // ロマンとスピードは相性悪い
    '🛁 アフターケア必須': 1.2,  // ロマンとケアは相性良好
    '💋 キス魔': 1.1,            // ロマンとキスは良い
    '💤 まったり派': 1.2,        // ロマンとまったりは良好
  },
  '⚡️ スピード勝負派': {
    '⚡️ スピード勝負派': 1.2,    // スピード同士は良好
    '🕯 ロマン重視': 0.5,        // スピードとロマンは相性悪い
    '🛁 アフターケア必須': 0.5,  // スピードとアフターケアは相性悪い
    '💤 まったり派': 0.4,        // スピードとまったりは相性最悪
    '💋 キス魔': 0.7,            // スピードとキスはやや不一致
    '🏃‍♂️ 衝動トリガー型': 1.3,  // スピードと衝動は最高
    '🧼 ケア＆衛生重視': 0.5,    // スピードと衛生重視は相性悪い
  },
  '💋 キス魔': {
    '💋 キス魔': 1.3,            // キス魔同士は最高
    '🔥 欲望の炎': 1.1,         // キスと情熱は良好
    '🕯 ロマン重視': 1.1,        // キスとロマンは良好
    '⚡️ スピード勝負派': 0.7,    // キスとスピードはやや不一致
    '🛁 アフターケア必須': 1.2   // キスとケアは相性良好
  },
  '⛏️ 開拓派': {
    '⛏️ 開拓派': 1.3,            // 開拓派同士は相性良好
    '🧷 軽SM耐性あり': 1.2,      // 開拓とSMは相性良好
    '🕵️‍♀️ 覗き見興奮派': 1.2,    // 開拓と覗き見は相性良好
    '🛡 安全第一派': 0.4,        // 開拓と安全第一は相性最悪
    '🎭 ロールプレイ好き': 1.2,   // 開拓とロールプレイは良好
  },
  '🧷 軽SM耐性あり': {
    '🧷 軽SM耐性あり': 1.3,      // SM同士は相性良好
    '⛏️ 開拓派': 1.2,            // SMと開拓は相性良好
    '🛡 安全第一派': 0.4,        // SMと安全第一は相性最悪
    '🚪 NG明確': 0.7,            // SMとNG明確はやや不一致
  },
  '🕵️‍♀️ 覗き見興奮派': {
    '🕵️‍♀️ 覗き見興奮派': 1.3,    // 覗き見同士は相性良好
    '🪞 鏡プレイ好き': 1.2,      // 覗き見と鏡は相性良好
    '⛏️ 開拓派': 1.2,            // 覗き見と開拓は相性良好
    '🛡 安全第一派': 0.3,        // 覗き見と安全第一は相性最悪
  },
  '🛡 安全第一派': {
    '🛡 安全第一派': 1.3,        // 安全第一同士は相性良好
    '⛏️ 開拓派': 0.4,            // 安全と開拓は相性最悪
    '🧷 軽SM耐性あり': 0.4,      // 安全とSMは相性最悪
    '🕵️‍♀️ 覗き見興奮派': 0.3,    // 安全と覗き見は相性最悪
    '🪞 鏡プレイ好き': 0.6,      // 安全と鏡はやや不一致
  },
  '🛁 アフターケア必須': {
    '🛁 アフターケア必須': 1.3,  // アフターケア同士は最高
    '⚡️ スピード勝負派': 0.5,    // アフターケアとスピードは相性悪い
    '🕯 ロマン重視': 1.2,        // アフターケアとロマンは良好
    '💋 キス魔': 1.2,            // アフターケアとキスは良好
  },
  '💤 まったり派': {
    '💤 まったり派': 1.3,        // まったり同士は最高
    '⚡️ スピード勝負派': 0.4,    // まったりとスピードは相性最悪
    '🕯 ロマン重視': 1.2,        // まったりとロマンは良好
    '🏃‍♂️ 衝動トリガー型': 0.6,  // まったりと衝動はやや不一致
  },
  '🧼 ケア＆衛生重視': {
    '🧼 ケア＆衛生重視': 1.3,    // 衛生重視同士は最高
    '⚡️ スピード勝負派': 0.5,    // 衛生とスピードは相性悪い
    '🛁 アフターケア必須': 1.2,  // 衛生とアフターケアは良好
    '🏃‍♂️ 衝動トリガー型': 0.6,  // 衛生と衝動はやや不一致
  },
  '🪞 鏡プレイ好き': {
    '🪞 鏡プレイ好き': 1.3,      // 鏡同士は最高
    '🕵️‍♀️ 覗き見興奮派': 1.2,    // 鏡と覗き見は相性良好
    '🛡 安全第一派': 0.6,        // 鏡と安全第一はやや不一致
  },
  '💬 言語プレイ派': {
    '💬 言語プレイ派': 1.3,      // 言語プレイ同士は最高
    '🗣 下ネタOK': 1.2,          // 言語プレイと下ネタOKは良好
  },
  '🗣 下ネタOK': {
    '🗣 下ネタOK': 1.3,          // 下ネタOK同士は最高
    '💬 言語プレイ派': 1.2,      // 下ネタOKと言語プレイは良好
  },
  '🏃‍♂️ 衝動トリガー型': {
    '🏃‍♂️ 衝動トリガー型': 1.3,  // 衝動同士は最高
    '⚡️ スピード勝負派': 1.3,    // 衝動とスピードは最高
    '💤 まったり派': 0.6,        // 衝動とまったりはやや不一致
    '🧼 ケア＆衛生重視': 0.6,    // 衝動と衛生はやや不一致
  }
  // 他のタグの組み合わせはデフォルト値（1.0）を使用
};

// 全25タグのリスト
const ALL_TAGS = [
  '🔥 欲望の炎', '💬 言語プレイ派', '🎭 ロールプレイ好き', '🛁 アフターケア必須', '⛏️ 開拓派',
  '🧷 軽SM耐性あり', '🕯 ロマン重視', '⚡️ スピード勝負派', '🏃‍♂️ 衝動トリガー型', '🪞 鏡プレイ好き',
  '🚪 NG明確', '🎮 ゲーム派', '🧥 コスプレ派', '🧼 ケア＆衛生重視', '🕵️‍♀️ 覗き見興奮派',
  '🛡 安全第一派', '📱 デジタル前戯派', '💋 キス魔', '☀️ 朝型エロス', '🔄 リピート求め派',
  '🗣 下ネタOK', '📚 学習研究派', '🧭 ガイド派', '🤹‍♀️ マルチタスク派', '💤 まったり派'
];

// 改善されたタグ相性計算関数
export interface TagScore {
  tag: string;
  score: number;
}

export function calculateImprovedTagCompatibility(
  userTagScores: TagScore[],
  partnerTagScores: TagScore[]
): {
  totalScore: number;
  categoryScores: { [key: string]: number };
  detailScores: { tag: string; score: number; reason: string }[];
} {
  let totalCompatibility = 0;
  const categoryScores: { [key: string]: { score: number; count: number } } = {};
  const detailScores: { tag: string; score: number; reason: string }[] = [];

  // タグスコアをマップに変換（高速検索用）
  const userScoreMap = new Map(userTagScores.map(t => [t.tag, t.score]));
  const partnerScoreMap = new Map(partnerTagScores.map(t => [t.tag, t.score]));

  // 全25タグについて計算
  ALL_TAGS.forEach(tag => {
    // 各ユーザーのスコアを取得（なければ0点）
    const userScore = userScoreMap.get(tag) || 0;
    const partnerScore = partnerScoreMap.get(tag) || 0;
    
    const importance = tagImportance[tag] || defaultImportance;
    
    // 点数差の逆数を計算（差が小さいほど高得点）
    const scoreDiff = Math.abs(userScore - partnerScore);
    const inverseScore = 6 - scoreDiff; // 最大差6点なので、6から引く
    
    // タグの重要度（一致時）を掛ける
    const tagScore = inverseScore * importance.match;
    
    totalCompatibility += tagScore;
    
    // カテゴリ別スコアの集計
    Object.entries(tagCategories).forEach(([category, tags]) => {
      if (tags.includes(tag)) {
        if (!categoryScores[category]) {
          categoryScores[category] = { score: 0, count: 0 };
        }
        categoryScores[category].score += tagScore;
        categoryScores[category].count += 1;
      }
    });
    
    // 詳細スコアの記録
    detailScores.push({
      tag: tag,
      score: Math.round(tagScore * 10) / 10, // 小数点1桁まで
      reason: scoreDiff === 0 
        ? `完全一致（両者${userScore}点）` 
        : `${scoreDiff}点差（${userScore}点 vs ${partnerScore}点）`
    });
  });
  
  // タグ間の相互作用による追加ボーナス/ペナルティ
  const interactionBonus = calculateTagInteractions(userTagScores, partnerTagScores);
  totalCompatibility += interactionBonus;
  
  // スコアを0-100の範囲に正規化
  // 正確な理論上の最大値を計算（全25タグが完全一致した場合の実際の重要度を使用）
  let maxPossibleScore = 0;
  ALL_TAGS.forEach(tag => {
    const importance = tagImportance[tag] || defaultImportance;
    maxPossibleScore += 6 * importance.match; // 各タグの最大スコア（差0点 = 6点 × 重要度）
  });
  
  const normalizedScore = (totalCompatibility / maxPossibleScore) * 100;
  
  // カテゴリ別スコアの平均化
  const normalizedCategoryScores: { [key: string]: number } = {};
  Object.entries(categoryScores).forEach(([category, data]) => {
    if (data.count > 0) {
      // カテゴリ内の平均スコアを計算し、0-100に正規化
      const avgScore = data.score / data.count;
      const maxCategoryScore = 6 * 1.5; // 6点 × 最大重要度
      normalizedCategoryScores[category] = Math.round((avgScore / maxCategoryScore) * 100);
    } else {
      normalizedCategoryScores[category] = 0;
    }
  });
  
  return {
    totalScore: Math.round(Math.max(0, Math.min(100, normalizedScore))),
    categoryScores: normalizedCategoryScores,
    detailScores
  };
}

// タグ間の相互作用によるボーナス/ペナルティ計算（シンプル版）
function calculateTagInteractions(
  userTagScores: TagScore[],
  partnerTagScores: TagScore[]
): number {
  let interactionPenalty = 0;
  
  // タグスコアをマップに変換
  const userScoreMap = new Map(userTagScores.map(t => [t.tag, t.score]));
  const partnerScoreMap = new Map(partnerTagScores.map(t => [t.tag, t.score]));
  
  // 高得点タグ（4点以上）を抽出
  const userHighTags = new Set<string>();
  const partnerHighTags = new Set<string>();
  
  userTagScores.forEach(t => {
    if (t.score >= 4) userHighTags.add(t.tag);
  });
  
  partnerTagScores.forEach(t => {
    if (t.score >= 4) partnerHighTags.add(t.tag);
  });
  
  // 相性の悪い組み合わせをチェック（一方が4点以上持っていれば減点）
  const badCombinations: { tag1: string; tag2: string; penalty: number }[] = [
    // テンポの違い
    { tag1: '⚡️ スピード勝負派', tag2: '🕯 ロマン重視', penalty: -3.5 },
    { tag1: '⚡️ スピード勝負派', tag2: '🛁 アフターケア必須', penalty: -3.5 },
    { tag1: '⚡️ スピード勝負派', tag2: '💤 まったり派', penalty: -4.2 },
    { tag1: '⚡️ スピード勝負派', tag2: '🧼 ケア＆衛生重視', penalty: -3.5 },
    
    // リスク許容度の違い
    { tag1: '⛏️ 開拓派', tag2: '🛡 安全第一派', penalty: -4.2 },
    { tag1: '🧷 軽SM耐性あり', tag2: '🛡 安全第一派', penalty: -4.2 },
    { tag1: '🕵️‍♀️ 覗き見興奮派', tag2: '🛡 安全第一派', penalty: -4.9 },
    
    // 視覚的スリルとプライバシー
    { tag1: '🪞 鏡プレイ好き', tag2: '🛡 安全第一派', penalty: -2.8 },
    
    // 衝動性と計画性
    { tag1: '🏃‍♂️ 衝動トリガー型', tag2: '💤 まったり派', penalty: -2.8 },
    { tag1: '🏃‍♂️ 衝動トリガー型', tag2: '🧼 ケア＆衛生重視', penalty: -2.8 },
  ];
  
  // 処理済みの組み合わせを記録（重複防止）
  const processedCombos = new Set<string>();
  
  // 各組み合わせをチェック
  badCombinations.forEach(combo => {
    const userHas1 = userHighTags.has(combo.tag1);
    const userHas2 = userHighTags.has(combo.tag2);
    const partnerHas1 = partnerHighTags.has(combo.tag1);
    const partnerHas2 = partnerHighTags.has(combo.tag2);
    
    // どちらかが tag1 を持ち、もう一方が tag2 を持っている場合
    if ((userHas1 && partnerHas2) || (userHas2 && partnerHas1)) {
      // 組み合わせのキーを作成（順序に関係なく同一視）
      const comboKey = [combo.tag1, combo.tag2].sort().join('-');
      
      // まだ処理していない組み合わせの場合のみ加算
      if (!processedCombos.has(comboKey)) {
        interactionPenalty += combo.penalty;
        processedCombos.add(comboKey);
      }
    }
  });
  
  return interactionPenalty;
}