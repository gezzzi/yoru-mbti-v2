import { Question } from '../types/personality';

export const questions: Question[] = [
  // 5軸の質問 (1-10)
  // 外向性(E)/内向性(I) 質問1-2
  {
    id: 1,
    axis: 'EI',
    text: '性の価値観って、もっとオープンでいいと思う。',
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
    text: 'セクシュアルな話題、仲良くならないと話せないかも。',
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
  // リード(L)/フォロー(F) 質問3-4
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
  // 冒険(A)/安定(S) 質問5-6
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
  // ラブ(L)/フリー(F) 質問7-8
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
  // 開放(O)/秘密(S) 質問9-10
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
  // 性欲レベル 質問11
  {
    id: 11,
    axis: 'LIBIDO',
    text: '性欲が強すぎて困ることがある。',
    isReverse: false,
    additionalType: 'libido',
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
  // タグ質問 (12-40)
  {
    id: 12,
    axis: 'TAG',
    text: '声や言葉の反応がないと物足りない',
    isReverse: false,
    additionalType: 'tag',
    tagName: '💬 言語プレイ派',
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
    axis: 'TAG',
    text: '役になりきる（医者と患者など）プレイに惹かれる',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🎭 ロールプレイ好き',
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
    axis: 'TAG',
    text: '余韻を共有する時間が必要',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🛁 アフターケア必須',
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
    axis: 'TAG',
    text: '未知のプレイにも好奇心がある',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🧪 実験精神旺盛',
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
    axis: 'TAG',
    text: '主導権を渡してリードされたい',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🧸 甘やかされたい',
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
    axis: 'TAG',
    text: '相手の反応を引き出すのが楽しい',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🔥 責めたい派',
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
    axis: 'TAG',
    text: '軽い拘束や痛みがスパイスになる',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🧷 軽SM耐性あり',
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
    axis: 'TAG',
    text: '音楽・照明・香りなど雰囲気を整えたい',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🕯 ロマン重視',
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
    axis: 'TAG',
    text: '長い前戯より早く本番に入りたい',
    isReverse: false,
    additionalType: 'tag',
    tagName: '⚡️ スピード勝負派',
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
    axis: 'TAG',
    text: 'ノリや勢いで始めることが多い',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🏃‍♂️ 衝動トリガー型',
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
    axis: 'TAG',
    text: '最適な体調や環境を整えてから楽しみたい',
    isReverse: false,
    additionalType: 'tag',
    tagName: '📅 準備派',
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
    axis: 'TAG',
    text: '性的嗜好はごく限られた人にしか話さない',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🕶 秘密主義',
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
    axis: 'TAG',
    text: '性の話題をオープンに語れる',
    isReverse: false,
    additionalType: 'tag',
    tagName: '📣 オープン宣言派',
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
    axis: 'TAG',
    text: '自分のNGははっきり伝えられる',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🚪 NG明確',
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
    axis: 'TAG',
    text: '嫌でも言いにくく我慢しがち',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🙈 言い出しにくい派',
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
    axis: 'TAG',
    text: '音楽や香り、触れ方の順序にこだわる',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🎧 感覚演出派',
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
    axis: 'TAG',
    text: '衛生面の準備（シャワー等）が欠かせない',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🧼 ケア＆衛生重視',
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
    axis: 'TAG',
    text: '体を見せるのが好き',
    isReverse: false,
    additionalType: 'tag',
    tagName: '👀 見られたい派',
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
    axis: 'TAG',
    text: '他人の行為を想像/視聴すると燃える',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🕵️‍♀️ 覗き見興奮派',
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
    axis: 'TAG',
    text: '外やリスクのある場所は避けたい',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🛡 安全第一派',
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
    axis: 'TAG',
    text: 'テキストや音声でのやりとりがムードを作る',
    isReverse: false,
    additionalType: 'tag',
    tagName: '📱 デジタル前戯派',
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
    axis: 'TAG',
    text: '夜更かしするとムラムラしがち',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🌙 深夜エロス',
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
    axis: 'TAG',
    text: '夜より朝・昼の方が性欲が高い',
    isReverse: false,
    additionalType: 'tag',
    tagName: '☀️ 朝型エロス',
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
    axis: 'TAG',
    text: '1回では満足できないことが多い',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🔄 リピート求め派',
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
    axis: 'TAG',
    text: '露骨な表現や下ネタが興奮につながる',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🗣 下ネタOK',
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
    axis: 'TAG',
    text: '性に関する本や記事を読む',
    isReverse: false,
    additionalType: 'tag',
    tagName: '📚 学習研究派',
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
    axis: 'TAG',
    text: '相手の気持ちを汲んで導くのが得意',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🧭 ガイド派',
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
    axis: 'TAG',
    text: '複数刺激を同時に与える・受けるのが好き',
    isReverse: false,
    additionalType: 'tag',
    tagName: '🤹‍♀️ マルチタスク派',
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
    axis: 'TAG',
    text: 'ゆっくりしたテンポやソフトな刺激が好み',
    isReverse: false,
    additionalType: 'tag',
    tagName: '💤 まったり派',
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