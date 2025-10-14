'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { TestResult } from '../types/personality';
import { getCategoryColor, getCategoryName, personalityTypes } from '../data/personalityTypes';
import { copyToClipboard } from '../utils/snsShare';
import { Heart, RefreshCw, Share2, User, Shield, Zap, Eye, Dices, Edit3 } from 'lucide-react';
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
import { nightPersonalityDescriptions } from '@/data/nightPersonalityDescriptions';

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

const buildFiveAxisCode = (result: TestResult): string => {
  return [
    result.E >= 50 ? 'E' : 'I',
    result.L >= 50 ? 'L' : 'F',
    result.A >= 50 ? 'A' : 'S',
    result.L2 >= 50 ? 'L' : 'F',
    result.O >= 50 ? 'O' : 'S',
  ].join('');
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

  const fiveAxisCode = buildFiveAxisCode(result);
  const nightPersonalityText = nightPersonalityDescriptions[fiveAxisCode];
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [username, setUsername] = useState('');
  const downloadRef = useRef<HTMLDivElement>(null);
  const [selectedTag, setSelectedTag] = useState<{ tag: string; description: string } | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position48 | null>(null);

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
      leftLabel: '社交的(E)',
      rightLabel: 'マイペース(I)',
      percentage: result.E >= 50 ? result.E : (100 - result.E),
      color: 'bg-blue-500',
      resultLabel: result.E >= 50 ? '社交的(E)' : 'マイペース(I)',
      icon: <User className="w-4 h-4" />,
      description: result.E >= 50 
        ? '外向型の人は社交的で活動的、エネルギッシュな環境を好みます。'
        : '内向型の人は深く有意義で、かつ刺激でない交流を好みます。また、落ち着いた環境に惹かれる傾向にあります。',
      category: 'エネルギー'
    },
    {
      id: 'lead',
      leftLabel: '主導権を握る(L)',
      rightLabel: '相手に合わせる(F)',
      percentage: result.L >= 50 ? result.L : (100 - result.L),
      color: 'bg-orange-500',
      resultLabel: result.L >= 50 ? '主導権を握る(L)' : '相手に合わせる(F)',
      icon: <Shield className="w-4 h-4" />,
      description: result.L >= 50
        ? 'リード型の人は主導権を握り、相手を導くことを好みます。積極的にアプローチし、関係をコントロールする傾向があります。'
        : 'フォロー型の人は相手に導かれることを好み、受け身の姿勢を取ります。相手のペースに合わせることを得意とします。',
      category: 'リーダーシップ'
    },
    {
      id: 'adventure',
      leftLabel: '刺激好き(A)',
      rightLabel: '安心重視(S)',
      percentage: result.A >= 50 ? result.A : (100 - result.A),
      color: 'bg-green-500',
      resultLabel: result.A >= 50 ? '刺激好き(A)' : '安心重視(S)',
      icon: <Zap className="w-4 h-4" />,
      description: result.A >= 50
        ? '冒険型の人は新しい体験や未知の快楽を求める傾向があります。変化を楽しみ、刺激的な状況を好みます。'
        : '安定型の人は慣れ親しんだ関係や確実な快楽を重視します。安心できる環境での親密さを好む傾向があります。',
      category: '刺激'
    },
    {
      id: 'love',
      leftLabel: '一途(L)',
      rightLabel: '自由(F)',
      percentage: result.L2 >= 50 ? result.L2 : (100 - result.L2),
      color: 'bg-purple-500',
      resultLabel: result.L2 >= 50 ? '一途(L)' : '自由(F)',
      icon: <Heart className="w-4 h-4" />,
      description: result.L2 >= 50
        ? 'ラブ型の人は一人の相手との深い関係を重視し、恋愛感情や情熱的な結びつきを大切にします。'
        : 'フリー型の人は複数の相手との関係や、感情に縛られない自由な関係を好みます。',
      category: '関係性'
    },
    {
      id: 'openness',
      leftLabel: 'オープン(O)',
      rightLabel: '秘密主義(S)',
      percentage: result.O >= 50 ? result.O : (100 - result.O),
      color: 'bg-red-500',
      resultLabel: result.O >= 50 ? 'オープン(O)' : '秘密主義(S)',
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
    <div className="relative z-10 min-h-screen pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollAnimation animation="fadeIn" duration={800}>
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg select-none text-center">
              <NeonText text={["あなたの", "診断結果"]} specialCharIndex={5} className="gap-1" />
            </h1>
            {/* Username Display */}
            {username && (
              <ScrollAnimation animation="fadeInUp" delay={100}>
                <div className="text-center mt-12 sm:mt-16">
                  <p className="text-white text-base sm:text-sm">
                    <span className="font-bold text-lg text-pink-400">{username}</span>
                    <span className="font-bold text-lg">さんの診断レポート</span>
                  </p>
                </div>
              </ScrollAnimation>
            )}
            {/* プロモーション表示告知 */}
            <ScrollAnimation animation="fadeInUp" delay={100}>
              <p className="text-base text-white sm:text-sm mt-4">
                ※本ページにはプロモーションが含まれます。
              </p>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>

        {/* Download container */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div ref={downloadRef}>
            {/* Header Section */}
            <div className="rounded-t-3xl overflow-hidden">
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
            <div className="rounded-b-3xl overflow-hidden">
                {/* New Graph Design */}
                <div className="mb-12" style={{backgroundColor: 'transparent'}}>
                    {/* Personality Dimensions */}
                    <div style={{backgroundColor: 'transparent'}}>
                      <h2 className="text-2xl font-bold text-white mb-6 text-center">性格診断結果</h2>
                      
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
                                const isReverse = dimension.resultLabel.includes('マイペース') ||
                                                dimension.resultLabel.includes('相手に合わせる') ||
                                                dimension.resultLabel.includes('安心重視') ||
                                                dimension.resultLabel.includes('自由') ||
                                                dimension.resultLabel.includes('秘密主義');
                                
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
                              <span className="text-base font-medium text-white sm:text-sm">
                                {dimension.leftLabel}
                              </span>
                              <span className="text-base font-medium text-white sm:text-sm">
                                {dimension.rightLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

              {/* あなたに当てはまるタグ - 非表示化 */}
              {/* {result.additionalResults?.tags && result.additionalResults.tags.length > 0 && (
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
              )} */}

              {/* 詳細情報統合カード */}
              <div className="rounded-xl bg-transparent pt-4 sm:pt-6 pb-2 sm:pb-3 mt-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">性格診断カード</h3>
                <div className="space-y-2">
                  {/* 夜の性格 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-2 text-center">
                        <h4 className="font-semibold text-white text-lg sm:text-lg">夜の性格</h4>
                      </div>
                      <div className="text-center">
                        <div className="text-white text-lg sm:text-lg space-y-1">
                          {nightPersonalityText
                            ? nightPersonalityText
                                .split(/\n{2,}/)
                                .map(paragraph => paragraph.trim())
                                .filter(paragraph => paragraph.length > 0)
                                .map((paragraph, index) => (
                                  <p key={`${fiveAxisCode}-${index}`} className="leading-relaxed">
                                    {paragraph}
                                  </p>
                                ))
                            : (
                              <p className="leading-relaxed">
                                夜の性格の説明を取得できませんでした。
                              </p>
                            )}

                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* おすすめの体位 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-2 text-center">
                        <h4 className="font-semibold text-white text-lg sm:text-lg">おすすめの体位（48手）</h4>
                      </div>
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          {recommendedPositions.map((position: Position48, index: number) => (
                                  <div 
                                    key={position.id} 
                                    className="shine-card bg-white/10 border border-white/20 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
                                    onClick={() => setSelectedPosition(position)}
                                  >
                                    <span className="absolute top-3 right-3 text-xs text-white">No.{position.id}</span>
                                    <div className="text-center mb-2">
                                      <p className="text-xs text-white mb-1">{position.kana || position.name}</p>
                                      <h5 className="font-semibold text-white text-lg">{position.name}</h5>
                                    </div>
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
                          <p className="text-white text-lg sm:text-lg text-center mt-2">
                            {result.A > 70 ? '激しく情熱的に楽しむ' : 
                             result.A < 30 ? 'ゆったり優しく楽しむ' : 
                             'バランスよく焦らしながら楽しむ'}
                          </p>
                      </div>
                    </div>
                  </div>
                  {/* 相性と関係性 */}
                  <div className="border-b border-white/20 pb-2 overflow-hidden">
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-2 text-center">
                        <h4 className="font-semibold text-white text-lg sm:text-lg">相性と関係性</h4>
                      </div>
                      <div className="text-left">
                        <div className="text-white text-lg sm:text-lg space-y-4">
                          <div>
                            <h5 className="font-semibold text-white mb-2 text-center text-lg sm:text-lg">相性のいいタイプ</h5>
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
                            <h5 className="font-semibold text-white mb-2 text-center">相性が悪いタイプ</h5>
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
                            <h5 className="font-semibold text-white mb-2 text-center">関係性の理想スタイル</h5>
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
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-2 text-center">
                        <h4 className="font-semibold text-white text-lg sm:text-lg">あなたの短所とアドバイス</h4>
                      </div>
                      <div className="text-center">
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
                              <h5 className="font-semibold text-white mb-2 text-lg sm:text-lg">短所</h5>
                              <p className="text-white text-lg sm:text-lg mb-4">
                                {shortcomings[0]}
                              </p>
                              <h5 className="font-semibold text-white mb-2 text-lg sm:text-lg">アドバイス</h5>
                              <p className="text-white text-lg sm:text-lg mb-4">
                                {advices[0]}
                              </p>
                              <h5 className="font-semibold text-white mb-2 text-lg sm:text-lg">より良い関係を築くための3つのヒント</h5>
                              <ul className="text-white text-lg sm:text-lg space-y-1 list-none">
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
                    className="bg-teal-500 text-teal-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-base sm:text-base"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>シェア</span>
                  </button>
                  <Link
                    href="/test"
                    className="bg-gray-500 text-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-gray-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-base sm:text-base"
                  >
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>再診断</span>
                  </Link>
                  <Link
                    href="/compatibility"
                    className="bg-gradient-to-r from-[#ec4899] to-[#ffb8ce] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:from-[#ffb8ce] hover:to-[#ffb8ce] transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-base sm:text-base"
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

      {/* Affiliate Links */}
      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="text-center">
          <span className="text-xs text-white mb-1 inline-block">【広告】</span>
          <div>
          <a href="https://px.a8.net/svt/ejp?a8mat=45E7LX+5URGXE+7ZS+2NAUSX" rel="nofollow noopener sponsored" target="_blank">
            <img style={{ border: 0 }} width="300" height="250" alt="" src="https://www28.a8.net/svt/bgt?aid=250925829354&wid=001&eno=01&mid=s00000001036016007000&mc=1" />
          </a>
          <img style={{ border: 0 }} width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=45E7LX+5URGXE+7ZS+2NAUSX" alt="" />
          </div>
        </div>
        <div className="text-center">
          <a href="https://px.a8.net/svt/ejp?a8mat=45E7LX+5URGXE+7ZS+2NBPO2" rel="nofollow noopener sponsored" target="_blank" className="inline-flex items-center hover:text-pink-400 transition-colors">
            公式ストアで今すぐチェック
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <img style={{ border: 0 }} width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=45E7LX+5URGXE+7ZS+2NBPO2" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Results;
