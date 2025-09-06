// 夜の相性セクションのヘルパー関数

// タグ提案データ
export const getTagRecommendations = (combinedTags: Set<string>) => {
  const recommendations: { tag: string; text: string }[] = [];
  
  // 各タグに対する提案を追加（情景豊かな版）
  const tagTexts: { [key: string]: string } = {
    '💬 言語プレイ派': '耳元で囁かれる甘い言葉が、全身を震わせる。恥ずかしい言葉も、二人だけの秘密の呪文に。',
    '🗣 下ネタOK': '欲望を素直に口にし、お互いの渇望を確かめ合う開放的な関係。',
    '🕯 ロマン重視': 'キャンドルの灯りが二人の影を壁に揺らし、アロマの香りが五感を刺激する。',
    '🪞 鏡プレイ好き': '鏡に映る二人の姿を見つめながら、興奮が倍増していく背徳的な快感。',
    '🎮 ゲーム派': 'サイコロを振ったり、ミッションを設定したり。遊び心満載のスリリングな時間。',
    '💋 キス魔': '息ができないほど濃厚なキス。唇と唇が触れるたびに、電流が走るような感覚。',
    '🧥 コスプレ派': '制服やコスチュームが生み出す非日常の興奮。ファンタジーが現実に。',
    '⚡️ スピード勝負派': '瞬間的に燃え上がる炎のような情熱。短くとも濃密な時間。',
    '🏃‍♂️ 衝動トリガー型': 'キッチンで、ソファで、玄関で。日常の中に潜む特別な瞬間を逃さない。',
    '🔥 欲望の炎': '抑えきれない情熱が爆発。お互いの限界まで求め合う激しい夜。',
    '🔄 リピート求め派': '一度では終わらない。何度も波のように押し寄せる快感の波。',
    '🛁 アフターケア必須': '激しい嵐の後の優しい凪。抱きしめ合いながら愛を確かめ合う大切な時間。',
    '🧼 ケア＆衛生重視': '清潔なシーツ、優しい手つき。お互いを思いやる丁寧な時間。',
    '🛡 安全第一派': '安心できる環境で、心からリラックスして楽しめる。',
    '🚪 NG明確': '「これは大丈夫」「これはNG」。明確な境界線が安心感を生む。',
    '☀️ 朝型エロス': '朝日が差し込むベッドで、新しい一日を特別に始める幸せ。',
    '⛏️ 開拓派': '未知の領域への探検。お互いの新しい一面を発見する冒険。',
    '🎭 ロールプレイ好き': '先生と生徒、上司と部下。二人だけの物語に没入する時間。',
    '📱 デジタル前戯派': '昼間のメッセージから始まるドキドキ。会う前から高まる期待感。',
    '🕵️‍♀️ 覗き見興奮派': '秘密めいた雰囲気やタブー感が、より深い興奮を呼び起こす。',
    '📚 学習研究派': 'より良い快感を求めて、お互いの体を研究し尽くす探求者。',
    '🧭 ガイド派': '相手を優しく導き、一緒に高みを目指す丁寧な時間。',
    '🤹‍♀️ マルチタスク派': '複数の刺激を同時に操り、全身で快感を味わい尽くす。',
    '💤 まったり派': '時間を忘れてゆったりと。急がず焦らず、じっくり愛を育む。',
    '🧷 軽SM耐性あり': '軽い縛りや目隠し。支配と服従のゲームで新しい世界を開く。'
  };
  
  // combinedTagsに含まれるタグの提案を収集
  for (const [tag, text] of Object.entries(tagTexts)) {
    if (combinedTags.has(tag)) {
      recommendations.push({ tag, text });
    }
  }
  
  return recommendations;
};

// シード付き乱数生成器
export function seededRandom(seed: number): () => number {
  let x = seed;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

// 配列をシャッフル
export function shuffleArray<T>(array: T[], rng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// タグ提案を選択して文字列にする
export function selectAndFormatRecommendations(
  recommendations: { tag: string; text: string }[],
  maxCount: number = 5,
  seed: number = 42
): string {
  if (recommendations.length === 0) return '';
  
  const rng = seededRandom(seed);
  let selected: { tag: string; text: string }[] = [];
  
  if (recommendations.length <= maxCount) {
    selected = recommendations;
  } else {
    // maxCount個ランダムに選択
    selected = shuffleArray(recommendations, rng).slice(0, maxCount);
  }
  
  return '\n\n' + selected.map(r => r.text).join(' ');
}

// 補足テキスト（情景豊かな版）
export const supplementaryTexts = [
  '浅い眠りの中でもお互いを求め、朝まで続く甘美な時間。',
  '汗ばんだ肌と肌が重なり、心臓の鼓動がシンクロする瞬間。',
  '毎回違う表情を見せる相手に、飽きることのない探求心が芽生える。',
  '優しいキスから始まり、激しい抱擁へ。緩急のリズムが心地よい。',
  '二人だけの秘密の園で、言葉を超えた交感が始まる。'
];

// テキストの長さを安定化
export function stabilizeRecommendedPlayText(
  baseText: string,
  targetMin: number = 800,
  targetMax: number = 900,
  seed: number = 42
): string {
  const currentLength = baseText.length;
  
  if (currentLength >= targetMin && currentLength <= targetMax) {
    return baseText;
  }
  
  const rng = seededRandom(seed);
  
  if (currentLength < targetMin) {
    // 短い場合は補足を追加
    let result = baseText;
    const shuffled = shuffleArray(supplementaryTexts, rng);
    
    for (const supplement of shuffled) {
      if (result.length >= targetMin) break;
      result += '\n\n' + supplement;
    }
    
    return result;
  }
  
  // 長い場合は段落を削減
  const paragraphs = baseText.split('\n\n').filter(p => p.trim());
  
  // 重要度の低い段落から削除
  while (paragraphs.length > 4 && paragraphs.join('\n\n').length > targetMax) {
    // 後ろから2番目を削除（最後は締めなので残す）
    if (paragraphs.length > 5) {
      paragraphs.splice(paragraphs.length - 2, 1);
    } else {
      paragraphs.splice(Math.floor(paragraphs.length / 2), 1);
    }
  }
  
  return paragraphs.join('\n\n');
}