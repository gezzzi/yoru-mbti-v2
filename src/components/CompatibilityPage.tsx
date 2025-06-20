'use client';

import React, { useState, useEffect } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { parseCompatibilityCode, generateCompatibilityCode } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import { Heart, Users, AlertCircle, Check, HelpCircle, ArrowRight, TestTube, User } from 'lucide-react';
import Footer from './Footer';

interface CompatibilityResult {
  compatibility: number;
  description: string;
  tips: string[];
}

interface CompatibilityPageProps {
  onStartTest?: () => void;
}

const CompatibilityPage: React.FC<CompatibilityPageProps> = ({ onStartTest }) => {
  const [partnerCode, setPartnerCode] = useState('');
  const [myResult, setMyResult] = useState<TestResult | null>(null);
  const [partnerResult, setPartnerResult] = useState<TestResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [myCode, setMyCode] = useState('');

  // ローカルストレージから自分の診断結果を読み込む
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (savedResult) {
        try {
          const parsedResult: TestResult = JSON.parse(savedResult);
          setMyResult(parsedResult);
          const code = generateCompatibilityCode(parsedResult);
          setMyCode(code);
        } catch (error) {
          console.error('保存された診断結果の読み込みに失敗しました:', error);
        }
      }
    }
  }, []);

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

  const parseCode = (code: string): TestResult | null => {
    const parsedResult = parseCompatibilityCode(code);
    if (!parsedResult) return null;

    const typeCode = 
      (parsedResult.E > 50 ? 'E' : 'I') +
      (parsedResult.D > 50 ? 'D' : 'S') +
      (parsedResult.T > 50 ? 'T' : 'S') +
      (parsedResult.A > 50 ? 'A' : 'N');
    
    const personalityType = personalityTypes.find(type => 
      type.code === typeCode
    ) || personalityTypes[0];
    
    return {
      E: parsedResult.E,
      D: parsedResult.D,
      T: parsedResult.T,
      R: parsedResult.R,
      A: parsedResult.A,
      type: personalityType
    };
  };

  const handleCheckCompatibility = async () => {
    setIsLoading(true);
    setError('');

    try {
      // 自分の診断結果の確認
      if (!myResult) {
        throw new Error('あなたの診断結果が見つかりません。まず性格診断テストを受けてください。');
      }

      // 相手のコードの検証
      if (partnerCode.length !== 10) {
        throw new Error('相性診断コードは10桁である必要があります');
      }

      // 相手のコードを解析
      const parsedPartnerResult = parseCode(partnerCode);
      
      if (!parsedPartnerResult) {
        throw new Error('相性診断コードが無効です');
      }

      setPartnerResult(parsedPartnerResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : '相性診断コードの解析に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPartnerCode('');
    setPartnerResult(null);
    setError('');
  };

  const compatibility = myResult && partnerResult ? calculateCompatibility(myResult, partnerResult) : null;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">相性診断</h1>
          <p className="text-xl opacity-90 mb-8">
            相性診断コードを入力して、お互いの性格の相性を詳しく分析しましょう
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 使い方の説明 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <HelpCircle className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">使い方</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">診断結果をシェアしてもらう</h3>
                <p className="text-sm text-gray-600">相性を知りたい相手に、性格診断を受けてもらい、結果をシェアしてもらいましょう。</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">相性診断コードを入手</h3>
                <p className="text-sm text-gray-600">シェアされた投稿から、10桁の相性診断コードを見つけてください。</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">相手のコードを入力して診断</h3>
                <p className="text-sm text-gray-600">相手の相性診断コードを入力して、お互いの相性を診断してみましょう。</p>
              </div>
            </div>
          </div>
        </div>

        {/* 自分の診断結果がない場合の警告 */}
        {!myResult && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
              <h2 className="text-xl font-bold text-yellow-800">まず性格診断テストを受けてください</h2>
            </div>
            <p className="text-yellow-700 mb-4">
              相性診断を行うには、まずあなた自身の性格診断結果が必要です。
            </p>
            <button
              onClick={onStartTest}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center space-x-2"
            >
              <TestTube className="w-5 h-5" />
              <span>性格診断テストを受ける</span>
            </button>
          </div>
        )}

        {/* 自分の診断結果表示 */}
        {myResult && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <User className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">あなたの診断結果</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <span className="text-4xl mb-3 block">{myResult.type.emoji}</span>
                <h3 className="text-xl font-bold text-gray-900">{myResult.type.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{myResult.type.code}</p>
                <p className="text-sm text-gray-700">{myResult.type.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">あなたの相性診断コード</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <code className="text-2xl font-mono text-center block text-blue-600 font-bold">
                    {myCode}
                  </code>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  このコードを相手に教えて、お互いの相性を診断してもらいましょう。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 相手のコード入力フォーム */}
        {myResult && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">相手の相性診断コード入力</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  相手の相性診断コード
                </label>
                <input
                  type="text"
                  value={partnerCode}
                  onChange={(e) => setPartnerCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  placeholder="0123456789"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-center text-lg"
                  maxLength={10}
                />
                <p className="text-sm text-gray-600 mt-2">
                  相手にシェアしてもらった投稿から、10桁の相性診断コードを入力してください。
                </p>
              </div>

              {/* エラー表示 */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* ボタン */}
              <div className="flex space-x-3">
                <button
                  onClick={handleCheckCompatibility}
                  disabled={partnerCode.length !== 10 || isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>診断中...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      <span>相性診断開始</span>
                    </>
                  )}
                </button>
                
                {partnerResult && (
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    リセット
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 結果表示 */}
        {compatibility && myResult && partnerResult && (
          <div className="space-y-8">
            {/* 相性スコア */}
            <div className={`rounded-xl p-8 border-2 ${getCompatibilityColor(compatibility.compatibility)} shadow-lg`}>
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
            <div className="bg-white rounded-xl shadow-lg p-6">
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
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">性格特性の詳細比較</h3>
              <div className="space-y-6">
                {[
                  { label: '外向性 vs 内向性', value1: myResult.E, value2: partnerResult.E },
                  { label: '主導性 vs 服従性', value1: myResult.D, value2: partnerResult.D },
                  { label: '刺激志向 vs 安心志向', value1: myResult.T, value2: partnerResult.T },
                  { label: '羞恥体制 vs 羞恥敏感', value1: myResult.R, value2: partnerResult.R },
                  { label: '愛着傾向 vs 非愛着傾向', value1: myResult.A, value2: partnerResult.A }
                ].map((axis, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{axis.label}</span>
                      <span className="text-sm text-gray-600">
                        差: {Math.abs(axis.value1 - axis.value2).toFixed(0)}%
                      </span>
                    </div>
                    <div className="relative h-6 bg-gray-200 rounded-full">
                      {/* 1つ目のマーカー */}
                      <div 
                        className="absolute top-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"
                        style={{ left: `calc(${axis.value1}% - 8px)` }}
                        title={`1つ目: ${Math.round(axis.value1)}%`}
                      />
                      {/* 2つ目のマーカー */}
                      <div 
                        className="absolute top-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-white shadow-lg"
                        style={{ left: `calc(${axis.value2}% - 8px)` }}
                        title={`2つ目: ${Math.round(axis.value2)}%`}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>🔵 あなた: {Math.round(axis.value1)}%</span>
                      <span>🟣 相手: {Math.round(axis.value2)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CompatibilityPage; 