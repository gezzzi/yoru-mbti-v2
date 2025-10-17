import { Question } from '../types/personality';

export const questions: Question[] = [
  // Extroversion/Introversion Questions (1-10)
  {
    id: 1,
    axis: 'EI',
    text: 'パーティーや集まりでは、積極的に新しい人と話すことを好む',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 2,
    axis: 'EI',
    text: '一人の時間を過ごすことで、エネルギーが回復すると感じる',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 3,
    axis: 'EI',
    text: '大勢の前で話すことは楽しく、自然にできる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 4,
    axis: 'EI',
    text: '静かな環境で深く考えることを好む',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 5,
    axis: 'EI',
    text: '新しい環境や人々に囲まれると興奮する',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 6,
    axis: 'EI',
    text: '親しい少数の友人との時間を大切にする',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 7,
    axis: 'EI',
    text: '思ったことをすぐに口に出して表現する',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 8,
    axis: 'EI',
    text: '行動する前によく考えてから決める',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 9,
    axis: 'EI',
    text: '活発でエネルギッシュな活動を好む',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 10,
    axis: 'EI',
    text: '内省的で物事を深く考えることが多い',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },

  // Dominance/Submission Questions (11-20)
  {
    id: 11,
    axis: 'DS',
    text: '関係において主導権を握ることが自然で心地良い',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 12,
    axis: 'DS',
    text: 'パートナーにリードしてもらう方が安心する',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 13,
    axis: 'DS',
    text: '決断を下し、状況をコントロールすることを好む',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 14,
    axis: 'DS',
    text: '他の人の指示に従うことに抵抗を感じない',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 15,
    axis: 'DS',
    text: '自分の思い通りに物事を進めたいと強く思う',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 16,
    axis: 'DS',
    text: '相手に合わせることで関係が円滑になると感じる',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 17,
    axis: 'DS',
    text: '権威ある立場に立つことに魅力を感じる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 18,
    axis: 'DS',
    text: '支えられ、守られることに安心感を覚える',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 19,
    axis: 'DS',
    text: '競争において勝つことに強いこだわりがある',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 20,
    axis: 'DS',
    text: '協調性を重視し、調和を大切にする',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },

  // Thrill-seeking/Security-seeking Questions (21-30)
  {
    id: 21,
    axis: 'TS',
    text: '新しい刺激的な体験を常に求めている',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 22,
    axis: 'TS',
    text: '安定した予測可能な環境を好む',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 23,
    axis: 'TS',
    text: '危険やリスクを伴う活動に魅力を感じる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 24,
    axis: 'TS',
    text: '慣れ親しんだルーティンに安心感を覚える',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 25,
    axis: 'TS',
    text: '退屈することを嫌い、常に何か新しいことを求める',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 26,
    axis: 'TS',
    text: '変化よりも継続性を重視する',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 27,
    axis: 'TS',
    text: '未知の体験に対してワクワクする',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 28,
    axis: 'TS',
    text: '計画を立てて準備することを重要視する',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 29,
    axis: 'TS',
    text: '衝動的な行動を取ることがある',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 30,
    axis: 'TS',
    text: '慎重に考えてから行動することが多い',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },

  // Shame-resistant/Shame-sensitive Questions (31-40)
  {
    id: 31,
    axis: 'RH',
    text: '人前で恥ずかしい思いをしても気にしない',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 32,
    axis: 'RH',
    text: '他人の視線や評価を気にしてしまう',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 33,
    axis: 'RH',
    text: '自分の欲求を素直に表現できる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 34,
    axis: 'RH',
    text: '批判されることを恐れて行動を控えることがある',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 35,
    axis: 'RH',
    text: '周りがどう思おうと自分らしくいられる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 36,
    axis: 'RH',
    text: '完璧でない自分を見せることに抵抗がある',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 37,
    axis: 'RH',
    text: '失敗を恐れずにチャレンジできる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 38,
    axis: 'RH',
    text: '人から拒絶されることへの不安が強い',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 39,
    axis: 'RH',
    text: '自分の弱みを隠そうとしない',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 40,
    axis: 'RH',
    text: '社会的な規範や期待に縛られがち',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },

  // Attachment/Non-attachment Questions (41-50)
  {
    id: 41,
    axis: 'AN',
    text: '深い絆や愛着を重視する',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 42,
    axis: 'AN',
    text: '自由で束縛されない関係を好む',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 43,
    axis: 'AN',
    text: 'パートナーとの感情的なつながりを大切にする',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 44,
    axis: 'AN',
    text: '感情に左右されず合理的に判断する',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 45,
    axis: 'AN',
    text: '愛する人のために犠牲を払うことができる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 46,
    axis: 'AN',
    text: '個人の自立性を何よりも重視する',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 47,
    axis: 'AN',
    text: '相手に依存することに抵抗を感じない',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 48,
    axis: 'AN',
    text: '距離を保ちながらも良い関係を築きたい',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  },
  {
    id: 49,
    axis: 'AN',
    text: '愛情を表現し受け取ることに喜びを感じる',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  },
  {
    id: 50,
    axis: 'AN',
    text: '感情よりも論理を優先して行動する',
    options: [
      { text: '強く同意する', value: -2 },
      { text: '同意する', value: -1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: 1 },
      { text: '強く同意しない', value: 2 }
    ]
  }
];