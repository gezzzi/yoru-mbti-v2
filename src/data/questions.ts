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

  // Dominance/Submission Questions (11-15)
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

  // Thrill-seeking/Security-seeking Questions (21-25)
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

  // Shame-resistant/Shame-sensitive Questions (31-35)
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

  // Attachment/Non-attachment Questions (41-45)
  {
    id: 41,
    axis: 'AN',
    text: '深い恋愛関係を築くことを重要視する',
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
    text: '肉体的な関係は感情と切り離して考えられる',
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
    text: 'パートナーとの感情的な繋がりを大切にする',
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
    text: '自由で束縛のない関係を好む',
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
    text: '一途で深い愛情を求める',
    options: [
      { text: '強く同意する', value: 2 },
      { text: '同意する', value: 1 },
      { text: 'どちらでもない', value: 0 },
      { text: '同意しない', value: -1 },
      { text: '強く同意しない', value: -2 }
    ]
  }
]; 