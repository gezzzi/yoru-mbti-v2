'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TestResult } from '../types/personality';
import { 
  generateSNSShareText, 
  generateTwitterShareURL, 
  generateLineShareURL,
  generateCompatibilityCode,
  copyToClipboard,
  shareWithWebAPI,
  isWebShareAPILevel2Supported
} from '../utils/snsShare';
import { X, Twitter, MessageCircle, Copy, Check, Download, Share } from 'lucide-react';
import QRCode from 'react-qr-code';

interface SNSShareModalProps {
  result: TestResult;
  isOpen: boolean;
  onClose: () => void;
}

const SNSShareModal: React.FC<SNSShareModalProps> = ({ result, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [shareText, setShareText] = useState(generateSNSShareText(result));
  const [isDownloading, setIsDownloading] = useState(false);
  const [isWebSharing, setIsWebSharing] = useState(false);
  const [webShareSupported, setWebShareSupported] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Web Share API Level 2のサポート状況をチェック
  useEffect(() => {
    setWebShareSupported(isWebShareAPILevel2Supported());
  }, []);

  if (!isOpen) return null;

  const handleCopy = async () => {
    const success = await copyToClipboard(shareText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTwitterShare = () => {
    const url = generateTwitterShareURL(result);
    window.open(url, '_blank', 'width=550,height=420');
  };

  const handleLineShare = () => {
    const url = generateLineShareURL(result);
    window.open(url, '_blank', 'width=550,height=420');
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

  const handleQRDownload = async () => {
    if (!qrRef.current) return;

    setIsDownloading(true);
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
        link.download = `相性診断QRコード_${result.type.code}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        URL.revokeObjectURL(svgUrl);
        setIsDownloading(false);
      };

      img.onerror = () => {
        console.error('QRコードの画像変換に失敗しました');
        setIsDownloading(false);
      };

      img.src = svgUrl;
    } catch (error) {
      console.error('QRコードのダウンロードに失敗しました:', error);
      setIsDownloading(false);
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
              <div className="text-sm text-gray-700">
                相性診断コード: <span className="font-mono bg-white px-2 py-1 rounded text-purple-700 font-bold">{compatibilityCode}</span>
              </div>
              <button
                onClick={handleQRDownload}
                disabled={isDownloading}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isDownloading ? (
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
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">シェア方法を選択</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {/* Web Share API Level 2 - ワンタップシェア */}
              {webShareSupported && (
                <button
                  onClick={handleWebShare}
                  disabled={isWebSharing}
                  className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isWebSharing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>シェア中...</span>
                    </>
                  ) : (
                    <>
                      <Share className="w-5 h-5" />
                      <span>✨ ワンタップシェア（画像付き）</span>
                    </>
                  )}
                </button>
              )}

              {/* Twitter */}
              <button
                onClick={handleTwitterShare}
                className="flex items-center justify-center space-x-3 w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitterでシェア</span>
              </button>

              {/* LINE */}
              <button
                onClick={handleLineShare}
                className="flex items-center justify-center space-x-3 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>LINEでシェア</span>
              </button>

              {/* コピー */}
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center space-x-3 w-full py-3 px-4 rounded-lg transition-colors ${
                  copied 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'コピーしました！' : 'テキストをコピー'}</span>
              </button>
            </div>
          </div>

          {/* シェア方法の説明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              {webShareSupported ? 'おすすめ: ワンタップシェア' : 'QRコードの共有方法'}
            </h4>
            <div className="text-sm text-blue-800 space-y-2">
              {webShareSupported ? (
                <>
                  <p>✨ <strong>ワンタップシェア</strong>：テキストとQRコード画像が自動で含まれます！</p>
                  <p>📱 Instagram、Facebook、LINEなど多くのアプリで直接シェアできます</p>
                </>
              ) : (
                <>
                  <p>1. 上記のテキストをコピーして投稿</p>
                  <p>2. 「QRコードを保存」ボタンでQRコード画像を保存</p>
                  <p>3. 保存したQRコード画像を投稿に追加</p>
                  <p className="font-medium mt-2">これで友達がQRコードを読み取って相性診断できます！</p>
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