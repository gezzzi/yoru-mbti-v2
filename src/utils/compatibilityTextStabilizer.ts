// 夜の相性テキストの文量を安定化させるユーティリティ

// シードベースの疑似乱数生成器（questions.tsと同じアルゴリズム）
export function seededRandom(seed: number): () => number {
  let x = seed;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

// タグ提案をランダムに選択して適切な文量にする
export function selectTagRecommendations(
  allRecommendations: { tag: string; text: string }[],
  targetCount: number,
  seed: number
): string {
  if (allRecommendations.length === 0) return '';
  
  const rng = seededRandom(seed);
  let selectedRecommendations: { tag: string; text: string }[] = [];
  
  if (allRecommendations.length <= targetCount) {
    // 少ない場合はすべて使用
    selectedRecommendations = allRecommendations;
  } else {
    // 多い場合はランダムに選択
    const shuffled = [...allRecommendations];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    selectedRecommendations = shuffled.slice(0, targetCount);
  }
  
  // テキストを結合
  return selectedRecommendations.map(r => r.text).join(' ');
}

// 補足テキストのテンプレート
export const supplementaryTexts = [
  'お互いのペースを大切にしながら、新しい世界を探求していきましょう。',
  '二人だけの特別な時間を、より深く、より濃密に過ごすことができるでしょう。',
  '相手の反応を丁寧に観察しながら、お互いが最高に気持ちよくなれる方法を見つけていきます。',
  'コミュニケーションを大切にし、お互いの願望を叶え合う理想的な関係を築けます。',
  '信頼関係を基盤に、より深い快感と満足感を追求できる関係です。',
  '日々の生活に潤いを与える、特別な時間を共有できるパートナーシップです。',
  'お互いを尊重しながら、限界を超えた快感を共に体験できる可能性があります。',
  '心と体の両方で繋がり、真の一体感を味わえる関係を築いていけるでしょう。',
  '相手の新しい一面を発見するたびに、関係がより深まっていきます。',
  'お互いの成長を促し合いながら、より満足度の高い関係へと発展していけます。'
];

// 文量を目標範囲内に調整する
export function stabilizeTextLength(
  baseText: string,
  targetMin: number = 900,
  targetMax: number = 1100,
  seed: number = 42
): string {
  const currentLength = baseText.length;
  
  if (currentLength >= targetMin && currentLength <= targetMax) {
    return baseText;
  }
  
  const rng = seededRandom(seed);
  
  if (currentLength < targetMin) {
    // 文量が少ない場合は補足を追加
    let supplementedText = baseText;
    const shuffledSupplements = [...supplementaryTexts];
    
    // シャッフル
    for (let i = shuffledSupplements.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffledSupplements[i], shuffledSupplements[j]] = [shuffledSupplements[j], shuffledSupplements[i]];
    }
    
    // 必要な分だけ追加
    for (const supplement of shuffledSupplements) {
      if (supplementedText.length >= targetMin) break;
      supplementedText += '\n\n' + supplement;
    }
    
    return supplementedText;
  }
  
  if (currentLength > targetMax) {
    // 文量が多い場合は段落単位で削減
    const paragraphs = baseText.split('\n\n').filter(p => p.trim());
    
    // 優先度の低い段落から削除（最後の方の段落を優先的に削除）
    while (paragraphs.length > 3) { // 最低3段落は残す
      const currentText = paragraphs.join('\n\n');
      if (currentText.length <= targetMax) break;
      
      // 最後から2番目の段落を削除（最後は締めくくりなので残す）
      if (paragraphs.length > 4) {
        paragraphs.splice(paragraphs.length - 2, 1);
      } else {
        paragraphs.pop();
      }
    }
    
    return paragraphs.join('\n\n');
  }
  
  return baseText;
}