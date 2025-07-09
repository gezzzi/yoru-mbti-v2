'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { TestResult } from '../types/personality';
import { getCategoryColor, getCategoryName } from '../data/personalityTypes';
import { Heart, Users, Sparkles, RefreshCw, Download, Share2, User, Shield, Zap, Eye } from 'lucide-react';
import Image from 'next/image';
import SNSShareModal from './SNSShareModal';
import html2canvas from 'html2canvas';

// カテゴリごとの色設定を追加
const categoryColorSchemes = {
  dom: 'bg-red-200',
  sub: 'bg-pink-200',
  introvert: 'bg-purple-200',
  fantasy: 'bg-blue-200',
};

interface PersonalityDimension {
  id: string;
  leftLabel: string;
  rightLabel: string;
  percentage: number;
  color: string;
  resultLabel: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

interface ResultsProps {
  result: TestResult;
  onRestart: () => void;
}

// 画像または絵文字を表示するコンポーネント
const TypeImage: React.FC<{ typeCode: string; emoji: string; name: string }> = ({ typeCode, emoji, name }) => {
  const [imageError, setImageError] = useState(false);
  
  // タイプコードから基本の4文字を抽出（例：EDTA-R → EDTA）
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
    <div className="w-64 h-64 relative mx-auto">
      <Image
        src={`/images/personality-types/${baseTypeCode}.svg`}
        alt={name}
        width={256}
        height={256}
        className="w-full h-full object-contain"
        onError={handleImageError}
      />
    </div>
  );
};

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
  const { type } = result;
  const [hoveredDimension, setHoveredDimension] = useState<PersonalityDimension | null>(null);
  const [selectedDimension, setSelectedDimension] = useState<PersonalityDimension | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  // 診断結果をローカルストレージに保存
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('personality_test_result', JSON.stringify(result));
    }
  }, [result]);

  const getAxisName = (axis: string, value: number) => {
    const isPositive = value >= 50;
    
    switch (axis) {
      case 'E': return isPositive ? '外向性' : '内向性';
      case 'D': return isPositive ? '主導性' : '服従性';
      case 'T': return isPositive ? '刺激志向' : '安心志向';
      case 'R': return isPositive ? '羞恥体制' : '羞恥敏感';
      case 'A': return isPositive ? '愛着傾向' : '非愛着傾向';
      default: return axis;
    }
  };

  const getAxisValue = (axis: string) => {
    switch (axis) {
      case 'E': return result.E;
      case 'D': return result.D;
      case 'T': return result.T;
      case 'R': return result.R;
      case 'A': return result.A;
      default: return 0;
    }
  };

  const dimensions: PersonalityDimension[] = [
    {
      id: 'extraversion',
      leftLabel: '外向性(E)',
      rightLabel: '内向性(I)',
      percentage: result.E >= 50 ? result.E : (100 - result.E),
      color: 'bg-blue-500',
      resultLabel: result.E >= 50 ? '外向性(E)' : '内向性(I)',
      icon: <User className="w-4 h-4" />,
      description: result.E >= 50 
        ? '外向型の人は社交的で活動的、エネルギッシュな環境を好みます。'
        : '内向型の人は深く有意義で、かつ刺激でない交流を好みます。また、落ち着いた環境に惹かれる傾向にあります。',
      category: 'エネルギー'
    },
    {
      id: 'dominance',
      leftLabel: '主導(D)',
      rightLabel: '服従(S)',
      percentage: result.D >= 50 ? result.D : (100 - result.D),
      color: 'bg-orange-500',
      resultLabel: result.D >= 50 ? '主導(D)' : '服従(S)',
      icon: <Shield className="w-4 h-4" />,
      description: result.D >= 50
        ? '主導型の人はリーダーシップを発揮し、積極的に物事を進める傾向があります。決断力があり、チームを引っ張る力を持っています。'
        : '服従型の人は協調性を重視し、チームワークを大切にします。他者をサポートし、調和を保つことを得意とします。',
      category: 'リーダーシップ'
    },
    {
      id: 'stimulation',
      leftLabel: '刺激志向(T)',
      rightLabel: '安心志向(S)',
      percentage: result.T >= 50 ? result.T : (100 - result.T),
      color: 'bg-green-500',
      resultLabel: result.T >= 50 ? '刺激志向(T)' : '安心志向(S)',
      icon: <Zap className="w-4 h-4" />,
      description: result.T >= 50
        ? '刺激志向の人は新しい体験や冒険を求める傾向があります。変化を楽しみ、チャレンジングな状況を好みます。'
        : '安心志向の人は安定性と予測可能性を重視します。慣れ親しんだ環境や確実性を好む傾向があります。',
      category: '刺激'
    },
    {
      id: 'attachment',
      leftLabel: '愛着傾向(A)',
      rightLabel: '非愛着傾向(N)',
      percentage: result.A >= 50 ? result.A : (100 - result.A),
      color: 'bg-purple-500',
      resultLabel: result.A >= 50 ? '愛着傾向(A)' : '非愛着傾向(N)',
      icon: <Heart className="w-4 h-4" />,
      description: result.A >= 50
        ? '愛着傾向の人は深い人間関係を重視し、親密な絆を築くことを大切にします。感情的なつながりを求める傾向があります。'
        : '非愛着傾向の人は独立性を重視し、自立した関係を好みます。個人的な空間と自由を大切にします。',
      category: '愛着'
    },
    {
      id: 'shame',
      leftLabel: '羞恥体制(R)',
      rightLabel: '羞恥敏感(H)',
      percentage: result.R >= 50 ? result.R : (100 - result.R),
      color: 'bg-red-500',
      resultLabel: result.R >= 50 ? '羞恥体制(R)' : '羞恥敏感(H)',
      icon: <Eye className="w-4 h-4" />,
      description: result.R >= 50
        ? '羞恥体制の人は他人の評価に対して比較的強い耐性を持ち、自分の行動に自信を持って取り組む傾向があります。'
        : '羞恥敏感の人は他人の評価や反応に敏感で、周囲との調和を重視する傾向があります。',
      category: '羞恥'
    }
  ];

  // Default to the first dimension (extraversion), then to selected, then to hovered
  const currentDimension = hoveredDimension || selectedDimension || dimensions[0];

  const getResultColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'text-blue-600',
      'bg-orange-500': 'text-orange-600',
      'bg-green-500': 'text-green-600',
      'bg-purple-500': 'text-purple-600',
      'bg-red-500': 'text-red-600'
    };
    return colorMap[color] || 'text-gray-600';
  };

  const getBackgroundColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-500',
      'bg-orange-500': 'bg-orange-500',
      'bg-green-500': 'bg-green-500',
      'bg-purple-500': 'bg-purple-500',
      'bg-red-500': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getIndicatorCenterColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-500',
      'bg-orange-500': 'bg-orange-500',
      'bg-green-500': 'bg-green-500',
      'bg-purple-500': 'bg-purple-500',
      'bg-red-500': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getGradientColors = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'from-blue-50 to-blue-100',
      'bg-orange-500': 'from-orange-50 to-orange-100',
      'bg-green-500': 'from-green-50 to-green-100',
      'bg-purple-500': 'from-purple-50 to-purple-100',
      'bg-red-500': 'from-red-50 to-red-100'
    };
    return colorMap[color] || 'from-blue-50 to-purple-50';
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
      link.download = `夜の性格診断結果_${type.name}_${type.code}.png`;
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
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* タイトル */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight drop-shadow-lg flex justify-center gap-1 select-none">
            <span className="neon-pink" style={{color:'#f472b6',textShadow:'0 0 10px #f472b6,0 0 20px #ec4899,0 0 30px #be185d',animation:'pulsePink 2s ease-in-out infinite'}}>あ</span>
            <span className="neon-pink" style={{color:'#f472b6',textShadow:'0 0 10px #f472b6,0 0 20px #ec4899,0 0 30px #be185d',animation:'pulsePink 2s ease-in-out infinite'}}>な</span>
            <span className="neon-pink" style={{color:'#f472b6',textShadow:'0 0 10px #f472b6,0 0 20px #ec4899,0 0 30px #be185d',animation:'pulsePink 2s ease-in-out infinite'}}>た</span>
            <span className="neon-pink" style={{color:'#f472b6',textShadow:'0 0 10px #f472b6,0 0 20px #ec4899,0 0 30px #be185d',animation:'pulsePink 2s ease-in-out infinite'}}>の</span>
            <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>診</span>
            <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>断</span>
            <span className="neon-blue" style={{color:'#60a5fa',textShadow:'0 0 10px #60a5fa,0 0 20px #3b82f6,0 0 30px #1d4ed8',animation:'pulseBlue 2.5s ease-in-out infinite'}}>結</span>
            <span className="neon-blue" style={{color:'#60a5fa',textShadow:'0 0 10px #60a5fa,0 0 20px #3b82f6,0 0 30px #1d4ed8',animation:'pulseBlue 2.5s ease-in-out infinite'}}>果</span>
          </h1>
        </div>
        
        {/* ダウンロード用のコンテナ */}
        <div ref={downloadRef}>
        {/* Header Section */}
        <header className="sp-typeheader relative rounded-t-3xl overflow-hidden">
          <div className={`section__wrap relative z-10 ${categoryColorSchemes[type.category]} rounded-t-3xl overflow-hidden`}>
            {/* 中央配置：すべての要素 */}
            <div className="type-info px-8 py-12 flex flex-col items-center justify-center text-center w-full max-w-2xl mx-auto">
              {/* 性格タイプ名 */}
              <div className="font-head text-3xl md:text-4xl lg:text-5xl mb-10 mt-0 text-center text-gray-900 font-bold">
                {type.name}
              </div>
              <div className="code text-center mb-6">
                <h1 className="font-head text-2xl md:text-3xl m-0 text-green-900 font-bold">
                  {type.code}
                </h1>
              </div>
              {/* SVG画像 */}
              <div className="flex justify-center mb-8">
                <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="bg-gray-900/20 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-900/30 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
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
                  className="bg-gray-900/20 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-900/30 transition-all flex items-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>結果をシェア</span>
                </button>
              </div>
            </div>
            
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-b-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            
            {/* Introduction Section */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900">性格特性</h2>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <p className="text-gray-700 leading-relaxed mb-6">
                  {type.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">主な特徴:</h3>
                    <ul className="space-y-2">
                      {type.traits.map((trait, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">相性の良いタイプ:</h3>
                    <ul className="space-y-2">
                      {type.compatibility.map((compatType, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="font-mono">{compatType}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* New Graph Design */}
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Personality Dimensions */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">性格診断結果</h2>
                    
                    {dimensions.map((dimension) => (
                      <div 
                        key={dimension.id} 
                        className={`space-y-3 cursor-pointer transition-all duration-200 hover:scale-105 py-2 px-3 rounded-lg ${
                          currentDimension.id === dimension.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                        onMouseEnter={() => setHoveredDimension(dimension)}
                        onMouseLeave={() => {
                          setHoveredDimension(null);
                          setSelectedDimension(dimension);
                        }}
                      >
                        <div className="relative py-1">
                          {/* Percentage text above the graph - centered */}
                          <div className="text-center mb-2">
                            <span className={`text-sm font-bold ${getResultColor(dimension.color)}`}>
                              {dimension.percentage}% {dimension.resultLabel}
                            </span>
                          </div>
                          
                          <div className={`w-full ${getBackgroundColor(dimension.color)} rounded-full h-4 overflow-hidden relative transition-all duration-200 ${hoveredDimension?.id === dimension.id ? 'shadow-lg' : ''}`}>
                            <div className="absolute inset-0 bg-white/20"></div>
                            {(() => {
                              // Determine if this is a "reverse" axis (I, S, N, H)
                              const isReverse = dimension.resultLabel.includes('内向性') || 
                                              dimension.resultLabel.includes('服従') || 
                                              dimension.resultLabel.includes('安心志向') ||
                                              dimension.resultLabel.includes('非愛着傾向') || 
                                              dimension.resultLabel.includes('羞恥敏感');
                              
                              // For reverse axes, we need to position the circle from the opposite side
                              const circlePosition = isReverse ? (100 - dimension.percentage) : dimension.percentage;
                              
                              return (
                                <div 
                                  className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-white transition-all duration-300 flex items-center justify-center ${hoveredDimension?.id === dimension.id ? 'scale-125' : 'hover:scale-110'}`}
                                  style={{ left: `calc(${circlePosition}% - 10px)` }}
                                >
                                  <div className={`w-3 h-3 ${getIndicatorCenterColor(dimension.color)} rounded-full`}></div>
                                </div>
                              );
                            })()}
                          </div>
                          
                          {/* Labels below the graph */}
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm font-medium text-gray-600">
                              {dimension.leftLabel}
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              {dimension.rightLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Character & Results - Now on the right side */}
                  <div className="flex flex-col justify-center">
                    <div className={`bg-gradient-to-br ${getGradientColors(currentDimension.color)} rounded-xl p-6 text-center transition-all duration-300`}>
                      <div className="mb-4">
                        {/* Character Illustration Placeholder */}
                        <h3 className={`text-2xl font-bold mb-4 ${getResultColor(currentDimension.color)}`}>
                          {currentDimension.percentage}% {currentDimension.resultLabel}
                        </h3>
                      </div>
                      <div className="w-[187px] h-[187px] mx-auto mb-4 flex items-center justify-center">
                        <Image
                          src={(() => {
                            switch (currentDimension.id) {
                              case 'extraversion':
                                return result.E >= 50 ? '/images/axis/extraversion.svg' : '/images/axis/introversion.svg';
                              case 'dominance':
                                return result.D >= 50 ? '/images/axis/dominance.svg' : '/images/axis/submissiveness.svg';
                              case 'stimulation':
                                return result.T >= 50 ? '/images/axis/thrill.svg' : '/images/axis/stability.svg';
                              case 'attachment':
                                return result.A >= 50 ? '/images/axis/attachment.svg' : '/images/axis/non-attachment.svg';
                              case 'shame':
                                return result.R >= 50 ? '/images/axis/resistance.svg' : '/images/axis/hypersensitivity.svg';
                              default:
                                return '';
                            }
                          })()}
                          alt={currentDimension.leftLabel + '軸画像'}
                          width={187}
                          height={187}
                          className="object-contain w-[187px] h-[187px]"
                        />
                      </div>
                      
                      <p className="text-sm text-gray-700 leading-relaxed mb-6 transition-all duration-300">
                        {currentDimension.description}
                      </p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-900">長所と短所</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    長所
                  </h3>
                  <ul className="space-y-2">
                    {type.strengths.map((strength, index) => (
                      <li key={index} className="text-green-700 flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    改善点
                  </h3>
                  <ul className="space-y-2">
                    {type.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-red-700 flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">次のステップに進みますか？</h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <button
                    onClick={onRestart}
                    className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center border border-teal-600"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    もう一度診断する
                  </button>
                  <a
                    href="/compatibility"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center"
                    style={{ textDecoration: 'none' }}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    相性診断をする
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      {/* SNS Share Modal */}
      <SNSShareModal 
        result={result}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default Results; 