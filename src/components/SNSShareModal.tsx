'use client';

import React, { useState } from 'react';
import { TestResult } from '../types/personality';
import { 
  generateSNSShareText, 
  generateTwitterShareURL, 
  generateLineShareURL,
  generateCompatibilityCode,
  copyToClipboard 
} from '../utils/snsShare';
import { X, Twitter, MessageCircle, Copy, Check } from 'lucide-react';

interface SNSShareModalProps {
  result: TestResult;
  isOpen: boolean;
  onClose: () => void;
}

const SNSShareModal: React.FC<SNSShareModalProps> = ({ result, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [shareText, setShareText] = useState(generateSNSShareText(result));
  
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
            <div className="text-sm text-gray-700 mb-3">
              相性診断コード: <span className="font-mono bg-white px-2 py-1 rounded text-purple-700 font-bold">{compatibilityCode}</span>
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

          {/* 相性診断コードの説明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">相性診断コードについて</h4>
            <p className="text-sm text-blue-800">
              このコードには、あなたの5軸の性格データが含まれています。
              友達にこのコードを共有することで、相性を診断できます！
            </p>
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