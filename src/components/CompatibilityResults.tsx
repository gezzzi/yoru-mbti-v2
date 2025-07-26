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
    
    // 総合相性度を計算（重み付き平均）
    const compatibility = Math.max(0, Math.min(100, 
      (eScore * 0.15) + (lScore * 0.3) + (aScore * 0.25) + (l2Score * 0.2) + (oScore * 0.1)
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
    // おすすめプレイ
    const playStyles = {
      dominant: ['緊縛', '命令', '支配', '焦らし'],
      submissive: ['奉仕', '服従', '手コキ', 'フェラ'],
      balanced: ['愛撫', 'キス', '前戯', 'マッサージ']
    };
    
    const myDominance = myResult.L > 50 ? 'dominant' : 'submissive';
    const partnerDominance = partnerResult.L > 50 ? 'dominant' : 'submissive';
    
    let recommendedPlay = '';
    if (myDominance === 'dominant' && partnerDominance === 'submissive') {
      recommendedPlay = `${playStyles.dominant[Math.floor(Math.random() * playStyles.dominant.length)]} × ${playStyles.submissive[Math.floor(Math.random() * playStyles.submissive.length)]} → 完璧な主従関係`;
    } else if (myDominance === 'submissive' && partnerDominance === 'dominant') {
      recommendedPlay = `${playStyles.submissive[Math.floor(Math.random() * playStyles.submissive.length)]} × ${playStyles.dominant[Math.floor(Math.random() * playStyles.dominant.length)]} → 理想的な支配関係`;
    } else if (myDominance === partnerDominance) {
      recommendedPlay = `${playStyles.balanced[Math.floor(Math.random() * playStyles.balanced.length)]} × ${playStyles.balanced[Math.floor(Math.random() * playStyles.balanced.length)]} → スイッチプレイ推奨`;
    }
    
    // おすすめ体位
    const positions = ['騎乗位', '正常位', '背面座位', 'バック', '立ちバック', '対面座位', '側位', '松葉崩し'];
    const myPosition = positions[Math.floor((myResult.A / 100) * positions.length)];
    const partnerPosition = positions[Math.floor((partnerResult.A / 100) * positions.length)];
    const positionAnalysis = myResult.A > 70 && partnerResult.A > 70 ? '激しい系' : 
                           myResult.A < 30 && partnerResult.A < 30 ? 'ゆったり系' : '焦らし系';
    
    // 性欲バランス
    const myLibido = myResult.E > 60 ? '強め' : myResult.E > 30 ? '普通' : '控えめ';
    const partnerLibido = partnerResult.E > 60 ? '強め' : partnerResult.E > 30 ? '普通' : '控えめ';
    let libidoBalance = '';
    if (myLibido === '強め' && partnerLibido === '強め') {
      libidoBalance = '毎晩バトルモード';
    } else if ((myLibido === '強め' && partnerLibido === '控えめ') || (myLibido === '控えめ' && partnerLibido === '強め')) {
      libidoBalance = '温度差注意！';
    } else {
      libidoBalance = 'バランス良好';
    }
    
    // S/M相性
    let smCompatibility = '';
    if (myResult.L > 70 && partnerResult.L < 30) {
      smCompatibility = 'S × M → ド安定な主従関係';
    } else if (myResult.L < 30 && partnerResult.L > 70) {
      smCompatibility = 'M × S → 完璧な支配関係';
    } else if (myResult.L > 70 && partnerResult.L > 70) {
      smCompatibility = 'S × S → 主導権の取り合い勃発かも';
    } else if (myResult.L < 30 && partnerResult.L < 30) {
      smCompatibility = 'M × M → 優しい愛撫の応酬';
    } else {
      smCompatibility = 'バランス型 → スイッチプレイが楽しめる';
    }
    
    // 付き合う前の価値観
    const myOpenness = myResult.L2 > 50 ? 'YES' : 'NO';
    const partnerOpenness = partnerResult.L2 > 50 ? 'YES' : 'NO';
    let beforeRelationship = '';
    if (myOpenness === 'YES' && partnerOpenness === 'YES') {
      beforeRelationship = '始まりはカラダから';
    } else if (myOpenness === 'YES' && partnerOpenness === 'NO') {
      beforeRelationship = '感情とタイミングが鍵';
    } else if (myOpenness === 'NO' && partnerOpenness === 'YES') {
      beforeRelationship = '価値観の違いに注意';
    } else {
      beforeRelationship = '恋愛から始まる正統派';
    }
    
    // ギャップ度
    const gapScore = Math.abs(myResult.E - partnerResult.E) + Math.abs(myResult.A - partnerResult.A);
    let gapAnalysis = '';
    if (gapScore > 100) {
      gapAnalysis = '温度差に注意！';
    } else if (gapScore > 50) {
      gapAnalysis = '主導権争いで火花が…';
    } else {
      gapAnalysis = '最高だけど衝突の可能性も';
    }
    
    // 関係性予測
    let relationshipPrediction = '';
    if (compatibility.compatibility >= 80) {
      relationshipPrediction = '夜から始まっても、深くつながれる関係かも';
    } else if (compatibility.compatibility >= 60) {
      relationshipPrediction = '体だけなら最高。でも恋は危険';
    } else {
      relationshipPrediction = 'セフレ向き。でも本気になると燃え尽き注意';
    }
    
    return {
      recommendedPlay,
      recommendedPosition: `${myPosition} × ${partnerPosition} → 対面で${positionAnalysis}`,
      libidoBalance: `${myLibido} × ${partnerLibido} → ${libidoBalance}`,
      smCompatibility,
      beforeRelationship: `${myOpenness} × ${partnerOpenness} → ${beforeRelationship}`,
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
                      openSections.recommendedPosition ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff]/80 text-sm break-words">{intimateCompatibility.recommendedPosition}</p>
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
    </div>
  );
};

export default CompatibilityResults; 