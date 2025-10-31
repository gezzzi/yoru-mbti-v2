import type { Metadata } from 'next';
import CompatibilityResultsContainer, {
  SampleAxisInsight,
  SampleCompatibilitySummary,
} from '@/components/CompatibilityResultsContainer';
import { personalityTypes } from '@/data/personalityTypes';
import type { TestResult } from '@/types/personality';
import { nightCompatibilityDescriptions } from '@/data/nightCompatibilityDescriptions';

const ensurePersonalityType = (code: string) => {
  const base = personalityTypes.find((type) => type.code === code);
  return base ?? personalityTypes[0];
};

const sampleMyResult: TestResult = {
  E: 78,
  L: 68,
  A: 74,
  L2: 66,
  O: 62,
  type: {
    ...ensurePersonalityType('ELAL'),
    code: 'ELAL-O',
  },
};

const samplePartnerResult: TestResult = {
  E: 44,
  L: 34,
  A: 48,
  L2: 58,
  O: 42,
  type: {
    ...ensurePersonalityType('IFSL'),
    code: 'IFSL-S',
  },
};

const calculateCompatibilitySummary = (
  user: TestResult,
  partner: TestResult,
): SampleCompatibilitySummary => {
  const eScore = (100 - Math.abs(user.E - partner.E)) * 0.15;
  const lScore = (100 - Math.abs(user.L + partner.L - 100)) * 0.3;
  const aScore = (100 - Math.abs(user.A - partner.A)) * 0.25;
  const l2Score = (100 - Math.abs(user.L2 - partner.L2)) * 0.2;
  const oScore = (100 - Math.abs(user.O - partner.O)) * 0.1;

  const score = Math.max(0, Math.min(100, eScore + lScore + aScore + l2Score + oScore));

  if (score >= 80) {
    return {
      score: Math.round(score),
      description:
        '価値観と温度感がぴったり噛み合う理想的なバランスです。安心感と高揚感が同時に得られる関係になりやすい組み合わせです。',
      tips: [
        '似ている強みを活かしつつ、役割を入れ替えてみると新鮮さが続きます。',
        '週に一度は「ありがとう」を言葉で伝え、相手の努力を可視化しましょう。',
        '予定を共有するカレンダーを作り、期待値のすり合わせを習慣化しましょう。',
      ],
    };
  }

  if (score >= 60) {
    return {
      score: Math.round(score),
      description:
        '基本的には相性が良い組み合わせです。違いが刺激になり、成長につながる余地もあります。',
      tips: [
        '歩幅がずれる場面では「どちらがリードするか」を先にはっきり決めましょう。',
        '週末のどちらかを「ふたりの調整ミーティング」に充て、感じたことを短く共有してください。',
        '似ている価値観から会話を始め、最後に一つだけ新しい挑戦を提案してみましょう。',
      ],
    };
  }

  if (score >= 40) {
    return {
      score: Math.round(score),
      description:
        '価値観の差が目立つ組み合わせですが、役割分担や共通ルールで補えます。',
      tips: [
        '日常のルーティンを一つだけ共通化し、同じ時間に同じ行動を取る習慣を作りましょう。',
        '気持ちを言語化するカードやメモを使い、沈黙を埋める仕組みを持つと安心です。',
        '相手の得意領域を尊重する言葉を意識的に増やし、ギャップを前向きな差として扱ってください。',
      ],
    };
  }

  return {
    score: Math.round(score),
    description:
      '価値観の違いが大きいペアです。衝突を避けるためのルール作りと第三者のサポートがあると安定します。',
    tips: [
      '困った時に参照する「優先順位リスト」を2人で作成しておきましょう。',
      '会話がヒートアップしたら、水分補給や深呼吸など体を落ち着かせる合図を決めてください。',
      '共通の趣味や学びの場を見つけ、安心して協力できるテーマを育てるのがおすすめです。',
    ],
  };
};

