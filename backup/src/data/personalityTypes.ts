import { PersonalityType } from '../types/personality';

export const personalityTypes: PersonalityType[] = [
  // Dom系タイプ
  {
    code: 'EDTA',
    name: '快楽王',
    category: 'dom',
    emoji: '👑',
    description: '独占欲が強く、主導権を握りながらも深い愛着を持つタイプ。パートナーを独占したいという強い欲求と、相手への深い愛情を併せ持つ。',
    traits: ['独占欲が強い', '主導的', '愛着形成が得意', '情熱的', '保護欲が強い'],
    compatibility: ['ESSA', 'ISSA', 'ESTA']
  },
  {
    code: 'EDTN',
    name: '本能支配者',
    category: 'dom',
    emoji: '👑',
    description: '衝動的で支配的、感情よりも本能を重視するタイプ。刺激を求め、関係においても自由度を重視する。',
    traits: ['衝動的', '支配的', 'セフレOK', '刺激志向', '感情と割り切り可能'],
    compatibility: ['ESTN', 'ISTN', 'ISSN']
  },
  {
    code: 'EDSA',
    name: '献愛者',
    category: 'dom',
    emoji: '👑',
    description: '尽くす系のドSで、安定した関係を求めながらも主導権を握るタイプ。恋愛を重視し、相手に尽くすことで愛情を表現する。',
    traits: ['尽くす系ドS', '恋愛重視', '安定志向', '愛情深い', '責任感が強い'],
    compatibility: ['ESSA', 'ISSA', 'ESTA']
  },
  {
    code: 'EDSN',
    name: '無感情調教師',
    category: 'dom',
    emoji: '👑',
    description: '感情を切り離し、技術的なスキルと支配に重点を置くタイプ。安定を求めながらも感情的な束縛は避ける。',
    traits: ['感情切り離し', '技術重視', '支配的', '安定志向', 'クールな関係'],
    compatibility: ['ISSN', 'ESTN', 'ISTN']
  },

  // Sub系タイプ
  {
    code: 'ESTA',
    name: '従愛者',
    category: 'sub',
    emoji: '💖',
    description: '甘えん坊で愛されたい欲求が強く、明るい従属的な性格。外向的で愛着を重視するタイプ。',
    traits: ['甘えん坊', '愛されたい', '明るい従属', '外向的', '愛着重視'],
    compatibility: ['EDTA', 'EDSA', 'IDTA']
  },
  {
    code: 'ESTN',
    name: '快楽狂',
    category: 'sub',
    emoji: '💖',
    description: '刺激中毒でスリルを好み、受け身ながらも外向的。新しい体験を求め続ける快楽主義者。',
    traits: ['刺激中毒', 'スリル好き', '受け身', '外向的', '体験重視'],
    compatibility: ['EDTN', 'EDSN', 'IDTN']
  },
  {
    code: 'ESSA',
    name: '依存天使',
    category: 'sub',
    emoji: '💖',
    description: '恋愛依存傾向があり、甘えることが得意で一途なタイプ。安定した関係の中で愛情を求める。',
    traits: ['恋愛依存', '甘え上手', '一途', '安定志向', '愛情深い'],
    compatibility: ['EDTA', 'EDSA', 'IDSA']
  },
  {
    code: 'ESSN',
    name: '快楽主義者',
    category: 'sub',
    emoji: '💖',
    description: '快楽を優先し、感情を軽視して自由奔放に生きるタイプ。安定志向だが感情的な束縛は避ける。',
    traits: ['快楽優先', '感情軽視', '自由奔放', '安定志向', 'ドライな関係'],
    compatibility: ['EDSN', 'IDSN', 'EDTN']
  },

  // Introvert系タイプ
  {
    code: 'IDTA',
    name: '隠王者',
    category: 'introvert',
    emoji: '👤',
    description: '無口で威圧感があり、静かながらも主導権を握るタイプ。内向的だが強いリーダーシップを持つ。',
    traits: ['無口', '威圧感', '静かなる主導者', '内向的', '強いリーダーシップ'],
    compatibility: ['ESTA', 'ESSA', 'ISTA']
  },
  {
    code: 'IDTN',
    name: '変態分析者',
    category: 'introvert',
    emoji: '👤',
    description: '研究熱心で観察力に優れ、変態的な探究心を持つ理系タイプ。刺激を求めながらも内向的。',
    traits: ['研究熱心', '観察力が高い', '変態理系', '内向的', '探究心旺盛'],
    compatibility: ['ESTN', 'ISTN', 'ESTA']
  },
  {
    code: 'IDSA',
    name: '癒し提供者',
    category: 'introvert',
    emoji: '👤',
    description: '優しい主導でスキンシップを重視し、包容力のあるタイプ。安定志向で愛情深い。',
    traits: ['優しい主導', 'スキンシップ重視', '包容力', '安定志向', '愛情深い'],
    compatibility: ['ESSA', 'ISSA', 'ESTA']
  },
  {
    code: 'IDSN',
    name: '距離系ドS者',
    category: 'introvert',
    emoji: '👤',
    description: '無感情でプレイに特化し、孤高を保つタイプ。安定志向だが感情的な距離を保つ。',
    traits: ['無感情', 'プレイ特化', '孤高', '安定志向', '感情的距離'],
    compatibility: ['ISSN', 'ESSN', 'ISTN']
  },

  // Fantasy系タイプ
  {
    code: 'ISTA',
    name: '妄想者',
    category: 'fantasy',
    emoji: '💫',
    description: '空想癖があり、従属願望を持ち、自己投影型のタイプ。内向的で刺激を求めながらも愛着を重視する。',
    traits: ['空想癖', '従属願望', '自己投影型', '内向的', '愛着重視'],
    compatibility: ['IDTA', 'EDTA', 'IDSA']
  },
  {
    code: 'ISTN',
    name: '逃避M者',
    category: 'fantasy',
    emoji: '💫',
    description: '孤独を好み、快楽を逃避手段として使い、感情をカットするタイプ。内向的で刺激志向。',
    traits: ['孤独好き', '快楽逃避', '感情カット', '内向的', '刺激志向'],
    compatibility: ['EDTN', 'IDTN', 'EDSN']
  },
  {
    code: 'ISSA',
    name: '重愛者',
    category: 'fantasy',
    emoji: '💫',
    description: '依存傾向があり、一途で愛されたい欲求が強いタイプ。内向的で安定志向、愛着を重視する。',
    traits: ['依存傾向', '一途', '愛されたい', '内向的', '安定志向'],
    compatibility: ['EDTA', 'EDSA', 'IDTA']
  },
  {
    code: 'ISSN',
    name: '快楽貸屋',
    category: 'fantasy',
    emoji: '💫',
    description: '感情が薄く、身体だけを差し出すクールなMタイプ。内向的で安定志向だが感情的な距離を保つ。',
    traits: ['感情薄い', '身体だけ差し出す', 'クールM', '内向的', '安定志向'],
    compatibility: ['EDSN', 'IDSN', 'ESSN']
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
      return '主導者（Dom）系';
    case 'sub':
      return '従属者（Sub）系';
    case 'introvert':
      return '隠密（Introvert）系';
    case 'fantasy':
      return '妄想・回避系';
    default:
      return '';
  }
};