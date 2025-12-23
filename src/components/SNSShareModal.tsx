'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TestResult } from '../types/personality';
import { 
  generateSNSShareText, 
  generateTwitterShareURL, 
  shareToInstagram,
  generateCompatibilityCode,
  shareWithWebAPI,
  isWebShareAPILevel2Supported
} from '../utils/snsShare';
import { X, Twitter, Share, Instagram } from 'lucide-react';
import QRCodeWithLogo from './QRCodeWithLogo';

interface SNSShareModalProps {
  result: TestResult;
  isOpen: boolean;
  onClose: () => void;
  initialShareText?: string;
}

const SNSShareModal: React.FC<SNSShareModalProps> = ({ result, isOpen, onClose, initialShareText }) => {
  const [shareText, setShareText] = useState(initialShareText || generateSNSShareText(result));
  const [isWebSharing, setIsWebSharing] = useState(false);
  const [webShareSupported, setWebShareSupported] = useState(false);
  const [showOtherShares, setShowOtherShares] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Web Share API Level 2のサポート状況をチェック
  useEffect(() => {
    setWebShareSupported(isWebShareAPILevel2Supported());
  }, []);

  if (!isOpen) return null;

  const handleTwitterShare = () => {
    const url = generateTwitterShareURL(result);
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleInstagramShare = () => {
    shareToInstagram(shareText);
  };

  const handleWebShare = async () => {
    if (!qrRef.current) return;

    setIsWebSharing(true);
    try {
      const success = await shareWithWebAPI(
        shareText,
        qrRef.current,
        `相性診断QRコード_${result.type.code}.png`,
        '夜の性格診断 - 相性診断コード'
      );
      
      if (success === 'cancelled') {
        // ユーザーがキャンセルした場合は何も表示しない
        return;
      } else if (!success) {
        // フォールバック: 従来の方法でシェア
        alert('このデバイスではQRコードを含めたシェアがサポートされていません。他の方法でシェアしてください。');
      }
    } catch (error) {
      console.error('Web Share APIでのシェアに失敗しました:', error);
      alert('シェアに失敗しました。他の方法でシェアしてください。');
    } finally {
      setIsWebSharing(false);
    }
  };


  // ローカルストレージからユーザー名を取得
  const username = typeof window !== 'undefined' ? localStorage.getItem('personality_test_username') || undefined : undefined;
  const compatibilityCode = generateCompatibilityCode(result, undefined, username);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1f2e] border border-white/20 rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="relative flex items-center justify-center p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-[#e0e7ff]">結果をシェア</h2>
          <button
            onClick={onClose}
            className="absolute right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#e0e7ff]" />
          </button>
        </div>

        {/* メインコンテンツ */}
        <div className="p-6 space-y-6">
          {/* 非表示のQRコード（シェア機能用に内部で保持） */}
          <div className="hidden">
            <div className="bg-white p-3 rounded-lg shadow-sm" ref={qrRef}>
              <QRCodeWithLogo
                value={compatibilityCode}
                size={400}
                logoSrc="/icon-512.png"
                logoSizeRatio={0.18}
                className="w-full h-auto max-w-[400px]"
              />
            </div>
          </div>

          {/* カスタマイズ可能な投稿テキスト */}
          <div>
            <textarea
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="w-full p-3 border border-white/20 bg-white/10 text-[#e0e7ff] rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={8}
            />
            <p className="text-xs text-[#e0e7ff] mt-1">
              文字数: {shareText.length}
            </p>
          </div>

          {/* SNSシェアボタン */}
          <div className="space-y-4">
            <div className="space-y-3">
              {/* Web Share API Level 2 - ワンタップシェア */}
              {webShareSupported && (
                <button
                  onClick={handleWebShare}
                  disabled={isWebSharing}
                  className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 text-white py-4 px-4 rounded-lg hover:-translate-y-1 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform font-semibold"
                >
                  {isWebSharing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>シェア中...</span>
                    </>
                  ) : (
                    <>
                      <Share className="w-6 h-6" />
                      <span>相性診断QRコードを含めてシェア</span>
                    </>
                  )}
                </button>
              )}

              {/* その他のシェアオプション */}
              <div className="pt-3">
                <button
                  onClick={() => setShowOtherShares(!showOtherShares)}
                  className="flex items-center justify-center space-x-2 w-full bg-white/10 text-[#e0e7ff] py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  <span>相性診断QRコードを含めずにシェア</span>
                  <span className={`transition-transform ${showOtherShares ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                {showOtherShares && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {/* X(Twitter) */}
                    <button
                      onClick={handleTwitterShare}
                      className="flex items-center justify-center space-x-2 bg-[#000000] text-[#ffffff] py-2 px-3 rounded-lg hover:bg-[#1f2937] transition-colors text-sm"
                    >
                      <Twitter className="w-4 h-4" />
                      <span>X</span>
                    </button>

                    {/* Instagram */}
                    <button
                      onClick={handleInstagramShare}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors text-sm"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Instagram</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* フッター */}
        <div className="p-6 border-t border-white/20 bg-white/5 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full bg-white/10 text-[#e0e7ff] py-2 px-4 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SNSShareModal; 
