'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { TestResult } from '../types/personality';
import { getCategoryColor, getCategoryName, personalityTypes } from '../data/personalityTypes';
import { generateCompatibilityCode, copyToClipboard } from '../utils/snsShare';
import { Heart, Users, RefreshCw, Download, Share2, User, Shield, Zap, Eye, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import SNSShareModal from './SNSShareModal';
import html2canvas from 'html2canvas';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';

// カテゴリごとの色設定を追加
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
  onRestart: () => void;
}

// 画像または絵文字を表示するコンポーネント
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

const Results: React.FC<ResultsProps> = ({ result, onRestart }) => {
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
  const [copied, setCopied] = useState(false);
  const [isQRDownloading, setIsQRDownloading] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  
  // 相性診断コードを生成
  const compatibilityCode = generateCompatibilityCode(result);

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
      case 'L': return isPositive ? 'リード' : 'フォロー';
      case 'A': return isPositive ? '冒険' : '安定';
      case 'L2': return isPositive ? 'ラブ' : 'フリー';
      case 'O': return isPositive ? '開放' : '秘密';
      default: return axis;
    }
  };

  const getAxisValue = (axis: string) => {
    switch (axis) {
      case 'E': return result.E;
      case 'L': return result.L;
      case 'A': return result.A;
      case 'L2': return result.L2;
      case 'O': return result.O;
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
        <ScrollAnimation animation="fadeIn" duration={800}>
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg select-none text-center">
              <NeonText text={["あなたの", "診断結果"]} specialCharIndex={5} className="gap-1" />
            </h1>
          </div>
        </ScrollAnimation>
        
        {/* ダウンロード用のコンテナ */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div ref={downloadRef}>
            {/* Header Section */}
            <div className="rounded-t-3xl shadow-xl overflow-hidden border-2 border-white/40 bg-gradient-to-br from-white/25 via-white/15 to-white/20 backdrop-blur-sm" style={{boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)'}}>
              <div className={`p-8 text-white flex justify-center ${categoryColorSchemes[type.category]} backdrop-blur-md`}>
                <div className="w-full">
                  {/* 性格タイプ名 */}
                  <div className="font-head text-3xl md:text-4xl lg:text-5xl mb-10 mt-0 text-center text-white font-bold">
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
              <div className="p-8">

                {/* New Graph Design */}
                <div className="mb-12">
                    {/* Personality Dimensions */}
                    <div>
                      <h2 className="text-2xl font-bold text-[#e0e7ff] mb-6">性格診断結果</h2>
                      
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

                {/* 夜の性格詳細セクション */}
                <div className="space-y-8 mt-12">
                  {/* 夜の性格 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🧠</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">夜の性格</h3>
                    </div>
                    <p className="text-[#e0e7ff] leading-relaxed">
                      {type.nightPersonality || '理性はあるけど、ベッドでは全部脱ぐタイプ。欲しいものは自分で奪う。'}
                    </p>
                  </div>

                  {/* S/M傾向 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">😈</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">S or M 傾向</h3>
                    </div>
                    <p className="text-[#e0e7ff] leading-relaxed">
                      {result.additionalResults?.smTendency === 'S' 
                        ? 'S寄り（命令したい・主導したい）'
                        : result.additionalResults?.smTendency === 'M'
                        ? 'M寄り（命令されたい・従いたい）' 
                        : 'Both（どちらも楽しめる）'}
                    </p>
                  </div>

                  {/* 性欲レベル */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">💋</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">性欲レベル</h3>
                    </div>
                    <div className="flex items-center mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={`text-2xl ${star <= (result.additionalResults?.libidoLevel || 3) ? 'text-pink-500' : 'text-gray-600'}`}>
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-[#e0e7ff]">
                        {result.additionalResults?.libidoLevel === 5 ? '（とても強い）' :
                         result.additionalResults?.libidoLevel === 4 ? '（強い）' :
                         result.additionalResults?.libidoLevel === 3 ? '（普通）' :
                         result.additionalResults?.libidoLevel === 2 ? '（控えめ）' : '（穏やか）'}
                      </span>
                    </div>
                    <p className="text-[#e0e7ff] text-sm">
                      {result.additionalResults?.libidoLevel && result.additionalResults.libidoLevel >= 4 
                        ? '平常時でも妄想が止まらないタイプ。'
                        : '気分やシチュエーションによって変化するタイプ。'}
                    </p>
                  </div>

                  {/* おすすめの体位 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🍑</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">おすすめの体位（48手）</h3>
                    </div>
                    <p className="text-[#e0e7ff] mb-3">
                      {type.recommendedPositions?.join('・') || '正常位・騎乗位・後背位・駅弁・対面座位・寝バック・立位'}
                    </p>
                    <p className="text-[#e0e7ff] text-sm italic">
                      {result.additionalResults?.smTendency === 'S' 
                        ? '「深く」「支配的」「見下ろすように愛したい」'
                        : result.additionalResults?.smTendency === 'M'
                        ? '「深く」「受け身で」「見上げるように愛されたい」'
                        : '「深く」「情熱的に」「互いに求め合いたい」'}
                    </p>
                  </div>

                  {/* 体に対する自信 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">👁</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">自分の体に対する自信</h3>
                    </div>
                    <p className="text-[#e0e7ff] mb-2">
                      {type.bodyConfidence?.level || 'ある'}
                      {type.bodyConfidence?.parts && type.bodyConfidence.parts.length > 0 && 
                        `（自信のある部位：${type.bodyConfidence.parts.join('と')}）`}
                    </p>
                    <p className="text-[#e0e7ff] text-sm">
                      {type.bodyConfidence?.parts?.includes('腰') && '腰使いは"無意識でエロい"と言われがち。'}
                    </p>
                  </div>

                  {/* 相性のいいタイプ */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">💘</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">相性のいいタイプ</h3>
                    </div>
                    {type.compatibleTraits?.map((trait, index) => (
                      <p key={index} className="text-[#e0e7ff] mb-1">
                        {trait}
                      </p>
                    )) || <p className="text-[#e0e7ff]">感度が高く、甘え上手な人。自分のリードを委ねてくれる相手に惹かれる。</p>}
                  </div>

                  {/* 相性が悪いタイプ */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🚫</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">相性が悪いタイプ</h3>
                    </div>
                    {type.incompatibleTraits?.map((trait, index) => (
                      <p key={index} className="text-[#e0e7ff] mb-1">
                        {trait}
                      </p>
                    )) || <p className="text-[#e0e7ff]">ノリが合わない堅物系、リアクションが薄い人。受け身すぎる or 無反応な相手には温度差を感じやすい。</p>}
                  </div>

                  {/* 夜のギャップ度 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🎭</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">夜のギャップ度</h3>
                    </div>
                    <p className="text-[#e0e7ff]">
                      {type.nightGapLevel || '昼は静か、夜は獣。いつも冷静な人ほど豹変すると燃える。'}
                    </p>
                  </div>

                  {/* セックスでのこだわり */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🔍</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">セックスでのこだわり</h3>
                    </div>
                    <ul className="text-[#e0e7ff] space-y-1">
                      {type.sexualPreferences?.map((pref, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{pref}</span>
                        </li>
                      )) || (
                        <>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>前戯が濃厚じゃないと冷める</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>キスは必須。なければ温度が下がる</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>指先の絡ませ合いが好き</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* 関係性の理想スタイル */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">🔄</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">関係性の理想スタイル</h3>
                    </div>
                    <p className="text-[#e0e7ff]">
                      {type.relationshipStyle || '気が合えば専属で深く繋がりたい。"身体の相性"から心も通わせていくのが理想。'}
                    </p>
                  </div>

                  {/* 短所とアドバイス */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/5">
                    <div className="flex items-center mb-4">
                      <span className="text-2xl mr-3">⚠️</span>
                      <h3 className="text-xl font-bold text-[#e0e7ff]">あなたの短所とアドバイス</h3>
                    </div>
                    <p className="text-[#e0e7ff] mb-2">
                      <span className="font-semibold">短所：</span>
                      {type.shortcomingsAdvice?.shortcoming || '気分屋な面があり、急に冷めることも。'}
                    </p>
                    <p className="text-[#e0e7ff]">
                      → <span className="font-semibold">アドバイス：</span>
                      {type.shortcomingsAdvice?.advice || '信頼関係と温度管理を大切にすれば長く愛される。'}
                    </p>
                  </div>
                </div>

                {/* QRコードセクション */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8 mt-12 border border-white/5">
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        1
                      </div>
                      <h2 className="text-2xl font-bold text-[#e0e7ff]">相性診断用QRコード</h2>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* 左側：QRコード表示 */}
                      <div className="flex flex-col items-center">
                        <div className="bg-white p-6 rounded-lg shadow-sm mb-4" ref={qrRef}>
                          <QRCode
                            value={compatibilityCode}
                            size={200}
                            level="M"
                            className="w-full h-auto max-w-[200px]"
                          />
                        </div>
                        <button
                          onClick={async () => {
                            if (!qrRef.current) return;
                            setIsQRDownloading(true);
                            try {
                              const svg = qrRef.current.querySelector('svg');
                              if (!svg) throw new Error('QRコードが見つかりません');
                              const canvas = document.createElement('canvas');
                              const ctx = canvas.getContext('2d');
                              const img = document.createElement('img') as HTMLImageElement;
                              const svgData = new XMLSerializer().serializeToString(svg);
                              const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
                              const svgUrl = URL.createObjectURL(svgBlob);
                              img.onload = () => {
                                canvas.width = 400;
                                canvas.height = 400;
                                ctx?.drawImage(img, 0, 0, 400, 400);
                                const link = document.createElement('a');
                                link.download = `相性診断QRコード_${type.code}.png`;
                                link.href = canvas.toDataURL('image/png');
                                link.click();
                                URL.revokeObjectURL(svgUrl);
                                setIsQRDownloading(false);
                              };
                              img.onerror = () => {
                                setIsQRDownloading(false);
                              };
                              img.src = svgUrl;
                            } catch (error) {
                              setIsQRDownloading(false);
                            }
                          }}
                          disabled={isQRDownloading}
                          className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          {isQRDownloading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>保存中...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>QRコードを保存</span>
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* 右側：説明 */}
                      <div className="flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-[#e0e7ff] mb-4">相性診断で使用しましょう</h3>
                        <p className="text-[#e0e7ff] mb-6 leading-relaxed">
                          このQRコードを使って、気になる人との相性を診断できます。相手にこのQRコードをシェアして、相性診断ページで読み取ってもらいましょう。
                        </p>
                      </div>
                    </div>
                </div>
                
                {/* Action buttons - Download and Share */}
                <div className="text-center mb-8">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
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
                      <button 
                        onClick={() => setShowShareModal(true)}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center space-x-2 shadow-lg"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>結果をシェア</span>
                      </button>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8">
                      <h3 className="text-2xl font-bold mb-4 text-[#e0e7ff]">次のステップに進みますか？</h3>
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
        </ScrollAnimation>
      </div>

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