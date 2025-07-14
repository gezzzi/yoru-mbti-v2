'use client';

import React from 'react';
import NeonText from '../../components/NeonText';
import SimpleNeonText from '../../components/SimpleNeonText';

// デバイス情報コンポーネント（クライアントサイドのみ）
const DeviceInfo: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = React.useState({
    userAgent: 'Loading...',
    devicePixelRatio: 'Loading...',
    screenWidth: 'Loading...',
    screenHeight: 'Loading...'
  });

  React.useEffect(() => {
    setDeviceInfo({
      userAgent: navigator.userAgent,
      devicePixelRatio: window.devicePixelRatio.toString(),
      screenWidth: window.screen.width.toString(),
      screenHeight: window.screen.height.toString()
    });
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-white text-xl mb-4">デバイス情報</h2>
      <div className="text-white text-sm space-y-2">
        <div>User Agent: {deviceInfo.userAgent}</div>
        <div>Device Pixel Ratio: {deviceInfo.devicePixelRatio}</div>
        <div>Screen Width: {deviceInfo.screenWidth}</div>
        <div>Screen Height: {deviceInfo.screenHeight}</div>
      </div>
    </div>
  );
};

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

        {/* テスト7: シングルレイヤー */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト7: シングルレイヤー（beforeなし）</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px #ffeb3b',
                textStroke: '1px #ffeb3b',
                textShadow: '0 0 10px #ffeb3b',
                WebkitFontSmoothing: 'antialiased',
                position: 'relative',
                zIndex: 1
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト8: 擬似要素なし + アニメーションなし */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト8: 擬似要素なし + アニメーションなし</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                color: 'transparent',
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: '#ffeb3b',
                textShadow: '0 0 8px rgba(255, 235, 59, 0.8)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト9: アウトラインベース */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト9: text-shadowのみ（複数レイヤー）</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                color: '#ffeb3b',
                textShadow: `
                  0 0 3px #ffeb3b,
                  0 0 6px #ffeb3b,
                  0 0 9px #ffeb3b,
                  0 0 12px #ffc107
                `,
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト10: Outline + Shadow */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト10: Outline + Shadow</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                color: '#ffeb3b',
                textShadow: '0 0 10px #ffeb3b',
                WebkitTextFillColor: 'transparent',
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: '#ffeb3b',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト11: SVGフィルター */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト11: SVGフィルター</h2>
          <div className="text-center">
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            <div 
              className="text-4xl font-bold"
              style={{
                color: '#ffeb3b',
                filter: 'url(#glow)',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト12: Paint APIフォールバック */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト12: -webkit-text-fill-color</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                WebkitTextFillColor: 'transparent',
                background: 'linear-gradient(#ffeb3b, #ffeb3b)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px #ffeb3b)',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト13: CSS Paint API風 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト13: グラデーション + ストローク</h2>
          <div className="text-center">
            <div 
              className="text-4xl font-bold"
              style={{
                background: 'linear-gradient(45deg, #ffeb3b, #ffc107)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '0.5px #ffeb3b',
                filter: 'drop-shadow(0 0 8px #ffeb3b)',
                WebkitFontSmoothing: 'antialiased'
              }}
            >
              夜の性格診断
            </div>
          </div>
        </div>

        {/* テスト14: 簡素化バージョン（擬似要素なし） */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-white text-xl mb-4">テスト14: 簡素化バージョン（擬似要素なし）</h2>
          <div className="text-center text-4xl font-bold">
            <SimpleNeonText text={["夜の", "性格診断"]} />
          </div>
        </div>

        {/* iPhone専用デバイス情報 */}
        <DeviceInfo />

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