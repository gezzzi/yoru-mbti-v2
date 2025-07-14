'use client';

import React from 'react';
import NeonText from '../../components/NeonText';

const DebugNeonPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          iPhone ネオンテキスト デバッグテスト
        </h1>
        
        {/* 現在のスタイル */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">現在のスタイル</h2>
          <div className="text-center">
            <NeonText text={["夜の", "性格診断"]} specialCharIndex={2} className="gap-1" />
          </div>
        </div>

        {/* テスト1: 最小限のストローク */}
        <div className="bg-gray-800 p-6 rounded-lg debug-test-1">
          <h2 className="text-white text-xl mb-4">テスト1: 最小限のストローク (text-shadowなし)</h2>
          <div className="text-center">
            <div className="text-4xl font-bold">
              <span className="neon-char" style={{'--char-index': 0} as React.CSSProperties} data-char="夜">夜</span>
              <span className="neon-char" style={{'--char-index': 1} as React.CSSProperties} data-char="の">の</span>
              <span className="neon-char special" style={{'--char-index': 2} as React.CSSProperties} data-char="性">性</span>
              <span className="neon-char" style={{'--char-index': 3} as React.CSSProperties} data-char="格">格</span>
              <span className="neon-char" style={{'--char-index': 4} as React.CSSProperties} data-char="診">診</span>
              <span className="neon-char" style={{'--char-index': 5} as React.CSSProperties} data-char="断">断</span>
            </div>
          </div>
        </div>

        {/* テスト2: ソリッドカラー */}
        <div className="bg-gray-800 p-6 rounded-lg debug-test-2">
          <h2 className="text-white text-xl mb-4">テスト2: ソリッドカラー (strokeなし)</h2>
          <div className="text-center">
            <div className="text-4xl font-bold">
              <span className="neon-char" style={{'--char-index': 0} as React.CSSProperties} data-char="夜">夜</span>
              <span className="neon-char" style={{'--char-index': 1} as React.CSSProperties} data-char="の">の</span>
              <span className="neon-char special" style={{'--char-index': 2} as React.CSSProperties} data-char="性">性</span>
              <span className="neon-char" style={{'--char-index': 3} as React.CSSProperties} data-char="格">格</span>
              <span className="neon-char" style={{'--char-index': 4} as React.CSSProperties} data-char="診">診</span>
              <span className="neon-char" style={{'--char-index': 5} as React.CSSProperties} data-char="断">断</span>
            </div>
          </div>
        </div>

        {/* テスト3: シンプルなtext-shadow */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト3: シンプルなtext-shadow</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                color: '#ffeb3b',
                textShadow: '0 0 10px #ffeb3b',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト4: CSSフィルター */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト4: CSSフィルター</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                color: '#ffeb3b',
                filter: 'drop-shadow(0 0 10px #ffeb3b) drop-shadow(0 0 20px #ffc107)',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト5: 極細ストローク */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト5: 極細ストローク (0.25px)</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                color: 'transparent',
                WebkitTextStroke: '0.25px #ffeb3b',
                textShadow: '0 0 5px #ffeb3b',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト6: ボーダーベース */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト6: ボーダーベース</h2>
          <div className="text-center">
            <div className="text-4xl font-bold inline-block relative">
              <span 
                className="absolute inset-0"
                style={{
                  color: 'transparent',
                  border: '1px solid #ffeb3b',
                  WebkitFontSmoothing: 'antialiased'
                }}
              >
                夜の性格診断
              </span>
              <span 
                style={{
                  color: 'transparent',
                  textShadow: '0 0 10px #ffeb3b'
                }}
              >
                夜の性格診断
              </span>
            </div>
          </div>
        </div>

        {/* iPhone専用デバイス情報 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">デバイス情報</h2>
          <div className="text-white text-sm space-y-2">
            <div>User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}</div>
            <div>Device Pixel Ratio: {typeof window !== 'undefined' ? window.devicePixelRatio : 'N/A'}</div>
            <div>Screen Width: {typeof window !== 'undefined' ? window.screen.width : 'N/A'}</div>
            <div>Screen Height: {typeof window !== 'undefined' ? window.screen.height : 'N/A'}</div>
          </div>
        </div>

        {/* 戻るボタン */}
        <div className="text-center">
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </a>
        </div>
      </div>
    </div>
  );
};

export default DebugNeonPage;