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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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
    axis: 'DS',
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
    axis: 'TS',
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
    axis: 'AN',
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
    axis: 'RH',
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