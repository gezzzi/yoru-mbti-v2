'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { TestResult } from '../types/personality';
import { getCategoryColor, getCategoryName, personalityTypes } from '../data/personalityTypes';
import { copyToClipboard } from '../utils/snsShare';
import { Heart, RefreshCw, Share2, User, Shield, Zap, Eye, Download, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import SNSShareModal from './SNSShareModal';
import html2canvas from 'html2canvas';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';
import { TagDescriptionModal } from './TagDescriptionModal';
import { tagDescriptions } from '../data/tagDescriptions';
import { tagColors } from '../data/tagColors';
import { tagShapes } from '../data/tagShapes';

// Category color settings
const categoryColorSchemes = {
  dom: 'bg-purple-400/50',
  sub: 'bg-pink-400/50',
  introvert: 'bg-cyan-400/50',
  fantasy: 'bg-blue-400/50',
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
}

// Component to display image or emoji
const TypeImage: React.FC<{ typeCode: string; emoji: string; name: string }> = ({ typeCode, emoji, name }) => {
  const [imageError, setImageError] = useState(false);
  
  // タイプコードから基本の4文字を抽出（例：ELAL-O → ELAL）
  const getBaseTypeCode = (code: string): string => {
    return code.split('-')[0].toUpperCase();
  };
  
  const handleImageError = () => {
    setImageError(true);
  };

  const baseTypeCode = getBaseTypeCode(typeCode);

  if (imageError) {
    return <span className="text-5xl">{emoji}</span>;
  }

  return (
    <div className="w-72 h-72 mx-auto rounded-2xl overflow-hidden bg-transparent flex items-center justify-center">
      <Image
        src={`/images/personality-types/${baseTypeCode}.svg`}
        alt={name}
        width={288}
        height={288}
        className="w-full h-full object-contain"
        onError={handleImageError}
      />
    </div>
  );
};

const Results: React.FC<ResultsProps> = ({ result }) => {
  const { type } = result;
  
  // コードから基本の4文字を抽出（例：ILSL-O → ILSL）
  const baseTypeCode = type.code.split('-')[0];
  
  // personalityTypesから直接rubyプロパティを取得
  const basePersonalityType = personalityTypes.find(pt => pt.code === baseTypeCode);
  const typeWithRuby = {
    ...type,
    ruby: basePersonalityType?.ruby
  };
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<{ tag: string; description: string } | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    nightPersonality: false,
    smTendency: false,
    libidoLevel: false,
    positions: false,
    compatible: false,
    incompatible: false,
    relationship: false,
    preferences: false,
    advice: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 診断結果をローカルストレージに保存
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('personality_test_result', JSON.stringify(result));
    }
  }, [result]);

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
      id: 'lead',
      leftLabel: 'リード(L)',
      rightLabel: 'フォロー(F)',
      percentage: result.L >= 50 ? result.L : (100 - result.L),
      color: 'bg-orange-500',
      resultLabel: result.L >= 50 ? 'リード(L)' : 'フォロー(F)',
      icon: <Shield className="w-4 h-4" />,
      description: result.L >= 50
        ? 'リード型の人は主導権を握り、相手を導くことを好みます。積極的にアプローチし、関係をコントロールする傾向があります。'
        : 'フォロー型の人は相手に導かれることを好み、受け身の姿勢を取ります。相手のペースに合わせることを得意とします。',
      category: 'リーダーシップ'
    },
    {
      id: 'adventure',
      leftLabel: '冒険(A)',
      rightLabel: '安定(S)',
      percentage: result.A >= 50 ? result.A : (100 - result.A),
      color: 'bg-green-500',
      resultLabel: result.A >= 50 ? '冒険(A)' : '安定(S)',
      icon: <Zap className="w-4 h-4" />,
      description: result.A >= 50
        ? '冒険型の人は新しい体験や未知の快楽を求める傾向があります。変化を楽しみ、刺激的な状況を好みます。'
        : '安定型の人は慣れ親しんだ関係や確実な快楽を重視します。安心できる環境での親密さを好む傾向があります。',
      category: '刺激'
    },
    {
      id: 'love',
      leftLabel: 'ラブ(L)',
      rightLabel: 'フリー(F)',
      percentage: result.L2 >= 50 ? result.L2 : (100 - result.L2),
      color: 'bg-purple-500',
      resultLabel: result.L2 >= 50 ? 'ラブ(L)' : 'フリー(F)',
      icon: <Heart className="w-4 h-4" />,
      description: result.L2 >= 50
        ? 'ラブ型の人は一人の相手との深い関係を重視し、恋愛感情や情熱的な結びつきを大切にします。'
        : 'フリー型の人は複数の相手との関係や、感情に縛られない自由な関係を好みます。',
      category: '関係性'
    },
    {
      id: 'openness',
      leftLabel: '開放(O)',
      rightLabel: '秘密(S)',
      percentage: result.O >= 50 ? result.O : (100 - result.O),
      color: 'bg-red-500',
      resultLabel: result.O >= 50 ? '開放(O)' : '秘密(S)',
      icon: <Eye className="w-4 h-4" />,
      description: result.O >= 50
        ? '開放型の人は自分の欲望や嗜好をオープンに表現し、相手と共有することを好みます。'
        : '秘密型の人は自分の内なる欲望を隠し、プライベートな部分を守ることを重視します。',
      category: '表現'
    }
  ];

  const getResultColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'text-blue-400',
      'bg-orange-500': 'text-orange-400',
      'bg-green-500': 'text-green-400',
      'bg-purple-500': 'text-purple-400',
      'bg-red-500': 'text-red-400'
    };
    return colorMap[color] || 'text-gray-400';
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

  // ダウンロード機能
  const handleDownload = async () => {
    if (!downloadRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(downloadRef.current);

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
        {/* Title */}
        <ScrollAnimation animation="fadeIn" duration={800}>
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg select-none text-center">
              <NeonText text={["あなたの", "診断結果"]} specialCharIndex={5} className="gap-1" />
            </h1>
          </div>
        </ScrollAnimation>
        
        {/* Download container */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div ref={downloadRef}>
            {/* Header Section */}
            <div className="rounded-t-3xl shadow-xl overflow-hidden border-2 border-white/40 bg-gradient-to-br from-white/25 via-white/15 to-white/20 backdrop-blur-sm" style={{boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)'}}>
              <div className={`p-8 text-white flex justify-center ${categoryColorSchemes[type.category]} backdrop-blur-md`}>
                <div className="w-full">
                  {/* 性格タイプ名 */}
                    <div className="font-head text-3xl md:text-4xl lg:text-5xl mb-6 mt-0 text-center text-white font-bold">
                    {typeWithRuby && typeWithRuby.ruby ? (
                      <ruby className="ruby-text">
                        {typeWithRuby.name}
                        <rt>{typeWithRuby.ruby}</rt>
                      </ruby>
                    ) : (
                      typeWithRuby?.name || 'タイプ名なし'
                    )}
                  </div>
                  <div className="code text-center mb-6">
                    <h1 className="font-head text-2xl md:text-3xl m-0 text-white font-bold">
                      {type.code}
                    </h1>
                  </div>
                  {/* SVG画像 */}
                  <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="rounded-b-3xl shadow-xl overflow-hidden border-2 border-white/30" style={{backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'}}>
              <div className="p-8 grid grid-cols-1">

                {/* New Graph Design */}
                <div className="mb-12">
                    {/* Personality Dimensions */}
                    <div>
                      <h2 className="text-2xl font-bold text-[#e0e7ff] mb-6 text-center">性格診断結果</h2>
                      
                      {dimensions.map((dimension) => (
                        <div 
                          key={dimension.id} 
                          className="space-y-3 py-2 px-3"
                        >
                          <div className="relative py-1">
                            {/* Percentage text above the graph - centered */}
                            <div className="text-center mb-2">
                              <span className={`text-base font-bold ${getResultColor(dimension.color)}`}>
                                {dimension.percentage}% {dimension.resultLabel}
                              </span>
                            </div>
                            
                            <div className="relative">
                              <div className={`w-full ${getBackgroundColor(dimension.color)} rounded-full h-4 relative`}>
                                <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                              </div>
                              {(() => {
                                // 内向性系の軸の場合は、実際の位置を反転させる
                                const isReverse = dimension.resultLabel.includes('内向性') || 
                                                dimension.resultLabel.includes('フォロー') || 
                                                dimension.resultLabel.includes('安定') ||
                                                dimension.resultLabel.includes('フリー') || 
                                                dimension.resultLabel.includes('秘密');
                                
                                // 円の位置：内向性系の場合は100から引いた値を使用
                                const circlePosition = isReverse ? (100 - dimension.percentage) : dimension.percentage;
                                
                                return (
                                  <div 
                                    className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-white flex items-center justify-center"
                                    style={{ left: `calc(${circlePosition}% - 10px)`, top: '50%', transform: 'translateY(-50%)' }}
                                  >
                                    <div className={`w-3 h-3 ${getIndicatorCenterColor(dimension.color)} rounded-full`}></div>
                                  </div>
                                );
                              })()}
                            </div>
                            
                            {/* Labels below the graph */}
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-sm font-medium text-[#e0e7ff]">
                                {dimension.leftLabel}
                              </span>
                              <span className="text-sm font-medium text-[#e0e7ff]">
                                {dimension.rightLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              {/* あなたに当てはまるタグ */}
              {result.additionalResults?.tags && result.additionalResults.tags.length > 0 && (
                <div className="rounded-xl px-4 pt-4 sm:px-6 sm:pt-6 pb-4 mt-0 mb-8 mx-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {result.additionalResults.tags.map((tag, index) => {
                      const colors = tagColors[tag] || { bg: '#6B7280', border: '#4B5563', text: '#FFFFFF' };
                      const shape = tagShapes[tag] || 'rounded-full';
                      return (
                        <button 
                          key={index} 
                          className={`px-4 py-2 text-base font-medium flex items-center gap-1 hover:brightness-110 hover:scale-105 transition-transform cursor-pointer relative shadow-md animate-fadeIn ${shape}`}
                          style={{ 
                            backgroundColor: colors.bg,
                            border: 'none',
                            color: colors.text || '#FFFFFF',
                            '--animation-delay': `${index * 0.3}s`,
                            '--glow-delay': `${index * 0.3 + 0.5}s`
                          } as React.CSSProperties}
                          onClick={() => setSelectedTag({ tag, description: tagDescriptions[tag] || '' })}
                        >
                          <span>{tag.replace(/^[^\s]+\s/, '')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 詳細情報統合カード */}
              <div className="rounded-xl shadow-lg bg-white/10 backdrop-blur-sm px-4 pt-4 sm:px-6 sm:pt-6 pb-2 sm:pb-3 mt-8 mx-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#e0e7ff] mb-4 sm:mb-6 text-center">性格診断カード</h3>
                <div className="space-y-2">
                  {/* 夜の性格 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('nightPersonality')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🧠</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">夜の性格</h4>
                      </div>
                      {openSections.nightPersonality ? <ChevronUp className="w-5 h-5 text-[#e0e7ff] " /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff] " />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.nightPersonality ? 'max-h-[500px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <div className="text-[#e0e7ff]/80 text-sm space-y-1">
                          {type.nightPersonality ? (
                            type.nightPersonality.split(/(?=本番：|アフター：)/).map((text, index) => (
                              <p key={index}>{text.trim()}</p>
                            ))
                          ) : (
                            <p>理性はあるけど、ベッドでは全部脱ぐタイプ。欲しいものは自分で奪う。</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* S or M 傾向 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('smTendency')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">😈</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">S or M 傾向</h4>
                      </div>
                      {openSections.smTendency ? <ChevronUp className="w-5 h-5 text-[#e0e7ff] " /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff] " />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.smTendency ? 'max-h-[500px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <p className="text-[#e0e7ff] font-bold mb-1">
                          {result.additionalResults?.smTendency === 'S' 
                            ? 'S'
                            : result.additionalResults?.smTendency === 'M'
                            ? 'M' 
                            : '中立'}
                        </p>
                        <p className="text-[#e0e7ff]/80 text-sm">
                          {result.additionalResults?.smTendency === 'S' 
                            ? '支配したい気持ちが強く、相手をリードすることに喜びを感じます。'
                            : result.additionalResults?.smTendency === 'M'
                            ? '委ねることに安心感を覚え、相手に導かれることを好みます。'
                            : '相手や気分によって自在に立場を変えられる柔軟性があります。'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 性欲レベル */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('libidoLevel')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">💋</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">性欲レベル</h4>
                      </div>
                      {openSections.libidoLevel ? <ChevronUp className="w-5 h-5 text-[#e0e7ff] " /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff] " />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.libidoLevel ? 'max-h-[500px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <div className="flex items-center mb-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-lg ${star <= (result.additionalResults?.libidoLevel || 3) ? 'text-pink-500' : 'text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                          <span className="ml-2 text-[#e0e7ff]/80 text-sm">
                            {result.additionalResults?.libidoLevel === 5 ? '（とても強い）' :
                             result.additionalResults?.libidoLevel === 4 ? '（強い）' :
                             result.additionalResults?.libidoLevel === 3 ? '（普通）' :
                             result.additionalResults?.libidoLevel === 2 ? '（控えめ）' : '（穏やか）'}
                          </span>
                        </div>
                        <p className="text-[#e0e7ff]/80 text-sm">
                          {result.additionalResults?.libidoLevel && result.additionalResults.libidoLevel >= 4 
                            ? '平常時でも妄想が止まらないタイプ。'
                            : '気分やシチュエーションによって変化するタイプ。'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* おすすめの体位 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('positions')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🍑</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">おすすめの体位（48手）</h4>
                      </div>
                      {openSections.positions ? <ChevronUp className="w-5 h-5 text-[#e0e7ff] " /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff] " />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.positions ? 'max-h-[500px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                          {(type.recommendedPositions || ['正常位', '騎乗位', '後背位', '駅弁', '対面座位', '寝バック', '立位']).map((position, index) => (
                            <div key={index} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-center text-[#e0e7ff] text-sm">
                              {position}
                            </div>
                          ))}
                        </div>
                        <p className="text-[#e0e7ff]/80 text-sm italic">
                          {result.additionalResults?.smTendency === 'S' 
                            ? '「深く」「支配的」「見下ろすように愛したい」'
                            : result.additionalResults?.smTendency === 'M'
                            ? '「深く」「受け身で」「見上げるように愛されたい」'
                            : '「深く」「情熱的に」「互いに求め合いたい」'}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 相性と関係性 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('compatibility')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">💘</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">相性と関係性</h4>
                      </div>
                      {openSections.compatibility ? <ChevronUp className="w-5 h-5 text-[#e0e7ff] " /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff] " />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.compatibility ? 'max-h-[500px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <div className="text-[#e0e7ff]/80 text-sm space-y-4">
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2">相性のいいタイプ</h5>
                            {type.compatibleTraits?.map((trait, index) => (
                              <p key={index} className="mb-1">{trait}</p>
                            )) || <p>感度が高く、甘え上手な人。自分のリードを委ねてくれる相手に惹かれる。</p>}
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2">相性が悪いタイプ</h5>
                            {type.incompatibleTraits?.map((trait, index) => (
                              <p key={index} className="mb-1">{trait}</p>
                            )) || <p>ノリが合わない堅物系、リアクションが薄い人。受け身すぎる or 無反応な相手には温度差を感じやすい。</p>}
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2">関係性の理想スタイル</h5>
                            <p>
                              {type.relationshipStyle || '気が合えば専属で深く繋がりたい。"身体の相性"から心も通わせていくのが理想。'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* セックスでのこだわり */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('preferences')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🔍</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">セックスでのこだわり</h4>
                      </div>
                      {openSections.preferences ? <ChevronUp className="w-5 h-5 text-[#e0e7ff] " /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff] " />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.preferences ? 'max-h-[500px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <ul className="text-[#e0e7ff]/80 text-sm space-y-1 list-none">
                          {type.sexualPreferences?.map((pref, index) => (
                            <li key={index} className="flex items-center justify-center">
                              <span className="mr-2 text-pink-500">♥</span>
                              <span>{pref}</span>
                            </li>
                          )) || (
                            <>
                              <li className="flex items-center justify-center">
                                <span className="mr-2 text-pink-500">♥</span>
                                <span>前戯が濃厚じゃないと冷める</span>
                              </li>
                              <li className="flex items-center justify-center">
                                <span className="mr-2 text-pink-500">♥</span>
                                <span>キスは必須。なければ温度が下がる</span>
                              </li>
                              <li className="flex items-center justify-center">
                                <span className="mr-2 text-pink-500">♥</span>
                                <span>指先の絡ませ合いが好き</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* あなたの短所とアドバイス */}
                  <div className="pb-2 overflow-hidden">
                    <button
                      onClick={() => toggleSection('advice')}
                      className="w-full flex items-center justify-between rounded-lg p-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">⚠️</span>
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">あなたの短所とアドバイス</h4>
                      </div>
                      {openSections.advice ? <ChevronUp className="w-5 h-5 text-[#e0e7ff] " /> : <ChevronDown className="w-5 h-5 text-[#e0e7ff] " />}
                    </button>
                    <div className={`transition-all duration-300 ${
                      openSections.advice ? 'max-h-[500px]' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="mt-2 px-2 text-center">
                        <div className="bg-white/5 rounded-lg p-2 mb-2">
                          <p className="text-[#e0e7ff]/80 text-sm mb-2">
                            <span className="font-bold text-pink-500">短所：</span>
                            {type.shortcomingsAdvice?.shortcoming || '気分屋な面があり、急に冷めることも。'}
                          </p>
                          <p className="text-[#e0e7ff]/80 text-sm">
                            <span className="font-bold text-pink-500">→ アドバイス：</span>
                            {type.shortcomingsAdvice?.advice || '信頼関係と温度管理を大切にすれば長く愛される。'}
                          </p>
                        </div>
                        <h5 className="font-semibold text-[#e0e7ff] mb-2 text-sm">より良い関係を築くための3つのヒント</h5>
                        <ul className="text-[#e0e7ff]/80 text-sm space-y-1 list-none">
                          <li className="flex items-start">
                            <span className="mr-2 text-pink-500">♥</span>
                            <span>自分の気分を素直に伝える習慣をつける</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-pink-500">♥</span>
                            <span>相手のペースも尊重し、バランスを取る</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-pink-500">♥</span>
                            <span>定期的に新しい刺激を取り入れてマンネリを防ぐ</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* Close 詳細情報統合カード */}

              {/* Action buttons - Download and Share */}
              <div className="text-center mt-8">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2 shadow-lg"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>結果をシェア</span>
                  </button>
                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
                </div>
              </div>

              {/* アクションボタン */}
              <div className="text-center mt-6 px-4 pb-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/test"
                    className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center border border-teal-600"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    もう一度診断する
                  </Link>
                  <Link
                    href="/compatibility"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    相性診断をする
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* SNS Share Modal */}
      <SNSShareModal 
        result={result}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* Tag Description Modal */}
      {selectedTag && (
        <TagDescriptionModal
          tag={selectedTag.tag}
          description={selectedTag.description}
          isOpen={!!selectedTag}
          onClose={() => setSelectedTag(null)}
        />
      )}
    </div>
  );
};

export default Results;