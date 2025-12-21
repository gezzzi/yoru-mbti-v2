'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TestResult, PersonalityType } from '../types/personality';
import { parseCompatibilityCode, generateCompatibilityCode, copyToClipboard } from '../utils/snsShare';
import { personalityTypes } from '../data/personalityTypes';
import { Heart, AlertCircle, TestTube, User, Share2, Copy, Check, Upload, Camera, Download, RefreshCw, X } from 'lucide-react';
import SNSShareModal from './SNSShareModal';
import Image from 'next/image';
import QRCodeWithLogo from './QRCodeWithLogo';
import QrScanner from 'qr-scanner';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';
import { buildPersonalityImageSources, getModernPersonalityCode } from '@/utils/personalityImage';

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
  const [sourceIndex, setSourceIndex] = useState(0);

  const sources = useMemo(() => buildPersonalityImageSources([typeCode]), [typeCode]);
  const sourceKey = sources.join('|');

  useEffect(() => {
    setSourceIndex(0);
    setImageError(false);
  }, [sourceKey]);

  const handleImageError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  if (imageError || sources.length === 0) {
    return <span className="text-6xl md:text-8xl">{emoji}</span>;
  }

  return (
    <div className="w-32 h-32 md:w-48 md:h-48 relative mx-auto mb-4">
      <Image
        src={sources[sourceIndex]}
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
  const [showQRFullscreen, setShowQRFullscreen] = useState(false);
  const [qrImageDataUrl, setQrImageDataUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSecretQuestion, setSelectedSecretQuestion] = useState<number | null>(null);
  const [secretAnswer, setSecretAnswer] = useState<{ questionId: number; answer: number } | undefined>();
  const [partnerUsername, setPartnerUsername] = useState<string | undefined>();
  const qrRef = useRef<HTMLDivElement>(null);

  // モバイル/タブレット判定
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // ローカルストレージから自分の診断結果を読み込む
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (savedResult) {
        try {
          const parsedResult: TestResult = JSON.parse(savedResult);
          const normalizedCode = getModernPersonalityCode(parsedResult.type?.code ?? '');
          const baseType = personalityTypes.find(type => type.code === (normalizedCode || personalityTypes[0].code)) || personalityTypes[0];
          const normalizedResult: TestResult = {
            ...parsedResult,
            type: {
              ...baseType,
              ...parsedResult.type,
              code: baseType.code,
            },
          };
          setMyResult(normalizedResult);
          
          // ユーザー名を取得
          const username = localStorage.getItem('personality_test_username') || undefined;
          
          // ランダムに秘密の質問を選択
          const secretQuestions = [36, 37, 38, 39, 40];
          const randomQuestion = secretQuestions[Math.floor(Math.random() * secretQuestions.length)];
          setSelectedSecretQuestion(randomQuestion);
          
          // answerHistoryから回答を取得
          const answerHistory = localStorage.getItem('answer_history');
          if (answerHistory) {
            const answers = JSON.parse(answerHistory);
            
            if (answers[randomQuestion] !== undefined) {
              const answer = { questionId: randomQuestion, answer: answers[randomQuestion] };
              setSecretAnswer(answer);
              const code = generateCompatibilityCode(normalizedResult, answer, username);
              setMyCode(code);
            } else {
              const code = generateCompatibilityCode(normalizedResult, undefined, username);
              setMyCode(code);
            }
          } else {
            const code = generateCompatibilityCode(normalizedResult, undefined, username);
            setMyCode(code);
          }
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
    
    // リード(L)/フォロー(F) - 補完軸 (重み: 0.3)
    // 合計値が100に近いほど良い
    const lScore = (100 - Math.abs((user.L + partner.L) - 100)) * 0.3;
    
    // 冒険(A)/安定(S) - 類似軸 (重み: 0.25)
    const aScore = (100 - Math.abs(user.A - partner.A)) * 0.25;
    
    // ラブ(L)/フリー(F) - 類似軸 (重み: 0.2)
    const l2Score = (100 - Math.abs(user.L2 - partner.L2)) * 0.2;
    
    // 開放(O)/秘密(S) - 類似軸 (重み: 0.1)
    const oScore = (100 - Math.abs(user.O - partner.O)) * 0.1;
    
    // 総合相性度を計算
    const compatibility = Math.max(0, Math.min(100, eScore + lScore + aScore + l2Score + oScore));

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

  const parseCode = (code: string): { result: TestResult | null; secretAnswer?: { questionId: number; answer: number }; username?: string } => {
    const parsed = parseCompatibilityCode(code);
    if (!parsed.result) return { result: null };
    
    const parsedResult = parsed.result;

    // 5軸のタイプコードを生成（O軸を含む）
    const typeCode = 
      (parsedResult.E > 50 ? 'E' : 'I') +
      (parsedResult.L > 50 ? 'L' : 'F') +
      (parsedResult.A > 50 ? 'A' : 'S') +
      (parsedResult.L2 > 50 ? 'L' : 'F') +
      '-' +
      (parsedResult.O > 50 ? 'O' : 'S');
    
    // 4文字のコードで基本タイプを検索
    const baseTypeCode = typeCode.split('-')[0];
    const modernCode = getModernPersonalityCode(baseTypeCode);
    const personalityType = personalityTypes.find(type => 
      type.code === modernCode
    ) || personalityTypes[0];
    
    // 完全な5文字コードを含むタイプを返す
    const personalityTypeWithFullCode = {
      ...personalityType,
      code: modernCode
    };
    
    return {
      result: {
        E: parsedResult.E,
        L: parsedResult.L,
        A: parsedResult.A,
        L2: parsedResult.L2,
        O: parsedResult.O,
        type: personalityTypeWithFullCode,
        additionalResults: parsedResult.additionalResults
      },
      secretAnswer: parsed.secretAnswer,
      username: parsed.username
    };
  };

  const prepareCompatibilityResults = () => {
    try {
      if (typeof window === 'undefined') {
        return false;
      }

      if (!myResult) {
        throw new Error('あなたの診断結果が見つかりません。まず性格診断テストを受けてください。');
      }

      if (partnerCode.length === 0) {
        throw new Error('相手のQRコードを読み取ってください');
      }

      const parsed = parseCode(partnerCode);

      if (!parsed.result) {
        throw new Error('QRコードが無効です');
      }

      if (secretAnswer) {
        localStorage.setItem('my_secret_answer', JSON.stringify(secretAnswer));
      }

      if (parsed.secretAnswer) {
        localStorage.setItem('partner_secret_answer', JSON.stringify(parsed.secretAnswer));
      }

      if (parsed.username) {
        localStorage.setItem('partner_username', parsed.username);
        setPartnerUsername(parsed.username);
      }

      if (onShowResults && myResult) {
        onShowResults(myResult, parsed.result);
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'QRコードの解析に失敗しました');
      return false;
    }
  };

  const handleStartLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (partnerCode.length === 0) {
      event.preventDefault();
      setError('相手のQRコードを読み取ってください');
      return;
    }

    if (isLoading) {
      event.preventDefault();
      return;
    }

    setIsLoading(true);
    setError('');
    const prepared = prepareCompatibilityResults();
    setIsLoading(false);

    if (!prepared) {
      event.preventDefault();
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
          // まず通常の読み取りを試みる
          let qrText = '';
          let readSuccess = false;
          
          try {
            const result: unknown = await QrScanner.scanImage(file);
            if (typeof result === 'string') {
              qrText = result.trim();
            } else {
              qrText = result != null ? String(result).trim() : '';
            }
            readSuccess = qrText.length > 0;
          } catch (firstError) {
            // 通常の読み取りに失敗した場合、高度な設定で再試行
            try {
              // QrScannerの高度な設定で再試行
              const result: unknown = await QrScanner.scanImage(file, {
                returnDetailedScanResult: true,
                alsoTryWithoutScanRegion: true
              });
              
              if (typeof result === 'string') {
                qrText = result.trim();
              } else if (result && typeof result === 'object' && 'data' in result) {
                const data = (result as { data: unknown }).data;
                qrText = typeof data === 'string' ? data.trim() : data != null ? String(data).trim() : '';
              } else {
                qrText = result != null ? String(result).trim() : '';
              }
              readSuccess = qrText.length > 0;
            } catch (secondError) {
              // それでも失敗した場合
              readSuccess = false;
            }
          }
          
          if (readSuccess && qrText && qrText.match(/^[A-Za-z0-9]+(-[A-Za-z0-9]+)?(-[A-Za-z0-9]+)?(_[A-Za-z0-9+/=]+)?$/)) {
            setPartnerCode(qrText);
            // パートナーのユーザー名を抽出
            const parsed = parseCompatibilityCode(qrText);
            if (parsed.username) {
              setPartnerUsername(parsed.username);
            }
            setError(''); // エラーをクリア
          } else {
            throw new Error('QRコードの読み取りに失敗しました。\n写真が鮮明で、QRコードがまっすぐ写っていることを確認してください。');
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
      const rawResult: unknown = await QrScanner.scanImage(file);
      const result = typeof rawResult === 'string' ? rawResult.trim() : String(rawResult ?? '').trim();
      
      // 読み取った結果がコードの形式かチェック（旧形式と新形式の両方に対応）
      if (result && result.match(/^[A-Za-z0-9]+(-[A-Za-z0-9]+)?(_[A-Za-z0-9+/=]+)?$/)) {
        const code = result;
        
        // コードを解析して診断結果を復元
        const parsed = parseCode(code);
        
        if (!parsed.result) {
          throw new Error('QRコードから有効な診断結果を読み取れませんでした');
        }

        // 自分の結果として設定
        setMyResult(parsed.result);
        setSecretAnswer(parsed.secretAnswer);
        setMyCode(code);
        
        // ローカルストレージにも保存
        if (typeof window !== 'undefined') {
          localStorage.setItem('personality_test_result', JSON.stringify(parsed.result));
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
      // まずCanvas要素を探す
      const canvas = qrRef.current.querySelector('canvas');
      
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        
        // モバイル/タブレットの場合はフルスクリーン表示
        if (isMobile) {
          setQrImageDataUrl(dataUrl);
          setShowQRFullscreen(true);
          setIsQRDownloading(false);
          return;
        }
        
        // PC版：従来のダウンロード
        const link = document.createElement('a');
        link.download = `QRコード診断_${myResult?.type.code}.png`;
        link.href = dataUrl;
        link.click();
        setIsQRDownloading(false);
        return;
      }

      // SVG要素の場合（フォールバック）
      const svg = qrRef.current.querySelector('svg');
      if (!svg) throw new Error('QRコードが見つかりません');

      const canvasElement = document.createElement('canvas');
      const ctx = canvasElement.getContext('2d');
      const img = document.createElement('img') as HTMLImageElement;
      
      // SVGをData URLに変換
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvasElement.width = 400;
        canvasElement.height = 400;
        ctx?.drawImage(img, 0, 0, 400, 400);
        
        const dataUrl = canvasElement.toDataURL('image/png');
        
        // モバイル/タブレットの場合はフルスクリーン表示
        if (isMobile) {
          setQrImageDataUrl(dataUrl);
          setShowQRFullscreen(true);
          URL.revokeObjectURL(svgUrl);
          setIsQRDownloading(false);
          return;
        }
        
        // PC版：従来のダウンロード
        const link = document.createElement('a');
        link.download = `QRコード診断_${myResult?.type.code}.png`;
        link.href = dataUrl;
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
      <div className="text-[#e0e7ff] py-16">
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
      <div className="max-w-4xl py-12">
        



        {/* QRコード診断 */}
        {myResult && (
          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="rounded-xl p-6 mb-8 border-2 border-white/30" style={{backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'}}>
            <h2 className="text-2xl font-bold text-[#e0e7ff] mb-6 text-center">QRコード診断</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
                             {/* 左側：あなたのQRコード */}
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-[#e0e7ff] text-center">あなたのQRコード</h3>
                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center gap-4 border border-white/5">
                  <div className="bg-white/90 backdrop-blur-xs p-4 rounded-lg shadow-sm border border-white/40" ref={qrRef}>
                    <QRCodeWithLogo
                      value={myCode}
                      size={200}
                      logoSrc="/icon-512.png"
                      logoSizeRatio={0.18}
                      className="w-full h-auto max-w-[200px]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <div className="flex gap-2">
                      <button
                        onClick={handleQRDownload}
                        disabled={isQRDownloading}
                        className="flex items-center space-x-2 bg-blue-400 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 whitespace-nowrap"
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
                      
                      <button
                        onClick={() => setShowShareModal(true)}
                        className="flex items-center space-x-2 bg-teal-500 text-teal-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 whitespace-nowrap"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>シェア</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右側：相手のQRコード読み取り */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#e0e7ff] text-center">相手のQRコード</h3>
                
                <div className="space-y-6">
                  {/* QRコードアップロード */}
                  {uploadedQRImage ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/5 flex flex-col items-center gap-4">
                              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-lg shadow-sm border border-white/40">
                                <img
                                  src={uploadedQRImage}
                                  alt="アップロードされたQRコード"
                                  className="w-full h-auto max-w-[200px]"
                                />
                              </div>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={handleReset}
                          className="text-sm text-[#e0e7ff] hover:text-white underline px-4 py-2"
                        >
                          別のQRコードを選択
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-white/40 border-dashed rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                            <div className="flex flex-col items-center justify-center pt-6 pb-6">
                              {isQRUploading ? (
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                  <span className="text-sm text-[#e0e7ff]">読み取り中...</span>
                                </div>
                              ) : (
                                <>
                                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                                  <p className="text-lg font-medium text-[#e0e7ff] mb-1">QRコードをアップロード</p>
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

                  {/* エラー表示 */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
                          {error.includes('読み取りに失敗') && (
                            <ul className="mt-2 text-xs text-red-500 list-disc list-inside space-y-1">
                              <li>QRコードが画面全体に大きく写るように撮影</li>
                              <li>できるだけ正面から撮影</li>
                              <li>明るい場所で撮影</li>
                              <li>ピントが合っていることを確認</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
            
            {/* ボタン */}
            <div className="flex justify-center mt-6">
              <a
                href="/compatibility/results"
                onClick={handleStartLinkClick}
                aria-disabled={partnerCode.length === 0 || isLoading}
                className={`bg-gradient-to-r from-[#ec4899] to-[#ffb8ce] text-white py-3 px-8 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 shadow-lg ${
                  partnerCode.length === 0 || isLoading
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:from-[#ffb8ce] hover:to-[#ffb8ce] transform hover:scale-105'
                }`}
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
              </a>
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

      {/* QRコード フルスクリーンモーダル（モバイル/タブレット用） */}
      {showQRFullscreen && qrImageDataUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setShowQRFullscreen(false)}
        >
          {/* 閉じるボタン */}
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setShowQRFullscreen(false)}
          >
            <X size={28} />
          </button>
          
          {/* 説明テキスト */}
          <p className="text-white/90 text-center mb-6 text-lg font-medium">
            📷 画像を長押しして保存
          </p>
          
          {/* QRコード画像（大きく表示） */}
          <div 
            className="bg-white p-6 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={qrImageDataUrl}
              alt="QRコード"
              className="w-[280px] h-[280px] object-contain"
              style={{ touchAction: 'none' }}
            />
          </div>
          
          {/* タイプ情報 */}
          {myResult && (
            <p className="text-white/70 text-center mt-4 text-sm">
              {myResult.type.name}（{myResult.type.code}）
            </p>
          )}
          
          {/* タップして閉じる */}
          <p className="text-white/50 text-sm mt-8">
            画面をタップして閉じる
          </p>
        </div>
      )}
    </div>
  );
};

export default CompatibilityPage; 
