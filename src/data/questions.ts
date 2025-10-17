import { Question } from '../types/personality';

// 質問のバリエーションを定義
const questionVariations: { [key: number]: string[] } = {
  1: [
    '性の話題をオープンに語れる',
    '下ネタも、場が許せば普通に話せるほうだ',
    '恋愛や性の話題、わりと隠さずシェアできる'
  ],
  2: [
    '性的嗜好はごく限られた人にしか話さない',
    '性に関する話は、信頼してるほんの一部にしか話さない',
    '性に関する本音は、親しい相手以外には話さない'
  ],
  3: [
    'リードしたくなる瞬間、けっこうある。',
    '流れを握って主導したいと思う場面が多い',
    '気づくと自分がペースメーカーになっていることが多い'
  ],
  4: [
    '命令されると、なんかゾクっとする。',
    '少し強めに指示されると、従いたくなる時がある',
    '相手に引っ張られる感じが、むしろ心地いい'
  ],
  5: [
    'ちょっと変わったプレイ、むしろワクワクする。',
    '新しい試し方を見ると、つい挑戦してみたくなる',
    'マンネリより"未知"に惹かれるタイプだ'
  ],
  6: [
    '絶対ムリっていうNGプレイは、いくつかある。',
    '超えないラインは最初からはっきり決めている',
    '試せないことは、最初にNOと伝える主義'
  ],
  7: [
    '一晩だけの関係も"あり"だと思う。',
    '深い関係じゃなくても、その場のノリでOKな時もある',
    '気軽な関係のほうが楽だと感じることがある'
  ],
  8: [
    '心が通じてないとムリって時ある。',
    '気持ちのつながりがないと踏み出せないことがある',
    '安心できる相手じゃないと難しいと感じる'
  ],
  9: [
    'セクシーなセリフとかポーズ、要求されるの苦手。',
    '色っぽい演出を求められると、ちょっと身構えてしまう',
    'あざとい表現を求められると、引いてしまうことがある'
  ],
  10: [
    '自分の体に自信あるってわけじゃないけど、ちょっと見せたい。',
    '完璧じゃなくても、少しは"魅せたい"気持ちがある',
    'さりげなくアピールするのは嫌いじゃない'
  ],
  11: [
    '性欲が強すぎて困ることがある。',
    '性欲が湧くと我慢せず行動に移したくなる',
    '性に関する妄想や欲求が日常的に強く湧いてくる'
  ],
  12: [
    '声や言葉の反応がないと物足りない',
    '相手の声色やささやきがあると一気にスイッチが入る',
    'エロい言葉のキャッチボールがあるほど興奮が高まる'
  ],
  13: [
    '役になりきる（医者と患者など）プレイに惹かれる',
    '設定やシナリオを決めて演じるほど楽しくなる',
    '物語の登場人物になりきって遊ぶのが好きだ'
  ],
  14: [
    '余韻を共有する時間が必要',
    '終わった後に抱きしめ合ったり話す時間が欠かせない',
    '一緒に過ごすクールダウンの時間があると満たされる'
  ],
  15: [
    '相手の反応を引き出すのが楽しい',
    '相手の"気持ちいいポイント"を探り当てるのが楽しい',
    '新しい刺激で相手の反応を引き出せると喜びを感じる'
  ],
  16: [
    '軽い拘束や痛みがスパイスになる',
    '軽い拘束や抑制が加わると心地よいスパイスになる',
    '弱い痛みや圧の刺激をアクセントとして楽しめる'
  ],
  17: [
    '音楽・照明・香りなど雰囲気を整えたい',
    '音楽や照明でムードを演出するのが好きだ',
    '香りやインテリアで没入感を高めたい'
  ],
  18: [
    '長い前戯より早く本番に入りたい',
    'いい雰囲気になったら早めに本番へ進みたい',
    'テンポよく進む展開のほうが自分に合っている'
  ],
  19: [
    'ノリや勢いで始めることが多い',
    'その場の空気や勢いで始めることがある',
    'ビビッと来た瞬間にすぐ行動へ移したくなる'
  ],
  20: [
    '鏡に映る姿を見ながらだと、よりムードが高まる。',
    '姿見や鏡越しにお互いを見るのが刺激になる',
    '反射する自分たちの動きがムードを上げてくれる'
  ],
  21: [
    '自分のNGははっきり伝えられる',
    '自分の境界線やNGは事前に伝えられる',
    'イヤなことははっきり断れる自信がある'
  ],
  22: [
    'ミッションやゲーム感覚の要素があるとさらに盛り上がる。',
    'ルールやミッションを設けると燃える',
    'ポイント制やチャレンジ要素があるとさらに楽しい'
  ],
  23: [
    '制服やコスチューム姿だと普段より興奮が高まる。',
    '制服や衣装で雰囲気がガラッと変わるのが好きだ',
    '服装や小物でキャラになりきると興奮が増す'
  ],
  24: [
    '衛生面の準備（シャワー等）が欠かせない',
    '前後のシャワーやケアをきちんとしたい',
    '清潔な環境と準備が整っていないと落ち着かない'
  ],
  25: [
    '他人の行為を想像/視聴すると燃える',
    '他人の体験談や映像を見ると燃える',
    '見る／見られるシチュエーションにスリルを感じる'
  ],
  26: [
    '外やリスクのある場所は避けたい',
    '危険やリスクの高い場所は避けたい',
    'プライバシーが守られる安全な環境を選びたい'
  ],
  27: [
    'テキストや音声でのやりとりがムードを作る',
    'チャットや通話のやりとりでムードが高まる',
    'テキストや音声で想像を膨らませるのが好きだ'
  ],
  28: [
    'キスがないと始まった気がしない',
    'たくさんキスしてから進めたい',
    'キスで心と体のスイッチが入る'
  ],
  29: [
    '夜より朝・昼の方が性欲が高い',
    '朝や日中のほうがスイッチが入りやすい',
    '日が出ている時間帯のほうが気分が高まる'
  ],
  30: [
    '1回では満足できないことが多い',
    '一度で満足せずにもう一回を求めたくなる',
    '休憩を挟んで複数回楽しみたい'
  ],
  31: [
    '露骨な表現や下ネタが興奮につながる',
    '露骨な表現やエロい冗談でテンションが上がる',
    '直接的な言葉責めも楽しめる'
  ],
  32: [
    '性に関する本や記事を読む',
    '性に関する本や記事を読むのが好きだ',
    '体験談や知識を取り入れて研究するのが楽しい'
  ],
  33: [
    '相手の気持ちを汲んで導くのが得意',
    '相手の心身の状態を読んで上手くリードできる',
    '相手のペースに合わせて導くのが得意だ'
  ],
  34: [
    '複数刺激を同時に与える・受けるのが好き',
    '手・口・道具など複数を同時に使うのが好きだ',
    'いろいろな刺激を同時進行で楽しみたい'
  ],
  35: [
    'ゆっくりしたテンポやソフトな刺激が好み',
    'ゆっくり優しいタッチで進めたい',
    '穏やかなテンポで丁寧に楽しむのが心地よい'
  ]
};

