import { PersonalityType } from '../types/personality';

export const personalityTypes: PersonalityType[] = [
  // Dom系タイプ
  {
    code: 'ELAL',
    name: '快楽王',
    ruby: 'かいらくおう',
    summary: '夜を制するカリスマ',
    fullDescription: '夜を仕切る天性のカリスマ。愛にも刺激にも全力投球。一度ハマると抜け出せない、危険な魅力。',
    category: 'dom',
    emoji: '👑',
    description: '外向的でリードを取り、冒険心が強く、恋愛を重視するタイプ。パートナーを情熱的に導き、新しい体験を共に探求する。',
    traits: ['情熱的', 'リーダーシップが強い', '冒険心旺盛', '愛情深い', 'カリスマ性'],
    compatibility: ['IFSL', 'EFSL', 'IFAL'],
    strengths: ['リーダーシップがある', '情熱的', '責任感が強い', '保護欲が強い'],
    weaknesses: ['束縛が強すぎる', '独占欲が過度', '嫉妬深い', '支配的になりがち'],
    careers: ['経営者', 'プロジェクトマネージャー', 'チームリーダー', '営業職']
  },
  {
    code: 'ELAF',
    name: '支配者',
    ruby: 'しはいしゃ',
    summary: '自由奔放な遊び上手',
    fullDescription: '自由を愛する奔放なリーダー気質。恋も快楽も自分流に楽しむ達人。だけど、なぜか本命には本気になれない。',
    category: 'dom',
    emoji: '👑',
    description: '外向的でリードを取り、冒険心が強く、自由な関係を好むタイプ。複数の関係を楽しみ、感情に縛られない。',
    traits: ['自由奔放', 'リーダーシップ', '冒険心旺盛', '複数関係OK', '感情と割り切り可能'],
    compatibility: ['EFAF', 'IFAF', 'IFSF'],
    strengths: ['決断力がある', '行動力がある', '現実的', '柔軟性がある'],
    weaknesses: ['感情軽視', '衝動的すぎる', '安定性に欠ける', '深い関係を築きにくい'],
    careers: ['起業家', '営業職', 'セールスマネージャー', 'フリーランス']
  },
  {
    code: 'ELSL',
    name: '愛情家',
    ruby: 'あいじょうか',
    summary: '面倒見のいい愛情家',
    fullDescription: '面倒見がよく、人懐っこいあったかキャラ。尽くすのが好きで、自然と周りに人が集まる。でも実は、甘えたい欲も密かに抱えている。',
    category: 'dom',
    emoji: '👑',
    description: '外向的でリードを取り、安定を求め、恋愛を重視するタイプ。相手に尽くしながらも主導権を握る。',
    traits: ['面倒見がいい', '愛情深い', '安定志向', '尽くす系', '責任感が強い'],
    compatibility: ['IFSL', 'EFSL', 'IFAL'],
    strengths: ['献身的', '安定性がある', '責任感が強い', '愛情深い'],
    weaknesses: ['過度に尽くしてしまう', '自分を犠牲にしがち', '束縛が強い', '期待が高すぎる'],
    careers: ['教師', 'カウンセラー', '看護師', '人事職']
  },
  {
    code: 'ELSF',
    name: '調教師',
    ruby: 'ちょうきょうし',
    summary: '頼れるけど情が薄い',
    fullDescription: '冷静沈着で頼れる存在。情には流されず、効率重視の関係を好む。だけど夜の顔は…想像にお任せ。',
    category: 'dom',
    emoji: '👑',
    description: '外向的でリードを取り、安定を求め、自由な関係を好むタイプ。感情を切り離して技術的にアプローチする。',
    traits: ['冷静沈着', '技術重視', 'リーダーシップ', '安定志向', '感情と割り切り'],
    compatibility: ['IFSF', 'EFAF', 'IFAF'],
    strengths: ['論理的', '冷静', '技術力が高い', '効率的'],
    weaknesses: ['感情表現が苦手', '冷たく見える', '共感力に欠ける', '人間関係が希薄'],
    careers: ['エンジニア', '研究者', 'アナリスト', 'IT専門職']
  },

  // Sub系タイプ
  {
    code: 'EFAL',
    name: '恋愛者',
    ruby: 'れんあいしゃ',
    summary: '場を盛り上げる恋愛派',
    fullDescription: '盛り上げ上手で恋にも全力なムードメーカー。恋愛の駆け引きが得意で相手の心を揺さぶる。でも実は、めっちゃ寂しがり屋だったりする。',
    category: 'sub',
    emoji: '💖',
    description: '外向的でフォローを好み、冒険心が強く、恋愛を重視するタイプ。相手に導かれながら新しい体験を求める。',
    traits: ['盛り上げ上手', '恋愛駆け引き上手', '冒険心旺盛', '寂しがり屋', '愛情深い'],
    compatibility: ['ELAL', 'ELSL', 'ILAL'],
    strengths: ['愛嬌がある', '社交的', '協調性がある', '素直'],
    weaknesses: ['依存的', '自立心に欠ける', '甘えすぎる', '自己主張が弱い'],
    careers: ['接客業', '販売員', '秘書', 'アシスタント']
  },
  {
    code: 'EFAF',
    name: 'パーティーピーポー',
    ruby: 'ぱーてぃーぴーぽー',
    summary: 'パーティ好きの自由人',
    fullDescription: 'その場のノリと刺激を求めて動く自由人。恋も遊びも「今が楽しい」が最優先。でも、夜だけはちょっと真剣って噂も…？',
    category: 'sub',
    emoji: '💖',
    description: '外向的でフォローを好み、冒険心が強く、自由な関係を好むタイプ。刺激を求め続ける快楽主義者。',
    traits: ['ノリ重視', '刺激中毒', '自由人', '今が楽しい', '夜は真剣'],
    compatibility: ['ELAF', 'ELSF', 'ILAF'],
    strengths: ['好奇心旺盛', 'オープンマインド', '適応力がある', '楽観的'],
    weaknesses: ['飽きっぽい', '安定性に欠ける', '衝動的', '責任感が薄い'],
    careers: ['イベントプランナー', 'エンターテイナー', '旅行業', 'クリエイティブ職']
  },
  {
    code: 'EFSL',
    name: '依存者',
    ruby: 'いぞんしゃ',
    summary: '和ませ系の愛情家',
    fullDescription: '誰かと一緒じゃないと落ち着かない甘えん坊。恋人にはとことん尽くす優しい性格。だけど、独占欲はかなり強めかも。',
    category: 'sub',
    emoji: '💖',
    description: '外向的でフォローを好み、安定を求め、恋愛を重視するタイプ。相手に尽くしながら依存する。',
    traits: ['甘えん坊', '依存的', '尽くす系', '独占欲強い', '愛情深い'],
    compatibility: ['ELAL', 'ELSL', 'ILSL'],
    strengths: ['一途', '愛情深い', '献身的', '安定志向'],
    weaknesses: ['依存的すぎる', '嫉妬深い', '不安になりやすい', '自立心が弱い'],
    careers: ['カウンセラー', '保育士', '看護師', '福祉職']
  },
  {
    code: 'EFSF',
    name: 'ムードメーカー',
    ruby: 'むーどめーかー',
    summary: '緩く楽しむムードメーカー',
    fullDescription: '穏やかで、誰とでも自然体で接する癍し系。恋にもガツガツせず、流れに身を任せるタイプ。実はちょっとした一言にグラっときやすい。',
    category: 'sub',
    emoji: '💖',
    description: '外向的でフォローを好み、安定を求め、自由な関係を好むタイプ。感情に流されずマイペース。',
    traits: ['穏やか', '自然体', '流れに任せる', 'グラっときやすい', 'マイペース'],
    compatibility: ['ELSF', 'ILSF', 'ELAF'],
    strengths: ['自由度が高い', 'ストレスが少ない', '現実的', '合理的'],
    weaknesses: ['感情が薄い', '深い関係を築きにくい', '無責任に見える', '冷たく見える'],
    careers: ['フリーランス', 'コンサルタント', 'デザイナー', '自営業']
  },

  // Introvert系タイプ
  {
    code: 'ILAL',
    name: '情熱家',
    ruby: 'じょうねつか',
    summary: '寡黙だが情熱家',
    fullDescription: '一見クール、でも内には熱い恋心が燃えている。言葉にしない分、行動がまっすぐで誠実。そのギャップに、知らぬ間に落ちてしまう人多数。',
    category: 'introvert',
    emoji: '👤',
    description: '無口で威圧感があり、静かながらも主導権を握るタイプ。内向的だが強いリーダーシップを持つ。',
    traits: ['無口', '威圧感', '静かなる主導者', '内向的', '強いリーダーシップ'],
    compatibility: ['EFAL', 'EFSL', 'IFAL'],
    strengths: ['集中力がある', '深く考える', '独立心がある', '冷静'],
    weaknesses: ['コミュニケーション不足', '威圧的', '孤立しがち', '感情表現が苦手'],
    careers: ['研究者', '技術者', '専門職', 'プログラマー']
  },
  {
    code: 'ILAF',
    name: '変態分析者',
    ruby: 'へんたいぶんせきしゃ',
    summary: '静かな狩人',
    fullDescription: '観察力が高くてちょっと不思議な魅力を放つ。静かだけど、夜の顔は…なかなかの探究者。そのギャップに沼る人、急増中。',
    category: 'introvert',
    emoji: '👤',
    description: '研究熱心で観察力に優れ、変態的な探究心を持つ理系タイプ。刺激を求めながらも内向的。',
    traits: ['研究熱心', '観察力が高い', '変態理系', '内向的', '探究心旺盛'],
    compatibility: ['EFAF', 'IFAF', 'EFAL'],
    strengths: ['分析力が高い', '探究心旺盛', '専門性が深い', '客観的'],
    weaknesses: ['社交性に欠ける', 'マニアック', '変わり者に見える', '実用性に欠ける'],
    careers: ['研究員', 'データアナリスト', '学者', 'エンジニア']
  },
  {
    code: 'ILSL',
    name: '守護者',
    ruby: 'しゅごしゃ',
    summary: '静かに守る恋人',
    fullDescription: '控えめだけど、ピンチには必ず助けてくれるタイプ。大切な人だけには全力で尽くす誠実な恋人。一途すぎて、逆にこっちが不安になるほど。',
    category: 'introvert',
    emoji: '👤',
    description: '内向的でリードを取り、安定を求め、恋愛を重視するタイプ。優しく包容力があり、大切な人を守る。',
    traits: ['控えめ', 'ピンチに強い', '全力で尽くす', '誠実', '一途すぎる'],
    compatibility: ['EFSL', 'IFSL', 'EFAL'],
    strengths: ['包容力がある', '癒し系', '安定している', '思いやりがある'],
    weaknesses: ['消極的', '自己主張が弱い', '優柔不断', 'ストレスを溜めやすい'],
    careers: ['セラピスト', 'カウンセラー', '医療職', '福祉職']
  },
  {
    code: 'ILSF',
    name: '指揮者',
    ruby: 'しきしゃ',
    summary: '淡々とした自由人',
    fullDescription: '感情に左右されず、自分の世界を大切にする論理派。恋愛もどこかマイペースだけど、その安定感が魅力。でもたまに見せる本音にドキッとする。',
    category: 'introvert',
    emoji: '👤',
    description: '内向的でリードを取り、安定を求め、自由な関係を好むタイプ。論理的で感情に流されない。',
    traits: ['論理派', 'マイペース', '安定感', '感情に流されない', 'たまに本音'],
    compatibility: ['IFSF', 'EFSF', 'IFAF'],
    strengths: ['独立性がある', '冷静', '客観的', '専門性が高い'],
    weaknesses: ['孤立しがち', '感情が薄い', '人間関係が希薄', '冷たく見える'],
    careers: ['個人事業主', '専門職', 'フリーランス', '技術職']
  },

  // Fantasy系タイプ
  {
    code: 'IFAL',
    name: '妄想者',
    ruby: 'もうそうしゃ',
    summary: '秘めた情熱家',
    fullDescription: '普段は静かだけど、心の中は恋と妄想でいっぱい。相手に知られないまま恋心を育てがち。でも、心を開いた時の爆発力はすごい。',
    category: 'fantasy',
    emoji: '💫',
    description: '内向的でフォローを好み、冒険心が強く、恋愛を重視するタイプ。空想の中で情熱的な恋を育てる。',
    traits: ['妄想がち', '恋心を育てる', '爆発力あり', '静かな外見', '内なる情熱'],
    compatibility: ['ILAL', 'ELAL', 'ILSL'],
    strengths: ['想像力豊か', '感受性が高い', '独創性がある', '芸術的センス'],
    weaknesses: ['現実逃避しがち', '依存的', '不安定', '実行力に欠ける'],
    careers: ['クリエイター', 'アーティスト', 'ライター', 'デザイナー']
  },
  {
    code: 'IFAF',
    name: 'ドM者',
    ruby: 'ドエムしゃ',
    summary: '影で遊ぶタイプ',
    fullDescription: '受け身スタイルだけど、刺激にはとことん貪欲。バレないように影でこっそり楽しむのが得意。でも、主導権を握られると一気に開花する。',
    category: 'fantasy',
    emoji: '💫',
    description: '内向的でフォローを好み、冒険心が強く、自由な関係を好むタイプ。刺激を求めながらも影で楽しむ。',
    traits: ['受け身スタイル', '刺激に貪欲', '影で楽しむ', '主導権で開花', 'こっそり派'],
    compatibility: ['ELAF', 'ILAF', 'ELSF'],
    strengths: ['独立性が高い', 'ストレス耐性がある', '客観的', '合理的'],
    weaknesses: ['感情表現が苦手', '孤立しがち', '逃避的', '人間関係が希薄'],
    careers: ['プログラマー', 'フリーランス', '個人事業主', 'ゲーム開発者']
  },
  {
    code: 'IFSL',
    name: 'ヒーラー',
    ruby: 'ひーらー',
    summary: '静かな癒し手',
    fullDescription: '穏やかで優しく、そっと寄り添う癒手。傷ついた心に自然と効いてくる優しさが武器。でも意外と"触れてほしい欲"は強いらしい。',
    category: 'fantasy',
    emoji: '💫',
    description: '内向的でフォローを好み、安定を求め、恋愛を重視するタイプ。優しく寄り添い、相手を癍す。',
    traits: ['穏やか', '癍し手', '触れてほしい欲', '傷ついた心に効く', '優しさが武器'],
    compatibility: ['ELAL', 'ELSL', 'ILAL'],
    strengths: ['愛情深い', '一途', '献身的', '安定志向'],
    weaknesses: ['依存的すぎる', '重い', '不安になりやすい', '束縛が強い'],
    careers: ['アーティスト', 'ライター', 'カウンセラー', 'クリエイティブ職']
  },
  {
    code: 'IFSF',
    name: '提供者',
    ruby: 'ていきょうしゃ',
    summary: 'マイペースで従順',
    fullDescription: '合わせ上手で自己主張は控えめ。でも、実は心の中で熱い願望を秘めている。気づいたときには、あなたに尽くす準備は完了済み。',
    category: 'fantasy',
    emoji: '💫',
    description: '内向的でフォローを好み、安定を求め、自由な関係を好むタイプ。感情を切り離し、クールに関係を築く。',
    traits: ['合わせ上手', '熱い願望を秘める', '尽くす準備万端', 'クールな外見', '控えめ'],
    compatibility: ['ELSF', 'ILSF', 'EFSF'],
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
      return '先導者';
    case 'sub':
      return '調和家';
    case 'introvert':
      return '戦略家';
    case 'fantasy':
      return '献身家';
    default:
      return '';
  }
}; 