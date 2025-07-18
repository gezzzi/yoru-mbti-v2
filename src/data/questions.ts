import { Question } from '../types/personality';

export const questions: Question[] = [
  // 質問を5軸混合で配置（各軸から均等に質問を取る）
  {
    id: 1,
    axis: 'EI',
    text: '性的な話題でも、場の空気を明るくする自信がある',
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
    axis: 'LF',
    text: '自分から相手にどうされたいかを指示するのが快感だ',
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
    id: 3,
    axis: 'AS',
    text: '未知のプレイや道具には好奇心が強い',
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
    axis: 'OS',
    text: '性的関係にもある程度の「愛」が必要だと感じる',
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
    id: 5,
    axis: 'LF2',
    text: '他人に見られるかもしれない状況に興奮する',
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
    axis: 'EI',
    text: 'パートナーとの時間は多くの言葉より、静かな空間のほうが満たされる',
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
    axis: 'LF',
    text: '抵抗できない状況に興奮することがある',
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
    axis: 'AS',
    text: '安定したパートナーシップの中で性を深めたい',
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
    id: 9,
    axis: 'OS',
    text: 'セックスと恋愛は完全に切り離せると思っている',
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
    axis: 'LF2',
    text: '服を脱がされる瞬間がいちばん恥ずかしい',
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
    axis: 'EI',
    text: 'オープンな性の価値観をもっており、誰とでも話せる',
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
    axis: 'LF',
    text: 'セックスのときは、自分がペースを握りたい',
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
    axis: 'AS',
    text: 'ちょっと危ない刺激のあるシチュエーションに惹かれる',
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
    axis: 'OS',
    text: '相手に好かれている実感がないと、体は開けない',
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
    axis: 'LF2',
    text: '「どう思われてもいい」という感覚で性的に振る舞える',
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
    axis: 'EI',
    text: 'セックス中にお互いの気持ちを声に出して伝え合いたい',
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
    axis: 'LF',
    text: '「命令される」という行為に興奮を感じたことがある',
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
    id: 18,
    axis: 'AS',
    text: '自分のペースでじっくり愛し合う時間が大事',
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
    text: '「一晩だけ」の関係に抵抗はない',
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
    axis: 'LF2',
    text: 'セックス中、見られることに不安を感じる',
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
    id: 21,
    axis: 'EI',
    text: '一人の時間で、自分の性欲を整理したいと思うことが多い',
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
    id: 22,
    axis: 'LF',
    text: '恋愛関係でも、主導権を握るほうが落ち着く',
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
    axis: 'AS',
    text: '「今までやったことがないこと」に惹かれる',
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
    axis: 'OS',
    text: 'セックス後、抱き合って寝る時間が好き',
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
    axis: 'LF2',
    text: 'あえて羞恥心を煽るような言葉を言われるのが好き',
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
    axis: 'EI',
    text: 'ベッドの中でも、相手をリードするトークが得意',
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
    axis: 'LF',
    text: '相手の言いなりになって乱される展開が好き',
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
    id: 28,
    axis: 'AS',
    text: 'ルーティンのようなセックスでも安心する',
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
    id: 29,
    axis: 'OS',
    text: 'その場限りでも楽しければ良いと思っている',
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
    id: 30,
    axis: 'LF2',
    text: '恥ずかしいセリフやポーズを強要されると冷める',
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
    id: 31,
    axis: 'EI',
    text: 'エロに関して、秘密のままにしておきたいことが多い',
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
    id: 32,
    axis: 'LF',
    text: '自分の"したいようにする"のがいちばん気持ちいい',
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
    axis: 'AS',
    text: '人には話せない妄想を抱いていることがある',
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
    axis: 'OS',
    text: '自分の心と相手の心が通じ合う感覚に欲情する',
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
    axis: 'LF2',
    text: 'カメラや鏡越しのプレイにワクワクする',
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
    axis: 'EI',
    text: '大勢での性に関する雑談や経験談の共有に抵抗がない',
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
    axis: 'LF',
    text: '自分ではどうしようもない快楽に抗えなくなるのが好き',
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
    id: 38,
    axis: 'AS',
    text: '性的なルールや決まりがあると落ち着く',
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
    id: 39,
    axis: 'OS',
    text: 'セフレという関係性に対して違和感がない',
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
    id: 40,
    axis: 'LF2',
    text: '自分の裸に強い自信があるわけではない',
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
    id: 41,
    axis: 'EI',
    text: '親密になってからでないと、自分の欲望は語りたくない',
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
    id: 42,
    axis: 'LF',
    text: 'リードすることで、相手の反応を見るのが興奮する',
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
    id: 43,
    axis: 'AS',
    text: 'プレイ内容は相手とその場で変化させるのが楽しい',
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
    id: 44,
    axis: 'OS',
    text: '相手のことを深く知らずに抱かれるのは落ち着かない',
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
    id: 45,
    axis: 'LF2',
    text: '自分から見せつけるような行為に快感を覚える',
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
    id: 46,
    axis: 'EI',
    text: 'セックスでも、会話や雰囲気づくりを大切にしている',
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
    id: 47,
    axis: 'LF',
    text: '支配されたい願望が強く、抑えきれない時がある...',
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
    id: 48,
    axis: 'AS',
    text: '予測できない展開が逆に怖くて苦手',
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
    id: 49,
    axis: 'OS',
    text: '自分の欲望を満たすためだけにセックスすることがある',
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
    id: 50,
    axis: 'LF2',
    text: '恥ずかしがる相手を見るのは好きだが、自分では無理',
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
  }
]; 