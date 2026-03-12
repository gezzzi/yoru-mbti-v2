'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TestResult, PersonalityType } from '../../types/personality';
import { parseCompatibilityCode, generateCompatibilityCode, copyToClipboard } from '../../utils/snsShare';
import { personalityTypes } from '../../data/en/personalityTypes';
import { Heart, AlertCircle, TestTube, User, Share2, Copy, Check, Upload, Camera, Download, RefreshCw } from 'lucide-react';
import SNSShareModal from '../SNSShareModal';
import Image from 'next/image';
import QRCodeWithLogo from '../QRCodeWithLogo';
import NeonText from '../NeonText';
import { ScrollAnimation } from '../ScrollAnimation';
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

// Default test code for testing
// 5 axes: E=50, L=50, A=50, L2=50, O=50 (all midpoint values)
// Tags: all 25 scored at 3 (neutral)
// Secret answer: Question 37 -> answer 3 (neutral)
// Username: NightPersonality (Base64-encoded)
const DEFAULT_TEST_CODE = '2EWPYQ2-6HF6HF6HF6HF6HF-113_TmlnaHRQZXJzb25hbGl0eQ==';

const EnCompatibilityPage: React.FC<CompatibilityPageProps> = ({ onStartTest, onShowResults }) => {
  const [partnerCode, setPartnerCode] = useState(DEFAULT_TEST_CODE);
  const [myResult, setMyResult] = useState<TestResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [myCode, setMyCode] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isQRUploading, setIsQRUploading] = useState(false);
  const [isQRDownloading, setIsQRDownloading] = useState(false);
  const [isMyQRUploading, setIsMyQRUploading] = useState(false);
  const [uploadedQRImage, setUploadedQRImage] = useState<string | null>('default');
  const [qrImageDataUrl, setQrImageDataUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSecretQuestion, setSelectedSecretQuestion] = useState<number | null>(null);
  const [secretAnswer, setSecretAnswer] = useState<{ questionId: number; answer: number } | undefined>();
  const [partnerUsername, setPartnerUsername] = useState<string | undefined>();
  const qrRef = useRef<HTMLDivElement>(null);
  const partnerQrRef = useRef<HTMLDivElement>(null);

  // Mobile/tablet detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Load own test results from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('en_personality_test_result');
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

          // Get username
          const username = localStorage.getItem('en_personality_test_username') || undefined;

          // Randomly select a secret question
          const secretQuestions = [36, 37, 38, 39, 40];
          const randomQuestion = secretQuestions[Math.floor(Math.random() * secretQuestions.length)];
          setSelectedSecretQuestion(randomQuestion);

          // Get answer from answerHistory
          const answerHistory = localStorage.getItem('en_answer_history');
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
          console.error('Failed to load saved test results:', error);
        }
      }
    }
  }, []);


  const calculateCompatibility = (user: TestResult, partner: TestResult): CompatibilityResult => {
    // Calculate compatibility score for each axis (different methods for similar vs complementary axes)

    // Extroversion(E)/Introversion(I) - Similar axis (weight: 0.15)
    const eScore = (100 - Math.abs(user.E - partner.E)) * 0.15;

    // Lead(L)/Follow(F) - Complementary axis (weight: 0.3)
    // Closer to a sum of 100 is better
    const lScore = (100 - Math.abs((user.L + partner.L) - 100)) * 0.3;

    // Adventure(A)/Stable(S) - Similar axis (weight: 0.25)
    const aScore = (100 - Math.abs(user.A - partner.A)) * 0.25;

    // Love(L)/Free(F) - Similar axis (weight: 0.2)
    const l2Score = (100 - Math.abs(user.L2 - partner.L2)) * 0.2;

    // Open(O)/Secret(S) - Similar axis (weight: 0.1)
    const oScore = (100 - Math.abs(user.O - partner.O)) * 0.1;

    // Calculate total compatibility
    const compatibility = Math.max(0, Math.min(100, eScore + lScore + aScore + l2Score + oScore));

    let description = '';
    let tips: string[] = [];

    if (compatibility >= 80) {
      description = 'Excellent compatibility! You share similar values and behavioral patterns, making it easy to understand each other.';
      tips = [
        'Cherish your shared interests and values',
        'Respect each other\'s individuality to build an even deeper connection',
        'If you\'re too similar in some areas, look for ways to help each other grow'
      ];
    } else if (compatibility >= 60) {
      description = 'Good compatibility. You have some differences, but they could lead to mutual growth.';
      tips = [
        'Understand your differences and be willing to learn from each other',
        'Find common ground and deepen your connection from there',
        'Make an effort to recognize and appreciate each other\'s strengths'
      ];
    } else if (compatibility >= 40) {
      description = 'Average compatibility. Communication will be key to understanding each other.';
      tips = [
        'Make an effort to understand each other\'s perspectives and values',
        'Set aside regular time for meaningful conversations',
        'Aim for a relationship where you can leverage each other\'s strengths'
      ];
    } else {
      description = 'There are some challenges, but by understanding and respecting your differences, you can build a complementary relationship.';
      tips = [
        'See your differences as unique traits rather than problems',
        'Practice putting yourself in your partner\'s shoes',
        'Build your connection starting from small commonalities',
        'Aim for a relationship that sparks growth in both of you'
      ];
    }

    return { compatibility, description, tips };
  };

  const parseCode = (code: string): { result: TestResult | null; secretAnswer?: { questionId: number; answer: number }; username?: string } => {
    const parsed = parseCompatibilityCode(code);
    if (!parsed.result) return { result: null };

    const parsedResult = parsed.result;

    // Generate type code from 5 axes (including O axis)
    const typeCode =
      (parsedResult.E > 50 ? 'E' : 'I') +
      (parsedResult.L > 50 ? 'L' : 'F') +
      (parsedResult.A > 50 ? 'A' : 'S') +
      (parsedResult.L2 > 50 ? 'L' : 'F') +
      '-' +
      (parsedResult.O > 50 ? 'O' : 'S');

    // Search for base type using 4-character code
    const baseTypeCode = typeCode.split('-')[0];
    const modernCode = getModernPersonalityCode(baseTypeCode);
    const personalityType = personalityTypes.find(type =>
      type.code === modernCode
    ) || personalityTypes[0];

    // Return type with full 5-character code
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
        throw new Error('Your test results were not found. Please take the personality test first.');
      }

      if (partnerCode.length === 0) {
        throw new Error('Please scan your partner\'s QR code');
      }

      const parsed = parseCode(partnerCode);

      if (!parsed.result) {
        throw new Error('Invalid QR code');
      }

      if (secretAnswer) {
        localStorage.setItem('en_my_secret_answer', JSON.stringify(secretAnswer));
      }

      if (parsed.secretAnswer) {
        localStorage.setItem('en_partner_secret_answer', JSON.stringify(parsed.secretAnswer));
      }

      if (parsed.username) {
        localStorage.setItem('en_partner_username', parsed.username);
        setPartnerUsername(parsed.username);
      }

      if (onShowResults && myResult) {
        onShowResults(myResult, parsed.result);
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse QR code');
      return false;
    }
  };

  const handleStartLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (partnerCode.length === 0) {
      event.preventDefault();
      setError('Please scan your partner\'s QR code');
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
    setPartnerUsername(undefined);
  };

  const handleQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsQRUploading(true);
    setError('');

    try {
      // Dynamically load QrScanner
      const QrScanner = (await import('qr-scanner')).default;
      // Convert file to Data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageDataUrl = e.target?.result as string;
        setUploadedQRImage(imageDataUrl);

        try {
          // Try standard scanning first
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
            // If standard scanning fails, retry with advanced settings
            try {
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
              readSuccess = false;
            }
          }

          if (readSuccess && qrText && qrText.match(/^[A-Za-z0-9]+(-[A-Za-z0-9]+)?(-[A-Za-z0-9]+)?(_[A-Za-z0-9+/=]+)?$/)) {
            setPartnerCode(qrText);
            // Extract partner username
            const parsed = parseCompatibilityCode(qrText);
            if (parsed.username) {
              setPartnerUsername(parsed.username);
            }
            setError('');
          } else {
            throw new Error('Failed to read the QR code.\nPlease make sure the photo is clear and the QR code is straight.');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to read the QR code');
          setUploadedQRImage(null);
        } finally {
          setIsQRUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read the QR code');
      setIsQRUploading(false);
    } finally {
      // Reset file input
      event.target.value = '';
    }
  };

  const handleMyQRUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsMyQRUploading(true);
    setError('');

    try {
      // Dynamically load QrScanner
      const QrScanner = (await import('qr-scanner')).default;
      // Read the QR code
      const rawResult: unknown = await QrScanner.scanImage(file);
      const result = typeof rawResult === 'string' ? rawResult.trim() : String(rawResult ?? '').trim();

      // Check if the result matches a valid code format (supports both old and new formats)
      if (result && result.match(/^[A-Za-z0-9]+(-[A-Za-z0-9]+)?(_[A-Za-z0-9+/=]+)?$/)) {
        const code = result;

        // Parse the code to restore test results
        const parsed = parseCode(code);

        if (!parsed.result) {
          throw new Error('Could not read valid test results from the QR code');
        }

        // Set as own result
        setMyResult(parsed.result);
        setSecretAnswer(parsed.secretAnswer);
        setMyCode(code);

        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('en_personality_test_result', JSON.stringify(parsed.result));
        }

        setError('');
      } else {
        throw new Error('Could not read a valid code from the QR code');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to read the QR code');
    } finally {
      setIsMyQRUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };


  const handleQRDownload = async () => {
    if (!qrRef.current) return;

    setIsQRDownloading(true);
    try {
      // First look for a Canvas element
      const canvas = qrRef.current.querySelector('canvas');

      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `QR_Personality_${myResult?.type.code}.png`;
        link.href = dataUrl;
        link.click();
        setIsQRDownloading(false);
        return;
      }

      // Fallback to SVG element
      const svg = qrRef.current.querySelector('svg');
      if (!svg) throw new Error('QR code not found');

      const canvasElement = document.createElement('canvas');
      const ctx = canvasElement.getContext('2d');
      const img = document.createElement('img') as HTMLImageElement;

      // Convert SVG to Data URL
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvasElement.width = 400;
        canvasElement.height = 400;
        ctx?.drawImage(img, 0, 0, 400, 400);

        const link = document.createElement('a');
        link.download = `QR_Personality_${myResult?.type.code}.png`;
        link.href = canvasElement.toDataURL('image/png');
        link.click();

        URL.revokeObjectURL(svgUrl);
        setIsQRDownloading(false);
      };

      img.onerror = () => {
        console.error('Failed to convert QR code to image');
        setIsQRDownloading(false);
      };

      img.src = svgUrl;
    } catch (error) {
      console.error('Failed to download QR code:', error);
      setIsQRDownloading(false);
    }
  };




  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="text-[#e0e7ff] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 select-none">
              <NeonText text="Compatibility" specialCharIndex={1} className="flex justify-center gap-1" />
            </h1>
          </ScrollAnimation>

        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl py-12">


        {/* QR Code Compatibility */}
        {myResult && (
          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="rounded-xl p-6 mb-8 border-2 border-white/30" style={{backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'}}>
            <h2 className="text-2xl font-bold text-[#e0e7ff] mb-6 text-center">QR Code Compatibility</h2>

            <div className="grid md:grid-cols-2 gap-8">
                             {/* Left side: Your QR Code */}
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-[#e0e7ff] text-center">Your QR Code</h3>
                 <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center gap-4 border border-white/5">
                  <div className="bg-white/90 backdrop-blur-xs p-4 rounded-lg shadow-sm border border-white/40" ref={qrRef}>
                    {/* Mobile/Tablet: Display as img element (long-press to save) */}
                    {isMobile && qrImageDataUrl ? (
                      <img
                        src={qrImageDataUrl}
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="w-[200px] h-[200px] object-contain"
                        style={{ touchAction: 'none' }}
                      />
                    ) : (
                      /* PC: Display as canvas element */
                      <QRCodeWithLogo
                        value={myCode}
                        size={200}
                        logoSrc="/icon-512.png"
                        logoSizeRatio={0.18}
                        className="w-full h-auto max-w-[200px]"
                        onGenerated={(dataUrl) => setQrImageDataUrl(dataUrl)}
                      />
                    )}
                    {/* Hidden canvas for Data URL generation (needed on mobile too) */}
                    {isMobile && (
                      <div className="hidden">
                        <QRCodeWithLogo
                          value={myCode}
                          size={200}
                          logoSrc="/icon-512.png"
                          logoSizeRatio={0.18}
                          onGenerated={(dataUrl) => setQrImageDataUrl(dataUrl)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Mobile/Tablet: Long-press save instruction */}
                  {isMobile && (
                    <p className="text-xs text-[#e0e7ff]/70 text-center">
                      Long-press the image to save
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 justify-center">
                    <div className="flex gap-2">
                      {/* PC only: Show save button */}
                      {!isMobile && (
                        <button
                          onClick={handleQRDownload}
                          disabled={isQRDownloading}
                          className="flex items-center space-x-2 bg-blue-400 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-300 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 whitespace-nowrap"
                        >
                          {isQRDownloading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Save</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* Mobile/Tablet only: Show share button */}
                      {isMobile && (
                        <button
                          onClick={() => setShowShareModal(true)}
                          className="flex items-center space-x-2 bg-teal-500 text-teal-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 whitespace-nowrap"
                        >
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Partner's QR Code scanning */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#e0e7ff] text-center">Partner&apos;s QR Code</h3>

                <div className="space-y-6">
                  {/* QR Code upload */}
                  {uploadedQRImage ? (
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/5 flex flex-col items-center gap-4">
                              {uploadedQRImage === 'default' ? (
                                // Test QR code - clickable to upload
                                <label className="cursor-pointer hover:opacity-80 transition-opacity">
                                  <div className="bg-white/90 backdrop-blur-xs p-4 rounded-lg shadow-sm border border-white/40" ref={partnerQrRef}>
                                    <div className="opacity-50">
                                      <QRCodeWithLogo
                                        value={DEFAULT_TEST_CODE}
                                        size={200}
                                        logoSrc="/icon-512.png"
                                        logoSizeRatio={0.18}
                                        className="w-full h-auto max-w-[200px]"
                                      />
                                    </div>
                                    <p className="text-xs text-gray-700 text-center mt-2 flex items-center justify-center gap-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                      </svg>
                                      Upload QR Code
                                    </p>
                                  </div>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleQRUpload}
                                    className="hidden"
                                    disabled={isQRUploading}
                                  />
                                </label>
                              ) : (
                                // Uploaded QR code
                                <div className="bg-white/90 backdrop-blur-xs p-4 rounded-lg shadow-sm border border-white/40" ref={partnerQrRef}>
                                  <img
                                    src={uploadedQRImage}
                                    alt="Uploaded QR Code"
                                    width={200}
                                    height={200}
                                    className="w-full h-auto max-w-[200px]"
                                  />
                                </div>
                              )}
                      <div className="flex flex-wrap gap-2 justify-center">
                        <button
                          onClick={handleReset}
                          className="text-sm text-[#e0e7ff] hover:text-white underline px-4 py-2 flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Clear QR Code
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-white/40 border-dashed rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                            <div className="flex flex-col items-center justify-center pt-6 pb-6">
                              {isQRUploading ? (
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                  <span className="text-sm text-[#e0e7ff]">Scanning...</span>
                                </div>
                              ) : (
                                <>
                                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                                  <p className="text-lg font-medium text-[#e0e7ff] mb-1">Upload QR Code</p>
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

                  {/* Error display */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
                          {error.includes('Failed to read') && (
                            <ul className="mt-2 text-xs text-red-500 list-disc list-inside space-y-1">
                              <li>Make sure the QR code fills most of the photo</li>
                              <li>Take the photo as straight-on as possible</li>
                              <li>Use good lighting</li>
                              <li>Make sure the image is in focus</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-center mt-6">
              <a
                href="/en/compatibility/results"
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
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    <span>Start Compatibility Test</span>
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
    </div>
  );
};

export default EnCompatibilityPage;
