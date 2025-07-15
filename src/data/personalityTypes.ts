import { PersonalityType } from '../types/personality';

export const personalityTypes: PersonalityType[] = [
  // Dom系タイプ
  {
    code: 'EDTA',
    name: '快楽王',
    ruby: 'かいらくおう',
    summary: '夜を制するカリスマ',
    category: 'dom',
    emoji: '👑',
    description: '独占欲が強く、主導権を握りながらも深い愛着を持つタイプ。パートナーを独占したいという強い欲求と、相手への深い愛情を併せ持つ。',
    traits: ['独占欲が強い', '主導的', '愛着形成が得意', '情熱的', '保護欲が強い'],
    compatibility: ['ESSA', 'ISSA', 'ESTA'],
    strengths: ['リーダーシップがある', '情熱的', '責任感が強い', '保護欲が強い'],
    weaknesses: ['束縛が強すぎる', '独占欲が過度', '嫉妬深い', '支配的になりがち'],
    careers: ['経営者', 'プロジェクトマネージャー', 'チームリーダー', '営業職']
  },
  {
    code: 'EDTN',
    name: '支配者',
    ruby: 'しはいしゃ',
    summary: '自由奔放な遊び上手',
    category: 'dom',
    emoji: '👑',
    description: '衝動的で支配的、感情よりも本能を重視するタイプ。刺激を求め、関係においても自由度を重視する。',
    traits: ['衝動的', '支配的', 'セフレOK', '刺激志向', '感情と割り切り可能'],
    compatibility: ['ESTN', 'ISTN', 'ISSN'],
    strengths: ['決断力がある', '行動力がある', '現実的', '柔軟性がある'],
    weaknesses: ['感情軽視', '衝動的すぎる', '安定性に欠ける', '深い関係を築きにくい'],
    careers: ['起業家', '営業職', 'セールスマネージャー', 'フリーランス']
  },
  {
    code: 'EDSA',
    name: '愛情家',
    ruby: 'あいじょうか',
    summary: '面倒見のいい愛情家',
    category: 'dom',
    emoji: '👑',
    description: '尽くす系のドSで、安定した関係を求めながらも主導権を握るタイプ。恋愛を重視し、相手に尽くすことで愛情を表現する。',
    traits: ['尽くす系ドS', '恋愛重視', '安定志向', '愛情深い', '責任感が強い'],
    compatibility: ['ESSA', 'ISSA', 'ESTA'],
    strengths: ['献身的', '安定性がある', '責任感が強い', '愛情深い'],
    weaknesses: ['過度に尽くしてしまう', '自分を犠牲にしがち', '束縛が強い', '期待が高すぎる'],
    careers: ['教師', 'カウンセラー', '看護師', '人事職']
  },
  {
    code: 'EDSN',
    name: '調教師',
    ruby: 'ちょうきょうし',
    summary: '頼れるけど情が薄い',
    category: 'dom',
    emoji: '👑',
    description: '感情を切り離し、技術的なスキルと支配に重点を置くタイプ。安定を求めながらも感情的な束縛は避ける。',
    traits: ['感情切り離し', '技術重視', '支配的', '安定志向', 'クールな関係'],
    compatibility: ['ISSN', 'ESTN', 'ISTN'],
    strengths: ['論理的', '冷静', '技術力が高い', '効率的'],
    weaknesses: ['感情表現が苦手', '冷たく見える', '共感力に欠ける', '人間関係が希薄'],
    careers: ['エンジニア', '研究者', 'アナリスト', 'IT専門職']
  },

  // Sub系タイプ
  {
    code: 'ESTA',
    name: '恋愛者',
    ruby: 'れんあいしゃ',
    summary: '場を盛り上げる恋愛派',
    category: 'sub',
    emoji: '💖',
    description: '甘えん坊で愛されたい欲求が強く、明るい従属的な性格。外向的で愛着を重視するタイプ。',
    traits: ['甘えん坊', '愛されたい', '明るい従属', '外向的', '愛着重視'],
    compatibility: ['EDTA', 'EDSA', 'IDTA'],
    strengths: ['愛嬌がある', '社交的', '協調性がある', '素直'],
    weaknesses: ['依存的', '自立心に欠ける', '甘えすぎる', '自己主張が弱い'],
    careers: ['接客業', '販売員', '秘書', 'アシスタント']
  },
  {
    code: 'ESTN',
    name: 'パーティーピーポー',
    ruby: 'ぱーてぃーぴーぽー',
    summary: 'パーティ好きの自由人',
    category: 'sub',
    emoji: '💖',
    description: '刺激中毒でスリルを好み、受け身ながらも外向的。新しい体験を求め続ける快楽主義者。',
    traits: ['刺激中毒', 'スリル好き', '受け身', '外向的', '体験重視'],
    compatibility: ['EDTN', 'EDSN', 'IDTN'],
    strengths: ['好奇心旺盛', 'オープンマインド', '適応力がある', '楽観的'],
    weaknesses: ['飽きっぽい', '安定性に欠ける', '衝動的', '責任感が薄い'],
    careers: ['イベントプランナー', 'エンターテイナー', '旅行業', 'クリエイティブ職']
  },
  {
    code: 'ESSA',
    name: '依存者',
    ruby: 'いぞんしゃ',
    summary: '和ませ系の愛情家',
    category: 'sub',
    emoji: '💖',
    description: '恋愛依存傾向があり、甘えることが得意で一途なタイプ。安定した関係の中で愛情を求める。',
    traits: ['恋愛依存', '甘え上手', '一途', '安定志向', '愛情深い'],
    compatibility: ['EDTA', 'EDSA', 'IDSA'],
    strengths: ['一途', '愛情深い', '献身的', '安定志向'],
    weaknesses: ['依存的すぎる', '嫉妬深い', '不安になりやすい', '自立心が弱い'],
    careers: ['カウンセラー', '保育士', '看護師', '福祉職']
  },
  {
    code: 'ESSN',
    name: 'ムードメーカー',
    ruby: 'むーどめーかー',
    summary: '緩く楽しむムードメーカー',
    category: 'sub',
    emoji: '💖',
    description: '快楽を優先し、感情を軽視して自由奔放に生きるタイプ。安定志向だが感情的な束縛は避ける。',
    traits: ['快楽優先', '感情軽視', '自由奔放', '安定志向', 'ドライな関係'],
    compatibility: ['EDSN', 'IDSN', 'EDTN'],
    strengths: ['自由度が高い', 'ストレスが少ない', '現実的', '合理的'],
    weaknesses: ['感情が薄い', '深い関係を築きにくい', '無責任に見える', '冷たく見える'],
    careers: ['フリーランス', 'コンサルタント', 'デザイナー', '自営業']
  },

  // Introvert系タイプ
  {
    code: 'IDTA',
    name: '情熱家',
    ruby: 'じょうねつか',
    summary: '寡黙だが情熱家',
    category: 'introvert',
    emoji: '👤',
    description: '無口で威圧感があり、静かながらも主導権を握るタイプ。内向的だが強いリーダーシップを持つ。',
    traits: ['無口', '威圧感', '静かなる主導者', '内向的', '強いリーダーシップ'],
    compatibility: ['ESTA', 'ESSA', 'ISTA'],
    strengths: ['集中力がある', '深く考える', '独立心がある', '冷静'],
    weaknesses: ['コミュニケーション不足', '威圧的', '孤立しがち', '感情表現が苦手'],
    careers: ['研究者', '技術者', '専門職', 'プログラマー']
  },
  {
    code: 'IDTN',
    name: '変態分析者',
    ruby: 'へんたいぶんせきしゃ',
    summary: '静かな狩人',
    category: 'introvert',
    emoji: '👤',
    description: '研究熱心で観察力に優れ、変態的な探究心を持つ理系タイプ。刺激を求めながらも内向的。',
    traits: ['研究熱心', '観察力が高い', '変態理系', '内向的', '探究心旺盛'],
    compatibility: ['ESTN', 'ISTN', 'ESTA'],
    strengths: ['分析力が高い', '探究心旺盛', '専門性が深い', '客観的'],
    weaknesses: ['社交性に欠ける', 'マニアック', '変わり者に見える', '実用性に欠ける'],
    careers: ['研究員', 'データアナリスト', '学者', 'エンジニア']
  },
  {
    code: 'IDSA',
    name: '守護者',
    ruby: 'しゅごしゃ',
    summary: '静かに守る恋人',
    category: 'introvert',
    emoji: '👤',
    description: '優しい主導でスキンシップを重視し、包容力のあるタイプ。安定志向で愛情深い。',
    traits: ['優しい主導', 'スキンシップ重視', '包容力', '安定志向', '愛情深い'],
    compatibility: ['ESSA', 'ISSA', 'ESTA'],
    strengths: ['包容力がある', '癒し系', '安定している', '思いやりがある'],
    weaknesses: ['消極的', '自己主張が弱い', '優柔不断', 'ストレスを溜めやすい'],
    careers: ['セラピスト', 'カウンセラー', '医療職', '福祉職']
  },
  {
    code: 'IDSN',
    name: '指揮者',
    ruby: 'しきしゃ',
    summary: '淡々とした自由人',
    category: 'introvert',
    emoji: '👤',
    description: '無感情でプレイに特化し、孤高を保つタイプ。安定志向だが感情的な距離を保つ。',
    traits: ['無感情', 'プレイ特化', '孤高', '安定志向', '感情的距離'],
    compatibility: ['ISSN', 'ESSN', 'ISTN'],
    strengths: ['独立性がある', '冷静', '客観的', '専門性が高い'],
    weaknesses: ['孤立しがち', '感情が薄い', '人間関係が希薄', '冷たく見える'],
    careers: ['個人事業主', '専門職', 'フリーランス', '技術職']
  },

  // Fantasy系タイプ
  {
    code: 'ISTA',
    name: '妄想者',
    ruby: 'もうそうしゃ',
    summary: '秘めた情熱家',
    category: 'fantasy',
    emoji: '💫',
    description: '空想癖があり、従属願望を持ち、自己投影型のタイプ。内向的で刺激を求めながらも愛着を重視する。',
    traits: ['空想癖', '従属願望', '自己投影型', '内向的', '愛着重視'],
    compatibility: ['IDTA', 'EDTA', 'IDSA'],
    strengths: ['想像力豊か', '感受性が高い', '独創性がある', '芸術的センス'],
    weaknesses: ['現実逃避しがち', '依存的', '不安定', '実行力に欠ける'],
    careers: ['クリエイター', 'アーティスト', 'ライター', 'デザイナー']
  },
  {
    code: 'ISTN',
    name: 'ドM者',
    ruby: 'ドエムしゃ',
    summary: '影で遊ぶタイプ',
    category: 'fantasy',
    emoji: '💫',
    description: '孤独を好み、快楽を逃避手段として使い、感情をカットするタイプ。内向的で刺激志向。',
    traits: ['孤独好き', '快楽逃避', '感情カット', '内向的', '刺激志向'],
    compatibility: ['EDTN', 'IDTN', 'EDSN'],
    strengths: ['独立性が高い', 'ストレス耐性がある', '客観的', '合理的'],
    weaknesses: ['感情表現が苦手', '孤立しがち', '逃避的', '人間関係が希薄'],
    careers: ['プログラマー', 'フリーランス', '個人事業主', 'ゲーム開発者']
  },
  {
    code: 'ISSA',
    name: 'ヒーラー',
    ruby: 'ひーらー',
    summary: '静かな癒し手',
    category: 'fantasy',
    emoji: '💫',
    description: '依存傾向があり、一途で愛されたい欲求が強いタイプ。内向的で安定志向、愛着を重視する。',
    traits: ['依存傾向', '一途', '愛されたい', '内向的', '安定志向'],
    compatibility: ['EDTA', 'EDSA', 'IDTA'],
    strengths: ['愛情深い', '一途', '献身的', '安定志向'],
    weaknesses: ['依存的すぎる', '重い', '不安になりやすい', '束縛が強い'],
    careers: ['アーティスト', 'ライター', 'カウンセラー', 'クリエイティブ職']
  },
  {
    code: 'ISSN',
    name: '提供者',
    ruby: 'ていきょうしゃ',
    summary: 'マイペースで従順',
    category: 'fantasy',
    emoji: '💫',
    description: '感情が薄く、身体だけを差し出すクールなMタイプ。内向的で安定志向だが感情的な距離を保つ。',
    traits: ['感情薄い', '身体だけ差し出す', 'クールM', '内向的', '安定志向'],
    compatibility: ['EDSN', 'IDSN', 'ESSN'],
    strengths: ['客観的', '冷静', 'ストレスが少ない', '現実的'],
    weaknesses: ['感情が薄い', '深い関係を築きにくい', '冷たく見える', '孤立しがち'],
    careers: ['技術職', 'データ処理', 'フリーランス', '個人事業主']
  }
];

export const getCategoryColor = (category: PersonalityType['category']) => {
  switch (category) {
    case 'dom':
      return 'from-red-500 to-pink-500';
    case 'sub':
      return 'from-pink-500 to-rose-400';
    case 'introvert':
      return 'from-purple-500 to-indigo-500';
    case 'fantasy':
      return 'from-blue-500 to-cyan-400';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

export const getCategoryName = (category: PersonalityType['category']) => {
  switch (category) {
    case 'dom':
      return '先導者タイプ';
    case 'sub':
      return '調和家タイプ';
    case 'introvert':
      return '戦略家タイプ';
    case 'fantasy':
      return '献身家タイプ';
    default:
      return '';
  }
}; 