// 共通の選択肢配列を定義（メモリ効率化）
// 6段階評価に変更（どちらでもない を削除）
const commonOptions = [
  { text: '非常にそう思う', value: 5 },
  { text: 'そう思う', value: 4 },
  { text: 'ややそう思う', value: 3 },
  { text: 'あまりそう思わない', value: 2 },
  { text: 'そう思わない', value: 1 },
  { text: '全くそう思わない', value: 0 }
];

// シードベースの疑似乱数生成器
function seededRandom(seed: number): () => number {
  let x = seed;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

// シードを使って質問テキストを選択する関数
function getSeededQuestionText(id: number, rng: () => number): string {
  const variations = questionVariations[id];
  if (!variations) {
    // バリエーションがない場合（36-40の質問）は元のテキストを返す
    return '';
  }
  // シードベースで選択
  const randomIndex = Math.floor(rng() * variations.length);
  return variations[randomIndex];
}

// 質問データを生成
const generateQuestions = (): Question[] => {
  // 固定シードを使用して一貫性を保つ
  const rng = seededRandom(42);
  
  const baseQuestions: Omit<Question, 'text'>[] = [
    {
      id: 1,
      axis: 'EI',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 2,
      axis: 'EI',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 3,
      axis: 'LF',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 4,
      axis: 'LF',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 5,
      axis: 'AS',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 6,
      axis: 'AS',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 7,
      axis: 'LF2',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 8,
      axis: 'LF2',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 9,
      axis: 'OS',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 10,
      axis: 'OS',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 11,
      axis: null,
      tag: '🔥 欲望の炎',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 12,
      axis: null,
      tag: '💬 言語プレイ派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 13,
      axis: null,
      tag: '🎭 ロールプレイ好き',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 14,
      axis: null,
      tag: '🛁 アフターケア必須',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 15,
      axis: null,
      tag: '⛏️ 開拓派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 16,
      axis: null,
      tag: '🧷 軽SM耐性あり',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 17,
      axis: null,
      tag: '🕯 ロマン重視',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 18,
      axis: null,
      tag: '⚡️ スピード勝負派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 19,
      axis: null,
      tag: '🏃‍♂️ 衝動トリガー型',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 20,
      axis: null,
      tag: '🪞 鏡プレイ好き',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 21,
      axis: null,
      tag: '🚪 NG明確',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 22,
      axis: null,
      tag: '🎮 ゲーム派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 23,
      axis: null,
      tag: '🧥 コスプレ派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 24,
      axis: null,
      tag: '🧼 ケア＆衛生重視',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 25,
      axis: null,
      tag: '🕵️‍♀️ 覗き見興奮派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 26,
      axis: null,
      tag: '🛡 安全第一派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 27,
      axis: null,
      tag: '📱 デジタル前戯派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 28,
      axis: null,
      tag: '💋 キス魔',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 29,
      axis: null,
      tag: '☀️ 朝型エロス',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 30,
      axis: null,
      tag: '🔄 リピート求め派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 31,
      axis: null,
      tag: '🗣 下ネタOK',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 32,
      axis: null,
      tag: '📚 学習研究派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 33,
      axis: null,
      tag: '🧭 ガイド派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 34,
      axis: null,
      tag: '🤹‍♀️ マルチタスク派',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 35,
      axis: null,
      tag: '💤 まったり派',
      isReverse: false,
      options: commonOptions
    },
    // 36-40の質問（random-secret）は固定テキスト
    {
      id: 36,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 37,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 38,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 39,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 40,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    }
  ];

  // 固定の質問テキスト（36-40）
  const fixedQuestionTexts: { [key: number]: string } = {
    36: '最近、他の人をエロい目で見たことがある',
    37: 'もしバレないなら、ワンナイトしてみたいと思う',
    38: 'パートナー以外の人と"こうなったら…"って妄想したことがある',
    39: '元カレ/元カノをまだ思い出すことがある',
    40: 'パートナーには言えない"隠し事"がある'
  };

  // 質問を生成
  return baseQuestions.map((baseQuestion) => {
    let text: string;
    
    if (baseQuestion.id <= 35) {
      // 1-35の質問はシードベースで選択
      text = getSeededQuestionText(baseQuestion.id, rng);
    } else {
      // 36-40の質問は固定
      text = fixedQuestionTexts[baseQuestion.id] || '';
    }

    return {
      ...baseQuestion,
      text
    } as Question;
  });
};

// 質問をシャッフルする関数（Fisher-Yates アルゴリズム）
function shuffleQuestions(array: Question[], rng: () => number): Question[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// エクスポート用の質問配列（シャッフル前）
// クライアントサイドでシャッフルを行うため、生成された順序のままエクスポート
export const questions: Question[] = generateQuestions();

// クライアントサイドで質問をシャッフルする関数
export function getShuffledQuestions(seed?: number): Question[] {
  // シードが指定されていない場合は現在時刻を使用
  const actualSeed = seed ?? Date.now();
  const rng = seededRandom(actualSeed);
  return shuffleQuestions([...questions], rng);
}

// シャッフル関数をエクスポート（テスト用）
export { shuffleQuestions };