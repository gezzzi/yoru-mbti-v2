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
import { positions48, getPositionsByMood, moodDescriptions, PositionMood } from '../data/positions48';

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
                            '--animation-delay': `${index * 0.3}s`
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
                          {(() => {
                            const tags = result.additionalResults?.tags || [];
                            let nightPersonality = '';
                            
                            // 基本的な性格描写（より詳細に）
                            if (result.E > 50 && result.L > 50) {
                              nightPersonality = '日常では想像もつかないほど情熱的な一面を持つ。夜の帳が下りると、内に秘めていた欲望が解き放たれ、パートナーを自分の世界へと誘い込む。視線、仕草、言葉のすべてを駆使して相手を翻弄し、二人だけの特別な時間を演出する天性のリーダー。';
                            } else if (result.E > 50 && result.L <= 50) {
                              nightPersonality = '明るく開放的な性格が夜にはさらに花開く。相手の欲望を素直に受け入れ、楽しみながら身を委ねることで、パートナーと一体となる喜びを知っている。笑顔と情熱的な反応で相手を魅了し、お互いが心地よくなれる空間を作り出す。';
                            } else if (result.E <= 50 && result.L > 50) {
                              nightPersonality = '普段の控えめな姿からは想像できない、深い情熱を内に秘めている。二人きりの空間では、静かに、しかし確実に主導権を握り、相手を自分のペースに引き込んでいく。言葉は少なくとも、その分行動で愛情と欲望を表現する。';
                            } else {
                              nightPersonality = '優しく穏やかな雰囲気の中で、ゆっくりと心と体を開いていく。相手の反応を丁寧に観察しながら、お互いが心地よいと感じるリズムを見つけ出す。深い信頼関係の中でこそ、本当の自分を解放できるタイプ。';
                            }
                            
                            // 冒険性による追加（より具体的に）
                            if (result.A > 50) {
                              nightPersonality += '既成概念にとらわれず、新しい刺激や体験を積極的に求める探求者。お互いの未知の領域を開拓することに喜びを感じ、「今夜はどんな発見があるだろう」というワクワク感を大切にする。限界を超えた先にある快感を、パートナーと共に追求していく。';
                            } else {
                              nightPersonality += '慣れ親しんだ方法で、ゆっくりと確実に快感を高めていく。急がず焦らず、お互いの呼吸を合わせながら、深い繋がりを感じることを重視。安心できる関係性の中でこそ得られる、心からの解放感を何より大切にしている。';
                            }
                            
                            // タグによる特徴的な要素を複数追加
                            const personalityTraits = [];
                            if (tags.includes('💬 言語プレイ派')) {
                              personalityTraits.push('囁きや言葉責めで相手の理性を溶かしていく話術の達人でもあり');
                            }
                            if (tags.includes('🛁 アフターケア必須')) {
                              personalityTraits.push('行為後の優しい時間を最も大切にする愛情深さを持ち');
                            }
                            if (tags.includes('⛏️ 開拓派')) {
                              personalityTraits.push('相手の限界ギリギリまで責め立てることで得られる征服感を求め');
                            }
                            if (tags.includes('🕯 ロマン重視')) {
                              personalityTraits.push('ムードや雰囲気作りにこだわりを持ち');
                            }
                            if (tags.includes('🎧 感覚演出派')) {
                              personalityTraits.push('五感すべてを使った演出で特別な空間を創り出し');
                            }
                            
                            // 特徴を最大2つまで追加
                            if (personalityTraits.length > 0) {
                              nightPersonality += personalityTraits.slice(0, 2).join('、') + '、';
                            }
                            
                            // Love/Freeによる関係性の描写
                            if (result.L2 > 50) {
                              nightPersonality += 'パートナーとの精神的な繋がりを何より重視する。体だけの関係では満たされず、心が通じ合ってこそ本当の快感を得られると信じている。一度結ばれた相手とは、より深い絆を築いていきたいと願う一途な面も。';
                            } else {
                              nightPersonality += 'その瞬間の情熱と快感を純粋に楽しむことができる。相手との適度な距離感を保ちながら、お互いが心地よい関係を築いていく。束縛や依存ではなく、自由な中での信頼関係を理想とする。';
                            }
                            
                            // O/S軸とタグで締めくくり
                            if (result.O > 50) {
                              nightPersonality += '恥じらいを持ちながらも、信頼できる相手とは性について率直に話し合える関係を望んでいる。';
                            } else {
                              nightPersonality += '二人だけの秘密の花園で、誰にも邪魔されることなく愛を育んでいくことに、この上ない幸せを感じる。';
                            }
                            
                            return <p>{nightPersonality}</p>;
                          })()}
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
                        <h4 className="font-semibold text-[#e0e7ff] text-sm sm:text-base">S or M</h4>
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
                            ? '支配したい気持ちが強く、相手をリードすることに喜びを感じる。'
                            : result.additionalResults?.smTendency === 'M'
                            ? '委ねることに安心感を覚え、相手に導かれることを好む。'
                            : '相手や気分によって自在に立場を変えられる柔軟性がある。'}
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
                        <div className="flex items-center justify-center mb-1">
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
                          {result.additionalResults?.libidoLevel === 5 
                            ? '性欲が日常生活の原動力。常に頭の片隅にエロスが存在し、ちょっとした刺激で妄想が暴走する。'
                            : result.additionalResults?.libidoLevel === 4 
                            ? '性欲は人並み以上に強め。パートナーとの時間を積極的に求め、新しい刺激も歓迎する。'
                            : result.additionalResults?.libidoLevel === 3 
                            ? 'バランスの取れた性欲の持ち主。気分や相手次第で盛り上がり、日常生活とのメリハリもつけられる。'
                            : result.additionalResults?.libidoLevel === 2 
                            ? '性欲は控えめで、心の繋がりを重視。ムードや雰囲気が整ってこそスイッチが入る。'
                            : 'かなり淡白な性欲の持ち主。性的なことより他の要素（会話、デート、趣味）を楽しむことを優先する。'}
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
                      <div className="mt-2 px-2">
                        {(() => {
                          // Select positions based on mood/situation system
                          const selectedPositions = [];
                          const usedIds = new Set();
                          
                          // Determine main mood based on personality
                          const moodPriorities: PositionMood[] = [];
                          
                          // 1. メインムードを決定（性格タイプから）
                          if (result.L2 > 50 && result.A <= 50) {
                            moodPriorities.push('romantic'); // ラブ型＆安定型
                          } else if (result.L > 50 || result.additionalResults?.smTendency === 'S') {
                            moodPriorities.push('wild'); // リード型またはS傾向
                          } else if (result.E > 50 && result.O > 50) {
                            moodPriorities.push('playful'); // 外向型＆開放型
                          } else if (result.A > 50) {
                            moodPriorities.push('technical'); // 冒険型
                          } else {
                            moodPriorities.push('romantic'); // デフォルト
                          }
                          
                          // 2. タグから補助ムードを追加
                          const tags = result.additionalResults?.tags || [];
                          if (tags.includes('🕯 ロマン重視') || tags.includes('🛁 アフターケア必須')) {
                            if (!moodPriorities.includes('romantic')) moodPriorities.push('romantic');
                          }
                          if (tags.includes('⚡️ スピード勝負派') || tags.includes('🧷 軽SM耐性あり')) {
                            if (!moodPriorities.includes('wild')) moodPriorities.push('wild');
                          }
                          if (tags.includes('🎭 ロールプレイ好き') || tags.includes('🤹‍♀️ マルチタスク派')) {
                            if (!moodPriorities.includes('playful')) moodPriorities.push('playful');
                          }
                          if (tags.includes('⛏️ 開拓派')) {
                            if (!moodPriorities.includes('technical')) moodPriorities.push('technical');
                          }
                          
                          // 愛撫系は必ず1つ含める
                          moodPriorities.push('foreplay');
                          
                          // 3. 各ムードから体位を選択
                          moodPriorities.forEach((mood, index) => {
                            const moodPositions = getPositionsByMood(mood).filter(pos => !usedIds.has(pos.id));
                            
                            // 難易度フィルター（冒険度に応じて）
                            let filtered = moodPositions;
                            if (result.A < 30) {
                              // 冒険度低い：簡単な体位のみ
                              filtered = moodPositions.filter(pos => pos.difficulty === 'easy');
                            } else if (result.A > 70) {
                              // 冒険度高い：難しい体位も含める
                              filtered = moodPositions;
                            } else {
                              // 中間：中級まで
                              filtered = moodPositions.filter(pos => pos.difficulty !== 'hard');
                            }
                            
                            // フィルター後に体位がない場合は元のリストから選択
                            if (filtered.length === 0) filtered = moodPositions;
                            
                            // ランダムに1つ選択
                            if (filtered.length > 0 && selectedPositions.length < 3) {
                              const randomIndex = Math.floor(Math.random() * filtered.length);
                              const selected = filtered[randomIndex];
                              selectedPositions.push(selected);
                              usedIds.add(selected.id);
                            }
                          });
                          
                          // 4. 「今日の運試し」として完全ランダムを1つ追加
                          const remainingPositions = positions48.filter(pos => !usedIds.has(pos.id));
                          if (remainingPositions.length > 0) {
                            const randomPos = remainingPositions[Math.floor(Math.random() * remainingPositions.length)];
                            selectedPositions.push(randomPos);
                          }
                          
                          return (
                            <>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                {selectedPositions.map((position, index) => (
                                  <div key={position.id} className="bg-white/10 border border-white/20 rounded-lg p-3 relative">
                                    <span className="absolute top-3 right-3 text-xs text-[#e0e7ff]/60">No.{position.id}</span>
                                    {index === selectedPositions.length - 1 && (
                                      <span className="absolute top-3 left-3 text-xs text-yellow-400">🎲 今日の運試し</span>
                                    )}
                                    <div className="text-center mb-2">
                                      <h5 className="font-semibold text-[#e0e7ff]">{position.name}</h5>
                                    </div>
                                    <p className="text-xs text-[#e0e7ff]/70 mb-2 text-center">（{position.kana}）</p>
                                    <div className="flex flex-wrap gap-1 justify-center mb-2">
                                      {position.moods.map(mood => {
                                        const moodColors = {
                                          'romantic': 'bg-pink-500/20 border-pink-400 text-pink-300',
                                          'wild': 'bg-red-500/20 border-red-400 text-red-300',
                                          'playful': 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
                                          'technical': 'bg-purple-500/20 border-purple-400 text-purple-300',
                                          'foreplay': 'bg-blue-500/20 border-blue-400 text-blue-300'
                                        };
                                        return (
                                          <span
                                            key={mood}
                                            className={`px-2 py-0.5 text-xs rounded-full border ${moodColors[mood]}`}
                                          >
                                            {moodDescriptions[mood].split(' - ')[0]}
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
                            </>
                          );
                        })()}
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
                            {(() => {
                              const compatibleTraits = [];
                              
                              // E/I軸での判定
                              if (result.E > 50) {
                                compatibleTraits.push('同じく外向的で社交的な人、または聞き上手で包容力のある内向的な人');
                              } else {
                                compatibleTraits.push('落ち着いた雰囲気で深い会話を楽しめる人、または明るく引っ張ってくれる人');
                              }
                              
                              // Love/Free軸での判定
                              if (result.L2 > 50) {
                                compatibleTraits.push('感情的な繋がりを大切にし、愛情表現が豊かな人');
                              } else {
                                compatibleTraits.push('自立していて、適度な距離感を保てる人');
                              }
                              
                              // Open/Secret軸での判定
                              if (result.O > 50) {
                                compatibleTraits.push('オープンマインドで、性について素直に話せる人');
                              } else {
                                compatibleTraits.push('プライバシーを尊重し、二人だけの秘密を守れる人');
                              }
                              
                              // タグによる追加判定
                              if (result.additionalResults?.tags?.includes('🛁 アフターケア必須')) {
                                compatibleTraits.push('優しくて思いやりがあり、アフターケアを大切にできる人');
                              }
                              
                              return compatibleTraits.slice(0, 3).map((trait, index) => (
                                <p key={index} className="mb-1">{trait}</p>
                              ));
                            })()}
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2">相性が悪いタイプ</h5>
                            {(() => {
                              const incompatibleTraits = [];
                              
                              // E/I軸での判定
                              if (result.E > 50) {
                                incompatibleTraits.push('過度に内向的で、コミュニケーションを避ける人');
                              } else {
                                incompatibleTraits.push('騒がしすぎて、静かな時間を尊重しない人');
                              }
                              
                              // Love/Free軸での判定
                              if (result.L2 > 50) {
                                incompatibleTraits.push('感情を軽視し、身体だけの関係を求める人');
                              } else {
                                incompatibleTraits.push('束縛が強く、自由を認めない人');
                              }
                              
                              // タグによる追加判定
                              if (result.additionalResults?.tags?.includes('🚪 NG明確')) {
                                incompatibleTraits.push('相手の境界線を尊重せず、強引に進める人');
                              }
                              
                              if (result.additionalResults?.tags?.includes('🙈 言い出しにくい派')) {
                                incompatibleTraits.push('察しが悪く、相手の気持ちを読み取れない人');
                              }
                              
                              return incompatibleTraits.slice(0, 3).map((trait, index) => (
                                <p key={index} className="mb-1">{trait}</p>
                              ));
                            })()}
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2">関係性の理想スタイル</h5>
                            <p>
                              {(() => {
                                const styles = [];
                                
                                // Love/Free軸が主軸
                                if (result.L2 > 50) {
                                  styles.push('感情的な繋がりを重視し、信頼関係を築いてから身体の関係に発展する');
                                } else {
                                  styles.push('カジュアルな関係から始まり、相性が良ければ継続する');
                                }
                                
                                // Open/Secret軸での追加
                                if (result.O > 50) {
                                  styles.push('お互いの性的な好みをオープンに話し合える関係');
                                } else {
                                  styles.push('二人だけの秘密の世界を大切にする関係');
                                }
                                
                                // タグによる追加
                                if (result.additionalResults?.tags?.includes('🛁 アフターケア必須')) {
                                  styles.push('行為後も優しく寄り添い、心のケアまでできる関係');
                                }
                                
                                return styles.join('。');
                              })()}
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
                      <div className="mt-2 px-2">
                        <ul className="text-[#e0e7ff]/80 text-sm space-y-1 list-none">
                          {(() => {
                            const preferences = [];
                            const tags = result.additionalResults?.tags || [];
                            
                            // タグに基づくこだわりの生成
                            if (tags.includes('💬 言語プレイ派')) {
                              preferences.push('言葉責めや声でのやり取りが必須');
                            }
                            if (tags.includes('🎭 ロールプレイ好き')) {
                              preferences.push('シチュエーション設定があると興奮度が上がる');
                            }
                            if (tags.includes('🛁 アフターケア必須')) {
                              preferences.push('行為後の優しい時間が何より大切');
                            }
                            if (tags.includes('⛏️ 開拓派')) {
                              preferences.push('相手の反応を引き出すことに喜びを感じる');
                            }
                            if (tags.includes('🧷 軽SM耐性あり')) {
                              preferences.push('軽い拘束や支配/被支配のプレイが好き');
                            }
                            if (tags.includes('🕯 ロマン重視')) {
                              preferences.push('ムード作りと雰囲気が大切');
                            }
                            if (tags.includes('⚡️ スピード勝負派')) {
                              preferences.push('長い前戯より本番重視');
                            }
                            if (tags.includes('🏃‍♂️ 衝動トリガー型')) {
                              preferences.push('突発的な情熱に身を任せたい');
                            }
                            if (tags.includes('📅 準備派')) {
                              preferences.push('事前準備と清潔感が大切');
                            }
                            if (tags.includes('🚪 NG明確')) {
                              preferences.push('境界線をしっかり守ることが大前提');
                            }
                            if (tags.includes('🙈 言い出しにくい派')) {
                              preferences.push('察してもらえる優しい相手が理想');
                            }
                            if (tags.includes('🎧 感覚演出派')) {
                              preferences.push('音楽や照明で五感を刺激したい');
                            }
                            if (tags.includes('🧼 ケア＆衛生重視')) {
                              preferences.push('清潔感とお互いのケアが最優先');
                            }
                            if (tags.includes('🕵️‍♀️ 覗き見興奮派')) {
                              preferences.push('秘密めいた雰囲気に興奮する');
                            }
                            if (tags.includes('🛡 安全第一派')) {
                              preferences.push('安全性と信頼関係が何より大切');
                            }
                            if (tags.includes('📱 デジタル前戯派')) {
                              preferences.push('メッセージでの前戯も楽しみたい');
                            }
                            if (tags.includes('🌙 深夜エロス')) {
                              preferences.push('深夜の静かな時間が一番燃える');
                            }
                            if (tags.includes('☀️ 朝型エロス')) {
                              preferences.push('朝の光の中での行為が好き');
                            }
                            if (tags.includes('🔄 リピート求め派')) {
                              preferences.push('一度では満足できず何度も求める');
                            }
                            if (tags.includes('🗣 下ネタOK')) {
                              preferences.push('日常会話でもエロい話題を楽しめる');
                            }
                            if (tags.includes('📚 学習研究派')) {
                              preferences.push('テクニックや知識を深めることに興味あり');
                            }
                            if (tags.includes('🧭 ガイド派')) {
                              preferences.push('相手を導きながら一緒に楽しみたい');
                            }
                            if (tags.includes('🤹‍♀️ マルチタスク派')) {
                              preferences.push('複数の刺激を同時に楽しみたい');
                            }
                            if (tags.includes('💤 まったり派')) {
                              preferences.push('ゆっくりとした時間の流れを大切にしたい');
                            }
                            
                            // 最大5つまで表示
                            const displayPreferences = preferences.slice(0, 5);
                            
                            // タグがない場合のデフォルト
                            if (displayPreferences.length === 0) {
                              displayPreferences.push('特定のこだわりはなく、相手との相性を重視');
                            }
                            
                            return displayPreferences.map((pref, index) => (
                              <li key={index} className="flex items-center">
                                <span className="mr-2 text-pink-500">♥</span>
                                <span>{pref}</span>
                              </li>
                            ));
                          })()}
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
                        {(() => {
                          const shortcomings = [];
                          const advices = [];
                          const hints = [];
                          const tags = result.additionalResults?.tags || [];
                          
                          // タグに基づく短所の判定
                          if (tags.includes('🙈 言い出しにくい派')) {
                            shortcomings.push('自分の欲求や不満を伝えられず、我慢してストレスを溜めやすい');
                            advices.push('小さなことから少しずつ伝える練習をして、相手との信頼関係を深める');
                            hints.push('「今日は〇〇してみたい」など、軽い要望から始める');
                          }
                          
                          if (tags.includes('🏃‍♂️ 衝動トリガー型')) {
                            // 準備派タグがない場合は極端と判定
                            const isExtreme = !tags.includes('📅 準備派');
                            if (isExtreme) {
                              shortcomings.push('衝動的すぎて、相手の準備や気持ちを考慮せずに行動しがち');
                              advices.push('行動前に一呼吸置いて、相手の状態を確認する習慣をつける');
                              hints.push('「今大丈夫？」の一言を忘れずに');
                            }
                          }
                          
                          // 組み合わせによる短所
                          if (tags.includes('⚡️ スピード勝負派') && !tags.includes('🛁 アフターケア必須')) {
                            shortcomings.push('自分の満足を優先し、相手のアフターケアを疎かにしがち');
                            advices.push('行為後の優しい時間も大切にして、相手との絆を深める');
                            hints.push('終わった後の10分間は相手との時間を大切にする');
                          }
                          
                          if (tags.includes('🧷 軽SM耐性あり') && !tags.includes('🚪 NG明確')) {
                            shortcomings.push('自分の趣向を優先し、相手の境界線を見誤ることがある');
                            advices.push('プレイ前に必ず相手のNGを確認し、安全な関係を築く');
                            hints.push('「これは大丈夫？」と都度確認を取る');
                          }
                          
                          // デフォルトの短所（該当するものがない場合）
                          if (shortcomings.length === 0) {
                            shortcomings.push('特に大きな短所はないが、時に自己中心的になることも');
                            advices.push('相手の立場に立って考える習慣を持つことでより良い関係に');
                            hints.push('定期的に相手の満足度を確認する');
                          }
                          
                          // 一般的なヒントを追加
                          if (hints.length < 3) {
                            const generalHints = [
                              '相手のペースも尊重し、バランスを取る',
                              '定期的に新しい刺激を取り入れてマンネリを防ぐ',
                              'お互いの好みを話し合う時間を作る',
                              '感謝の気持ちを言葉で伝える習慣をつける'
                            ];
                            while (hints.length < 3) {
                              hints.push(generalHints[hints.length]);
                            }
                          }
                          
                          return (
                            <>
                              <h5 className="font-semibold text-[#e0e7ff] mb-2 text-sm">短所</h5>
                              <p className="text-[#e0e7ff]/80 text-sm mb-4">
                                {shortcomings[0]}
                              </p>
                              <h5 className="font-semibold text-[#e0e7ff] mb-2 text-sm">アドバイス</h5>
                              <p className="text-[#e0e7ff]/80 text-sm mb-4">
                                {advices[0]}
                              </p>
                              <h5 className="font-semibold text-[#e0e7ff] mb-2 text-sm">より良い関係を築くための3つのヒント</h5>
                              <ul className="text-[#e0e7ff]/80 text-sm space-y-1 list-none">
                                {hints.slice(0, 3).map((hint, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="mr-2 text-yellow-500">💡</span>
                                    <span>{hint}</span>
                                  </li>
                                ))}
                              </ul>
                            </>
                          );
                        })()}
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