'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { parseCompatibilityCode, generateCompatibilityCode, copyToClipboard, shareWithWebAPI, isWebShareAPILevel2Supported } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import { Heart, AlertCircle, TestTube, User, Share2, Copy, Check, Upload, Camera, Download, Share } from 'lucide-react';
import SNSShareModal from './SNSShareModal';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import QrScanner from 'qr-scanner';

interface CompatibilityResult {
  compatibility: number;
  description: string;
  tips: string[];
}

interface CompatibilityPageProps {
  onStartTest?: () => void;
  onShowResults?: (myResult: TestResult, partnerResult: TestResult) => void;
}

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

const CompatibilityPage: React.FC<CompatibilityPageProps> = ({ onStartTest, onShowResults }) => {
  const [partnerCode, setPartnerCode] = useState('');
  const [myResult, setMyResult] = useState<TestResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [myCode, setMyCode] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isQRUploading, setIsQRUploading] = useState(false);
  const [isQRDownloading, setIsQRDownloading] = useState(false);
  const [isWebSharing, setIsWebSharing] = useState(false);
  const [webShareSupported, setWebShareSupported] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

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

  // Web Share API Level 2のサポート状況をチェック
  useEffect(() => {
    setWebShareSupported(isWebShareAPILevel2Supported());
  }, []);

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

  const parseCode = (code: string): TestResult | null => {
    const parsedResult = parseCompatibilityCode(code);
    if (!parsedResult) return null;

    // 5軸すべてを含むタイプコードを生成（E-D-T-A-R形式）
    const typeCode = 
      (parsedResult.E > 50 ? 'E' : 'I') +
      (parsedResult.D > 50 ? 'D' : 'S') +
      (parsedResult.T > 50 ? 'T' : 'S') +
      (parsedResult.A > 50 ? 'A' : 'N') +
      '-' +
      (parsedResult.R > 50 ? 'R' : 'H');
    
    // 4軸のコードで性格タイプを検索（既存のpersonalityTypesは4軸ベース）
    const fourAxisCode = 
      (parsedResult.E > 50 ? 'E' : 'I') +
      (parsedResult.D > 50 ? 'D' : 'S') +
      (parsedResult.T > 50 ? 'T' : 'S') +
      (parsedResult.A > 50 ? 'A' : 'N');
    
    const personalityType = personalityTypes.find(type => 
      type.code === fourAxisCode
    ) || personalityTypes[0];
    
    // 5軸のタイプコードを表示用に設定
    const extendedPersonalityType = {
      ...personalityType,
      code: typeCode
    };
    
    return {
      E: parsedResult.E,
      D: parsedResult.D,
      T: parsedResult.T,
      R: parsedResult.R,
      A: parsedResult.A,
      type: extendedPersonalityType
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
      if (partnerCode.length === 0) {
        throw new Error('相性診断QRコードを読み取るか、コードを入力してください');
      }

      // 相手のコードを解析
      const parsedPartnerResult = parseCode(partnerCode);
      
      if (!parsedPartnerResult) {
        throw new Error('相性診断QRコード/コードが無効です');
      }

      // 結果ページに遷移
      if (onShowResults && myResult) {
        onShowResults(myResult, parsedPartnerResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '相性診断QRコード/コードの解析に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPartnerCode('');
    setError('');
  };

  const handleQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsQRUploading(true);
    setError('');

    try {
      // QRコードを読み取る
      const result = await QrScanner.scanImage(file);
      
      // 読み取った結果がコードの形式かチェック
      if (result && result.match(/^[A-Za-z0-9]{1,8}$/)) {
        setPartnerCode(result.toUpperCase());
      } else {
        throw new Error('QRコードから有効な相性診断コードを読み取れませんでした');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QRコードの読み取りに失敗しました');
    } finally {
      setIsQRUploading(false);
      // ファイル入力をリセット
      event.target.value = '';
    }
  };

  const handleQRDownload = async () => {
    if (!qrRef.current) return;

    setIsQRDownloading(true);
    try {
      // QRコードのSVGをCanvasに変換
      const svg = qrRef.current.querySelector('svg');
      if (!svg) throw new Error('QRコードが見つかりません');

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img') as HTMLImageElement;
      
      // SVGをData URLに変換
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 400;
        canvas.height = 400;
        ctx?.drawImage(img, 0, 0, 400, 400);
        
        // 画像をダウンロード
        const link = document.createElement('a');
        link.download = `相性診断QRコード_${myResult?.type.code}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        URL.revokeObjectURL(svgUrl);
        setIsQRDownloading(false);
      };

      img.onerror = () => {
        console.error('QRコードの画像変換に失敗しました');
        setIsQRDownloading(false);
      };

      img.src = svgUrl;
    } catch (error) {
      console.error('QRコードのダウンロードに失敗しました:', error);
      setIsQRDownloading(false);
    }
  };

  const handleWebShare = async () => {
    if (!qrRef.current || !myResult) return;

    setIsWebSharing(true);
    try {
      const shareText = `【夜の性格診断】
🌙 私の性格診断結果 🌙
タイプ: ${myResult.type.name}（${myResult.type.code}）
相性診断してみて！
[相性診断コード: ${myCode}]
${typeof window !== 'undefined' ? window.location.origin : ''} #夜の性格診断 #相性チェック`;

      const success = await shareWithWebAPI(
        shareText,
        qrRef.current,
        `相性診断QRコード_${myResult.type.code}.png`,
        '夜の性格診断 - 相性診断コード'
      );
      
      if (!success) {
        // フォールバック: SNSシェアモーダルを表示
        setShowShareModal(true);
      }
    } catch (error) {
      console.error('Web Share APIでのシェアに失敗しました:', error);
      // フォールバック: SNSシェアモーダルを表示
      setShowShareModal(true);
    } finally {
      setIsWebSharing(false);
    }
  };


  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 flex justify-center gap-1 select-none">
            <span style={{color:'#38bdf8',textShadow:'0 0 10px #38bdf8,0 0 20px #38bdf8,0 0 30px #0ea5e9',animation:'shimmerGold 3s ease-in-out infinite'}}>相</span>
            <span style={{color:'#f472b6',textShadow:'0 0 10px #f472b6,0 0 20px #ec4899,0 0 30px #be185d',animation:'pulsePink 2s ease-in-out infinite'}}>性</span>
            <span style={{color:'#38bdf8',textShadow:'0 0 10px #38bdf8,0 0 20px #38bdf8,0 0 30px #0ea5e9',animation:'electricBlue 1.5s ease-in-out infinite'}}>診</span>
            <span style={{color:'#38bdf8',textShadow:'0 0 10px #38bdf8,0 0 20px #38bdf8,0 0 30px #0ea5e9',animation:'glowGreen 2.5s ease-in-out infinite'}}>断</span>
          </h1>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        


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

        {/* 相性診断QRコード */}
        {myResult && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">相性診断QRコード</h2>
            
            <div className="grid lg:grid-cols-2 gap-8">
                             {/* 左側：あなたの相性診断QRコード */}
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-gray-900 text-center">あなたの相性診断QRコード</h3>
                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm" ref={qrRef}>
                    <QRCode
                      value={myCode}
                      size={200}
                      level="M"
                      className="w-full h-auto max-w-[200px]"
                    />
                  </div>
                  <div className="text-center">
                    <code className="text-sm font-mono text-blue-600 font-bold">
                      {myCode}
                    </code>
                    <button
                      onClick={async () => {
                        await copyToClipboard(myCode);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className={`ml-2 p-2 rounded-full border ${copied ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'} transition-colors`}
                      title="コピー"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                    </button>
                  </div>
                  <button
                    onClick={handleQRDownload}
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
                
                <div className="flex flex-col gap-2">
                  {webShareSupported && (
                    <button
                      onClick={handleWebShare}
                      disabled={isWebSharing}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                    >
                      {isWebSharing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>シェア中...</span>
                        </>
                      ) : (
                        <>
                          <Share className="w-5 h-5 mr-2" />
                          <span>✨ ワンタップシェア</span>
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    QRコードをシェア
                  </button>
                </div>
              </div>

              {/* 右側：相手の相性診断QRコード入力 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 text-center">相手の相性診断QRコード読み取り</h3>
                
                <div className="space-y-6">
                  {/* QRコードアップロード */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      QRコードから読み取る
                    </label>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {isQRUploading ? (
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm text-gray-600">読み取り中...</span>
                              </div>
                            ) : (
                              <>
                                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">QRコード画像をアップロード</p>
                              </>
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleQRUpload}
                            className="hidden"
                            disabled={isQRUploading}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* または */}
                  <div className="flex items-center">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <div className="px-4 text-sm text-gray-500 bg-white">または</div>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* テキスト入力 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      相性診断コードを直接入力
                    </label>
                    <input
                      type="text"
                      value={partnerCode}
                      onChange={(e) => setPartnerCode(e.target.value.replace(/[^0-9A-Za-z]/g, '').toUpperCase().slice(0, 8))}
                      placeholder="ABCD123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-center text-lg"
                      maxLength={8}
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      相手のQRコードの下に表示されているコード（英数字）を入力してください。
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
                      disabled={partnerCode.length === 0 || isLoading}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}




      </div>

      {/* Footer */}
      {/* SNS Share Modal */}
      {myResult && (
        <SNSShareModal
          result={myResult}
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
};

export default CompatibilityPage; 