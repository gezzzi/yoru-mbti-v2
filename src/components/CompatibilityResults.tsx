'use client';

import React, { useState, useRef } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { Heart, Users, ArrowRight, Check, Download, Share2, RefreshCw, User } from 'lucide-react';
import Footer from './Footer';
import html2canvas from 'html2canvas';

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

const CompatibilityResults: React.FC<CompatibilityResultsProps> = ({ 
  myResult, 
  partnerResult, 
  onBack, 
  onNewTest 
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  const calculateCompatibility = (user: TestResult, partner: TestResult): CompatibilityResult => {
    // 各軸の相性スコアを計算（類似軸と補完軸で異なる計算方法）
    
    // 外向性(E)/内向性(I) - 類似軸 (重み: 0.15)
    const eScore = (100 - Math.abs(user.E - partner.E)) * 0.15;
    
    // 主導(D)/服従(S) - 補完軸 (重み: 0.3)
    // 合計値が100に近いほど良い
    const dScore = (100 - Math.abs((user.D + partner.D) - 100)) * 0.3;
    
    // 刺激志向(T)/安心志向(S) - 類似軸 (重み: 0.25)
    const tScore = (100 - Math.abs(user.T - partner.T)) * 0.25;
    
    // 愛着傾向(A)/非愛着傾向(N) - 類似軸 (重み: 0.2)
    const aScore = (100 - Math.abs(user.A - partner.A)) * 0.2;
    
    // 羞恥体制(R)/羞恥敏感(H) - 類似軸 (重み: 0.1)
    const rScore = (100 - Math.abs(user.R - partner.R)) * 0.1;
    
    // 総合相性度を計算
    const compatibility = Math.max(0, Math.min(100, eScore + dScore + tScore + aScore + rScore));

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

    return { compatibility, description, tips };
  };

  const compatibility = calculateCompatibility(myResult, partnerResult);

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16">
      {/* ダウンロード用のコンテナ */}
      <div ref={downloadRef} className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">相性診断結果</h1>
            <p className="text-xl opacity-90 mb-8">
              お二人の性格の相性を詳しく分析しました
            </p>
            
            {/* ダウンロードボタン */}
            <div className="flex justify-center space-x-4 mb-8">
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* 相性スコア */}
          <div className={`rounded-xl p-8 border-2 ${getCompatibilityColor(compatibility.compatibility)} shadow-lg mb-8`}>
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
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">あなたのタイプ</h3>
              <div className="text-center">
                <span className="text-4xl mb-3 block">{myResult.type.emoji}</span>
                <h4 className="text-xl font-bold text-gray-900">{myResult.type.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{myResult.type.code}</p>
                <p className="text-sm text-gray-700">{myResult.type.description}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">相手のタイプ</h3>
              <div className="text-center">
                <span className="text-4xl mb-3 block">{partnerResult.type.emoji}</span>
                <h4 className="text-xl font-bold text-gray-900">{partnerResult.type.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{partnerResult.type.code}</p>
                <p className="text-sm text-gray-700">{partnerResult.type.description}</p>
              </div>
            </div>
          </div>

          {/* アドバイス */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
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

          {/* 5軸比較 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">性格特性の詳細比較</h3>
            <div className="space-y-6">
              {[
                { label: '外向性 vs 内向性', value1: myResult.E, value2: partnerResult.E, key: 'E' },
                { label: '主導性 vs 服従性', value1: myResult.D, value2: partnerResult.D, key: 'D' },
                { label: 'スリル追求 vs 安全志向', value1: myResult.T, value2: partnerResult.T, key: 'T' },
                { label: '恥耐性 vs 恥敏感', value1: myResult.R, value2: partnerResult.R, key: 'R' },
                { label: '愛着 vs 非愛着', value1: myResult.A, value2: partnerResult.A, key: 'A' }
              ].map((dimension, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{dimension.label}</span>
                    <div className="flex space-x-4 text-sm">
                      <span className="text-blue-600">あなた: {Math.round(dimension.value1)}%</span>
                      <span className="text-pink-600">相手: {Math.round(dimension.value2)}%</span>
                    </div>
                  </div>
                  <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                    {/* あなたのバー */}
                    <div 
                      className="absolute top-0 left-0 h-3 bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${dimension.value1}%` }}
                    ></div>
                    {/* 相手のバー */}
                    <div 
                      className="absolute bottom-0 left-0 h-3 bg-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${dimension.value2}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* アクションボタン */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CompatibilityResults; 