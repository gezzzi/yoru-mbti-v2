'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { parseCompatibilityCode, generateCompatibilityCode, copyToClipboard } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import { Heart, AlertCircle, TestTube, User, Share2, Copy, Check, Upload, Camera, Download, RefreshCw } from 'lucide-react';
import SNSShareModal from './SNSShareModal';
import Image from 'next/image';
import QRCode from 'react-qr-code';
import QrScanner from 'qr-scanner';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';

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
  const [isMyQRUploading, setIsMyQRUploading] = useState(false);
  const [uploadedQRImage, setUploadedQRImage] = useState<string | null>(null);
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
        throw new Error('相手のQRコードを読み取ってください');
      }

      // 相手のコードを解析
      const parsedPartnerResult = parseCode(partnerCode);
      
      if (!parsedPartnerResult) {
        throw new Error('QRコードが無効です');
      }

      // 結果ページに遷移
      if (onShowResults && myResult) {
        onShowResults(myResult, parsedPartnerResult);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QRコードの解析に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPartnerCode('');
    setError('');
    setUploadedQRImage(null);
  };

  const handleQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsQRUploading(true);
    setError('');

    try {
      // ファイルをData URLに変換
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageDataUrl = e.target?.result as string;
        setUploadedQRImage(imageDataUrl);
        
        try {
          // QRコードを読み取る
          const result = await QrScanner.scanImage(file);
          
          // 読み取った結果がコードの形式かチェック
          if (result && result.match(/^[A-Za-z0-9]{1,8}$/)) {
            setPartnerCode(result.toUpperCase());
          } else {
            throw new Error('QRコードから有効なコードを読み取れませんでした');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'QRコードの読み取りに失敗しました');
          setUploadedQRImage(null);
        } finally {
          setIsQRUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QRコードの読み取りに失敗しました');
      setIsQRUploading(false);
    } finally {
      // ファイル入力をリセット
      event.target.value = '';
    }
  };

  const handleMyQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsMyQRUploading(true);
    setError('');

    try {
      // QRコードを読み取る
      const result = await QrScanner.scanImage(file);
      
      // 読み取った結果がコードの形式かチェック
      if (result && result.match(/^[A-Za-z0-9]{1,8}$/)) {
        const code = result.toUpperCase();
        
        // コードを解析して診断結果を復元
        const parsedResult = parseCode(code);
        
        if (!parsedResult) {
          throw new Error('QRコードから有効な診断結果を読み取れませんでした');
        }

        // 自分の結果として設定
        setMyResult(parsedResult);
        setMyCode(code);
        
        // ローカルストレージにも保存
        if (typeof window !== 'undefined') {
          localStorage.setItem('personality_test_result', JSON.stringify(parsedResult));
        }
        
        setError('');
        
        // 成功メッセージを表示（既存の結果がある場合は更新メッセージ）
        const message = myResult ? 'QRコードが正常に更新されました！' : 'QRコードが正常に読み込まれました！';
        // 一時的に成功状態を表示するためのロジックを追加することも可能
      } else {
        throw new Error('QRコードから有効なコードを読み取れませんでした');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QRコードの読み取りに失敗しました');
    } finally {
      setIsMyQRUploading(false);
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
          <ScrollAnimation animation="fadeIn" duration={800}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 select-none">
              <NeonText text="相性診断" specialCharIndex={1} className="flex justify-center gap-1" />
            </h1>
          </ScrollAnimation>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        


        {/* 自分の診断結果がない場合の警告 */}
        {!myResult && (
          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
                <h2 className="text-xl font-bold text-yellow-800">性格診断結果が必要です</h2>
              </div>
            <p className="text-yellow-700 mb-6">
              相性診断を行うには、あなた自身の性格診断結果が必要です。以下のいずれかの方法で設定してください。
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* 新しく診断を受ける */}
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <TestTube className="w-5 h-5 mr-2" />
                  新しく診断を受ける
                </h3>
                <p className="text-yellow-700 text-sm mb-3">
                  25の質問に答えて、あなたの性格タイプを診断します。
                </p>
                <button
                  onClick={() => onStartTest?.()}
                  className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
                >
                  性格診断テストを受ける
                </button>
              </div>

              {/* 過去のQRコードをアップロード */}
              <div className="bg-white rounded-lg p-4 border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2 flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  過去の診断結果を使用
                </h3>
                <p className="text-yellow-700 text-sm mb-3">
                  以前に診断したQRコードをアップロードして結果を復元します。
                </p>
                <div className="w-full">
                  <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-yellow-300 border-dashed rounded-lg cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                      {isMyQRUploading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm text-yellow-600">読み取り中...</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-6 h-6 text-yellow-400 mb-1" />
                          <p className="text-xs text-yellow-600">QRコード画像をアップロード</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMyQRUpload}
                      className="hidden"
                      disabled={isMyQRUploading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          </ScrollAnimation>
        )}

        {/* 相性診断QRコード */}
        {myResult && (
          <ScrollAnimation animation="fadeInUp" delay={400}>
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
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={handleQRDownload}
                        disabled={isQRDownloading}
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                      >
                        {isQRDownloading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>保存中...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>保存</span>
                          </>
                        )}
                      </button>
                      
                      <label className="cursor-pointer">
                        <button
                          type="button"
                          disabled={isMyQRUploading}
                          className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                        >
                          {isMyQRUploading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>更新中...</span>
                            </>
                          ) : (
                            <>
                              <RefreshCw className="w-4 h-4" />
                              <span>更新</span>
                            </>
                          )}
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMyQRUpload}
                          className="hidden"
                          disabled={isMyQRUploading}
                        />
                      </label>
                    </div>
                    
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>シェア</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 右側：相手の相性診断QRコード読み取り */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 text-center">相手のQRコードを読み取り</h3>
                
                <div className="space-y-6">
                  {/* QRコードアップロード */}
                  <div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full">
                        {uploadedQRImage ? (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-full max-w-xs bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                              <img
                                src={uploadedQRImage}
                                alt="アップロードされたQRコード"
                                className="w-full h-auto rounded-lg"
                              />
                            </div>
                            <button
                              onClick={handleReset}
                              className="text-sm text-gray-600 hover:text-gray-800 underline"
                            >
                              別のQRコードを選択
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-6 pb-6">
                              {isQRUploading ? (
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                  <span className="text-sm text-gray-600">読み取り中...</span>
                                </div>
                              ) : (
                                <>
                                  <Camera className="w-10 h-10 text-gray-400 mb-3" />
                                  <p className="text-lg font-medium text-gray-700 mb-1">QRコード画像をアップロード</p>
                                  <p className="text-sm text-gray-500 text-center px-4">相手の診断結果QRコードの画像をアップロードしてください</p>
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
                        )}
                      </div>
                    </div>
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
          </ScrollAnimation>
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