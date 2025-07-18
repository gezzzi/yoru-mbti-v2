import { Question } from '../types/personality';

export const questions: Question[] = [
  // 16タイプの質問 (1-20)
  // 外向性(E)/内向性(I) 質問1-4
  {
    id: 1,
    axis: 'EI',
    text: '下ネタでも全然平気。むしろ盛り上がる。',
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
    text: '本音は静かに伝えたいタイプ。ベッドでも無言寄り。',
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
    id: 4,
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
  // リード(L)/フォロー(F) 質問5-8 (S/M傾向も判定)
  {
    id: 5,
    axis: 'LF',
    text: 'リードしたくなる瞬間、けっこうある。',
    isReverse: false,
    smTendency: 'S',
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
    axis: 'LF',
    text: '命令されると、なんかゾクっとする。',
    isReverse: true,
    smTendency: 'M',
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
    axis: 'LF',
    text: '相手に乱される展開、ちょっと燃える。',
    isReverse: true,
    smTendency: 'M',
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
    axis: 'LF',
    text: '自分の"したいようにする"のがいちばん気持ちいい。',
    isReverse: false,
    smTendency: 'S',
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
  // 冒険(A)/安定(S) 質問9-12
  {
    id: 9,
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
    id: 10,
    axis: 'AS',
    text: '安心できる関係の中で深めたい派。',
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
    id: 11,
    axis: 'AS',
    text: '妄想、けっこう激しめだと思う。',
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
  // ラブ(L)/フリー(F) 質問13-16
  {
    id: 13,
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
    id: 14,
    axis: 'LF2',
    text: 'セックス＝恋愛じゃなくてもいい派。',
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
    id: 15,
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
    id: 16,
    axis: 'LF2',
    text: 'ちゃんと好きな人としたい、が本音。',
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
  // 開放(O)/秘密(S) 質問17-20
  {
    id: 17,
    axis: 'OS',
    text: '鏡越しとかカメラ越し、実はちょっと興奮する。',
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
    axis: 'OS',
    text: '脱がされる瞬間、なんだかんだ恥ずかしい。',
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
    id: 19,
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
    id: 20,
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
  // 追加の質問 (21-37)
  {
    id: 21,
    axis: 'LIBIDO',
    text: '誰にも言ってないけど、ちょいちょい妄想はしてる。',
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
  {
    id: 22,
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
  {
    id: 23,
    axis: 'POSITION',
    text: 'ぎゅっと抱き合って寝落ちするのは至福だ。',
    isReverse: false,
    additionalType: 'position_cozy',
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
    axis: 'POSITION',
    text: '壁や段差を見ると "これ使えそう" とワクワクする。',
    isReverse: false,
    additionalType: 'position_adventurous',
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
    axis: 'POSITION',
    text: '開脚ストレッチは気持ちいい方だ。',
    isReverse: false,
    additionalType: 'position_flexible',
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
    axis: 'POSITION',
    text: '後ろ姿を眺めるとテンションが上がる。',
    isReverse: false,
    additionalType: 'position_back',
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
    axis: 'POSITION',
    text: '布団から一歩も出ずに完結できるなら最高だ。',
    isReverse: false,
    additionalType: 'position_chill',
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
    axis: 'GAP',
    text: '普段はドライだけど、夜になると甘えたくなる。',
    isReverse: false,
    additionalType: 'gap',
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
    axis: 'GAP',
    text: '自分がエロいスイッチ入ると、ちょっと別人格になる。',
    isReverse: false,
    additionalType: 'gap',
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
    axis: 'TENSION',
    text: '「声、もっと聞かせて」って言われたらテンション上がる。',
    isReverse: false,
    additionalType: 'tension',
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
    axis: 'TENSION',
    text: '相手の"リアクション"が薄いとテンション下がる。',
    isReverse: false,
    additionalType: 'tension',
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
    axis: 'KISS',
    text: 'キスが雑だと、一気に冷める。',
    isReverse: false,
    additionalType: 'kiss_importance',
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
    axis: 'PREFERENCE',
    text: '相手の"腰使い"には、つい目がいく。',
    isReverse: false,
    additionalType: 'preference',
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
    axis: 'PREFERENCE',
    text: 'フェラのとき、相手の目線がエロいと感じる。',
    isReverse: false,
    additionalType: 'preference',
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
    axis: 'PREFERENCE',
    text: '「ごっこ系プレイ」とか、ちょっと気になる。',
    isReverse: false,
    additionalType: 'preference',
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
    axis: 'PREFERENCE',
    text: 'イチャイチャしながら、じっくり攻めたい。',
    isReverse: false,
    additionalType: 'preference',
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