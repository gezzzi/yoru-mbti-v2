'use client';

import React, { useState } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { parseCompatibilityCode } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import { Heart, Users, AlertCircle, Check } from 'lucide-react';

interface CompatibilityCheckerProps {
  currentResult: TestResult;
}

interface CompatibilityResult {
  compatibility: number;
  description: string;
  tips: string[];
}

const CompatibilityChecker: React.FC<CompatibilityCheckerProps> = ({ currentResult }) => {
  const [inputCode, setInputCode] = useState('');
  const [partnerResult, setPartnerResult] = useState<TestResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateCompatibility = (user: TestResult, partner: TestResult): CompatibilityResult => {
    // 5軸の差を計算（0-100で各軸の差を出し、平均して相性度を算出）
    const diffs = [
      Math.abs(user.E - partner.E),
      Math.abs(user.D - partner.D),
      Math.abs(user.T - partner.T),
      Math.abs(user.R - partner.R),
      Math.abs(user.A - partner.A)
    ];
    
    const averageDiff = diffs.reduce((sum, diff) => sum + diff, 0) / 5;
    const compatibility = Math.max(0, 100 - averageDiff);

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

  const handleCheckCompatibility = async () => {
    setIsLoading(true);
    setError('');

    try {
      // 入力コードの検証
      if (inputCode.length !== 10) {
        throw new Error('相性診断コードは10桁である必要があります');
      }

      // コードを解析
      const parsedResult = parseCompatibilityCode(inputCode);
      if (!parsedResult) {
        throw new Error('無効な相性診断コードです');
      }

      // 性格タイプを判定
      const typeCode = 
        (parsedResult.E > 50 ? 'E' : 'I') +
        (parsedResult.D > 50 ? 'D' : 'S') +
        (parsedResult.T > 50 ? 'T' : 'S') +
        (parsedResult.A > 50 ? 'A' : 'N');
      
      const personalityType = personalityTypes.find(type => 
        type.code === typeCode
      ) || personalityTypes[0];
      
      const fullResult: TestResult = {
        E: parsedResult.E,
        D: parsedResult.D,
        T: parsedResult.T,
        R: parsedResult.R,
        A: parsedResult.A,
        type: personalityType
      };

      setPartnerResult(fullResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '相性診断コードの解析に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const compatibility = partnerResult ? calculateCompatibility(currentResult, partnerResult) : null;

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getCompatibilityIcon = (score: number) => {
    if (score >= 60) return <Heart className="w-6 h-6" />;
    return <Users className="w-6 h-6" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
          ❤️
        </div>
        <h2 className="text-2xl font-bold text-gray-900">相性診断</h2>
      </div>

      <div className="space-y-6">
        {/* 入力部分 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            相手の相性診断コードを入力してください
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
              placeholder="0123456789"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent font-mono text-center"
              maxLength={10}
            />
            <button
              onClick={handleCheckCompatibility}
              disabled={inputCode.length !== 10 || isLoading}
              className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? '診断中...' : '相性診断'}
            </button>
          </div>
          {error && (
            <div className="mt-2 flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* 結果表示 */}
        {compatibility && partnerResult && (
          <div className="space-y-6">
            {/* 相性スコア */}
            <div className={`rounded-lg p-6 border ${getCompatibilityColor(compatibility.compatibility)}`}>
              <div className="flex items-center justify-center mb-4">
                {getCompatibilityIcon(compatibility.compatibility)}
                <span className="ml-2 text-3xl font-bold">
                  {Math.round(compatibility.compatibility)}%
                </span>
              </div>
              <p className="text-center font-medium mb-2">
                {compatibility.description}
              </p>
            </div>

            {/* パートナーの性格タイプ */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">相手の性格タイプ</h3>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{partnerResult.type.emoji}</span>
                <div>
                  <h4 className="font-bold">{partnerResult.type.name}</h4>
                  <p className="text-sm text-gray-600">{partnerResult.type.code}</p>
                </div>
              </div>
            </div>

            {/* アドバイス */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                関係を良くするためのアドバイス
              </h3>
              <ul className="space-y-2">
                {compatibility.tips.map((tip, index) => (
                  <li key={index} className="text-blue-800 text-sm flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* 5軸比較 */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-4">性格特性の比較</h3>
              <div className="space-y-4">
                {[
                  { label: '外向性 vs 内向性', userValue: currentResult.E, partnerValue: partnerResult.E },
                  { label: '主導性 vs 服従性', userValue: currentResult.D, partnerValue: partnerResult.D },
                  { label: '刺激志向 vs 安心志向', userValue: currentResult.T, partnerValue: partnerResult.T },
                  { label: '羞恥体制 vs 羞恥敏感', userValue: currentResult.R, partnerValue: partnerResult.R },
                  { label: '愛着傾向 vs 非愛着傾向', userValue: currentResult.A, partnerValue: partnerResult.A }
                ].map((axis, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{axis.label}</span>
                    </div>
                    <div className="relative h-4 bg-gray-200 rounded-full">
                      {/* あなたのマーカー */}
                      <div 
                        className="absolute top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"
                        style={{ left: `calc(${axis.userValue}% - 8px)` }}
                        title={`あなた: ${Math.round(axis.userValue)}%`}
                      />
                      {/* 相手のマーカー */}
                      <div 
                        className="absolute top-0 w-4 h-4 bg-pink-500 rounded-full border-2 border-white shadow-lg"
                        style={{ left: `calc(${axis.partnerValue}% - 8px)` }}
                        title={`相手: ${Math.round(axis.partnerValue)}%`}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>🔵 あなた: {Math.round(axis.userValue)}%</span>
                      <span>🟣 相手: {Math.round(axis.partnerValue)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompatibilityChecker; 