'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { TestResult } from '../types/personality';
import { getCategoryColor, getCategoryName, personalityTypes } from '../data/personalityTypes';
import { copyToClipboard } from '../utils/snsShare';
import { Heart, RefreshCw, Share2, User, Shield, Zap, Eye, ChevronDown, ChevronUp, Dices, Edit3 } from 'lucide-react';
import Image from 'next/image';
import SNSShareModal from './SNSShareModal';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';
import { TagDescriptionModal } from './TagDescriptionModal';
import { tagDescriptions } from '../data/tagDescriptions';
import { tagColors } from '../data/tagColors';
import { tagShapes } from '../data/tagShapes';
import { positions48, getPositionsByMood, moodDescriptions, PositionMood, Position48 } from '../data/positions48';
import { PositionDescriptionModal } from './PositionDescriptionModal';

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
  const [username, setUsername] = useState('');
  const downloadRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<{ tag: string; description: string } | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position48 | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    nightPersonality: false,
    libidoLevel: false,
    positions: false,
    compatible: false,
    incompatible: false,
    relationship: false,
    advice: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // おすすめの体位を一度だけ計算してメモ化
  const recommendedPositions = useMemo(() => {
    // localStorageから保存済みの体位を取得
    const storageKey = `recommended_positions_${type.code}`;
    if (typeof window !== 'undefined') {
      const savedPositions = localStorage.getItem(storageKey);
      if (savedPositions) {
        try {
          const parsed = JSON.parse(savedPositions);
          // 保存されたIDから実際の体位オブジェクトを復元
          const restoredPositions = parsed.map((id: number) => 
            positions48.find(p => p.id === id)
          ).filter(Boolean);
          if (restoredPositions.length > 0) {
            return restoredPositions;
          }
        } catch (e) {
          // パースエラーの場合は新規生成に進む
        }
      }
    }
    
    // 新規生成の場合
    const selectedPositions: Position48[] = [];
    const usedIds = new Set<number>();
    
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
    
    // 3. 各ムードから体位を選択（ランダムに）
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
    
    // 選択した体位のIDをlocalStorageに保存
    if (typeof window !== 'undefined' && selectedPositions.length > 0) {
      const positionIds = selectedPositions.map(p => p.id);
      localStorage.setItem(storageKey, JSON.stringify(positionIds));
    }
    
    return selectedPositions;
  }, [result, type.code]);

  // 診断結果をローカルストレージに保存
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('personality_test_result', JSON.stringify(result));
    }
  }, [result]);

  // 保存されたユーザー名を取得
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('personality_test_username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);

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
        
        {/* Username Display */}
        {username && (
          <ScrollAnimation animation="fadeInUp" delay={100}>
            <div className="text-center mt-4 mb-8">
              <p className="text-[#e0e7ff] text-sm">
                <span className="font-bold text-lg text-pink-400">{username}</span>
                <span className="font-bold text-lg">さんの分析</span>
              </p>
            </div>
          </ScrollAnimation>
        )}
        
        {/* Download container */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div ref={downloadRef}>
            {/* Header Section */}
            <div className="rounded-t-3xl shadow-xl overflow-hidden border-2 border-white/40">
              <div className="p-8 text-white flex justify-center">
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
              <div className="p-4 grid grid-cols-1">

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
                            
                            // 基本的な性格描写（より詳細に）+ S/M傾向を統合
                            if (result.E > 50 && result.L > 50) {
                              nightPersonality = '日常では想像もつかないほど情熱的な一面を持つ。夜の帳が下りると、内に秘めていた欲望が解き放たれ、パートナーを自分の世界へと誘い込む。視線、仕草、言葉のすべてを駆使して相手を翻弄し、二人だけの特別な時間を演出する天性のリーダー。';
                              if (result.additionalResults?.smTendency === 'S') {
                                nightPersonality += '支配欲求が強く、パートナーをリードすることに深い快感を覚え、相手の反応をコントロールしながら征服感を味わう。';
                              } else if (result.additionalResults?.smTendency === 'M') {
                                nightPersonality += 'しかし時には、信頼できる相手に身を委ね、支配されることで日常から解放される快感も知っている。';
                              } else {
                                nightPersonality += '相手や気分によって自在に立場を変えられる柔軟性を持ち、時にはリードし、時には委ね、その場の雰囲気で最適な役割を演じる。';
                              }
                            } else if (result.E > 50 && result.L <= 50) {
                              nightPersonality = '明るく開放的な性格が夜にはさらに花開く。相手の欲望を素直に受け入れ、楽しみながら身を委ねることで、パートナーと一体となる喜びを知っている。笑顔と情熱的な反応で相手を魅了し、お互いが心地よくなれる空間を作り出す。';
                              if (result.additionalResults?.smTendency === 'S') {
                                nightPersonality += 'その明るさの裏に支配欲求を秘めており、笑顔で相手をリードする小悪魔的な一面も。';
                              } else if (result.additionalResults?.smTendency === 'M') {
                                nightPersonality += '委ねることに安心感と興奮を覚え、相手に身を任せることで得られる深い満足感を追求する。';
                              } else {
                                nightPersonality += '柔軟な性格で、パートナーとの関係性によって自在に役割を変化させる。';
                              }
                            } else if (result.E <= 50 && result.L > 50) {
                              nightPersonality = '普段の控えめな姿からは想像できない、深い情熱を内に秘めている。二人きりの空間では、静かに、しかし確実に主導権を握り、相手を自分のペースに引き込んでいく。言葉は少なくとも、その分行動で愛情と欲望を表現する。';
                              if (result.additionalResults?.smTendency === 'S') {
                                nightPersonality += '静かな支配者として、相手を思い通りに導くことに密かな喜びを感じる。';
                              } else if (result.additionalResults?.smTendency === 'M') {
                                nightPersonality += 'ただし、心を許した相手には完全に身を委ね、支配されることで真の解放感を得る。';
                              } else {
                                nightPersonality += '状況に応じて支配と服従を使い分ける、奥深い性格の持ち主。';
                              }
                            } else {
                              nightPersonality = '優しく穏やかな雰囲気の中で、ゆっくりと心と体を開いていく。相手の反応を丁寧に観察しながら、お互いが心地よいと感じるリズムを見つけ出す。深い信頼関係の中でこそ、本当の自分を解放できるタイプ。';
                              if (result.additionalResults?.smTendency === 'S') {
                                nightPersonality += '優しさの中にも、相手を導きたいという密かな支配欲求を抱えている。';
                              } else if (result.additionalResults?.smTendency === 'M') {
                                nightPersonality += '信頼できる相手に委ねることで、日常の殻を破り、本当の自分を解放する。';
                              } else {
                                nightPersonality += '相手との関係性によって、導く側にも導かれる側にもなれる適応力を持つ。';
                              }
                            }
                            
                            // 冒険性による追加（より具体的に）
                            if (result.A > 50) {
                              nightPersonality += '既成概念にとらわれず、新しい刺激や体験を積極的に求める探求者。お互いの未知の領域を開拓することに喜びを感じ、「今夜はどんな発見があるだろう」というワクワク感を大切にする。限界を超えた先にある快感を、パートナーと共に追求していく。';
                            } else {
                              nightPersonality += '慣れ親しんだ方法で、ゆっくりと確実に快感を高めていく。急がず焦らず、お互いの呼吸を合わせながら、深い繋がりを感じることを重視。安心できる関係性の中でこそ得られる、心からの解放感を何より大切にしている。';
                            }
                            
                            // タグによる特徴的な要素を重要度順に追加
                            const tagPriorities = [
                              // 最高優先度：性格の核心に関わるタグ
                              { tag: '🛁 アフターケア必須', trait: '行為後の優しい時間を最も大切にする愛情深さを持つ', priority: 10 },
                              { tag: '⛏️ 開拓派', trait: '相手の限界ギリギリまで責め立てることで得られる征服感を求める', priority: 10 },
                              { tag: '🧷 軽SM耐性あり', trait: '軽い支配と服従のゲームで刺激を楽しむ', priority: 10 },
                              { tag: '🕯 ロマン重視', trait: 'ムードや雰囲気作りにこだわりを持つ', priority: 9 },
                              { tag: '⚡️ スピード勝負派', trait: '情熱的に一気に燃え上がるスピード感を大切にする', priority: 9 },
                              
                              // 高優先度：行動パターンに関わるタグ
                              { tag: '💬 言語プレイ派', trait: '囁きや言葉責めで相手の理性を溶かしていく話術の達人でもある', priority: 8 },
                              { tag: '🎭 ロールプレイ好き', trait: 'シチュエーション設定で非日常の世界に没入する', priority: 8 },
                              { tag: '🏃‍♂️ 衝動トリガー型', trait: '突発的な欲望に素直に従う野性的な一面を持つ', priority: 8 },
                              { tag: '🧭 ガイド派', trait: '相手を優しく導きながら共に高みを目指す', priority: 8 },
                              
                              // 中優先度：価値観や安全性に関わるタグ
                              { tag: '🚪 NG明確', trait: 'お互いの境界線を尊重しながら安心して楽しむ', priority: 7 },
                              { tag: '🛡 安全第一派', trait: '安全性と信頼関係を最優先に考える', priority: 7 },
                              { tag: '🪞 鏡プレイ好き', trait: '鏡に映る姿を見ながら興奮を高める', priority: 7 },
                              { tag: '🎮 ゲーム派', trait: '遊び心を交えた刺激的な体験を楽しむ', priority: 7 },
                              { tag: '💋 キス魔', trait: 'キスから始まる情熱的なひとときを求める', priority: 7 },
                              { tag: '🧥 コスプレ派', trait: '衣装で変身し新たな自分を解放する', priority: 6 },
                              { tag: '🧼 ケア＆衛生重視', trait: '清潔感と相手への気遣いを何より大切にする', priority: 6 },
                              
                              // 低優先度：補助的な特徴
                              { tag: '☀️ 朝型エロス', trait: '朝の光とともに訪れる優しい欲望を好む', priority: 5 },
                              { tag: '📱 デジタル前戯派', trait: 'メッセージでの駆け引きから始まる高揚感を楽しむ', priority: 5 },
                              { tag: '🕵️‍♀️ 覗き見興奮派', trait: '秘密めいた雰囲気やタブー感に興奮を覚える', priority: 5 },
                              { tag: '🔄 リピート求め派', trait: '一度では満足せず何度も快感を求め続ける', priority: 4 },
                              { tag: '🗣 下ネタOK', trait: '日常会話でもエロティックな話題を楽しめる開放性を持つ', priority: 4 },
                              { tag: '📚 学習研究派', trait: 'より良い快感を追求するため知識と技術を磨く', priority: 4 },
                              { tag: '🤹‍♀️ マルチタスク派', trait: '複数の刺激を同時に操る器用さを発揮する', priority: 3 },
                              { tag: '💤 まったり派', trait: 'ゆったりとした時間の流れの中で深い満足を得る', priority: 3 },
                            ];
                            
                            // 5点or6点を取ったタグのみを対象にする
                            // additionalResultsからtagScoresを取得（型定義がない場合は仮定）
                            const highScoreTags = result.additionalResults?.tagScores
                              ?.filter((item: { tag: string; score: number }) => item.score >= 5)
                              ?.map((item: { tag: string; score: number }) => item.tag) || [];
                            
                            // 5点or6点のタグの中から優先度順に選択
                            const personalityTraits = tagPriorities
                              .filter(item => highScoreTags.includes(item.tag))
                              .sort((a, b) => b.priority - a.priority)
                              .map(item => item.trait);
                            
                            // 特徴を最大2つまで追加
                            if (personalityTraits.length > 0) {
                              const selectedTraits = personalityTraits.slice(0, 2);
                              if (selectedTraits.length === 1) {
                                // 1つの場合は文末を「〜である」などに変更して句点
                                nightPersonality += selectedTraits[0] + '。';
                              } else if (selectedTraits.length === 2) {
                                // 2つの場合は1つ目を「〜であり」などに変更して読点、2つ目はそのまま句点
                                const firstTrait = selectedTraits[0].replace(/である$/, 'であり').replace(/持つ$/, '持ち').replace(/する$/, 'し').replace(/める$/, 'め').replace(/れる$/, 'れ').replace(/える$/, 'え');
                                nightPersonality += firstTrait + '、' + selectedTraits[1] + '。';
                              }
                            }
                            
                            // セックスでのこだわりを自然に統合
                            const sexPreferences = [];
                            if (tags.includes('💬 言語プレイ派') || tags.includes('🎭 ロールプレイ好き')) {
                              sexPreferences.push('言葉や設定で興奮を高め');
                            }
                            if (tags.includes('⚡️ スピード勝負派') || tags.includes('🏃‍♂️ 衝動トリガー型')) {
                              sexPreferences.push('情熱的に一気に燃え上がることを好み');
                            }
                            if (tags.includes('🕯 ロマン重視') || tags.includes('🧼 ケア＆衛生重視')) {
                              sexPreferences.push('ムードや清潔感にこだわりを持ち');
                            }
                            if (tags.includes('🪞 鏡プレイ好き') || tags.includes('🧥 コスプレ派')) {
                              sexPreferences.push('視覚的な刺激や演出を重視し');
                            }
                            if (tags.includes('🎮 ゲーム派') || tags.includes('💋 キス魔')) {
                              sexPreferences.push('遊び心やスキンシップを大切にし');
                            }
                            if (tags.includes('🚪 NG明確') || tags.includes('🛡 安全第一派')) {
                              sexPreferences.push('お互いの境界線と安全性を最優先に考え');
                            }
                            if (tags.includes('☀️ 朝型エロス')) {
                              sexPreferences.push('朝の光の中でこそ本能が解放され');
                            }
                            
                            if (sexPreferences.length > 0) {
                              nightPersonality += sexPreferences.slice(0, 2).join('、') + 'ながら、';
                            }
                            
                            // Love/Freeによる関係性の描写
                            if (result.L2 > 50) {
                              nightPersonality += 'パートナーとの精神的な繋がりを何より重視する。体だけの関係では満たされず、心が通じ合ってこそ本当の快感を得られると信じている。一度結ばれた相手とは、より深い絆を築いていきたいと願う一途な面も。';
                            } else {
                              nightPersonality += 'その瞬間の情熱と快感を純粋に楽しむことができる。相手との適度な距離感を保ちながら、お互いが心地よい関係を築いていく。束縛や依存ではなく、自由な中での信頼関係を理想とする。';
                            }
                            
                            // 性欲レベルの統合
                            const libidoLevel = result.additionalResults?.libidoLevel || 3;
                            if (libidoLevel === 5) {
                              nightPersonality += '情欲は日常生活の原動力となっており、常に頭の片隅にエロスが存在する。ちょっとした刺激で妄想が暴走し、';
                            } else if (libidoLevel === 4) {
                              nightPersonality += '欲望は人並み以上に強く、パートナーとの時間を積極的に求める。新しい刺激も歓迎し、';
                            } else if (libidoLevel === 3) {
                              nightPersonality += '程よい情熱を秘めており、気分や相手次第で自然に盛り上がる。日常生活とのメリハリもつけられ、';
                            } else if (libidoLevel === 2) {
                              nightPersonality += '欲求は控えめだが、心の繋がりがあればこそ燃え上がる。ムードや雰囲気が整ってこそスイッチが入り、';
                            } else {
                              nightPersonality += 'かなり淡白な気質で、肉体的なことより会話やデートなど精神的な要素を楽しむことを優先する。しかし、';
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                          {recommendedPositions.map((position: Position48, index: number) => (
                                  <div 
                                    key={position.id} 
                                    className="bg-white/10 border border-white/20 rounded-lg p-3 relative cursor-pointer hover:bg-white/20 transition-colors"
                                    onClick={() => setSelectedPosition(position)}
                                  >
                                    <span className="absolute top-3 right-3 text-xs text-[#e0e7ff]/60">No.{position.id}</span>
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
                            {result.A > 70 ? '激しく情熱的に楽しむ' : 
                             result.A < 30 ? 'ゆったり優しく楽しむ' : 
                             'バランスよく焦らしながら楽しむ'}
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
                      <div className="mt-2 px-2 text-left">
                        <div className="text-[#e0e7ff]/80 text-sm space-y-4">
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2 text-center">相性のいいタイプ</h5>
                            {(() => {
                              const compatibleTypes = [];
                              
                              // 現在のタイプのコードを分解
                              const currentCode = type.code.split('-')[0];
                              
                              // 性格タイプから相性の良いタイプを取得
                              const getTypeNameByCode = (code: string) => {
                                const foundType = personalityTypes.find(pt => pt.code === code);
                                return foundType ? foundType.name : code;
                              };
                              
                              // E/I軸とL/F軸での判定
                              if (result.E > 50 && result.L > 50) {
                                // 外向的リード型 → 内向的フォロー型が相性良い
                                compatibleTypes.push({ code: 'IFSL', name: getTypeNameByCode('IFSL'), reason: '落ち着いて話を聞き、あなたのリードを受け入れてくれる' });
                                compatibleTypes.push({ code: 'IFAL', name: getTypeNameByCode('IFAL'), reason: '冒険心を共有しながら、あなたを支えてくれる' });
                              } else if (result.E > 50 && result.L <= 50) {
                                // 外向的フォロー型 → 外向的リード型が相性良い
                                compatibleTypes.push({ code: 'ELAL', name: getTypeNameByCode('ELAL'), reason: '情熱的にリードし、あなたを楽しませてくれる' });
                                compatibleTypes.push({ code: 'ELSL', name: getTypeNameByCode('ELSL'), reason: '安定感のあるリードで安心させてくれる' });
                              } else if (result.E <= 50 && result.L > 50) {
                                // 内向的リード型 → 外向的フォロー型が相性良い
                                compatibleTypes.push({ code: 'EFSL', name: getTypeNameByCode('EFSL'), reason: '明るく素直に、あなたのペースに合わせてくれる' });
                                compatibleTypes.push({ code: 'EFAL', name: getTypeNameByCode('EFAL'), reason: '冒険心を持ちながら、あなたに委ねてくれる' });
                              } else {
                                // 内向的フォロー型 → 内向的リード型が相性良い
                                compatibleTypes.push({ code: 'ILAL', name: getTypeNameByCode('ILAL'), reason: '静かに情熱的で、優しくリードしてくれる' });
                                compatibleTypes.push({ code: 'ILSL', name: getTypeNameByCode('ILSL'), reason: '安心感のある関係を築いてくれる' });
                              }
                              
                              // タグによる追加判定
                              const tagTraits = [];
                              if (result.additionalResults?.tags?.includes('🛁 アフターケア必須')) {
                                tagTraits.push('優しくて思いやりがあり、アフターケアを大切にできる人');
                              }
                              
                              // 性格タイプと一般的な特徴を組み合わせて表示
                              const displayItems: string[] = [];
                              compatibleTypes.slice(0, 2).forEach(type => {
                                displayItems.push(`${type.name}(${type.code})：${type.reason}`);
                              });
                              tagTraits.forEach(trait => {
                                displayItems.push(trait);
                              });
                              
                              return displayItems.slice(0, 3).map((item, index) => {
                                // すべての項目に同じ余白を適用
                                return (
                                  <div key={index} className="mb-1 sm:ml-16 md:ml-32 lg:ml-48">
                                    {item}
                                  </div>
                                );
                              });
                            })()}
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2 text-center">相性が悪いタイプ</h5>
                            {(() => {
                              const incompatibleTypes = [];
                              
                              // 性格タイプから相性の悪いタイプを取得
                              const getTypeNameByCode = (code: string) => {
                                const foundType = personalityTypes.find(pt => pt.code === code);
                                return foundType ? foundType.name : code;
                              };
                              
                              // E/I軸とL/F軸での判定
                              if (result.E > 50 && result.L > 50) {
                                // 外向的リード型 → 同じ外向的リード型は衝突
                                incompatibleTypes.push({ code: 'ELAL', name: getTypeNameByCode('ELAL'), reason: '主導権争いで衝突しやすい' });
                                incompatibleTypes.push({ code: 'ELAF', name: getTypeNameByCode('ELAF'), reason: '自由すぎて統制が取れない' });
                              } else if (result.E > 50 && result.L <= 50) {
                                // 外向的フォロー型 → 内向的フォロー型は相性悪い
                                incompatibleTypes.push({ code: 'IFSL', name: getTypeNameByCode('IFSL'), reason: 'お互いに受け身で進展しない' });
                                incompatibleTypes.push({ code: 'IFSF', name: getTypeNameByCode('IFSF'), reason: '刺激が足りず物足りない' });
                              } else if (result.E <= 50 && result.L > 50) {
                                // 内向的リード型 → 同じ内向的リード型は衝突
                                incompatibleTypes.push({ code: 'ILAL', name: getTypeNameByCode('ILAL'), reason: '静かな主導権争いになりやすい' });
                                incompatibleTypes.push({ code: 'ILSL', name: getTypeNameByCode('ILSL'), reason: 'お互いに譲らず硬直しやすい' });
                              } else {
                                // 内向的フォロー型 → 外向的リード型の過激タイプ
                                incompatibleTypes.push({ code: 'ELAF', name: getTypeNameByCode('ELAF'), reason: '自由奔放すぎてついていけない' });
                                incompatibleTypes.push({ code: 'ELAL', name: getTypeNameByCode('ELAL'), reason: '強引すぎて圧倒される' });
                              }
                              
                              // タグによる追加判定
                              const tagTraits = [];
                              if (result.additionalResults?.tags?.includes('🚪 NG明確')) {
                                tagTraits.push('相手の境界線を尊重せず、強引に進める人');
                              }
                              
                              if (result.additionalResults?.tags?.includes('🪞 鏡プレイ好き')) {
                                tagTraits.push('自分の身体や外見に自信がない人');
                              }
                              
                              if (result.additionalResults?.tags?.includes('🎮 ゲーム派')) {
                                tagTraits.push('シリアスで真剣すぎる雰囲気の人');
                              }
                              
                              if (result.additionalResults?.tags?.includes('💋 キス魔')) {
                                tagTraits.push('キスを重要視しない淡白な人');
                              }
                              
                              if (result.additionalResults?.tags?.includes('🧥 コスプレ派')) {
                                tagTraits.push('現実的でロマンチックな演出を理解しない人');
                              }
                              
                              // 性格タイプと一般的な特徴を組み合わせて表示
                              const displayItems: string[] = [];
                              incompatibleTypes.slice(0, 2).forEach(type => {
                                displayItems.push(`${type.name}(${type.code})：${type.reason}`);
                              });
                              tagTraits.forEach(trait => {
                                displayItems.push(trait);
                              });
                              
                              return displayItems.slice(0, 3).map((item, index) => {
                                // すべての項目に同じ余白を適用
                                return (
                                  <div key={index} className="mb-1 sm:ml-16 md:ml-32 lg:ml-48">
                                    {item}
                                  </div>
                                );
                              });
                            })()}
                          </div>
                          <div>
                            <h5 className="font-semibold text-[#e0e7ff] mb-2 text-center">関係性の理想スタイル</h5>
                            <p className="text-center">
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
                          if (tags.includes('🪞 鏡プレイ好き')) {
                            shortcomings.push('自分の外見や他人からの視線を過度に気にして、リラックスできない');
                            advices.push('相手はあなたの全てを受け入れていることを思い出し、自分らしさを大切にする');
                            hints.push('照明を調整して、自分が一番リラックスできる環境を作る');
                          }
                          
                          if (tags.includes('🎮 ゲーム派')) {
                            shortcomings.push('遊びの要素を求めすぎて、相手を疲れさせてしまうことがある');
                            advices.push('相手のペースや気分を尊重し、シンプルなひとときも大切にする');
                            hints.push('ゲーム要素は月に1-2回の特別なスパイスとして活用');
                          }
                          
                          if (tags.includes('💋 キス魔')) {
                            shortcomings.push('キスにこだわりすぎて、他の刺激や展開がおろそかになることがある');
                            advices.push('キスも大切にしながら、全身を使った愛情表現もバランスよく取り入れる');
                            hints.push('キスの合間に優しく相手の体に触れることも忘れずに');
                          }
                          
                          if (tags.includes('🧥 コスプレ派')) {
                            shortcomings.push('コスプレや演出に依存して、素の自分では自信が持てないことがある');
                            advices.push('コスプレはスパイスとして楽しみつつ、自然体の魅力も磨いていく');
                            hints.push('普段の下着や部屋着でも魅力的に見せる工夫を');
                          }
                          
                          if (tags.includes('🏃‍♂️ 衝動トリガー型')) {
                            shortcomings.push('衝動的すぎて、相手の準備や気持ちを考慮せずに行動しがち');
                            advices.push('行動前に一呼吸置いて、相手の状態を確認する習慣をつける');
                            hints.push('「今大丈夫？」の一言を忘れずに');
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
                                    <span className="sm:ml-16 md:ml-32 lg:ml-48 mr-2 text-yellow-500">💡</span>
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

              {/* アクションボタン */}
              <div className="text-center mt-8 px-4 pb-4">
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="bg-teal-500 text-teal-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>シェア</span>
                  </button>
                  <Link
                    href="/test"
                    className="bg-gray-500 text-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>再診断</span>
                  </Link>
                  <Link
                    href="/compatibility"
                    className="bg-gradient-to-r from-[#ec4899] to-[#ffb8ce] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-[#ffb8ce] hover:to-[#ffb8ce] transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-sm sm:text-base"
                  >
                    <span>相性診断へ進む</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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

      {/* Position Description Modal */}
      <PositionDescriptionModal
        position={selectedPosition}
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />
    </div>
  );
};

export default Results;