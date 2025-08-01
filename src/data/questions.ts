import { Question } from '../types/personality';

export const questions: Question[] = [
{
    id: 1,
    axis: 'EI',
    text: '性の話題をオープンに語れる',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 2,
    axis: 'EI',
    text: '性的嗜好はごく限られた人にしか話さない',
    isReverse: true,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 3,
    axis: 'LF',
    text: 'リードしたくなる瞬間、けっこうある。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 4,
    axis: 'LF',
    text: '命令されると、なんかゾクっとする。',
    isReverse: true,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 5,
    axis: 'AS',
    text: 'ちょっと変わったプレイ、むしろワクワクする。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 6,
    axis: 'AS',
    text: '絶対ムリっていうNGプレイは、いくつかある。',
    isReverse: true,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 7,
    axis: 'LF2',
    text: '一晩だけの関係も"あり"だと思う。',
    isReverse: true,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 8,
    axis: 'LF2',
    text: '心が通じてないとムリって時ある。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 9,
    axis: 'OS',
    text: 'セクシーなセリフとかポーズ、要求されるの苦手。',
    isReverse: true,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 10,
    axis: 'OS',
    text: '自分の体に自信あるってわけじゃないけど、ちょっと見せたい。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 11,
    axis: null,
    tag: '🔥 欲望の炎',
    text: '性欲が強すぎて困ることがある。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 12,
    axis: null,
    tag: '💬 言語プレイ派',
    text: '声や言葉の反応がないと物足りない',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 13,
    axis: null,
    tag: '🎭 ロールプレイ好き',
    text: '役になりきる（医者と患者など）プレイに惹かれる',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 14,
    axis: null,
    tag: '🛁 アフターケア必須',
    text: '余韻を共有する時間が必要',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 15,
    axis: null,
    tag: '⛏️ 開拓派',
    text: '相手の反応を引き出すのが楽しい',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 16,
    axis: null,
    tag: '🧷 軽SM耐性あり',
    text: '軽い拘束や痛みがスパイスになる',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 17,
    axis: null,
    tag: '🕯 ロマン重視',
    text: '音楽・照明・香りなど雰囲気を整えたい',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 18,
    axis: null,
    tag: '⚡️ スピード勝負派',
    text: '長い前戯より早く本番に入りたい',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 19,
    axis: null,
    tag: '🏃‍♂️ 衝動トリガー型',
    text: 'ノリや勢いで始めることが多い',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 20,
    axis: null,
    tag: '🪞 鏡プレイ好き',
    text: '鏡に映る姿を見ながらだと、よりムードが高まる。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 21,
    axis: null,
    tag: '🚪 NG明確',
    text: '自分のNGははっきり伝えられる',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 22,
    axis: null,
    tag: '🎮 ゲーム派',
    text: 'ミッションやゲーム感覚の要素があるとさらに盛り上がる。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 23,
    axis: null,
    tag: '🧥 コスプレ派',
    text: '制服やコスチューム姿だと普段より興奮が高まる。',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 24,
    axis: null,
    tag: '🧼 ケア＆衛生重視',
    text: '衛生面の準備（シャワー等）が欠かせない',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 25,
    axis: null,
    tag: '🕵️‍♀️ 覗き見興奮派',
    text: '他人の行為を想像/視聴すると燃える',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 26,
    axis: null,
    tag: '🛡 安全第一派',
    text: '外やリスクのある場所は避けたい',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 27,
    axis: null,
    tag: '📱 デジタル前戯派',
    text: 'テキストや音声でのやりとりがムードを作る',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 28,
    axis: null,
    tag: '💋 キス魔',
    text: 'キスがないと始まった気がしない',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 29,
    axis: null,
    tag: '☀️ 朝型エロス',
    text: '夜より朝・昼の方が性欲が高い',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 30,
    axis: null,
    tag: '🔄 リピート求め派',
    text: '1回では満足できないことが多い',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 31,
    axis: null,
    tag: '🗣 下ネタOK',
    text: '露骨な表現や下ネタが興奮につながる',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 32,
    axis: null,
    tag: '📚 学習研究派',
    text: '性に関する本や記事を読む',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 33,
    axis: null,
    tag: '🧭 ガイド派',
    text: '相手の気持ちを汲んで導くのが得意',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 34,
    axis: null,
    tag: '🤹‍♀️ マルチタスク派',
    text: '複数刺激を同時に与える・受けるのが好き',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 35,
    axis: null,
    tag: '💤 まったり派',
    text: 'ゆっくりしたテンポやソフトな刺激が好み',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 36,
    axis: null,
    tag: null,
    text: '最近、他の人をエロい目で見たことがある',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 37,
    axis: null,
    tag: null,
    text: 'もしバレないなら、ワンナイトしてみたいと思う',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 38,
    axis: null,
    tag: null,
    text: 'パートナー以外の人と"こうなったら…"って妄想したことがある',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 39,
    axis: null,
    tag: null,
    text: '元カレ/元カノをまだ思い出すことがある',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  },
{
    id: 40,
    axis: null,
    tag: null,
    text: 'パートナーには言えない"隠し事"がある',
    isReverse: false,
    options: [
      { text: '非常にそう思う', value: 6 },
      { text: 'そう思う', value: 5 },
      { text: 'ややそう思う', value: 4 },
      { text: 'どちらでもない', value: 3 },
      { text: 'あまりそう思わない', value: 2 },
      { text: 'そう思わない', value: 1 },
      { text: '全くそう思わない', value: 0 }
    ]
  }
];