const describeSimilarityAxis = (
  label: string,
  positiveLabel: string,
  negativeLabel: string,
  userScore: number,
  partnerScore: number,
): SampleAxisInsight => {
  const userOrientation = userScore >= 50 ? positiveLabel : negativeLabel;
  const partnerOrientation = partnerScore >= 50 ? positiveLabel : negativeLabel;
  const difference = Math.abs(userScore - partnerScore);

  let verdictBase = '価値観が近い';
  let detail = '自然体で歩幅を合わせやすい組み合わせです。';

  if (difference > 30) {
    verdictBase = '温度差が大きい';
    detail = '得意なテンポが異なるため、合図やルールを決めて歩幅を合わせると安心です。';
  } else if (difference > 15) {
    verdictBase = 'リズムに差がある';
    detail = '少しの声掛けやアイコンタクトで歩調を合わせると、違いが前向きな刺激になります。';
  }

  return {
    label,
    verdict: `${verdictBase}（${userOrientation} × ${partnerOrientation}）`,
    detail,
  };
};

const describeComplementAxis = (
  label: string,
  leadLabel: string,
  followLabel: string,
  userScore: number,
  partnerScore: number,
): SampleAxisInsight => {
  const userRole = userScore >= 50 ? leadLabel : followLabel;
  const partnerRole = partnerScore >= 50 ? leadLabel : followLabel;
  const balanceGap = Math.abs(100 - (userScore + partnerScore));

  let verdictBase = '役割バランスが理想的';
  let detail = '気を遣わずに主導権を渡し合えるため、スムーズに盛り上がれます。';

  if (balanceGap > 30) {
    verdictBase = '主導権のすり合わせが必要';
    detail = 'どちらが舵を握るかを明確に伝え合い、安心できる合図を用意しましょう。';
  } else if (balanceGap > 15) {
    verdictBase = '役割の偏りがやや大きい';
    detail = 'ムードを作る側とサポート側を状況によって入れ替えると、バランスが整います。';
  }

  return {
    label,
    verdict: `${verdictBase}（${userRole} × ${partnerRole}）`,
    detail,
  };
};

const sampleSummary = calculateCompatibilitySummary(sampleMyResult, samplePartnerResult);

const sampleAxisInsights: SampleAxisInsight[] = [
  describeSimilarityAxis('外向性 / 内向性', '外向寄り', '内向寄り', sampleMyResult.E, samplePartnerResult.E),
  describeComplementAxis('リード / フォロー', 'リード型', 'フォロー型', sampleMyResult.L, samplePartnerResult.L),
  describeSimilarityAxis('冒険志向 / 安定志向', '冒険重視', '安定重視', sampleMyResult.A, samplePartnerResult.A),
  describeSimilarityAxis('愛情表現スタイル', '愛情重視', '自由重視', sampleMyResult.L2, samplePartnerResult.L2),
  describeSimilarityAxis('オープン度 / 秘密度', 'オープン', '秘密主義', sampleMyResult.O, samplePartnerResult.O),
];

const sampleNightCompatibilityKey = `${sampleMyResult.type.code.split('-')[0].toLowerCase()}×${samplePartnerResult.type.code
  .split('-')[0]
  .toLowerCase()}` as keyof typeof nightCompatibilityDescriptions;
const sampleNightCompatibility = nightCompatibilityDescriptions[sampleNightCompatibilityKey];
const sampleNightParagraphs = (sampleNightCompatibility ?? '')
  .split(/\n+/)
  .map((paragraph) => paragraph.trim())
  .filter(Boolean);

export const metadata: Metadata = {
  title: '相性診断結果サンプル | 夜の性格診断',
  description:
    '夜の性格診断の相性レポートでは、互いのタイプの組み合わせに応じたスコアと改善アドバイスを提供します。サンプルレポートで内容をご確認ください。',
  alternates: {
    canonical: 'https://nightpersonality.com/compatibility/results',
  },
};

export default function CompatibilityResultsPage() {
  return (
    <CompatibilityResultsContainer
      sampleSummary={sampleSummary}
      sampleAxisInsights={sampleAxisInsights}
      sampleNightParagraphs={sampleNightParagraphs}
      sampleMyTypeName={sampleMyResult.type.name}
      samplePartnerTypeName={samplePartnerResult.type.name}
    />
  );
}
