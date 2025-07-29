'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { Heart, Users, ArrowRight, Check, Download, Share2, RefreshCw, User, Copy, Twitter, MessageCircle, X, ChevronUp, ChevronDown } from 'lucide-react';
import html2canvas from 'html2canvas';
import { generateCompatibilityShareText, copyToClipboard } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import Image from 'next/image';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';
import Fireworks from './Fireworks';
import HeartRain from './HeartRain';
import { PositionDescriptionModal } from './PositionDescriptionModal';
import { Position48, positions48 } from '../data/positions48';

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
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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

  const [isDownloading, setIsDownloading] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showHeartRain, setShowHeartRain] = useState(false);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [selectedPosition, setSelectedPosition] = useState<Position48 | null>(null);
  
  // Toggle section function
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const calculateCompatibility = (user: TestResult, partner: TestResult): CompatibilityResult & { axisScores: { E: number, L: number, A: number, L2: number, O: number } } => {
    // 各軸の相性スコアを計算（類似軸と補完軸で異なる計算方法）
    
    // 外向性(E)/内向性(I) - 類似軸
    const eScore = 100 - Math.abs(user.E - partner.E);
    
    // リード(L)/フォロー(F) - 補完軸
    // 合計値が100に近いほど良い
    const lScore = 100 - Math.abs((user.L + partner.L) - 100);
    
    // 冒険(A)/安定(S) - 類似軸
    const aScore = 100 - Math.abs(user.A - partner.A);
    
    // ラブ(L)/フリー(F) - 類似軸
    const l2Score = 100 - Math.abs(user.L2 - partner.L2);
    
    // 開放(O)/秘密(S) - 類似軸
    const oScore = 100 - Math.abs(user.O - partner.O);
    
    // 公開タグの相性スコアを計算
    let tagCompatibilityScore = 0;
    let tagBonus = 0;
    
    // ユーザーとパートナーのタグを取得
    const userTagsArray = user.additionalResults?.tags || [];
    const partnerTagsArray = partner.additionalResults?.tags || [];
    const userTags = new Set(userTagsArray);
    const partnerTags = new Set(partnerTagsArray);
    
    // 共通タグの数をカウント
    const commonTags = userTagsArray.filter(tag => partnerTags.has(tag));
    const totalUniqueTags = new Set([...userTagsArray, ...partnerTagsArray]).size;
    
    // タグベースの相性計算
    if (totalUniqueTags > 0) {
      // 共通タグ率（0-100%）
      const commonTagRatio = (commonTags.length / totalUniqueTags) * 100;
      
      // 特定のタグの組み合わせによるボーナス
      if (userTags.has('🔥 欲望の炎') && partnerTags.has('🔥 欲望の炎')) {
        tagBonus += 10; // 両方情熱的
      }
      if (userTags.has('🛁 アフターケア必須') && partnerTags.has('🛁 アフターケア必須')) {
        tagBonus += 8; // 両方ケア重視
      }
      if (userTags.has('💬 言語プレイ派') && partnerTags.has('💬 言語プレイ派')) {
        tagBonus += 6; // 言葉責めの相性
      }
      if (userTags.has('🕯 ロマン重視') && partnerTags.has('🕯 ロマン重視')) {
        tagBonus += 8; // ロマンチックな相性
      }
      if ((userTags.has('🌙 深夜エロス') && partnerTags.has('🌙 深夜エロス')) ||
          (userTags.has('☀️ 朝型エロス') && partnerTags.has('☀️ 朝型エロス'))) {
        tagBonus += 5; // 同じ時間帯の好み
      }
      if (userTags.has('🔄 リピート求め派') && partnerTags.has('🔄 リピート求め派')) {
        tagBonus += 7; // 両方リピート重視
      }
      if (userTags.has('🗣 下ネタOK') && partnerTags.has('🗣 下ネタOK')) {
        tagBonus += 5; // コミュニケーションの相性
      }
      
      // 相反するタグによるペナルティ
      if ((userTags.has('⚡️ スピード勝負派') && partnerTags.has('🕯 ロマン重視')) ||
          (userTags.has('🕯 ロマン重視') && partnerTags.has('⚡️ スピード勝負派'))) {
        tagBonus -= 10; // テンポの不一致
      }
      if ((userTags.has('🌙 深夜エロス') && partnerTags.has('☀️ 朝型エロス')) ||
          (userTags.has('☀️ 朝型エロス') && partnerTags.has('🌙 深夜エロス'))) {
        tagBonus -= 8; // 時間帯の不一致
      }
      if ((userTags.has('🏃‍♂️ 衝動トリガー型') && partnerTags.has('📅 準備派')) ||
          (userTags.has('📅 準備派') && partnerTags.has('🏃‍♂️ 衝動トリガー型'))) {
        tagBonus -= 8; // スタイルの不一致
      }
      
      // タグ相性スコア = 共通タグ率 + ボーナス（最大100）
      tagCompatibilityScore = Math.min(100, Math.max(0, commonTagRatio + tagBonus));
    }
    
    // 総合相性度を計算（5軸70%、タグ30%の重み付け）
    const axisCompatibility = (eScore * 0.15) + (lScore * 0.3) + (aScore * 0.25) + (l2Score * 0.2) + (oScore * 0.1);
    const compatibility = Math.max(0, Math.min(100, 
      (axisCompatibility * 0.7) + (tagCompatibilityScore * 0.3)
    ));

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
      }
    };
  };

  const compatibility = calculateCompatibility(myResult, partnerResult);
  const shareText = generateCompatibilityShareText(myResult, partnerResult, Math.round(compatibility.compatibility));
  
  // カウントアップアニメーション用
  const animatedScore = useCountUp(Math.round(compatibility.compatibility), 4000, animationStarted);
  
  // コンポーネントマウント時にアニメーションを開始
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);
      setShowHeartRain(true); // ハートレインを開始
      
      // カウントアップが終わったらハートレインを停止
      setTimeout(() => {
        setShowHeartRain(false);
      }, 5000);
      
      // 80%以上の場合、ハートレインが終わるタイミングで花火表示
      if (compatibility.compatibility >= 80) {
        setTimeout(() => {
          setShowFireworks(true);
          // 4秒後に非表示
          setTimeout(() => {
            setShowFireworks(false);
          }, 4000);
        }, 5000); // ハートレインが終わるタイミング
      }
    }, 500); // 少し遅延を入れて自然に
    
    return () => clearTimeout(timer);
  }, [compatibility.compatibility]);

  // 夜の相性分析を生成
  const generateIntimateCompatibility = () => {
    // L/F軸、A/S軸、O/S軸、公開タグを使った詳細なプレイ分析
    const myTags = myResult.additionalResults?.tags || [];
    const partnerTags = partnerResult.additionalResults?.tags || [];
    
    // 両者のタグを統合
    const combinedTags = new Set([...myTags, ...partnerTags]);
    const sharedTags = myTags.filter(tag => partnerTags.includes(tag));
    
    // おすすめプレイの詳細な分析を開始
    let recommendedPlay = '';
    
    // 1. 基本的な相性パターンの分析（L/F軸）
    const lAxisAnalysis = () => {
      if (myResult.L > 70 && partnerResult.L < 30) {
        return 'あなたが完全にリードし、相手が身を委ねる理想的なD/s関係。あなたの支配欲と相手の服従欲が完璧にマッチしています。';
      } else if (myResult.L < 30 && partnerResult.L > 70) {
        return '相手があなたを導き、あなたが従う美しい主従関係。相手の支配欲とあなたの服従欲が調和しています。';
      } else if (myResult.L > 60 && partnerResult.L > 60) {
        return '両者ともリード好き。主導権を奪い合う激しい関係になりそう。交代制を採用することで、お互いの欲求を満たせます。';
      } else if (myResult.L < 40 && partnerResult.L < 40) {
        return 'お互いに受け身な優しい関係。相手を思いやりながら、ゆっくりと愛を育んでいけます。';
      } else if (Math.abs(myResult.L - partnerResult.L) < 20) {
        return '対等な関係で、その時の気分によって役割を自然に交代できる柔軟な関係性。';
      } else {
        return '適度な主従関係のバランスが取れており、お互いの役割が自然に決まります。';
      }
    };
    
    recommendedPlay += lAxisAnalysis();
    
    // 2. プレイスタイルの詳細分析（E/I軸とA/S軸）
    const playStyleAnalysis = () => {
      let style = '';
      
      // E/I軸による積極性
      if (myResult.E > 70 && partnerResult.E > 70) {
        style += '二人とも積極的で情熱的。激しく求め合い、時間を忘れて没頭する関係。';
      } else if (myResult.E < 30 && partnerResult.E < 30) {
        style += '二人とも控えめで優しい性格。ゆっくりと時間をかけて、相手の反応を確かめながら進める繊細な関係。';
      } else if (Math.abs(myResult.E - partnerResult.E) > 50) {
        style += '積極性に差があるため、より積極的な方が優しくリードすることが大切。';
      }
      
      // A/S軸による冒険心
      if (myResult.A > 70 && partnerResult.A > 70) {
        style += '新しいプレイや体位に挑戦することに抵抗がない二人。マンネリとは無縁の刺激的な関係を築けます。';
      } else if (myResult.A < 30 && partnerResult.A < 30) {
        style += '慣れ親しんだ方法を大切にする二人。安心感の中で深い愛情を育めます。';
      } else if ((myResult.A > 60 && partnerResult.A < 40) || (myResult.A < 40 && partnerResult.A > 60)) {
        style += '冒険派と安定派の組み合わせ。冒険派が新しい提案をし、安定派が受け入れやすいペースで進めることが重要。';
      }
      
      return style;
    };
    
    recommendedPlay += playStyleAnalysis();
    
    // 3. コミュニケーションスタイル（O/S軸）
    const communicationAnalysis = () => {
      if (myResult.O > 70 && partnerResult.O > 70) {
        return '欲望を隠さず素直に伝え合える最高の関係。お互いの願望を叶え合うことで、満足度の高い時間を過ごせます。';
      } else if (myResult.O < 30 && partnerResult.O < 30) {
        return '言葉よりも行動で示す二人。相手の表情や反応を細かく観察し、無言のコミュニケーションで深く理解し合えます。';
      } else if ((myResult.O > 60 && partnerResult.O < 40) || (myResult.O < 40 && partnerResult.O > 60)) {
        return 'オープンな方が相手の本音を優しく引き出してあげることが大切。焦らず、相手のペースに合わせて心を開いてもらいましょう。';
      } else {
        return '適度にオープンで、必要な時は素直に伝え合える健全な関係。';
      }
    };
    
    recommendedPlay += communicationAnalysis();
    
    // 4. L2軸（Love/Free）による関係性の深さ
    const emotionalDepthAnalysis = () => {
      if (myResult.L2 > 70 && partnerResult.L2 > 70) {
        return '深い愛情を持って接する二人。体だけでなく心も繋がり、特別な関係を築けます。';
      } else if (myResult.L2 < 30 && partnerResult.L2 < 30) {
        return '自由な関係を好む二人。お互いに縛られず、その時の気分で楽しめる大人の関係。';
      } else if (Math.abs(myResult.L2 - partnerResult.L2) > 50) {
        return '愛情の示し方に違いがあります。お互いの価値観を尊重し、関係性の定義を明確にすることが大切。';
      }
      return '';
    };
    
    const emotionalDepth = emotionalDepthAnalysis();
    if (emotionalDepth) recommendedPlay += emotionalDepth;
    
    // 5. 公開タグによる具体的なプレイ提案
    const tagBasedRecommendations = () => {
      let recommendations = '';
      
      // 言語・コミュニケーション系
      if (combinedTags.has('💬 言語プレイ派')) {
        recommendations += '言葉責めや甘い囁きで興奮を高め合いましょう。恥ずかしい言葉も、二人だけの秘密の呪文に。';
      }
      if (combinedTags.has('🗣 下ネタOK')) {
        recommendations += '性的な会話を楽しみながら、お互いの欲望を確認し合える開放的な関係。';
      }
      
      // ムード・準備系
      if (combinedTags.has('🕯 ロマン重視')) {
        recommendations += 'キャンドルの灯り、優しい音楽、アロマの香り。五感すべてで愛を感じる特別な時間を作りましょう。';
      }
      if (combinedTags.has('🎧 感覚演出派')) {
        recommendations += '音楽や照明、香りなど、五感を刺激する演出で非日常的な空間を創造。';
      }
      if (combinedTags.has('📅 準備派')) {
        recommendations += '事前の準備を大切に。お互いの好みを確認し、特別な夜のための計画を立てましょう。';
      }
      
      // テンポ・スタイル系
      if (combinedTags.has('⚡️ スピード勝負派')) {
        recommendations += '情熱に身を任せた激しく短いセッション。燃え上がる炎のような時間を。';
      }
      if (combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
        recommendations += '予期せぬタイミングでの情熱的な出会い。日常の中に潜む特別な瞬間を逃さずに。';
      }
      
      // 欲望・情熱系
      if (combinedTags.has('🔥 欲望の炎')) {
        recommendations += '抑えきれない情熱をぶつけ合う激しい時間。お互いの欲望を解放し、限界まで求め合いましょう。';
      }
      if (combinedTags.has('🔄 リピート求め派')) {
        recommendations += '一度では満足できない貪欲な関係。何度も求め合い、そのたびに新しい快感を発見。';
      }
      
      // ケア・安全系
      if (combinedTags.has('🛁 アフターケア必須')) {
        recommendations += '激しい時間の後は、優しく抱きしめ合い、お互いをケア。愛情を確認し合う大切な時間。';
      }
      if (combinedTags.has('🧼 ケア＆衛生重視')) {
        recommendations += '清潔感を大切に、お互いを思いやる丁寧なプレイ。心も体も清らかに。';
      }
      if (combinedTags.has('🛡 安全第一派')) {
        recommendations += '安全性を最優先に、お互いが安心して楽しめる環境作りを。';
      }
      
      // 境界・コミュニケーション系  
      if (combinedTags.has('🚪 NG明確')) {
        recommendations += 'お互いの境界線を明確にし、絶対に越えてはいけないラインを共有。安心感の中で楽しめます。';
      }
      if (combinedTags.has('🙈 言い出しにくい派')) {
        recommendations += '言葉にしにくい欲望も、少しずつ打ち明けられる信頼関係を築きましょう。';
      }
      
      // 時間帯系
      if (combinedTags.has('🌙 深夜エロス') && combinedTags.has('☀️ 朝型エロス')) {
        recommendations += '24時間いつでも求め合える情熱的な関係。朝の優しい光も、夜の妖艶な闇も、二人の舞台に。';
      } else if (combinedTags.has('🌙 深夜エロス')) {
        recommendations += '夜の静けさの中で、秘密めいた時間を共有。暗闇が二人をより大胆にさせます。';
      } else if (combinedTags.has('☀️ 朝型エロス')) {
        recommendations += '朝の清々しい空気の中で、新しい一日を特別な形で始める幸せ。';
      }
      
      // 探求系
      if (combinedTags.has('⛏️ 開拓派')) {
        recommendations += '未知の領域を開拓する冒険心。お互いの新しい一面を発見し続ける探求の旅。';
      }
      
      return recommendations;
    };
    
    recommendedPlay += tagBasedRecommendations();
    
    // 6. 共通タグによる特別な相性
    if (sharedTags.length > 0) {
      recommendedPlay += `\n\n【特別な相性】\n`;
      if (sharedTags.length === 1) {
        recommendedPlay += `共通の嗜好「${sharedTags[0]}」が二人を強く結びつけます。この共通点を大切に、理解し合える関係を深めていけるでしょう。`;
      } else if (sharedTags.length <= 3) {
        recommendedPlay += `${sharedTags.join('、')}という共通の嗜好が、二人の相性を特別なものにしています。お互いを深く理解し合える最高のパートナー。`;
      } else {
        recommendedPlay += `驚くほど多くの共通点（${sharedTags.length}個）を持つ二人。まるで運命的な出会いのような、深い理解と共感に基づく関係を築けます。`;
      }
    }
    
    // プレイのポイント部分を削除
    // recommendedPlay += overallAdvice(); の行も削除
    
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
        if (tags.includes('🌙 深夜エロス') || tags.includes('☀️ 朝型エロス')) baseLevel += 5;
        
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
    
    // S/M相性（5軸データと公開タグから精細化）
    const generateSMCompatibility = () => {
      // タグを取得
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);
      
      // S/M傾向の計算（L軸だけでなく複数要素を考慮）
      const calculateSMScore = (result: any, tags: string[]) => {
        let sScore = 0;
        let mScore = 0;
        
        // L軸（リード/フォロー）が基本
        if (result.L > 50) {
          sScore += result.L - 50;
        } else {
          mScore += 50 - result.L;
        }
        
        // A軸（冒険/安定）でS傾向を調整
        if (result.A > 60) {
          sScore += 10; // 冒険的な人はS傾向が強まる
        }
        
        // O軸（開放/秘密）でS傾向を調整
        if (result.O > 60) {
          sScore += 5; // 開放的な人は主導しやすい
        } else if (result.O < 40) {
          mScore += 5; // 秘密主義の人は従いやすい
        }
        
        // タグによる加算
        if (tags.includes('🧷 軽SM耐性あり')) {
          // どちらの傾向も少し上がる（スイッチ的）
          sScore += 10;
          mScore += 10;
        }
        if (tags.includes('⛏️ 開拓派')) {
          sScore += 15; // 開拓派はS傾向
        }
        if (tags.includes('🚪 NG明確')) {
          sScore += 5; // 境界線を明確にする人は主導的
        }
        if (tags.includes('🙈 言い出しにくい派')) {
          mScore += 10; // 言い出しにくい人はM傾向
        }
        if (tags.includes('🛁 アフターケア必須')) {
          mScore += 5; // ケアを求める人は若干M傾向
        }
        if (tags.includes('💬 言語プレイ派')) {
          sScore += 5; // 言葉責めはS傾向
        }
        
        return { sScore: Math.min(100, sScore), mScore: Math.min(100, mScore) };
      };
      
      const myScores = calculateSMScore(myResult, myTags);
      const partnerScores = calculateSMScore(partnerResult, partnerTags);
      
      // 傾向の判定
      const getTendency = (scores: { sScore: number; mScore: number }) => {
        if (scores.sScore > scores.mScore + 20) return 'S';
        if (scores.mScore > scores.sScore + 20) return 'M';
        return 'Switch';
      };
      
      const myTendency = getTendency(myScores);
      const partnerTendency = getTendency(partnerScores);
      
      // 相性分析
      let analysis = '';
      
      if (myTendency === 'S' && partnerTendency === 'M') {
        analysis = 'ド安定な主従関係。あなたがリードし、相手が従う理想的な構図';
        if (combinedTags.has('🧷 軽SM耐性あり')) {
          analysis += '。軽いSMプレイも楽しめそう';
        }
      } else if (myTendency === 'M' && partnerTendency === 'S') {
        analysis = '完璧な支配関係。相手に導かれることで最高の快感を得られる';
        if (combinedTags.has('🛁 アフターケア必須')) {
          analysis += '。アフターケアもバッチリ';
        }
      } else if (myTendency === 'S' && partnerTendency === 'S') {
        analysis = '主導権の取り合い勃発かも。交互にリードする工夫が必要';
        if (myScores.sScore > partnerScores.sScore) {
          analysis += '。基本的にはあなたがリード';
        }
      } else if (myTendency === 'M' && partnerTendency === 'M') {
        analysis = '優しい愛撫の応酬。お互いを思いやる穏やかな関係';
        if (combinedTags.has('🕯 ロマン重視')) {
          analysis += '。ロマンチックな雰囲気で';
        }
      } else if (myTendency === 'Switch' || partnerTendency === 'Switch') {
        analysis = '交代プレイが楽しめる。気分や状況で立場を変えられる柔軟な関係';
        if (combinedTags.has('🎭 ロールプレイ好き')) {
          analysis += '。ロールプレイで役割交代も';
        }
      } else {
        analysis = 'バランスの取れた関係。お互いの気持ちを尊重しながら楽しめる';
      }
      
      // 特定のタグによる追加アドバイス
      if (combinedTags.has('💬 言語プレイ派') && (myTendency === 'S' || partnerTendency === 'S')) {
        analysis += '。言葉責めで更に興奮度アップ';
      }
      if (combinedTags.has('🚪 NG明確') && combinedTags.has('🙈 言い出しにくい派')) {
        analysis += '。事前の話し合いが重要';
      }
      
      return analysis;
    };
    
    const smCompatibility = generateSMCompatibility();
    
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
        if (tags.includes('📅 準備派')) score -= 15;
        if (tags.includes('🛁 アフターケア必須')) score -= 10;
        if (tags.includes('🙈 言い出しにくい派')) score -= 15;
        
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
        
        if (combinedTags.has('📅 準備派')) {
          analysis += '。相手のペースを尊重して';
        } else if (myScore >= 70) {
          analysis += '。焦らずじっくり関係を築いて';
        }
      } else if (myAnswer === 'NO' && partnerAnswer === 'YES') {
        analysis = '価値観の違いに注意。相手の積極性に戸惑うかも';
        
        if (combinedTags.has('🙈 言い出しにくい派')) {
          analysis += '。断りづらい時は正直に伝えて';
        } else if (combinedTags.has('🚪 NG明確')) {
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
      // タグを取得
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);
      
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
      
      // 致命的な違いをチェック
      if ((myTags.includes('🕯 ロマン重視') && partnerTags.includes('⚡️ スピード勝負派')) ||
          (partnerTags.includes('🕯 ロマン重視') && myTags.includes('⚡️ スピード勝負派'))) {
        tagDifferences.critical++;
      }
      if ((myTags.includes('📅 準備派') && partnerTags.includes('🏃‍♂️ 衝動トリガー型')) ||
          (partnerTags.includes('📅 準備派') && myTags.includes('🏃‍♂️ 衝動トリガー型'))) {
        tagDifferences.critical++;
      }
      
      // 大きな違いをチェック
      if ((myTags.includes('🛁 アフターケア必須') && !partnerTags.includes('🛁 アフターケア必須')) ||
          (!myTags.includes('🛁 アフターケア必須') && partnerTags.includes('🛁 アフターケア必須'))) {
        tagDifferences.significant++;
      }
      if ((myTags.includes('🚪 NG明確') && partnerTags.includes('🙈 言い出しにくい派')) ||
          (partnerTags.includes('🚪 NG明確') && myTags.includes('🙈 言い出しにくい派'))) {
        tagDifferences.significant++;
      }
      
      // タグの違いをスコアに反映
      gapScore += tagDifferences.critical * 20;
      gapScore += tagDifferences.significant * 10;
      
      // ギャップ分析文を生成
      let analysis = '';
      
      if (gapScore < 25) {
        analysis = 'ほぼ完璧な相性！価値観が驚くほど一致';
        
        // 共通タグがある場合
        const sharedTags = myTags.filter(tag => partnerTags.includes(tag));
        if (sharedTags.length > 3) {
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
      if (myTags.includes('🔥 欲望の炎') && partnerTags.includes('🔥 欲望の炎')) {
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
      if ((myTags.includes('📅 準備派') && partnerTags.includes('🏃‍♂️ 衝動トリガー型')) ||
          (partnerTags.includes('📅 準備派') && myTags.includes('🏃‍♂️ 衝動トリガー型'))) {
        stabilityScore -= 20; // 相反する性質
      }
      
      // 4. 情熱の持続性
      passionScore = (physicalIntensity + emotionalDepth) / 2;
      if (combinedTags.has('🌙 深夜エロス') || combinedTags.has('☀️ 朝型エロス')) {
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
      if (combinedTags.has('🚪 NG明確') && combinedTags.has('🙈 言い出しにくい派')) {
        prediction += 'コミュニケーションの改善が必須です。';
        prediction += '一方はNGを明確に持っているのに、もう一方は言い出しにくい性格のため、誤解や不満が溜まりやすい関係性です。';
        prediction += '定期的に本音で話し合う機会を作り、お互いの境界線を尊重することが大切でしょう。';
      }
      if (sharedTags.includes('🛁 アフターケア必須') && emotionalDepth >= 50) {
        prediction += '優しさが絆を深める鍵となります。';
        prediction += '激しい夜の後の優しいケアが、二人の関係をより深いものにしていくでしょう。';
        prediction += 'お互いを大切に思う気持ちが、日々の行動に表れる素敵な関係性です。';
      }
      if (combinedTags.has('🌙 深夜エロス') && combinedTags.has('☀️ 朝型エロス')) {
        prediction += '時間帯の好みは違えど、24時間いつでも求め合える情熱的な関係になりそうです。';
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
      smCompatibility,
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
    if (score >= 60) return <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />;
    return <Users className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />;
  };

  // ダウンロード機能
  const handleDownload = async () => {
    if (!downloadRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(downloadRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      } as any);

      // Canvasを画像として保存
      const link = document.createElement('a');
      link.download = `相性診断結果_${myResult.type.code}_${partnerResult.type.code}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('ダウンロードに失敗しました:', error);
      alert('ダウンロードに失敗しました。もう一度お試しください。');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* お祝いの花火 */}
      {showFireworks && <Fireworks />}
      
      {/* ダウンロード用のコンテナ */}
      <div ref={downloadRef}>
        {/* Hero Section */}
        <div className="text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimation animation="fadeIn" duration={800}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 select-none text-center">
                <NeonText text={["相性", "診断結果"]} specialCharIndex={1} className="gap-1" />
              </h1>
            </ScrollAnimation>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* 相性診断結果ページコンテナ */}
          <div className="rounded-2xl shadow-2xl overflow-hidden border-2 border-white/30" style={{backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'}}>
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
              
              {/* 相性スコア */}
              <ScrollAnimation animation="fadeInUp" delay={200}>
              <div className="rounded-xl shadow-lg p-4 sm:p-6 bg-white/10 backdrop-blur-sm border border-white/5 relative">
            {/* ハートレインアニメーション（コンテナ内） */}
            {showHeartRain && <HeartRain />}
            
            <div className="text-center relative z-10">
              <div className="flex items-center justify-center mb-4 sm:mb-6 animate-pulse">
                {getCompatibilityIcon(compatibility.compatibility)}
                <span className="ml-3 sm:ml-4 text-5xl sm:text-6xl md:text-7xl font-bold text-pink-400">
                  {animatedScore}%
                </span>
              </div>
              <p className="text-base sm:text-lg font-medium text-[#e0e7ff]/90 leading-relaxed">
                {compatibility.description}
              </p>
            </div>
          </div>
              </ScrollAnimation>

              {/* 相性レーダーチャート */}
              <ScrollAnimation animation="fadeInUp" delay={400}>
              <div className="rounded-xl shadow-lg p-6 bg-white/10 backdrop-blur-sm border border-white/5">
                <div className="flex justify-center">
                  <RadarChart axisScores={compatibility.axisScores} totalScore={compatibility.compatibility} />
                </div>
              </div>
              </ScrollAnimation>

              {/* 夜の相性診断カード */}
              <ScrollAnimation animation="fadeInUp" delay={600}>
              <div className="rounded-xl shadow-lg p-4 sm:p-6 bg-white/10 backdrop-blur-sm border border-white/5">
                <h3 className="text-lg sm:text-xl font-bold text-[#e0e7ff] mb-4 sm:mb-6 text-center">相性診断カード</h3>
                <div className="space-y-2">
                  {/* ① おすすめプレイ */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('recommendedPlay')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🛏</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">2人のおすすめプレイ</h4>
                      </div>
                      {openSections.recommendedPlay ? <ChevronUp className="w-5 h-5 text-[#e0e7ff]" /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff]" />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.recommendedPlay ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff]/80 text-sm break-words">{intimateCompatibility.recommendedPlay}</p>
                      </div>
                    </div>
                  </div>

                  {/* ② おすすめ体位 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('recommendedPosition')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🧘‍♀️</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">2人のおすすめ体位（48手）</h4>
                      </div>
                      {openSections.recommendedPosition ? <ChevronUp className="w-5 h-5 text-[#e0e7ff]" /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff]" />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.recommendedPosition ? 'max-h-[600px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2">
                        {/* 体位カード形式で表示 */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          {intimateCompatibility.recommendedPositions.map((position: any, index: number) => (
                            <div 
                              key={position.id} 
                              className="bg-white/10 border border-white/20 rounded-lg p-3 relative cursor-pointer hover:bg-white/20 transition-colors"
                              onClick={() => setSelectedPosition(position)}
                            >
                              <span className="absolute top-3 right-3 text-xs text-[#e0e7ff]/60">No.{position.id}</span>
                              <div className="text-center mb-2">
                                <h5 className="font-semibold text-[#e0e7ff]">{position.name}</h5>
                              </div>
                              <p className="text-xs text-[#e0e7ff]/70 mb-2 text-center">（{position.kana || position.name}）</p>
                              <div className="flex flex-wrap gap-1 justify-center mb-2">
                                {position.moods.map((mood: string) => {
                                  const moodColors: { [key: string]: string } = {
                                    'romantic': 'bg-pink-500/20 border-pink-400 text-pink-300',
                                    'wild': 'bg-red-500/20 border-red-400 text-red-300',
                                    'playful': 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
                                    'technical': 'bg-purple-500/20 border-purple-400 text-purple-300',
                                    'foreplay': 'bg-blue-500/20 border-blue-400 text-blue-300'
                                  };
                                  const moodDescriptions: { [key: string]: string } = {
                                    'romantic': 'ロマンチック',
                                    'wild': 'ワイルド',
                                    'playful': 'プレイフル',
                                    'technical': 'テクニカル',
                                    'foreplay': '愛撫'
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
                                <span className="text-xs text-[#e0e7ff]/50">
                                  難易度: {position.difficulty === 'easy' ? '★☆☆' : position.difficulty === 'medium' ? '★★☆' : '★★★'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-[#e0e7ff]/80 text-sm text-center mt-2">
                          {intimateCompatibility.recommendedPosition}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ③ 性欲バランス */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('libidoBalance')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🔥</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">性欲の強さバランス</h4>
                      </div>
                      {openSections.libidoBalance ? <ChevronUp className="w-5 h-5 text-[#e0e7ff]" /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff]" />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.libidoBalance ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff]/80 text-sm break-words">{intimateCompatibility.libidoBalance}</p>
                      </div>
                    </div>
                  </div>

                  {/* ④ S/M相性 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('smCompatibility')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">😈</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">S/Mの相性</h4>
                      </div>
                      {openSections.smCompatibility ? <ChevronUp className="w-5 h-5 text-[#e0e7ff]" /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff]" />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.smCompatibility ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff]/80 text-sm break-words">{intimateCompatibility.smCompatibility}</p>
                      </div>
                    </div>
                  </div>

                  {/* ⑤ 付き合う前の価値観 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('beforeRelationship')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">💋</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">付き合う前にXできるか？（価値観）</h4>
                      </div>
                      {openSections.beforeRelationship ? <ChevronUp className="w-5 h-5 text-[#e0e7ff]" /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff]" />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.beforeRelationship ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff]/80 text-sm break-words">{intimateCompatibility.beforeRelationship}</p>
                      </div>
                    </div>
                  </div>

                  {/* ⑥ ギャップ度 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('gapAnalysis')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">⚡</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">相性ギャップ度（思考＆欲望のズレ）</h4>
                      </div>
                      {openSections.gapAnalysis ? <ChevronUp className="w-5 h-5 text-[#e0e7ff]" /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff]" />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.gapAnalysis ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff]/80 text-sm break-words">{intimateCompatibility.gapAnalysis}</p>
                      </div>
                    </div>
                  </div>

                  {/* ⑦ 関係性予測 */}
                  <div className="overflow-hidden">
                    <button
                      onClick={() => toggleSection('relationshipPrediction')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">💞</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">関係性の行き先予測</h4>
                      </div>
                      {openSections.relationshipPrediction ? <ChevronUp className="w-5 h-5 text-[#e0e7ff]" /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff]" />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.relationshipPrediction ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff]/80 text-sm break-words">{intimateCompatibility.relationshipPrediction}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </ScrollAnimation>

              {/* ダウンロード・シェアボタン */}
              <ScrollAnimation animation="fadeInUp" delay={800}>
              <div className="text-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>ダウンロード中...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>結果をダウンロード</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2 shadow-lg text-sm sm:text-base"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>結果をシェア</span>
                  </button>
                </div>
              </div>
              </ScrollAnimation>

              {/* アクションボタン */}
              <ScrollAnimation animation="fadeInUp" delay={1000}>
              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={onBack}
                    className="px-4 sm:px-6 py-2 sm:py-3 border border-white/20 text-[#e0e7ff] bg-white/10 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <ArrowRight className="w-5 h-5 transform rotate-180" />
                    <span>相性診断に戻る</span>
                  </button>
                  
                  <button
                    onClick={onNewTest}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>新しい相性診断</span>
                  </button>
                </div>
              </div>
              </ScrollAnimation>
              
            </div>
          </div>
        </div>
      </div>

      {/* シェアモーダル */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2e] rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-xl font-bold text-[#e0e7ff]">相性診断結果をシェア</h2>
              <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5 text-[#e0e7ff]" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <textarea
                value={shareText}
                readOnly
                className="w-full p-3 border border-white/20 bg-white/10 text-[#e0e7ff] rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={8}
              />
              <div className="space-y-3">
                <h3 className="font-medium text-[#e0e7ff]">シェア方法を選択</h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* Twitter */}
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank', 'width=550,height=420')}
                    className="flex items-center justify-center space-x-3 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                    <span>Twitterでシェア</span>
                  </button>
                  {/* LINE */}
                  <button
                    onClick={() => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(shareText)}`, '_blank', 'width=550,height=420')}
                    className="flex items-center justify-center space-x-3 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>LINEでシェア</span>
                  </button>
                  {/* コピー */}
                  <button
                    onClick={async () => {
                      await copyToClipboard(shareText);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`flex items-center justify-center space-x-3 w-full py-3 px-4 rounded-lg transition-colors ${copied ? 'bg-green-500/20 text-green-400 border border-green-400/30' : 'bg-white/10 text-[#e0e7ff] hover:bg-white/20 border border-white/20'}`}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span>{copied ? 'コピーしました！' : 'テキストをコピー'}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/20 bg-white/5 rounded-b-xl">
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full bg-white/10 text-[#e0e7ff] py-2 px-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Position Description Modal */}
      <PositionDescriptionModal
        position={selectedPosition}
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />
    </div>
  );
};

export default CompatibilityResults; 