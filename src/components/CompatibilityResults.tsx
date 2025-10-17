'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { Heart, Users, ArrowRight, Share2, RefreshCw, User, Check } from 'lucide-react';
import { generateCompatibilityShareText } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import Image from 'next/image';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';
import Fireworks from './Fireworks';
import HeartRain from './HeartRain';
import SnowfallAnimation from './SnowfallAnimation';
import PetalAnimation from './PetalAnimation';
import { PositionDescriptionModal } from './PositionDescriptionModal';
import { Position48, positions48 } from '../data/positions48';
import { questions } from '../data/questions';
import FeedbackModal from './FeedbackModal';
import SNSShareModal from './SNSShareModal';
import { calculateImprovedTagCompatibility, TagScore } from '../utils/tagCompatibility';
import { getTagRecommendations, selectAndFormatRecommendations, stabilizeRecommendedPlayText } from './CompatibilityResultsHelper';

interface CompatibilityResult {
  compatibility: number;
  description: string;
  tips: string[];
}

interface CompatibilityResultsProps {
  myResult: TestResult;
  partnerResult: TestResult;
  onBack: () => void;
  onNewTest: () => void;
}

// 横型プログレスバーコンポーネント
const HorizontalProgressBar: React.FC<{ 
  percentage: number, 
  colorFrom: string, 
  colorTo: string,
  isVisible?: boolean,
  delay?: number 
}> = ({ percentage, colorFrom, colorTo, isVisible = false, delay = 100 }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setAnimationProgress(percentage);
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [percentage, isVisible, hasAnimated, delay]);

  return (
    <>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo} rounded-full transition-all duration-1000`}
          style={{ width: `${animationProgress}%` }}
        />
      </div>
      <p className="text-xs text-[#e0e7ff]/60 mt-1 text-right">{Math.round(percentage)}%</p>
    </>
  );
};

// 円形プログレスバーコンポーネント
const CircularProgressBar: React.FC<{ percentage: number, size?: number }> = ({ percentage, size = 200 }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animationProgress / 100) * circumference;

  useEffect(() => {
    setAnimationProgress(percentage);
  }, [percentage]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 1s linear',
        }}
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// レーダーチャートコンポーネント
const RadarChart: React.FC<{ axisScores: { E: number, L: number, A: number, L2: number, O: number }, totalScore: number }> = ({ axisScores, totalScore }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const size = 280;
  const center = size / 2;
  const radius = 80;
  
  useEffect(() => {
    // 順次描画アニメーション
    const duration = 2000; // 2秒
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 5角形の各頂点の角度（上から時計回り）
  const angles = [
    -Math.PI / 2,          // E (上)
    -Math.PI / 2 + (2 * Math.PI / 5),     // L (右上)
    -Math.PI / 2 + (4 * Math.PI / 5),     // A (右下)
    -Math.PI / 2 + (6 * Math.PI / 5),     // L2 (左下)
    -Math.PI / 2 + (8 * Math.PI / 5),     // O (左上)
  ];
  
  const axisLabels = ['E/I', 'L/F', 'A/S', 'L/F', 'O/S'];
  const axisValues = [axisScores.E, axisScores.L, axisScores.A, axisScores.L2, axisScores.O];
  
  // 座標計算関数
  const getPoint = (angle: number, distance: number) => ({
    x: center + Math.cos(angle) * distance,
    y: center + Math.sin(angle) * distance
  });
  
  // 背景の5角形（グリッド）を生成
  const backgroundPentagons = [20, 40, 60, 80, 100].map(percentage => {
    const points = angles.map(angle => {
      const point = getPoint(angle, (radius * percentage) / 100);
      return `${point.x},${point.y}`;
    }).join(' ');
    return { percentage, points };
  });
  
  // データの5角形を生成（アニメーション対応）
  const dataPoints = angles.map((angle, index) => {
    const value = axisValues[index];
    // 各頂点を順番に描画
    const pointProgress = Math.max(0, Math.min(1, (animationProgress * 5) - index));
    const animatedValue = value * pointProgress;
    const distance = (radius * animatedValue) / 100;
    return getPoint(angle, distance);
  });
  
  const dataPolygonPoints = dataPoints.map(point => `${point.x},${point.y}`).join(' ');
  
  return (
    <div className="flex flex-col items-center">
      <svg 
        width={size} 
        height={size} 
        className="mb-4"
      >
        {/* 背景グリッド */}
        {backgroundPentagons.map(({ percentage, points }) => (
          <polygon
            key={percentage}
            points={points}
            fill="none"
            stroke="rgba(224, 231, 255, 0.2)"
            strokeWidth="1"
          />
        ))}
        
        {/* 軸線 */}
        {angles.map((angle, index) => {
          const endPoint = getPoint(angle, radius);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(224, 231, 255, 0.2)"
              strokeWidth="1"
            />
          );
        })}
        
        {/* データポリゴン */}
        <polygon
          points={dataPolygonPoints}
          fill="rgba(168, 85, 247, 0.3)"
          stroke="#a855f7"
          strokeWidth="2"
          style={{
            opacity: animationProgress,
          }}
        />
        
        {/* 軸ラベル */}
        {angles.map((angle, index) => {
          const labelPoint = getPoint(angle, radius + 35);
          // 位置に応じてテキストアンカーを調整
          let textAnchor = "middle";
          let dominantBaseline = "middle";
          
          if (index === 1) { // 主導性（右上）
            textAnchor = "start";
            dominantBaseline = "middle";
          } else if (index === 4) { // 羞恥耐性（左上）
            textAnchor = "end";
            dominantBaseline = "middle";
          } else if (index === 0) { // 外向性（上）
            dominantBaseline = "auto";
          }
          
          return (
            <text
              key={index}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor={textAnchor}
              dominantBaseline={dominantBaseline}
              className="text-sm font-medium fill-[#e0e7ff]"
            >
              {axisLabels[index]}
            </text>
          );
        })}
        
      </svg>
      
      {/* 凡例 */}
      <div className="text-center">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-[#e0e7ff]">各軸の相性スコア</h4>
        </div>
        <div className="text-xs text-[#e0e7ff]/80 space-y-1">
          <div>外向性/内向性: {Math.round(axisScores.E)}% | リード/フォロー: {Math.round(axisScores.L)}%</div>
          <div>冒険/安定: {Math.round(axisScores.A)}% | ラブ/フリー: {Math.round(axisScores.L2)}% | 開放/秘密: {Math.round(axisScores.O)}%</div>
        </div>
      </div>
    </div>
  );
};

// カウントアップアニメーション用のカスタムフック
const useCountUp = (end: number, duration: number = 1500, start: boolean = true) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!start) return;
    
    let startTime: number | null = null;
    let animationFrameId: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // イーズアウト関数で自然な動きに
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, start]);
  
  return count;
};

const TypeImage: React.FC<{ typeCode: string; emoji: string; name: string }> = ({ typeCode, emoji, name }) => {
  const [imageError, setImageError] = useState(false);
  const getBaseTypeCode = (code: string): string => {
    return code.split('-')[0].toUpperCase();
  };
  const handleImageError = () => {
    setImageError(true);
  };
  const baseTypeCode = getBaseTypeCode(typeCode);
  if (imageError) {
    return <span className="text-6xl md:text-8xl">{emoji}</span>;
  }
  return (
    <div className="w-32 h-32 md:w-48 md:h-48 relative mx-auto mb-4">
      <Image
        src={`/images/personality-types/${baseTypeCode}.svg`}
        alt={name}
        width={192}
        height={192}
        className="w-full h-full object-contain"
        onError={handleImageError}
      />
    </div>
  );
};

const CompatibilityResults: React.FC<CompatibilityResultsProps> = ({ 
  myResult, 
  partnerResult, 
  onBack, 
  onNewTest 
}) => {
  // あなたのタイプのrubyプロパティを取得
  const myBaseTypeCode = myResult.type.code.split('-')[0];
  const myBasePersonalityType = personalityTypes.find(pt => pt.code === myBaseTypeCode);
  const myTypeWithRuby = {
    ...myResult.type,
    ruby: myBasePersonalityType?.ruby
  };

  // 相手のタイプのrubyプロパティを取得
  const partnerBaseTypeCode = partnerResult.type.code.split('-')[0];
  const partnerBasePersonalityType = personalityTypes.find(pt => pt.code === partnerBaseTypeCode);
  const partnerTypeWithRuby = {
    ...partnerResult.type,
    ruby: partnerBasePersonalityType?.ruby
  };

  const downloadRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showHeartRain, setShowHeartRain] = useState(false);
  const [showSnowfall, setShowSnowfall] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position48 | null>(null);
  const [partnerSecretAnswer, setPartnerSecretAnswer] = useState<{ questionId: number; answer: number } | null>(null);
  const [mySecretAnswer, setMySecretAnswer] = useState<{ questionId: number; answer: number } | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showSecretConfirm, setShowSecretConfirm] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [myUsername, setMyUsername] = useState<string>('');
  const [partnerUsername, setPartnerUsername] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection observer for card visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  const calculateCompatibility = (user: TestResult, partner: TestResult): CompatibilityResult & { 
    axisScores: { E: number, L: number, A: number, L2: number, O: number },
    tagCategoryScores: { [key: string]: number },
    tagDetailScores: { tag: string; score: number; reason: string }[]
  } => {
    // 2値化ロジック: 共通数 / 和集合
    
    // 重みづけ設定（後で調整可能）
    const axisWeights = {
      E: 1.0,  // E/I軸の重み
      L: 1.0,  // L/F軸の重み（補完軸）
      A: 1.0,  // A/S軸の重み
      L2: 1.0, // L2/F2軸の重み
      O: 1.0   // O/S軸の重み
    };
    
    const tagWeights: { [key: string]: number } = {
      '🔥 欲望の炎': 1.0,
      '💋 キス魔': 1.0,
      '🕯 ロマン重視': 1.0,
      '⚡️ スピード勝負派': 1.0,
      '🛁 アフターケア必須': 1.0,
      // 他のタグも全て1.0（デフォルト）
    };
    const defaultTagWeight = 1.0;
    
    // 5軸の共通判定（50%を閾値として使用）
    let axisCommonWeighted = 0;
    let axisTotalWeighted = 0;
    
    // E/I軸 - 類似軸（両者が同じ側なら共通）
    const userE = user.E >= 50 ? 'E' : 'I';
    const partnerE = partner.E >= 50 ? 'E' : 'I';
    if (userE === partnerE) axisCommonWeighted += axisWeights.E;
    axisTotalWeighted += axisWeights.E;
    
    // L/F軸 - 補完軸（片方L、片方Fなら共通）
    const userL = user.L >= 50 ? 'L' : 'F';
    const partnerL = partner.L >= 50 ? 'L' : 'F';
    if (userL !== partnerL) axisCommonWeighted += axisWeights.L; // 補完軸なので異なる場合に共通
    axisTotalWeighted += axisWeights.L;
    
    // A/S軸 - 類似軸
    const userA = user.A >= 50 ? 'A' : 'S';
    const partnerA = partner.A >= 50 ? 'A' : 'S';
    if (userA === partnerA) axisCommonWeighted += axisWeights.A;
    axisTotalWeighted += axisWeights.A;
    
    // L2/F2軸 - 類似軸
    const userL2 = user.L2 >= 50 ? 'L' : 'F';
    const partnerL2 = partner.L2 >= 50 ? 'L' : 'F';
    if (userL2 === partnerL2) axisCommonWeighted += axisWeights.L2;
    axisTotalWeighted += axisWeights.L2;
    
    // O/S軸 - 類似軸
    const userO = user.O >= 50 ? 'O' : 'S';
    const partnerO = partner.O >= 50 ? 'O' : 'S';
    if (userO === partnerO) axisCommonWeighted += axisWeights.O;
    axisTotalWeighted += axisWeights.O;
    
    // タグの2値化と共通判定
    // タグスコア4点以上（元の0-6スケールで）を「持っている」とする
    const userTags = new Set<string>();
    const partnerTags = new Set<string>();
    
    const userTagScores: TagScore[] = user.additionalResults?.tagScores || [];
    const partnerTagScores: TagScore[] = partner.additionalResults?.tagScores || [];
    
    // スコア4点以上のタグを取得
    userTagScores.forEach(tagScore => {
      if (tagScore.score >= 3) { // 6段階評価で3以上
        userTags.add(tagScore.tag);
      }
    });
    
    partnerTagScores.forEach(tagScore => {
      if (tagScore.score >= 3) { // 6段階評価で3以上
        partnerTags.add(tagScore.tag);
      }
    });
    
    // タグの共通数と和集合を計算（重み付き）
    let tagCommonWeighted = 0;
    let tagUnionWeighted = 0;
    
    // Set.from()を使ってTypeScriptエラーを回避
    const unionTags = new Set<string>();
    userTags.forEach(tag => unionTags.add(tag));
    partnerTags.forEach(tag => unionTags.add(tag));
    
    unionTags.forEach(tag => {
      const weight = tagWeights[tag] || defaultTagWeight;
      tagUnionWeighted += weight;
      
      if (userTags.has(tag) && partnerTags.has(tag)) {
        tagCommonWeighted += weight;
      }
    });
    
    // 相性度の計算（重み付き）
    // 分子: 5軸の重み付き共通数 + タグの重み付き共通数
    // 分母: 5軸の重み付き合計 + タグの重み付き和集合
    const numerator = axisCommonWeighted + tagCommonWeighted;
    const denominator = axisTotalWeighted + tagUnionWeighted;
    
    // 0除算を防ぐ
    const compatibility = denominator > 0 
      ? Math.round((numerator / denominator) * 100)
      : 0;
    
    // 既存の詳細スコア計算（表示用）
    // 各軸のスコア（0-100で表示用に計算）
    const eScore = userE === partnerE ? 100 : 0;
    const lScore = userL !== partnerL ? 100 : 0; // 補完軸
    const aScore = userA === partnerA ? 100 : 0;
    const l2Score = userL2 === partnerL2 ? 100 : 0;
    const oScore = userO === partnerO ? 100 : 0;
    
    // タグカテゴリースコア（ダミー値、後で詳細実装可能）
    let tagCategoryScores: { [key: string]: number } = {};
    let tagDetailScores: { tag: string; score: number; reason: string }[] = [];
    
    // 共通タグを取得
    const commonTags = new Set<string>();
    userTags.forEach(tag => {
      if (partnerTags.has(tag)) {
        commonTags.add(tag);
      }
    });
    
    // 共通タグの詳細
    commonTags.forEach(tag => {
      tagDetailScores.push({
        tag: tag,
        score: 100,
        reason: '両者が持っている'
      });
    });
    
    // 片方のみが持つタグ
    userTags.forEach(tag => {
      if (!partnerTags.has(tag)) {
        tagDetailScores.push({
          tag: tag,
          score: 0,
          reason: 'ユーザー1のみ'
        });
      }
    });
    
    partnerTags.forEach(tag => {
      if (!userTags.has(tag)) {
        tagDetailScores.push({
          tag: tag,
          score: 0,
          reason: 'ユーザー2のみ'
        });
      }
    });

    let description = '';
    let tips: string[] = [];

    if (compatibility >= 80) {
      description = '非常に相性が良好です！価値観や行動パターンが似ており、お互いを理解しやすい関係になれそうです。';
      tips = [
        '共通の興味や価値観を大切にしましょう',
        'お互いの個性を尊重することで、さらに深い関係を築けます',
        '似すぎている部分があれば、お互いに成長し合える要素を見つけましょう'
      ];
    } else if (compatibility >= 60) {
      description = '良い相性です。違いもありますが、それがお互いの成長につながる可能性があります。';
      tips = [
        'お互いの違いを理解し、学び合う姿勢を持ちましょう',
        '共通点を見つけて、そこから関係を深めていきましょう',
        '相手の良い部分を積極的に認めることが大切です'
      ];
    } else if (compatibility >= 40) {
      description = '普通の相性です。お互いを理解するために、コミュニケーションが重要になります。';
      tips = [
        '相手の考え方や価値観を理解する努力をしましょう',
        '定期的な対話の時間を作ることが大切です',
        'お互いの強みを活かし合える関係を目指しましょう'
      ];
    } else {
      description = '相性に課題があります。しかし、違いを理解し尊重することで、補完し合える関係を築けます。';
      tips = [
        'お互いの違いを問題ではなく、特色として捉えましょう',
        '相手の立場に立って考える練習をしてみてください',
        '小さな共通点から関係を築いていくことが大切です',
        'お互いの成長のきっかけになる関係を目指しましょう'
      ];
    }

    return { 
      compatibility, 
      description, 
      tips,
      axisScores: {
        E: Math.max(0, Math.min(100, eScore)),
        L: Math.max(0, Math.min(100, lScore)),
        A: Math.max(0, Math.min(100, aScore)),
        L2: Math.max(0, Math.min(100, l2Score)),
        O: Math.max(0, Math.min(100, oScore))
      },
      tagCategoryScores,
      tagDetailScores
    };
  };

  const compatibility = calculateCompatibility(myResult, partnerResult);
  const shareText = generateCompatibilityShareText(myResult, partnerResult, Math.round(compatibility.compatibility));
  
  // カウントアップアニメーション用
  const animatedScore = useCountUp(Math.round(compatibility.compatibility), 4000, animationStarted);
  
  // localStorageから秘密の回答とユーザー名を取得
  useEffect(() => {
    const partnerSecret = localStorage.getItem('partner_secret_answer');
    if (partnerSecret) {
      try {
        setPartnerSecretAnswer(JSON.parse(partnerSecret));
      } catch (error) {
        console.error('相手の秘密の回答の読み込みに失敗しました:', error);
      }
    }
    
    const mySecret = localStorage.getItem('my_secret_answer');
    if (mySecret) {
      try {
        setMySecretAnswer(JSON.parse(mySecret));
      } catch (error) {
        console.error('自分の秘密の回答の読み込みに失敗しました:', error);
      }
    }
    
    // ユーザー名を取得
    const myName = localStorage.getItem('personality_test_username');
    if (myName) {
      setMyUsername(myName);
    }
    
    const partnerName = localStorage.getItem('partner_username');
    if (partnerName) {
      setPartnerUsername(partnerName);
    }
  }, []);
  
  // コンポーネントマウント時にアニメーションを開始
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      
      // 相性度に応じてアニメーションを選択
      if (compatibility.compatibility < 40) {
        setShowSnowfall(true); // 雪の結晶
        setTimeout(() => {
          setShowSnowfall(false);
        }, 5000);
      } else if (compatibility.compatibility < 60) {
        setTimeout(() => {
          setShowPetals(true); // 桜吹雪
          setTimeout(() => {
            setShowPetals(false);
          }, 5500);
        }, 1000);
      } else {
        setShowHeartRain(true); // ハートレイン
        setTimeout(() => {
          setShowHeartRain(false);
        }, 5000);
      }
      
      // 80%以上の場合、アニメーションが終わるタイミングで花火表示
      if (compatibility.compatibility >= 80) {
        setTimeout(() => {
          setShowFireworks(true);
          // 4秒後に非表示
          setTimeout(() => {
            setShowFireworks(false);
          }, 4000);
        }, 5000); // アニメーションが終わるタイミング
      }
    }, 500); // 少し遅延を入れて自然に
    
    return () => clearTimeout(timer);
  }, [compatibility.compatibility]);

  // 夜の相性分析を生成（新しいタグ相性ロジックを使用）
  const generateIntimateCompatibility = () => {
    // 新しいタグ相性ロジックを使用
    const myTagScores = myResult.additionalResults?.tagScores || [];
    const partnerTagScores = partnerResult.additionalResults?.tagScores || [];
    
    // タグ相性計算（tagCompatibility.tsの関数を使用）
    const tagCompatibilityResult = calculateImprovedTagCompatibility(myTagScores, partnerTagScores);
    
    // 高得点タグ（4点以上）を抽出
    const myHighTags = myTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);
    const partnerHighTags = partnerTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);
    
    // 両者の高得点タグを統合
    const combinedTags = new Set([...myHighTags, ...partnerHighTags]);
    const sharedTags = myHighTags.filter(tag => partnerHighTags.includes(tag));
    
    // おすすめプレイの詳細な分析を開始
    let recommendedPlay = '';
    
    // 全体的な相性評価（情景豊かに）
    const score = compatibility.compatibility;
    if (score >= 80) {
      recommendedPlay = `【相性度 ${Math.round(score)}%】\n月明かりが二人を包む夜、息遣いまでもが完璧に重なり合う。まるで長年連れ添った恋人のように、言葉を交わさずとも求めるものが分かる運命的な相性。`;
    } else if (score >= 60) {
      recommendedPlay = `【相性度 ${Math.round(score)}%】\n夜風が優しく頬を撫でるように、お互いの温もりが心地よく溶け合う。時に情熱的に、時に優しく、絶妙なリズムで愛を深めていける関係。`;
    } else if (score >= 40) {
      recommendedPlay = `【相性度 ${Math.round(score)}%】\n未知の扉を開くような新鮮な興奮が待っている。お互いの違いが生む化学反応が、予想外の快感を生み出すかもしれない刺激的な出会い。`;
    } else {
      recommendedPlay = `【相性度 ${Math.round(score)}%】\n霧の中を手探りで進むような探求の時間。じっくりと相手を知ることで、隠された宝物のような喜びを発見できる可能性を秘めた関係。`;
    }
    
    // リード/フォローのダイナミクス（L/F軸）
    let dynamics = '\n\n【関係性】';
    if (myResult.L > 70 && partnerResult.L < 30) {
      dynamics += 'あなたの指先が相手の肌を這うたび、甘い吐息が漏れる。完全に身を委ねる相手と、すべてを受け止めるあなた。支配と服従の美しいハーモニー。';
    } else if (myResult.L < 30 && partnerResult.L > 70) {
      dynamics += '強い腕に抱きしめられ、すべてを任せる安心感。相手のリードに身を委ね、未知の快感へと導かれていく心地よい時間。';
    } else if (Math.abs(myResult.L - partnerResult.L) < 20) {
      dynamics += '時には獣のように求め合い、時には優しく包み込む。その日の気分で役割が入れ替わる、変幻自在な関係性。';
    } else {
      dynamics += '押しては引き、引いては押す。絶妙な駆け引きが生む緊張感が、より深い快感へと導いていく。';
    }
    recommendedPlay += dynamics;
    
    // スタイル分析（E/I軸とA/S軸を統合）
    let style = '\n\n【スタイル】';
    const eMatch = Math.abs(myResult.E - partnerResult.E) < 30;
    const aMatch = Math.abs(myResult.A - partnerResult.A) < 30;
    
    if (eMatch && aMatch) {
      style += '呼吸のリズムまでもが自然に重なり、まるで一つの生き物のように動く二人。長い前戯から絶頂まで、完璧なテンポで進む至福の時間。';
    } else if ((myResult.E + partnerResult.E) > 100 && (myResult.A + partnerResult.A) > 100) {
      style += '炎のような情熱が部屋中を包み込む。汗ばむ肌と肌がぶつかり合い、新しい体位や未知の快感を次々と開拓していく冒険的な夜。';
    } else if ((myResult.E + partnerResult.E) < 60 && (myResult.A + partnerResult.A) < 60) {
      style += 'ゆっくりと溶けるチョコレートのような、とろけるような時間。一つ一つの仕草を大切に、相手の反応を確かめながら愛を深めていく。';
    } else {
      style += 'パズルのピースが組み合わさるように、お互いの違いが新しい快感を生み出す。予想外の化学反応が、忘れられない夜を作り出す。';
    }
    recommendedPlay += style;
    
    // コミュニケーション（O軸）
    if (myResult.O > 60 || partnerResult.O > 60) {
      recommendedPlay += ' 「もっと...」「そこが...」恥じらいを捨てた言葉が、二人の興奮を最高潮へと導く。';
    } else if (myResult.O < 40 && partnerResult.O < 40) {
      recommendedPlay += ' 瞳と瞳で語り合い、小さな震えや吐息で気持ちを伝え合う、無言の会話。';
    }
    
    // 感情の深さ（L2軸）
    if (Math.abs(myResult.L2 - partnerResult.L2) < 30) {
      recommendedPlay += '\n\n【絆】抱きしめ合った瞬間、心臓の鼓動が重なり、魂まで溶け合うような一体感。同じ深さで愛を注ぎ合える奇跡的な関係。';
    } else if (myResult.L2 > 70 || partnerResult.L2 > 70) {
      recommendedPlay += '\n\n【絆】涙が出るほど愛おしい。体を重ねるたびに、心の距離も縮まっていく。単なる快楽を超えた、深い愛情に包まれた特別な時間。';
    }
    
    
    // タグから厳選された提案（最大3つ、より詳細に）
    const tagBasedRecommendations = () => {
      const allRecommendations = getTagRecommendations(combinedTags);
      const seed = myResult.A + partnerResult.A + myResult.O + partnerResult.O;
      return selectAndFormatRecommendations(allRecommendations, 3, seed);
      
      /* 以下の古いコードをコメントアウト
      if (combinedTags.has('💬 言語プレイ派')) {
        recommendations += '言葉責めや甘い囁きで興奮を高め合いましょう。恥ずかしい言葉も、二人だけの秘密の呪文に。';
        hasRecommendations = true;
      }
      if (combinedTags.has('🗣 下ネタOK')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '性的な会話を楽しみながら、お互いの欲望を確認し合える開放的な関係です。';
        hasRecommendations = true;
      }
      
      // ムード・準備系
      if (combinedTags.has('🕯 ロマン重視')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += 'キャンドルの灯り、優しい音楽、アロマの香り。五感すべてで愛を感じる特別な時間を作りましょう。';
        hasRecommendations = true;
      }
      // 新しいタグの推奨
      if (combinedTags.has('🪞 鏡プレイ好き')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '鏡越しに映る二人の姿を見つめながら、興奬を倍増させましょう。視覚的な刺激が新たな快感を生み出します。';
        hasRecommendations = true;
      }
      if (combinedTags.has('🎮 ゲーム派')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += 'ルールやミッションを設定して、遊び心あふれる時間を。ゲーム感覚でお互いを刺激し合いましょう。';
        hasRecommendations = true;
      }
      if (combinedTags.has('💋 キス魔')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '唇を重ね、息を分かち合う濃密なキス。キスだけでも心も体も満たされる時間を大切に。';
        hasRecommendations = true;
      }
      if (combinedTags.has('🧥 コスプレ派')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '制服やコスチュームで非日常的な興奬を。視覚的なファンタジーが情熱をさらに燃え上がらせます。';
        hasRecommendations = true;
      }
      
      // テンポ・スタイル系
      if (combinedTags.has('⚡️ スピード勝負派')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '情熱に身を任せた激しく短いセッション。燃え上がる炎のような時間を過ごします。';
        hasRecommendations = true;
      }
      if (combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '予期せぬタイミングでの情熱的な出会い。日常の中に潜む特別な瞬間を逃さずに。';
        hasRecommendations = true;
      }
      
      // 欲望・情熱系
      if (combinedTags.has('🔥 欲望の炎')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '抑えきれない情熱をぶつけ合う激しい時間。お互いの欲望を解放し、限界まで求め合いましょう。';
        hasRecommendations = true;
      }
      if (combinedTags.has('🔄 リピート求め派')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '一度では満足できない貪欲な関係。何度も求め合い、そのたびに新しい快感を発見します。';
        hasRecommendations = true;
      }
      
      // ケア・安全系
      if (combinedTags.has('🛁 アフターケア必須')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '激しい時間の後は、優しく抱きしめ合い、お互いをケア。愛情を確認し合う大切な時間です。';
        hasRecommendations = true;
      }
      if (combinedTags.has('🧼 ケア＆衛生重視')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '清潔感を大切に、お互いを思いやる丁寧なプレイ。心も体も清らかに保ちます。';
        hasRecommendations = true;
      }
      if (combinedTags.has('🛡 安全第一派')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '安全性を最優先に、お互いが安心して楽しめる環境作りを心がけます。';
        hasRecommendations = true;
      }
      
      // 境界・コミュニケーション系  
      if (combinedTags.has('🚪 NG明確')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += 'お互いの境界線を明確にし、絶対に越えてはいけないラインを共有。安心感の中で楽しめます。';
        hasRecommendations = true;
      }
      
      // 時間帯系
      if (combinedTags.has('☀️ 朝型エロス')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '朝の清々しい空気の中で、新しい一日を特別な形で始める幸せを味わいます。';
        hasRecommendations = true;
      }
      
      // 探求系
      if (combinedTags.has('⛏️ 開拓派')) {
        if (hasRecommendations) recommendations += ' ';
        recommendations += '未知の領域を開拓する冒険心。お互いの新しい一面を発見し続ける探求の旅へ。';
        hasRecommendations = true;
      }
      
      return hasRecommendations ? recommendations : '';
      */
    };
    
    const tagRecommendations = tagBasedRecommendations();
    if (tagRecommendations) recommendedPlay += tagRecommendations;
    
    // 共通の特徴があれば簡潔に言及
    if (sharedTags.length > 0) {
      recommendedPlay += `\n\n【共通点】${sharedTags[0]}`;
      if (sharedTags.length > 1) {
        recommendedPlay += `他${sharedTags.length - 1}個`;
      }
    }
    
    /* 削除済み: 詳細な分析セクション
    const detailedTagAnalysis = () => {
      let analysis = '';
      
      // 共通タグによる特別な相性
      if (sharedTags.length > 0) {
        analysis += `\n\n【特別な相性】\n`;
        if (sharedTags.length === 1) {
          analysis += `共通の嗜好「${sharedTags[0]}」が二人を強く結びつけます。この共通点を大切に、理解し合える関係を深めていけるでしょう。`;
        } else if (sharedTags.length <= 3) {
          analysis += `${sharedTags.join('、')}という共通の嗜好が、二人の相性を特別なものにしています。お互いを深く理解し合える最高のパートナー。`;
        } else {
          analysis += `驚くほど多くの共通点（${sharedTags.length}個）を持つ二人。まるで運命的な出会いのような、深い理解と共感に基づく関係を築けます。`;
        }
      }
      
      // 相性の悪い組み合わせの警告
      const checkBadCombinations = () => {
        const warnings: string[] = [];
        
        // スピード重視 vs ロマン重視
        if ((myHighTags.includes('⚡️ スピード勝負派') && partnerHighTags.includes('🕯 ロマン重視')) ||
            (partnerHighTags.includes('⚡️ スピード勝負派') && myHighTags.includes('🕯 ロマン重視'))) {
          warnings.push('テンポの違いに注意。お互いのペースを尊重して。');
        }
        
        // 開拓派 vs 安全第一派
        if ((myHighTags.includes('⛏️ 開拓派') && partnerHighTags.includes('🛡 安全第一派')) ||
            (partnerHighTags.includes('⛏️ 開拓派') && myHighTags.includes('🛡 安全第一派'))) {
          warnings.push('リスク許容度に大きな差。事前の話し合いが重要。');
        }
        
        if (warnings.length > 0) {
          return '\n\n【注意ポイント】\n' + warnings.join('\n');
        }
        return '';
      };
      
      analysis += checkBadCombinations();
      
      return analysis;
    };
    
    recommendedPlay += detailedTagAnalysis();
    
    // 7. 性欲バランスの統合 - 削除
    const libidoAnalysis = () => {
      const calculateLibidoLevel = (result: any, tags: string[]) => {
        let baseLevel = 0;
        baseLevel += result.E * 0.3;
        baseLevel += result.A * 0.2;
        baseLevel += result.O * 0.3;
        baseLevel += (100 - result.L2) * 0.2;
        
        if (tags.includes('🔥 欲望の炎')) baseLevel += 20;
        if (tags.includes('🔄 リピート求め派')) baseLevel += 15;
        if (tags.includes('⚡️ スピード勝負派')) baseLevel += 10;
        if (tags.includes('🏃‍♂️ 衝動トリガー型')) baseLevel += 10;
        if (tags.includes('☀️ 朝型エロス')) baseLevel += 5;
        if (tags.includes('💤 まったり派')) baseLevel -= 10;
        if (tags.includes('🕯 ロマン重視')) baseLevel -= 5;
        
        return Math.min(100, Math.max(0, baseLevel));
      };
      
      const myLibidoLevel = calculateLibidoLevel(myResult, myHighTags);
      const partnerLibidoLevel = calculateLibidoLevel(partnerResult, partnerHighTags);
      const difference = Math.abs(myLibidoLevel - partnerLibidoLevel);
      
      let analysis = '\n\n【性欲バランス】\n';
      
      if (difference < 15) {
        if (myLibidoLevel >= 70 && partnerLibidoLevel >= 70) {
          analysis += '毎晩バトルモード！お互いの欲望が爆発する情熱的な関係。';
        } else if (myLibidoLevel >= 50 && partnerLibidoLevel >= 50) {
          analysis += '良いバランスで盛り上がれる理想的な関係。';
        } else if (myLibidoLevel < 30 && partnerLibidoLevel < 30) {
          analysis += 'のんびり愛を深められる穏やかな関係。';
        } else {
          analysis += 'お互いのペースが合う理想的な関係。';
        }
      } else if (difference < 30) {
        if (myLibidoLevel > partnerLibidoLevel) {
          analysis += '少し温度差あり。あなたがリードして調整を。';
        } else {
          analysis += '少し温度差あり。相手のペースに合わせて。';
        }
      } else {
        analysis += '温度差注意！コミュニケーションが重要。';
      }
      
      if (combinedTags.has('🔥 欲望の炎') && combinedTags.has('🔄 リピート求め派')) {
        analysis += '一晩では満足できない情熱的な夜になりそう。';
      } else if (combinedTags.has('🕯 ロマン重視') && combinedTags.has('🛁 アフターケア必須')) {
        analysis += '量より質を重視する深い関係に。';
      } else if (combinedTags.has('⚡️ スピード勝負派') && combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
        analysis += '突発的な情熱が爆発しやすい。';
      }
      
      return analysis;
    };
    
    recommendedPlay += libidoAnalysis();
    */
    
    // テキストの最終調整（800-900文字目標）
    const seed = myResult.E + partnerResult.E + myResult.L + partnerResult.L;
    recommendedPlay = stabilizeRecommendedPlayText(recommendedPlay, 800, 900, seed);
    
    // おすすめ体位（5軸データと公開タグから決定）
    const recommendedPositions = (() => {
      // positions48データを使用（importされている）
      
      // 両者のタグを取得
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);
      
      // ムードの優先順位を決定
      const moodPriorities = [];
      
      // 1. L/F軸でベースムードを決定
      if ((myResult.L > 70 && partnerResult.L < 30) || (myResult.L < 30 && partnerResult.L > 70)) {
        moodPriorities.push('wild'); // S×M関係は激しめ
      } else if (myResult.L < 50 && partnerResult.L < 50) {
        moodPriorities.push('romantic'); // M×Mは優しめ
      }
      
      // 2. A/S軸で冒険度を決定
      if (myResult.A > 50 && partnerResult.A > 50) {
        moodPriorities.push('technical'); // 両者冒険的
      } else if (myResult.A < 30 && partnerResult.A < 30) {
        moodPriorities.push('romantic'); // 両者安定志向
      } else {
        moodPriorities.push('playful'); // バランス型
      }
      
      // 3. タグによる調整
      if (combinedTags.has('🕯 ロマン重視') || combinedTags.has('🛁 アフターケア必須')) {
        moodPriorities.push('romantic');
      }
      if (combinedTags.has('⚡️ スピード勝負派') || combinedTags.has('🔥 欲望の炎')) {
        moodPriorities.push('wild');
      }
      if (combinedTags.has('💬 言語プレイ派')) {
        moodPriorities.push('playful'); // 言葉責めは遊び心
      }
      
      // 4. 難易度フィルター
      const maxDifficulty = (myResult.A > 70 && partnerResult.A > 70) ? 'hard' :
                           (myResult.A > 40 && partnerResult.A > 40) ? 'medium' : 'easy';
      
      // 5. 体位を選択（優先ムードに基づいて）
      const selectedPositions = [];
      const usedIds = new Set();
      
      // 各ムードから1つずつ選択（最大3つ）
      for (const mood of moodPriorities) {
        const candidates = positions48.filter(pos => 
          pos.moods.includes(mood as any) && 
          !usedIds.has(pos.id) &&
          (maxDifficulty === 'hard' || 
           (maxDifficulty === 'medium' && pos.difficulty !== 'hard') ||
           (maxDifficulty === 'easy' && pos.difficulty === 'easy'))
        );
        
        if (candidates.length > 0 && selectedPositions.length < 3) {
          // 性格タイプコードを使って決定的に選択
          const seed: number = (myResult.E + partnerResult.E + myResult.L + partnerResult.L) % candidates.length;
          const selected: Position48 = candidates[seed];
          selectedPositions.push(selected);
          usedIds.add(selected.id);
        }
      }
      
      // 3つに満たない場合は追加で選択
      while (selectedPositions.length < 3) {
        // まだ選ばれていない体位から選択
        const remainingPositions = positions48.filter(pos => 
          !usedIds.has(pos.id) &&
          (maxDifficulty === 'hard' || 
           (maxDifficulty === 'medium' && pos.difficulty !== 'hard') ||
           (maxDifficulty === 'easy' && pos.difficulty === 'easy'))
        );
        
        if (remainingPositions.length > 0) {
          // 決定的な選択（異なるseedを使用）
          const seed: number = (myResult.O + partnerResult.O + selectedPositions.length * 37) % remainingPositions.length;
          const selected: Position48 = remainingPositions[seed];
          selectedPositions.push(selected);
          usedIds.add(selected.id);
        } else {
          // 難易度制限を緩和して再選択
          const allRemainingPositions = positions48.filter(pos => !usedIds.has(pos.id));
          if (allRemainingPositions.length > 0) {
            const seed: number = (myResult.L2 + partnerResult.L2 + selectedPositions.length * 31) % allRemainingPositions.length;
            const selected: Position48 = allRemainingPositions[seed];
            selectedPositions.push(selected);
            usedIds.add(selected.id);
          } else {
            // すべての体位が選択済みの場合（通常はありえない）
            break;
          }
        }
      }
      
      return selectedPositions;
    })();
    
    // 体位の分析文を生成
    const positionAnalysis = (() => {
      const avgA = (myResult.A + partnerResult.A) / 2;
      if (avgA > 70) return '激しく情熱的に楽しむ';
      if (avgA < 30) return 'ゆったり優しく楽しむ';
      return 'バランスよく焦らしながら楽しむ';
    })();
    
    // 性欲バランス（5軸データと公開タグから精細化）
    const generateLibidoBalance = () => {
      // タグを取得
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);
      
      // 基本的な性欲レベルの判定（E軸だけでなく複数の要素を考慮）
      const calculateLibidoLevel = (result: any, tags: string[]) => {
        let baseLevel = 0;
        
        // E軸（外向性）：基本的な活力
        baseLevel += result.E * 0.3;
        
        // A軸（冒険性）：新しい刺激への欲求
        baseLevel += result.A * 0.2;
        
        // O軸（開放性）：欲望の表現力
        baseLevel += result.O * 0.2;
        
        // タグによる加算
        if (tags.includes('🔥 欲望の炎')) baseLevel += 20;
        if (tags.includes('🔄 リピート求め派')) baseLevel += 15;
        if (tags.includes('⚡️ スピード勝負派')) baseLevel += 10;
        if (tags.includes('🏃‍♂️ 衝動トリガー型')) baseLevel += 10;
        if (tags.includes('☀️ 朝型エロス')) baseLevel += 5;
        
        // タグによる減算
        if (tags.includes('💤 まったり派')) baseLevel -= 10;
        if (tags.includes('🕯 ロマン重視')) baseLevel -= 5;
        
        return Math.min(100, Math.max(0, baseLevel));
      };
      
      const myLibidoLevel = calculateLibidoLevel(myResult, myTags);
      const partnerLibidoLevel = calculateLibidoLevel(partnerResult, partnerTags);
      
      // レベルをカテゴリに変換
      const getLibidoCategory = (level: number) => {
        if (level >= 70) return '激強';
        if (level >= 50) return '強め';
        if (level >= 30) return '普通';
        return '控えめ';
      };
      
      const myCategory = getLibidoCategory(myLibidoLevel);
      const partnerCategory = getLibidoCategory(partnerLibidoLevel);
      
      // 差を計算
      const difference = Math.abs(myLibidoLevel - partnerLibidoLevel);
      
      // 詳細な分析文を生成
      let analysis = '';
      
      if (difference < 15) {
        // 相性良好
        if (myLibidoLevel >= 70 && partnerLibidoLevel >= 70) {
          analysis = '毎晩バトルモード！お互いの欲望が爆発';
        } else if (myLibidoLevel >= 50 && partnerLibidoLevel >= 50) {
          analysis = '良いバランスで盛り上がれる関係';
        } else if (myLibidoLevel < 30 && partnerLibidoLevel < 30) {
          analysis = 'のんびり愛を深められる穏やかな関係';
        } else {
          analysis = 'お互いのペースが合う理想的な関係';
        }
      } else if (difference < 30) {
        // 調整可能
        if (myLibidoLevel > partnerLibidoLevel) {
          analysis = '少し温度差あり。あなたがリードして調整を';
        } else {
          analysis = '少し温度差あり。相手のペースに合わせて';
        }
      } else {
        // 大きな差
        analysis = '温度差注意！コミュニケーションが重要';
      }
      
      // 特定のタグ組み合わせによる追加コメント
      if (combinedTags.has('🔥 欲望の炎') && combinedTags.has('🔄 リピート求め派')) {
        analysis += '。一晩では満足できない情熱的な夜に';
      } else if (combinedTags.has('🕯 ロマン重視') && combinedTags.has('🛁 アフターケア必須')) {
        analysis += '。量より質を重視する深い関係';
      } else if (combinedTags.has('⚡️ スピード勝負派') && combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
        analysis += '。突発的な情熱が爆発しやすい';
      }
      
      return analysis;
    };
    
    const libidoBalance = generateLibidoBalance();
    
    // 付き合う前の価値観（5軸データと公開タグから精細化）
    const generateBeforeRelationship = () => {
      // タグを取得
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);
      
      // 付き合う前の関係に対する開放度を計算
      const calculateOpennessScore = (result: any, tags: string[]) => {
        let score = 0;
        
        // L2軸（Love/Free）が基本（Freeが高いほど開放的）
        if (result.L2 < 50) {
          score += (50 - result.L2) * 0.8; // Free傾向
        }
        
        // E軸（外向性）も影響
        if (result.E > 60) {
          score += 15; // 外向的な人は積極的
        }
        
        // O軸（開放性）も大きく影響
        if (result.O > 60) {
          score += 20; // 開放的な人はYES傾向
        } else if (result.O < 40) {
          score -= 20; // 秘密主義はNO傾向
        }
        
        // タグによる調整
        if (tags.includes('🏃‍♂️ 衝動トリガー型')) score += 25;
        if (tags.includes('⚡️ スピード勝負派')) score += 20;
        if (tags.includes('🔥 欲望の炎')) score += 15;
        if (tags.includes('🗣 下ネタOK')) score += 10;
        if (tags.includes('🕯 ロマン重視')) score -= 20;
        if (tags.includes('🛁 アフターケア必須')) score -= 10;
        
        return Math.min(100, Math.max(0, score));
      };
      
      const myScore = calculateOpennessScore(myResult, myTags);
      const partnerScore = calculateOpennessScore(partnerResult, partnerTags);
      
      // YES/NO判定
      const myAnswer = myScore >= 40 ? 'YES' : 'NO';
      const partnerAnswer = partnerScore >= 40 ? 'YES' : 'NO';
      
      // 詳細な分析
      let analysis = '';
      
      if (myAnswer === 'YES' && partnerAnswer === 'YES') {
        if (myScore >= 70 && partnerScore >= 70) {
          analysis = '始まりはカラダから。お互い積極的で話が早い';
        } else {
          analysis = '始まりはカラダから。タイミングが合えばすぐに';
        }
        
        // タグによる追加情報
        if (combinedTags.has('🏃‍♂️ 衝動トリガー型') && combinedTags.has('⚡️ スピード勝負派')) {
          analysis += '。出会ったその日も十分あり得る';
        } else if (combinedTags.has('🔥 欲望の炎')) {
          analysis += '。欲望が抑えきれなくなりそう';
        }
      } else if (myAnswer === 'YES' && partnerAnswer === 'NO') {
        analysis = '感情とタイミングが鍵。あなたの気持ちと相手の準備次第';
        
        if (myScore >= 70) {
          analysis += '。焦らずじっくり関係を築いて';
        }
      } else if (myAnswer === 'NO' && partnerAnswer === 'YES') {
        analysis = '価値観の違いに注意。相手の積極性に戸惑うかも';
        
        if (combinedTags.has('🚪 NG明確')) {
          analysis += '。境界線をしっかり伝えることが大切';
        }
      } else { // NO × NO
        if (myScore < 20 && partnerScore < 20) {
          analysis = '恋愛から始まる正統派。しっかり関係を築いてから';
        } else {
          analysis = '恋愛から始まる正統派。お互いの気持ちが深まってから';
        }
        
        if (combinedTags.has('🕯 ロマン重視')) {
          analysis += '。ロマンチックな展開を大切に';
        } else if (combinedTags.has('🛁 アフターケア必須')) {
          analysis += '。信頼関係があってこそ';
        }
      }
      
      // 相性による追加アドバイス
      const scoreDiff = Math.abs(myScore - partnerScore);
      if (scoreDiff > 40) {
        analysis += '。価値観の差が大きいので話し合いが重要';
      }
      
      return analysis;
    };
    
    const beforeRelationship = generateBeforeRelationship();
    
    // ギャップ度（5軸データと公開タグから精細化）
    const generateGapAnalysis = () => {
      // タグスコアを取得
      const myTagScores = myResult.additionalResults?.tagScores || [];
      const partnerTagScores = partnerResult.additionalResults?.tagScores || [];
      
      // 高得点タグ（4点以上）を抽出
      const myHighTags = myTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);
      const partnerHighTags = partnerTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);
      const combinedTags = new Set([...myHighTags, ...partnerHighTags]);
      
      // 各軸のギャップを計算
      const gaps = {
        E: Math.abs(myResult.E - partnerResult.E),
        L: Math.abs(myResult.L - partnerResult.L),
        A: Math.abs(myResult.A - partnerResult.A),
        L2: Math.abs(myResult.L2 - partnerResult.L2),
        O: Math.abs(myResult.O - partnerResult.O)
      };
      
      // 重み付けギャップスコアの計算
      let gapScore = 0;
      gapScore += gaps.E * 0.15;  // 外向性の差は軽め
      gapScore += gaps.L * 0.25;  // リード/フォローの差は重要
      gapScore += gaps.A * 0.20;  // 冒険性の差も重要
      gapScore += gaps.L2 * 0.20; // Love/Freeの価値観の差
      gapScore += gaps.O * 0.20;  // 開放性の差
      
      // タグの違いによる追加ギャップ
      const tagDifferences = {
        critical: 0,    // 致命的な違い
        significant: 0, // 大きな違い
        minor: 0        // 小さな違い
      };
      
      // 各タグスコアの差を分析
      myTagScores.forEach(myTag => {
        const partnerTag = partnerTagScores.find(pt => pt.tag === myTag.tag);
        if (partnerTag) {
          const scoreDiff = Math.abs(myTag.score - partnerTag.score);
          
          // 特定のタグ組み合わせで致命的な違いをチェック
          if (myTag.tag === '🕯 ロマン重視' && myTag.score >= 3) {
            const partnerSpeed = partnerTagScores.find(pt => pt.tag === '⚡️ スピード勝負派');
            if (partnerSpeed && partnerSpeed.score >= 3) {
              tagDifferences.critical++;
            }
          }
          if (myTag.tag === '⚡️ スピード勝負派' && myTag.score >= 3) {
            const partnerRomance = partnerTagScores.find(pt => pt.tag === '🕯 ロマン重視');
            if (partnerRomance && partnerRomance.score >= 3) {
              tagDifferences.critical++;
            }
          }
          
          // アフターケアの重要度の違い
          if (myTag.tag === '🛁 アフターケア必須' && scoreDiff >= 3) {
            tagDifferences.significant++;
          }
        }
      });
      
      // タグの違いをスコアに反映
      gapScore += tagDifferences.critical * 20;
      gapScore += tagDifferences.significant * 10;
      
      // ギャップ分析文を生成
      let analysis = '';
      
      if (gapScore < 25) {
        analysis = 'ほぼ完璧な相性！価値観が驚くほど一致';
        
        // 共通の高得点タグがある場合
        const sharedHighTags = myHighTags.filter(tag => partnerHighTags.includes(tag));
        if (sharedHighTags.length > 3) {
          analysis += '。共通の嗜好が多く、理解し合える関係';
        }
      } else if (gapScore < 40) {
        analysis = '良い相性。少しの違いが刺激になる';
        
        // 最大のギャップを特定
        const maxGapAxis = Object.entries(gaps).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        if (maxGapAxis === 'L' && gaps.L > 30) {
          analysis += '。主導権のバランスに気をつけて';
        } else if (maxGapAxis === 'A' && gaps.A > 30) {
          analysis += '。新しいことへの挑戦は相談しながら';
        }
      } else if (gapScore < 60) {
        analysis = 'ギャップあり。でも違いを楽しめる関係に';
        
        if (tagDifferences.critical > 0) {
          analysis += '。価値観の違いは話し合いで埋めて';
        } else if (gaps.L > 40 && gaps.A > 40) {
          analysis += '。刺激的だけど衝突も覚悟して';
        }
      } else {
        analysis = '大きなギャップ！理解と歩み寄りが必須';
        
        if (tagDifferences.critical > 1) {
          analysis += '。根本的な価値観の違いに要注意';
        } else if (gaps.L2 > 60) {
          analysis += '。恋愛観の違いが障害になるかも';
        }
      }
      
      // 特定のタグペアによる追加アドバイス
      if (combinedTags.has('🚪 NG明確') && combinedTags.has('💬 言語プレイ派')) {
        analysis += '。しっかりコミュニケーションを取れば大丈夫';
      }
      if (myHighTags.includes('🔥 欲望の炎') && partnerHighTags.includes('🔥 欲望の炎')) {
        analysis += '。情熱がぶつかり合う激しい関係に';
      }
      
      return analysis;
    };
    
    const gapAnalysis = generateGapAnalysis();
    
    // 関係性の行き先予測（5軸データと公開タグから精細化）
    const generateRelationshipPrediction = () => {
      // タグを取得
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);
      const sharedTags = myTags.filter(tag => partnerTags.includes(tag));
      
      // 関係性の深さを評価する要素を計算
      let emotionalDepth = 0;
      let physicalIntensity = 0;
      let stabilityScore = 0;
      let passionScore = 0;
      
      // 1. 感情的な深さ（L2軸とタグ）
      if (myResult.L2 > 50 && partnerResult.L2 > 50) {
        emotionalDepth += 40; // 両者Love型
      } else if (myResult.L2 < 30 && partnerResult.L2 < 30) {
        emotionalDepth -= 20; // 両者強いFree型
      } else {
        emotionalDepth += 10; // 混合
      }
      
      // タグによる感情深度の調整
      if (combinedTags.has('🕯 ロマン重視')) emotionalDepth += 15;
      if (combinedTags.has('🛁 アフターケア必須')) emotionalDepth += 10;
      if (sharedTags.includes('💬 言語プレイ派')) emotionalDepth += 5; // コミュニケーション重視
      
      // 2. 肉体的な情熱度（E軸、A軸、タグ）
      physicalIntensity += (myResult.E + partnerResult.E) / 4;
      physicalIntensity += (myResult.A + partnerResult.A) / 6;
      
      if (combinedTags.has('🔥 欲望の炎')) physicalIntensity += 20;
      if (combinedTags.has('🔄 リピート求め派')) physicalIntensity += 15;
      if (combinedTags.has('⚡️ スピード勝負派')) physicalIntensity += 10;
      
      // 3. 関係の安定性（軸の差とタグ）
      const axisDifferences = Math.abs(myResult.E - partnerResult.E) + 
                             Math.abs(myResult.L - partnerResult.L) + 
                             Math.abs(myResult.A - partnerResult.A) + 
                             Math.abs(myResult.L2 - partnerResult.L2) + 
                             Math.abs(myResult.O - partnerResult.O);
      
      stabilityScore = 100 - (axisDifferences / 5); // 差が少ないほど安定
      
      // タグの相性による安定性調整
      if (sharedTags.length > 3) stabilityScore += 15;
      
      // 4. 情熱の持続性
      passionScore = (physicalIntensity + emotionalDepth) / 2;
      if (combinedTags.has('☀️ 朝型エロス')) {
        passionScore += 5; // 特定の時間帯での情熱
      }
      
      // 総合評価に基づく予測
      const totalScore = (emotionalDepth * 0.3 + physicalIntensity * 0.2 + 
                         stabilityScore * 0.3 + passionScore * 0.2);
      
      let prediction = '';
      
      if (totalScore >= 75) {
        if (emotionalDepth >= 60 && stabilityScore >= 70) {
          prediction = '夜から始まっても、深い愛情に発展する可能性大。';
          prediction += '二人の間には肉体的な繋がりだけでなく、精神的な絆も強く感じられます。';
          prediction += '初めは体の相性から始まった関係でも、時間とともに互いの内面を理解し合い、本当の意味でのパートナーシップを築いていけるでしょう。';
          
          if (sharedTags.includes('🕯 ロマン重視')) {
            prediction += 'ロマンチックな雰囲気を大切にする二人は、日常の中でも特別な瞬間を作り出すことができます。';
            prediction += 'キャンドルの灯りや優しい音楽、丁寧な愛撫など、五感すべてで愛を表現し合える関係性は、年月を重ねても色褪せることがないでしょう。';
          }
          
          if (emotionalDepth >= 80) {
            prediction += '特に感情的な繋がりが深いため、言葉にしなくても相手の求めているものが分かり合える、理想的な関係になりそう。';
            prediction += '夜の営みも単なる快楽の追求ではなく、愛情表現の一つとして大切にしていける二人です。';
          }
          
          // L軸による追加分析
          if (Math.abs(myResult.L - partnerResult.L) > 40) {
            prediction += 'リードとフォローのバランスも絶妙で、お互いの役割が自然に定まることで、ストレスのない関係を築けます。';
          }
        } else if (physicalIntensity >= 70) {
          prediction = '情熱的な関係が長く続く。心も体も満たされる充実した日々が待っています。';
          prediction += '二人の間には抑えきれない欲望と情熱があり、それが関係性の原動力となっています。';
          prediction += '激しい夜を重ねることで、より深い絆が生まれ、日常生活でも互いを求め合う関係に発展するでしょう。';
          
          if (combinedTags.has('🔥 欲望の炎')) {
            prediction += '燃え上がる炎は簡単には消えません。むしろ時間とともに、より洗練された形で互いの欲望を満たし合えるようになります。';
            prediction += '日々の生活の中でも、ふとした瞬間に燃え上がる情熱を感じ、それが二人の関係をより強固なものにしていくでしょう。';
          }
          
          if (myResult.E > 70 && partnerResult.E > 70) {
            prediction += 'お互いに外向的で積極的な性格のため、新しいプレイや場所での冒険も楽しめます。';
            prediction += 'マンネリ化とは無縁の、常に新鮮な刺激に満ちた関係を維持できるでしょう。';
          }
        } else {
          prediction = 'バランスの取れた理想的な関係に発展。';
          prediction += '激しすぎず、冷めすぎず、ちょうど良い温度感で長く続く関係性です。';
          prediction += '夜の営みも日常生活も、お互いのペースを尊重しながら、心地よい距離感を保てるでしょう。';
          prediction += '時には情熱的に、時には優しく、その時々の気分や状況に合わせて柔軟に対応できる成熟した関係になりそうです。';
          
          if (stabilityScore >= 60) {
            prediction += '特に関係の安定性が高いため、長期的なパートナーシップを築く上で理想的な組み合わせと言えるでしょう。';
          }
        }
      } else if (totalScore >= 50) {
        if (emotionalDepth < 30) {
          prediction = '体の相性は最高。でも恋愛には発展しにくい関係性です。';
          prediction += '肉体的な繋がりは強く、夜を共にするたびに激しい快楽を味わえるでしょう。';
          prediction += 'しかし、それ以上の感情的な繋がりを求めるのは難しいかもしれません。';
          
          if (myResult.L2 < 30 && partnerResult.L2 < 30) {
            prediction += 'お互い割り切れるタイプなので、このような関係でも問題ないでしょう。';
            prediction += '束縛や依存のない、自由な関係を楽しめる二人です。';
            prediction += 'ただし、どちらかが感情的になってしまうと、関係性のバランスが崩れる可能性があるので注意が必要です。';
          } else {
            prediction += '片方が感情的になりやすいタイプの場合、関係性に苦しむ可能性があります。';
            prediction += '最初から関係性の定義を明確にしておくことが、後々のトラブルを避けるためには重要でしょう。';
          }
          
          if (combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
            prediction += '衝動的な出会いと別れを繰り返す可能性も。それもまた一つの形かもしれません。';
          }
        } else if (stabilityScore < 40) {
          prediction = '激しく燃え上がるけど、長続きは難しいかも。';
          prediction += '出会った瞬間から強く惹かれ合い、情熱的な時間を過ごすことになるでしょう。';
          prediction += 'しかし、その激しさゆえに、関係性を維持することが困難になる可能性があります。';
          
          if (axisDifferences > 200) {
            prediction += '価値観の違いが致命的になりそうです。';
            prediction += '夜の営みでは激しく求め合えても、日常生活での考え方や行動パターンの違いが、次第に大きな溝となって現れてくるでしょう。';
            prediction += 'お互いの違いを受け入れられるかどうかが、関係継続の鍵となります。';
          } else {
            prediction += '感情の起伏が激しく、喧嘩と仲直りを繰り返すような関係になりそう。';
            prediction += 'その分、仲直りの夜は特別に情熱的なものになるでしょうが、精神的な疲労も大きいかもしれません。';
          }
          
          if (myResult.A > 70 || partnerResult.A > 70) {
            prediction += '冒険心が強い分、常に新しい刺激を求めてしまい、一つの関係に満足できない可能性も。';
          }
        } else {
          prediction = '良い関係だけど、何か物足りなさを感じるかも。';
          prediction += '悪くはないけれど、特別良いわけでもない、そんな微妙なバランスの関係性です。';
          prediction += '安定はしているものの、ときめきや情熱が足りないと感じることがあるでしょう。';
          
          if (physicalIntensity < 40) {
            prediction += 'もっと情熱が必要です。';
            prediction += '夜の営みも淡白になりがちで、お互いに満足感を得られないかもしれません。';
            prediction += '意識的に新しいことに挑戦したり、雰囲気作りに力を入れることで、関係性を改善できる可能性があります。';
          } else {
            prediction += '肉体的な相性は悪くないので、感情面での繋がりを深める努力をすれば、より良い関係に発展する可能性があります。';
            prediction += '日常的なコミュニケーションを大切にし、お互いの内面を理解し合うことが重要でしょう。';
          }
        }
      } else {
        if (physicalIntensity >= 60 && emotionalDepth < 20) {
          prediction = 'セフレ向き。感情移入は危険です。';
          prediction += '肉体的には強く惹かれ合いますが、それ以上の関係を求めるのは避けた方が良いでしょう。';
          prediction += '夜だけの関係と割り切ることで、お互いに傷つくことなく、快楽を楽しめます。';
          
          if (combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
            prediction += '一夜限りがベストかもしれません。';
            prediction += '衝動的に求め合い、激しい一夜を過ごした後は、きれいに関係を終わらせる方が良いでしょう。';
            prediction += '連絡先を交換せず、思い出だけを大切にするのも一つの選択です。';
          } else {
            prediction += '定期的に会う関係でも、感情的な繋がりは持たないよう注意が必要です。';
            prediction += 'ルールを決めて、お互いの生活に干渉しない大人の関係を維持しましょう。';
          }
          
          if (myResult.O < 30 || partnerResult.O < 30) {
            prediction += '秘密主義的な面もあるので、プライベートには踏み込まない関係が理想的です。';
          }
        } else if (stabilityScore < 30) {
          prediction = '衝突が多く、関係維持が困難です。';
          prediction += '価値観や性格の違いが大きすぎて、一緒にいることがストレスになる可能性が高いでしょう。';
          prediction += '夜の営みでも、お互いの求めるものが違いすぎて、満足感を得られないかもしれません。';
          
          if ((myResult.L > 70 && partnerResult.L > 70)) {
            prediction += '主導権争いで疲弊しそうです。';
            prediction += '両者ともにリードしたがるタイプのため、常に主導権を巡って争うことになるでしょう。';
            prediction += 'ベッドの上でも日常生活でも、譲り合うことができず、関係性が破綻する可能性が高いです。';
          } else {
            prediction += '基本的な相性が合わないため、無理に関係を続けるよりも、早めに距離を置いた方が良いかもしれません。';
            prediction += 'お互いにとってより良い相手が他にいる可能性が高いです。';
          }
        } else {
          prediction = '相性が合わない。無理して続けない方が良いでしょう。';
          prediction += '残念ながら、この組み合わせは基本的な相性が良くありません。';
          prediction += '一時的な関係ならまだしも、長期的な関係を築くのは非常に困難です。';
          prediction += 'お互いの幸せのためにも、早めに関係を見直すことをお勧めします。';
          prediction += '無理に続けても、お互いを傷つけ合うだけの結果になる可能性が高いです。';
        }
      }
      
      // 特定のタグ組み合わせによる追加予測
      if (sharedTags.includes('🛁 アフターケア必須') && emotionalDepth >= 50) {
        prediction += '優しさが絆を深める鍵となります。';
        prediction += '激しい夜の後の優しいケアが、二人の関係をより深いものにしていくでしょう。';
        prediction += 'お互いを大切に思う気持ちが、日々の行動に表れる素敵な関係性です。';
      }
      if (sharedTags.includes('🗣 下ネタOK')) {
        prediction += '性に対してオープンな二人は、恥ずかしがることなく欲望を伝え合える理想的な関係を築けるでしょう。';
      }
      
      return prediction;
    };
    
    const relationshipPrediction = generateRelationshipPrediction();
    
    return {
      recommendedPlay,
      recommendedPosition: positionAnalysis,
      recommendedPositions, // 体位オブジェクトの配列も返す
      libidoBalance,
      beforeRelationship,
      gapAnalysis,
      relationshipPrediction
    };
  };

  const intimateCompatibility = generateIntimateCompatibility();

  const getCompatibilityColor = (score: number) => {
    // Returns gradient classes for glass morphism effect
    if (score >= 80) return 'from-emerald-500/20 via-green-500/15 to-teal-500/20';
    if (score >= 60) return 'from-blue-500/20 via-cyan-500/15 to-blue-600/20';
    if (score >= 40) return 'from-amber-500/20 via-yellow-500/15 to-orange-500/20';
    return 'from-red-500/20 via-pink-500/15 to-rose-500/20';
  };

  const getCompatibilityIcon = (score: number) => {
    return <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />;
  };


  return (
    <div className="relative z-10 min-h-screen pt-28 pb-12">
      {/* お祝いの花火 */}
      {showFireworks && <Fireworks />}
      
      {/* ダウンロード用のコンテナ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={downloadRef}>
          {/* Hero Section */}
          <div className="text-white text-center mb-12">
            <ScrollAnimation animation="fadeIn" duration={800}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg select-none text-center">
                <NeonText text={["相性", "診断結果"]} specialCharIndex={1} className="gap-1" />
              </h1>
            </ScrollAnimation>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* 相性診断結果 */}
            <ScrollAnimation animation="fadeInUp" delay={200}>
              <div className="rounded-xl p-4 sm:p-6 relative">
                {/* アニメーション（相性度に応じて切り替え） */}
                {showSnowfall && <SnowfallAnimation />}
                {showPetals && <PetalAnimation />}
                {showHeartRain && <HeartRain />}

                <div className="text-center relative z-10">
                  {/* ユーザー名表示 */}
                  <div className="flex justify-center items-center gap-4 sm:gap-8 mb-6">
                    {/* あなた */}
                    <div className="text-center">
                      {myUsername && (
                        <p className="text-[#e0e7ff] text-2xl sm:text-3xl md:text-4xl font-bold">{myUsername}</p>
                      )}
                    </div>

                    {/* ハートアイコン */}
                    <div className="text-pink-400">
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                    </div>

                    {/* 相手 */}
                    <div className="text-center">
                      {partnerUsername && (
                        <p className="text-[#e0e7ff] text-2xl sm:text-3xl md:text-4xl font-bold">{partnerUsername}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center mb-4 sm:mb-6">
                    <div className="relative flex items-center justify-center">
                      <CircularProgressBar percentage={animatedScore} size={180} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-400">{animatedScore}%</span>
                        <span className="mt-1 text-base sm:text-lg text-[#e0e7ff]/80">マッチ度</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed">
                    {compatibility.description}
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            {/* 夜の相性診断カード */}
            <ScrollAnimation animation="fadeInUp" delay={600}>
              <div ref={cardRef} className="rounded-xl p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">相性診断カード</h3>
              <div className="space-y-12">
                <div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-lg">🛏</span>
                    <h4 className="font-semibold text-white text-base sm:text-lg">夜の相性</h4>
                  </div>
                  <div className="px-4 pb-2">
                    <HorizontalProgressBar 
                      percentage={compatibility.compatibility}
                      colorFrom="from-purple-500"
                      colorTo="to-pink-500"
                      isVisible={cardVisible}
                      delay={700}
                    />
                  </div>
                  <div className="mt-4 px-2 text-center">
                    <p className="text-white text-lg sm:text-xl leading-relaxed break-words">
                      {intimateCompatibility.recommendedPlay}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-lg">💋</span>
                    <h4 className="font-semibold text-white text-base sm:text-lg">付き合う前にXできるか？</h4>
                  </div>
                  <div className="px-4 pb-2">
                    <HorizontalProgressBar
                      percentage={compatibility.axisScores.A}
                      colorFrom="from-green-500"
                      colorTo="to-emerald-500"
                      isVisible={cardVisible}
                      delay={900}
                    />
                  </div>
                  <div className="mt-4 px-2 text-center">
                    <p className="text-white text-lg sm:text-xl leading-relaxed break-words">
                      {intimateCompatibility.beforeRelationship}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-lg">🧘‍♀️</span>
                    <h4 className="font-semibold text-white text-base sm:text-lg">おすすめ体位（48手）</h4>
                  </div>
                  <div className="px-4 pb-2">
                    <HorizontalProgressBar
                      percentage={compatibility.axisScores.E}
                      colorFrom="from-blue-500"
                      colorTo="to-cyan-500"
                      isVisible={cardVisible}
                      delay={1100}
                    />
                  </div>
                  <div className="mt-4 px-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {intimateCompatibility.recommendedPositions.map((position: Position48) => (
                        <div
                          key={position.id}
                          className="bg-white/10 border border-white/20 rounded-lg p-3 relative cursor-pointer hover:bg-white/20 transition-colors"
                          onClick={() => setSelectedPosition(position)}
                        >
                          <span className="absolute top-3 right-3 text-xs text-[#e0e7ff]/60">No.{position.id}</span>
                          <div className="text-center mb-2">
                            <p className="text-xs text-[#e0e7ff]/70 mb-1">（{position.kana || position.name}）</p>
                            <h5 className="font-semibold text-[#e0e7ff]">{position.name}</h5>
                          </div>
                          <div className="flex flex-wrap gap-1 justify-center mb-2">
                            {position.moods.map(mood => {
                              const moodColors: { [key: string]: string } = {
                                romantic: 'bg-pink-500/20 border-pink-400 text-pink-300',
                                wild: 'bg-red-500/20 border-red-400 text-red-300',
                                playful: 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
                                technical: 'bg-purple-500/20 border-purple-400 text-purple-300',
                                foreplay: 'bg-blue-500/20 border-blue-400 text-blue-300'
                              };
                              const moodDescriptions: { [key: string]: string } = {
                                romantic: 'ロマンチック',
                                wild: 'ワイルド',
                                playful: 'プレイフル',
                                technical: 'テクニカル',
                                foreplay: '愛撫'
                              };
                              return (
                                <span
                                  key={mood}
                                  className={`px-2 py-0.5 text-xs rounded-full border ${moodColors[mood]}`}
                                >
                                  {moodDescriptions[mood]}
                                </span>
                              );
                            })}
                          </div>
                          <div className="text-center">
                            <span className="text-xs text-pink-400">
                              難易度: {position.difficulty === 'easy' ? (
                                <>
                                  <span className="text-pink-400 text-base">♥</span>
                                  <span className="text-gray-400 text-base">♥♥</span>
                                </>
                              ) : position.difficulty === 'medium' ? (
                                <>
                                  <span className="text-pink-400 text-base">♥♥</span>
                                  <span className="text-gray-400 text-base">♥</span>
                                </>
                              ) : (
                                <span className="text-pink-400 text-base">♥♥♥</span>
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-white text-lg text-center mt-4">
                      {intimateCompatibility.recommendedPosition}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-lg">💞</span>
                    <h4 className="font-semibold text-white text-base sm:text-lg">関係性の行き先予測</h4>
                  </div>
                  <div className="px-4 pb-2">
                    <HorizontalProgressBar 
                      percentage={compatibility.axisScores.O}
                      colorFrom="from-amber-500"
                      colorTo="to-orange-500"
                      isVisible={cardVisible}
                      delay={1300}
                    />
                  </div>
                  <div className="mt-4 px-2 text-center">
                    <p className="text-white text-lg sm:text-xl leading-relaxed break-words">
                      {intimateCompatibility.relationshipPrediction}
                    </p>
                  </div>
                </div>
              </div>
              </div>
            </ScrollAnimation>

            {(mySecretAnswer || partnerSecretAnswer) && (
              <ScrollAnimation animation="fadeInUp" delay={700}>
                <div className="text-center">
                  <button
                    onClick={() => setShowSecretConfirm(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
                  >
                    <span className="text-lg">🔐</span>
                    <span>秘密を見る</span>
                  </button>
                </div>
              </ScrollAnimation>
            )}

            <ScrollAnimation animation="fadeInUp" delay={800}>
              <div className="text-center space-y-4">
                <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="bg-teal-500 text-teal-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>シェア</span>
                  </button>
                  <button
                    onClick={onNewTest}
                    className="bg-gray-500 text-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>再診断</span>
                  </button>
                  <button
                    onClick={() => setShowFeedbackModal(true)}
                    className="bg-blue-400 text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-300 transition-all transform hover:scale-105 inline-flex items-center shadow-lg"
                  >
                    フィードバックへ
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      {/* SNS Share Modal */}
      <SNSShareModal 
        result={myResult}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        initialShareText={shareText}
      />
      
      {/* Position Description Modal */}
      <PositionDescriptionModal
        position={selectedPosition}
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />
      
      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackModal onClose={() => setShowFeedbackModal(false)} />
      )}

      {/* 秘密確認モーダル */}
      {showSecretConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-2xl p-6 max-w-md w-full border border-white/20 shadow-2xl">
            <div className="text-center space-y-4">
              <div className="text-4xl">🔐</div>
              <h3 className="text-xl font-bold text-white">本当に秘密を確認しますか？</h3>
              <p className="text-sm text-white/80">
                お互いの秘密の回答が表示されます。<br />
                一度見たら、二人の関係が変わるかもしれません...
              </p>
              <div className="flex gap-3 justify-center pt-4">
                <button
                  onClick={() => setShowSecretConfirm(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  やめておく
                </button>
                <button
                  onClick={() => {
                    setShowSecretConfirm(false);
                    setShowSecretModal(true);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold"
                >
                  確認する
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 秘密表示モーダル */}
      {showSecretModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🔓</span>
                  <span>秘密の回答</span>
                </h3>
                <button
                  onClick={() => setShowSecretModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 自分の秘密 */}
              {mySecretAnswer && (
                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                    <span>👤</span>
                    <span>あなたの秘密</span>
                  </h4>
                  {(() => {
                    const question = questions.find(q => q.id === mySecretAnswer.questionId);
                    if (!question) return null;
                    
                    return (
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-sm font-medium text-white">
                            {question.text}
                          </p>
                        </div>
                        
                        <div className="flex justify-center items-center gap-1 flex-wrap">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`relative w-8 h-8 rounded-full border-2 ${
                                option.value === mySecretAnswer.answer
                                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400 scale-110'
                                  : 'bg-white/10 border-white/30'
                              }`}
                            >
                              {option.value === mySecretAnswer.answer && (
                                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-center text-sm text-white/90 mt-2">
                          あなたの回答: <span className="font-bold text-purple-300">
                            {question.options.find(opt => opt.value === mySecretAnswer.answer)?.text}
                          </span>
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 相手の秘密 */}
              {partnerSecretAnswer && (
                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-pink-300 flex items-center gap-2">
                    <span>💑</span>
                    <span>相手の秘密</span>
                  </h4>
                  {(() => {
                    const question = questions.find(q => q.id === partnerSecretAnswer.questionId);
                    if (!question) return null;
                    
                    return (
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-sm font-medium text-white">
                            {question.text}
                          </p>
                        </div>
                        
                        <div className="flex justify-center items-center gap-1 flex-wrap">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`relative w-8 h-8 rounded-full border-2 ${
                                option.value === partnerSecretAnswer.answer
                                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400 scale-110'
                                  : 'bg-white/10 border-white/30'
                              }`}
                            >
                              {option.value === partnerSecretAnswer.answer && (
                                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <p className="text-center text-sm text-white/90 mt-2">
                          相手の回答: <span className="font-bold text-pink-300">
                            {question.options.find(opt => opt.value === partnerSecretAnswer.answer)?.text}
                          </span>
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="text-center pt-4">
                <button
                  onClick={() => setShowSecretModal(false)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompatibilityResults;
