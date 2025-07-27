export type PositionMood = 'romantic' | 'wild' | 'playful' | 'technical' | 'foreplay';

export interface Position48 {
  id: number;
  name: string;
  kana: string;
  description?: string;
  moods: PositionMood[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const positions48: Position48[] = [
  { id: 1, name: 'うしろやぐら', kana: 'うしろやぐら', moods: ['wild'], difficulty: 'easy' },
  { id: 2, name: 'つり橋', kana: 'つりばし', moods: ['technical', 'wild'], difficulty: 'hard' },
  { id: 3, name: '寄り添い', kana: 'よりそい', moods: ['romantic', 'foreplay'], difficulty: 'easy' },
  { id: 4, name: '撞木ぞり', kana: 'しゅもくぞり', moods: ['technical', 'wild'], difficulty: 'hard' },
  { id: 5, name: '獅子舞', kana: 'ししまい', moods: ['technical'], difficulty: 'hard' },
  { id: 6, name: '菊一文字', kana: 'きくいちもんじ', moods: ['wild', 'technical'], difficulty: 'medium' },
  { id: 7, name: 'こたつがかり', kana: 'こたつがかり', moods: ['playful', 'romantic'], difficulty: 'easy' },
  { id: 8, name: 'テコがかり', kana: 'てこがかり', moods: ['technical'], difficulty: 'hard' },
  { id: 9, name: '岩清水', kana: 'いわしみず', moods: ['foreplay', 'wild'], difficulty: 'easy' },
  { id: 10, name: '時雨茶臼', kana: 'しぐれちゃうす', moods: ['romantic', 'playful'], difficulty: 'easy' },
  { id: 11, name: '理非知らず', kana: 'りひしらず', moods: ['wild', 'technical'], difficulty: 'hard' },
  { id: 12, name: '茶臼のばし', kana: 'ちゃうすのばし', moods: ['romantic'], difficulty: 'easy' },
  { id: 13, name: 'こたつ隠れ', kana: 'こたつがくれ', moods: ['playful'], difficulty: 'easy' },
  { id: 14, name: '乱れ牡丹', kana: 'みだれぼたん', moods: ['wild', 'playful'], difficulty: 'medium' },
  { id: 15, name: '帆かけ茶臼', kana: 'ほかけちゃうす', moods: ['technical', 'romantic'], difficulty: 'medium' },
  { id: 16, name: '本駒駆け', kana: 'ほんこまがけ', moods: ['wild', 'playful'], difficulty: 'medium' },
  { id: 17, name: '百閉', kana: 'ひゃくへい', moods: ['romantic', 'playful'], difficulty: 'easy' },
  { id: 18, name: '雁が首', kana: 'かりがくび', moods: ['foreplay'], difficulty: 'easy' },
  { id: 19, name: 'しがらみ', kana: 'しがらみ', moods: ['romantic'], difficulty: 'easy' },
  { id: 20, name: '二つ巴', kana: 'ふたつともえ', moods: ['foreplay', 'playful'], difficulty: 'medium' },
  { id: 21, name: '御所車', kana: 'ごしょぐるま', moods: ['playful', 'technical'], difficulty: 'hard' },
  { id: 22, name: '松葉崩し', kana: 'まつばくずし', moods: ['romantic', 'technical'], difficulty: 'medium' },
  { id: 23, name: '碁盤攻め', kana: 'ごばんぜめ', moods: ['wild'], difficulty: 'easy' },
  { id: 24, name: '首引き恋慕', kana: 'くびひきれんぼ', moods: ['wild', 'technical'], difficulty: 'hard' },
  { id: 25, name: '絞り扶養', kana: 'しぼりふよう', moods: ['wild', 'playful'], difficulty: 'medium' },
  { id: 26, name: '仏壇返し', kana: 'ぶつだんがえし', moods: ['wild', 'technical'], difficulty: 'medium' },
  { id: 27, name: '手懸け', kana: 'てがけ', moods: ['playful', 'romantic'], difficulty: 'easy' },
  { id: 28, name: '椋鳥', kana: 'むくどり', moods: ['foreplay'], difficulty: 'medium' },
  { id: 29, name: '窓の月', kana: 'まどのつき', moods: ['romantic'], difficulty: 'easy' },
  { id: 30, name: '鳴門', kana: 'なると', moods: ['wild', 'playful'], difficulty: 'medium' },
  { id: 31, name: 'しめ小股', kana: 'しめこまた', moods: ['romantic', 'technical'], difficulty: 'medium' },
  { id: 32, name: '千鳥', kana: 'ちどり', moods: ['technical'], difficulty: 'hard' },
  { id: 33, name: '抱き上げ', kana: 'だきあげ', moods: ['wild'], difficulty: 'medium' },
  { id: 34, name: '流鏑馬', kana: 'やぶさめ', moods: ['wild', 'playful'], difficulty: 'medium' },
  { id: 35, name: '立ち鼎', kana: 'たちかなえ', moods: ['technical', 'wild'], difficulty: 'hard' },
  { id: 36, name: '鵯越え', kana: 'ひよどりごえ', moods: ['wild'], difficulty: 'easy' },
  { id: 37, name: '達磨返し', kana: 'だるまがえし', moods: ['technical', 'romantic'], difficulty: 'medium' },
  { id: 38, name: '千鳥の曲', kana: 'ちどりのきょく', moods: ['foreplay'], difficulty: 'easy' },
  { id: 39, name: '抱き地蔵', kana: 'だきじぞう', moods: ['romantic'], difficulty: 'easy' },
  { id: 40, name: '浮き橋', kana: 'うきはし', moods: ['technical', 'romantic'], difficulty: 'medium' },
  { id: 41, name: '立ち松葉', kana: 'たちまつば', moods: ['technical'], difficulty: 'hard' },
  { id: 42, name: '鵯越えの逆落とし', kana: 'ひよどりごえのさかおとし', moods: ['foreplay', 'technical'], difficulty: 'hard' },
  { id: 43, name: '燕返し', kana: 'つばめがえし', moods: ['technical', 'wild'], difficulty: 'medium' },
  { id: 44, name: '宝船', kana: 'たからぶね', moods: ['technical', 'playful'], difficulty: 'medium' },
  { id: 45, name: '押し車', kana: 'おしぐるま', moods: ['wild', 'technical'], difficulty: 'hard' },
  { id: 46, name: '深山', kana: 'みやま', moods: ['wild', 'romantic'], difficulty: 'medium' },
  { id: 47, name: '立ち花菱', kana: 'たちはなびし', moods: ['foreplay', 'technical'], difficulty: 'medium' },
  { id: 48, name: '鶯の谷渡り', kana: 'うぐいすのたにわたり', moods: ['foreplay', 'romantic'], difficulty: 'easy' }
];

export const getPositionsByMood = (mood: PositionMood): Position48[] => {
  return positions48.filter(pos => pos.moods.includes(mood));
};

export const moodDescriptions: Record<PositionMood, string> = {
  'romantic': 'ロマンチック系 - 密着感と愛情を重視',
  'wild': 'ワイルド系 - 激しさと征服感を追求',
  'playful': '遊び心系 - 楽しさと新鮮さを演出',
  'technical': 'テクニカル系 - 技巧と刺激を追求',
  'foreplay': '愛撫系 - じっくりと感じ合う'
};