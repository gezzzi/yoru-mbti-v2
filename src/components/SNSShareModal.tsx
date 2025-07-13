'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TestResult } from '../types/personality';
import { 
  generateSNSShareText, 
  generateTwitterShareURL, 
  generateLineShareURL,
  generateFacebookShareURL,
  shareToInstagram,
  shareToDiscord,
  generateCompatibilityCode,
  shareWithWebAPI,
  isWebShareAPILevel2Supported
} from '../utils/snsShare';
import { X, Twitter, MessageCircle, Share, Facebook, Instagram, Hash } from 'lucide-react';
import QRCode from 'react-qr-code';

interface SNSShareModalProps {
  result: TestResult;
  isOpen: boolean;
  onClose: () => void;
}

const SNSShareModal: React.FC<SNSShareModalProps> = ({ result, isOpen, onClose }) => {
  const [shareText, setShareText] = useState(generateSNSShareText(result));
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

  const handleLineShare = () => {
    const url = generateLineShareURL(result);
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const url = generateFacebookShareURL(result);
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleInstagramShare = () => {
    shareToInstagram(shareText);
  };

  const handleDiscordShare = () => {
    shareToDiscord(shareText);
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
      
      if (!success) {
        // フォールバック: 従来の方法でシェア
        alert('このデバイスではワンタップシェアがサポートされていません。他の方法でシェアしてください。');
      }
    } catch (error) {
      console.error('Web Share APIでのシェアに失敗しました:', error);
      alert('シェアに失敗しました。他の方法でシェアしてください。');
    } finally {
      setIsWebSharing(false);
    }
  };


  const compatibilityCode = generateCompatibilityCode(result);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">結果をシェア</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* メインコンテンツ */}
        <div className="p-6 space-y-6">
          {/* 診断結果サマリー */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">{result.type.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900">{result.type.name}</h3>
                <p className="text-sm text-gray-600">{result.type.code}</p>
              </div>
            </div>
            
            {/* QRコード表示 */}
            <div className="flex flex-col items-center space-y-3">
              <div className="bg-white p-3 rounded-lg shadow-sm" ref={qrRef}>
                <QRCode
                  value={compatibilityCode}
                  size={150}
                  level="M"
                  className="w-full h-auto max-w-[150px]"
                />
              </div>
            </div>
          </div>

          {/* カスタマイズ可能な投稿テキスト */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              投稿テキスト（編集可能）
            </label>
            <textarea
              value={shareText}
              onChange={(e) => setShareText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={8}
            />
            <p className="text-xs text-gray-500 mt-1">
              文字数: {shareText.length}
            </p>
          </div>

          {/* SNSシェアボタン */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">シェア方法を選択</h3>
            
            <div className="space-y-3">
              {/* Web Share API Level 2 - ワンタップシェア */}
              {webShareSupported && (
                <button
                  onClick={handleWebShare}
                  disabled={isWebSharing}
                  className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                >
                  {isWebSharing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>シェア中...</span>
                    </>
                  ) : (
                    <>
                      <Share className="w-6 h-6" />
                      <span>✨ ワンタップシェア（推奨）</span>
                    </>
                  )}
                </button>
              )}

              {/* その他のシェアオプション */}
              <div className="border-t pt-3">
                <button
                  onClick={() => setShowOtherShares(!showOtherShares)}
                  className="flex items-center justify-center space-x-2 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <span>その他のシェア方法</span>
                  <span className={`transition-transform ${showOtherShares ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                {showOtherShares && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {/* LINE */}
                    <button
                      onClick={handleLineShare}
                      className="flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>LINE</span>
                    </button>

                    {/* X(Twitter) */}
                    <button
                      onClick={handleTwitterShare}
                      className="flex items-center justify-center space-x-2 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors text-sm"
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

                    {/* Facebook */}
                    <button
                      onClick={handleFacebookShare}
                      className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </button>

                    {/* Discord */}
                    <button
                      onClick={handleDiscordShare}
                      className="flex items-center justify-center space-x-2 bg-indigo-500 text-white py-2 px-3 rounded-lg hover:bg-indigo-600 transition-colors text-sm col-span-2"
                    >
                      <Hash className="w-4 h-4" />
                      <span>Discord</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* シェア方法の説明 */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">
              {webShareSupported ? '🎆 おすすめ: ワンタップシェア' : '📱 QRコードの共有方法'}
            </h4>
            <div className="text-sm text-purple-800 space-y-2">
              {webShareSupported ? (
                <>
                  <p>✨ <strong>ワンタップシェア</strong>ならテキストとQRコード画像が一度にシェアできます！</p>
                  <p>📱 Instagram、Facebook、LINEなど多くのアプリで直接シェア可能</p>
                </>
              ) : (
                <>
                  <p>1. 「QRコードを保存」で画像をダウンロード</p>
                  <p>2. 上記のテキストをコピーしてSNSに投稿</p>
                  <p>3. 保存した画像を投稿に追加</p>
                  <p className="font-medium mt-2 text-purple-900">友達がQRコードを読み取って相性診断できます！</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* フッター */}
        <div className="p-6 border-t bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default SNSShareModal; 