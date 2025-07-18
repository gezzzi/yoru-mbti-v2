'use client';

import React, { useState, useRef } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { Heart, Users, ArrowRight, Check, Download, Share2, RefreshCw, User, Copy, Twitter, MessageCircle, X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { generateCompatibilityShareText, copyToClipboard } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import Image from 'next/image';
import NeonText from './NeonText';

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
  const size = 360;
  const center = size / 2;
  const radius = 80;
  
  // 5角形の各頂点の角度（上から時計回り）
  const angles = [
    -Math.PI / 2,          // E (上)
    -Math.PI / 2 + (2 * Math.PI / 5),     // L (右上)
    -Math.PI / 2 + (4 * Math.PI / 5),     // A (右下)
    -Math.PI / 2 + (6 * Math.PI / 5),     // L2 (左下)
    -Math.PI / 2 + (8 * Math.PI / 5),     // O (左上)
  ];
  
  const axisLabels = ['外向性', 'リード', '冒険', 'ラブ', '開放'];
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
  
  // データの5角形を生成
  const dataPoints = angles.map((angle, index) => {
    const value = axisValues[index];
    const distance = (radius * value) / 100;
    return getPoint(angle, distance);
  });
  
  const dataPolygonPoints = dataPoints.map(point => `${point.x},${point.y}`).join(' ');
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-4">
        {/* 背景グリッド */}
        {backgroundPentagons.map(({ percentage, points }) => (
          <polygon
            key={percentage}
            points={points}
            fill="none"
            stroke="#e5e7eb"
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
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}
        
        {/* データポリゴン */}
        <polygon
          points={dataPolygonPoints}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* データポイント */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#3b82f6"
          />
        ))}
        
        {/* 軸ラベル */}
        {angles.map((angle, index) => {
          const labelPoint = getPoint(angle, radius + 50);
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
              className="text-sm font-medium fill-gray-700"
            >
              {axisLabels[index]}
            </text>
          );
        })}
        
      </svg>
      
      {/* 凡例 */}
      <div className="text-center">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700">各軸の相性スコア</h4>
        </div>
        <div className="text-xs text-gray-600 space-y-1">
          <div>外向性: {Math.round(axisScores.E)}% | リード: {Math.round(axisScores.L)}%</div>
          <div>冒険: {Math.round(axisScores.A)}% | ラブ: {Math.round(axisScores.L2)}% | 開放: {Math.round(axisScores.O)}%</div>
        </div>
      </div>
    </div>
  );
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

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getCompatibilityIcon = (score: number) => {
    if (score >= 60) return <Heart className="w-8 h-8" />;
    return <Users className="w-8 h-8" />;
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
      {/* ダウンロード用のコンテナ */}
      <div ref={downloadRef}>
        {/* Hero Section */}
        <div className="text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 select-none text-center">
              <NeonText text={["相性", "診断結果"]} specialCharIndex={1} className="gap-1" />
            </h1>

          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* 相性診断結果ページコンテナ */}
          <div className="rounded-2xl shadow-2xl overflow-hidden border-2 border-white/30" style={{backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'}}>
            <div className="p-8 space-y-8">
              
              {/* 相性スコア */}
              <div className={`rounded-xl shadow-lg p-6 border-2 ${getCompatibilityColor(compatibility.compatibility)}`}>
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                {getCompatibilityIcon(compatibility.compatibility)}
                <span className="ml-4 text-5xl font-bold">
                  {Math.round(compatibility.compatibility)}%
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-4">相性診断結果</h3>
              <p className="text-lg font-medium">
                {compatibility.description}
              </p>
            </div>
          </div>

              {/* 性格タイプ比較 */}
              <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/5">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">あなたのタイプ</h3>
              <div className="text-center">
                <TypeImage typeCode={myResult.type.code} emoji={myResult.type.emoji} name={myResult.type.name} />
                <h4 className="text-xl font-bold text-[#e0e7ff]">
                  {myTypeWithRuby && myTypeWithRuby.ruby ? (
                    <ruby className="ruby-text">
                      {myTypeWithRuby.name}
                      <rt>{myTypeWithRuby.ruby}</rt>
                    </ruby>
                  ) : (
                    myTypeWithRuby?.name || 'タイプ名なし'
                  )}
                </h4>
                <p className="text-sm text-[#e0e7ff]/80 mb-3">{myResult.type.code}</p>
                <p className="text-sm text-[#e0e7ff]">{myResult.type.description}</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/5">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">相手のタイプ</h3>
              <div className="text-center">
                <TypeImage typeCode={partnerResult.type.code} emoji={partnerResult.type.emoji} name={partnerResult.type.name} />
                <h4 className="text-xl font-bold text-[#e0e7ff]">
                  {partnerTypeWithRuby && partnerTypeWithRuby.ruby ? (
                    <ruby className="ruby-text">
                      {partnerTypeWithRuby.name}
                      <rt>{partnerTypeWithRuby.ruby}</rt>
                    </ruby>
                  ) : (
                    partnerTypeWithRuby?.name || 'タイプ名なし'
                  )}
                </h4>
                <p className="text-sm text-[#e0e7ff]/80 mb-3">{partnerResult.type.code}</p>
                <p className="text-sm text-[#e0e7ff]">{partnerResult.type.description}</p>
              </div>
            </div>
          </div>

              {/* アドバイス */}
              <div className="rounded-xl shadow-lg p-6 bg-white/10 backdrop-blur-sm border border-white/5">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Check className="w-6 h-6 text-green-500 mr-3" />
                  関係を良くするためのアドバイス
                </h3>
                <ul className="space-y-3">
                  {compatibility.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 相性レーダーチャート */}
              <div className="rounded-xl shadow-lg p-6 bg-white/10 backdrop-blur-sm border border-white/5">
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">相性分析チャート: {Math.round(compatibility.compatibility)}%</h3>
                <div className="flex justify-center">
                  <RadarChart axisScores={compatibility.axisScores} totalScore={compatibility.compatibility} />
                </div>
              </div>


              {/* ダウンロード・シェアボタン */}
              <div className="text-center">
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

              {/* アクションボタン */}
              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ArrowRight className="w-5 h-5 transform rotate-180" />
                    <span>相性診断に戻る</span>
                  </button>
                  
                  <button
                    onClick={onNewTest}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center space-x-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>新しい相性診断</span>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* シェアモーダル */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">相性診断結果をシェア</h2>
              <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <textarea
                value={shareText}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={8}
              />
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">シェア方法を選択</h3>
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
                    className={`flex items-center justify-center space-x-3 w-full py-3 px-4 rounded-lg transition-colors ${copied ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'}`}
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    <span>{copied ? 'コピーしました！' : 'テキストをコピー'}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
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