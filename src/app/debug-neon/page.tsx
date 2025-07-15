'use client';

import React from 'react';
import './debug-styles.css';

const DebugNeonPage: React.FC = () => {
  // デバイス情報の状態管理
  const [deviceInfo, setDeviceInfo] = React.useState({
    userAgent: 'Loading...',
    devicePixelRatio: 'Loading...',
    screenWidth: 'Loading...',
    screenHeight: 'Loading...',
    isIPhone: false
  });

  React.useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIPhone = /iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    
    setDeviceInfo({
      userAgent: userAgent,
      devicePixelRatio: window.devicePixelRatio.toString(),
      screenWidth: window.screen.width.toString(),
      screenHeight: window.screen.height.toString(),
      isIPhone: isIPhone
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-white text-2xl font-bold text-center mb-8">
          iPhone ネオンテキスト デバッグテスト
        </h1>
        
        {/* 基本的なテスト */}
        <div className="space-y-6">
          {/* テスト1: インラインスタイル - ストロークのみ */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト1: ストロークのみ</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold"
                style={{
                  color: 'transparent',
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextStrokeColor: '#ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト2: ストローク + シャドウ */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト2: ストローク + シャドウ</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold"
                style={{
                  color: 'transparent',
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextStrokeColor: '#ffeb3b',
                  textShadow: '0 0 10px #ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト3: 色付きテキスト + シャドウ */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト3: 色付き + シャドウ</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold"
                style={{
                  color: '#ffeb3b',
                  textShadow: '0 0 10px #ffeb3b, 0 0 20px #ffc107'
                }}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト4: CSSフィルター */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト4: CSSフィルター</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold"
                style={{
                  color: '#ffeb3b',
                  filter: 'drop-shadow(0 0 10px #ffeb3b)'
                }}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト5: 極細ストローク (0.5px) */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト5: 極細ストローク (0.5px)</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold"
                style={{
                  color: 'transparent',
                  WebkitTextStrokeWidth: '0.5px',
                  WebkitTextStrokeColor: '#ffeb3b',
                  textShadow: '0 0 5px #ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト6: グラデーション */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト6: グラデーション</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold"
                style={{
                  background: 'linear-gradient(45deg, #ffeb3b, #ffc107)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px #ffeb3b)'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト7: 点滅アニメーション */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト7: 点滅（CSS animation）</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold blink-text"
                style={{
                  color: 'transparent',
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextStrokeColor: '#ffeb3b',
                  textShadow: '0 0 10px #ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト8: パルス効果 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト8: パルス効果</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold pulse-text"
                style={{
                  color: 'transparent',
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextStrokeColor: '#ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト9: 順次点滅 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト9: 順次点滅</h2>
            <div className="text-center">
              <div className="text-4xl font-bold">
                {['夜', 'の', '性', '格', '診', '断'].map((char, index) => (
                  <span
                    key={index}
                    className="seq-char"
                    style={{
                      color: 'transparent',
                      WebkitTextStrokeWidth: '1px',
                      WebkitTextStrokeColor: '#ffeb3b',
                      textShadow: '0 0 10px #ffeb3b',
                      animationDelay: `${index * 0.2}s`
                    } as React.CSSProperties}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* テスト10: グロー効果の変化 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト10: グロー効果の変化</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold glow-text"
                style={{
                  color: 'transparent',
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextStrokeColor: '#ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト11: 微細な揺れ */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト11: 微細な揺れ</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold move-text"
                style={{
                  color: 'transparent',
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextStrokeColor: '#ffeb3b',
                  textShadow: '0 0 10px #ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* テスト12: フィルター変化 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">テスト12: フィルター変化</h2>
            <div className="text-center">
              <div 
                className="text-4xl font-bold filter-text"
                style={{
                  color: '#ffeb3b'
                } as React.CSSProperties}
              >
                夜の性格診断
              </div>
            </div>
          </div>

          {/* 新しい動的テスト - iPhone最適化版 */}
          <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-500">
            <h2 className="text-white text-xl mb-6 text-center">🚀 iPhone最適化 - より動きのあるテスト</h2>
            
            {/* テスト13: 強化されたパルス */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト13: 強化されたパルス</h3>
              <div className="text-center">
                <div 
                  className="text-4xl font-bold enhanced-pulse-text"
                  style={{
                    color: 'transparent',
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextStrokeColor: '#ffeb3b'
                  } as React.CSSProperties}
                >
                  夜の性格診断
                </div>
              </div>
            </div>

            {/* テスト14: ストローク幅の変化 */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト14: ストローク幅の変化</h3>
              <div className="text-center">
                <div 
                  className="text-4xl font-bold stroke-pulse-text"
                  style={{
                    color: 'transparent',
                    WebkitTextStrokeColor: '#ff6b35'
                  } as React.CSSProperties}
                >
                  夜の性格診断
                </div>
              </div>
            </div>

            {/* テスト15: 波状運動 */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト15: 波状運動</h3>
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {['夜', 'の', '性', '格', '診', '断'].map((char, index) => (
                    <span
                      key={index}
                      className="wave-char"
                      style={{
                        color: 'transparent',
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: '#9945ff',
                        animationDelay: `${index * 0.1}s`
                      } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* テスト16: 色の変化 */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト16: 色の変化</h3>
              <div className="text-center">
                <div 
                  className="text-4xl font-bold color-shift-text"
                  style={{
                    color: 'transparent'
                  } as React.CSSProperties}
                >
                  夜の性格診断
                </div>
              </div>
            </div>

            {/* テスト17: 微細な回転 */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト17: 微細な回転</h3>
              <div className="text-center">
                <div 
                  className="text-4xl font-bold rotate-gentle-text"
                  style={{
                    color: 'transparent',
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextStrokeColor: '#ff1493'
                  } as React.CSSProperties}
                >
                  夜の性格診断
                </div>
              </div>
            </div>

            {/* テスト18: 透明度の波 */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト18: 透明度の波</h3>
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {['夜', 'の', '性', '格', '診', '断'].map((char, index) => (
                    <span
                      key={index}
                      className="opacity-wave-char"
                      style={{
                        color: 'transparent',
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: '#00ff00',
                        animationDelay: `${index * 0.2}s`
                      } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* テスト19: 組み合わせ1 (パルス + 波) */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト19: 組み合わせ1 (パルス + 波)</h3>
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {['夜', 'の', '性', '格', '診', '断'].map((char, index) => (
                    <span
                      key={index}
                      className="enhanced-pulse-text wave-char"
                      style={{
                        color: 'transparent',
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: '#ffeb3b',
                        animationDelay: `${index * 0.15}s`
                      } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* テスト20: 組み合わせ2 (色変化 + 回転) */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト20: 組み合わせ2 (色変化 + 回転)</h3>
              <div className="text-center">
                <div 
                  className="text-4xl font-bold color-shift-text rotate-gentle-text"
                  style={{
                    color: 'transparent'
                  } as React.CSSProperties}
                >
                  夜の性格診断
                </div>
              </div>
            </div>

            {/* テスト21: フル組み合わせ */}
            <div className="mb-8">
              <h3 className="text-green-400 text-md mb-3">テスト21: フル組み合わせ (注意: 過度な動き)</h3>
              <div className="text-center">
                <div className="text-4xl font-bold">
                  {['夜', 'の', '性', '格', '診', '断'].map((char, index) => (
                    <span
                      key={index}
                      className="enhanced-pulse-text color-shift-text opacity-wave-char"
                      style={{
                        animationDelay: `${index * 0.1}s`
                      } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* iPhone最適化デモ - 新規追加 */}
          {deviceInfo.isIPhone && (
            <div className="bg-purple-900 p-6 rounded-lg border-2 border-purple-500">
              <h2 className="text-white text-xl mb-6 text-center">📱 iPhone専用最適化デモ</h2>
              
              {/* iPhone Demo 1: シンプルアウトライン点滅 */}
              <div className="mb-8">
                <h3 className="text-purple-300 text-md mb-3">iPhone Demo 1: シンプルアウトライン点滅</h3>
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold iphone-simple-blink"
                    style={{
                      color: 'transparent',
                      WebkitTextStrokeWidth: '1px',
                      WebkitTextStrokeColor: '#ffeb3b',
                      WebkitFontSmoothing: 'antialiased',
                      transform: 'translateZ(0)'
                    } as React.CSSProperties}
                  >
                    夜の性格診断
                  </div>
                </div>
              </div>

              {/* iPhone Demo 2: 順次アウトライン点滅 */}
              <div className="mb-8">
                <h3 className="text-purple-300 text-md mb-3">iPhone Demo 2: 順次アウトライン点滅</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {['夜', 'の', '性', '格', '診', '断'].map((char, index) => (
                      <span
                        key={index}
                        className="iphone-seq-blink"
                        style={{
                          color: 'transparent',
                          WebkitTextStrokeWidth: '1px',
                          WebkitTextStrokeColor: '#ff6b35',
                          WebkitFontSmoothing: 'antialiased',
                          transform: 'translateZ(0)',
                          animationDelay: `${index * 0.15}s`
                        } as React.CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* iPhone Demo 3: ストローク幅アニメーション */}
              <div className="mb-8">
                <h3 className="text-purple-300 text-md mb-3">iPhone Demo 3: ストローク幅アニメーション</h3>
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold iphone-stroke-anim"
                    style={{
                      color: 'transparent',
                      WebkitTextStrokeColor: '#9945ff',
                      WebkitFontSmoothing: 'antialiased',
                      transform: 'translateZ(0)'
                    } as React.CSSProperties}
                  >
                    夜の性格診断
                  </div>
                </div>
              </div>

              {/* iPhone Demo 4: 色変化点滅 */}
              <div className="mb-8">
                <h3 className="text-purple-300 text-md mb-3">iPhone Demo 4: 色変化点滅</h3>
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold iphone-color-blink"
                    style={{
                      color: 'transparent',
                      WebkitTextStrokeWidth: '1px',
                      WebkitFontSmoothing: 'antialiased',
                      transform: 'translateZ(0)'
                    } as React.CSSProperties}
                  >
                    夜の性格診断
                  </div>
                </div>
              </div>

              {/* iPhone Demo 5: 波状点滅シーケンス */}
              <div className="mb-8">
                <h3 className="text-purple-300 text-md mb-3">iPhone Demo 5: 波状点滅シーケンス</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {['夜', 'の', '性', '格', '診', '断'].map((char, index) => (
                      <span
                        key={index}
                        className="iphone-wave-blink"
                        style={{
                          color: 'transparent',
                          WebkitTextStrokeWidth: '1px',
                          WebkitTextStrokeColor: '#ff1493',
                          WebkitFontSmoothing: 'antialiased',
                          transform: 'translateZ(0)',
                          animationDelay: `${Math.sin(index * 0.5) * 0.3}s`
                        } as React.CSSProperties}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 通常デバイス用の高度なデモ（iPhone以外） */}
          {!deviceInfo.isIPhone && (
            <div className="bg-indigo-900 p-6 rounded-lg border-2 border-indigo-500">
              <h2 className="text-white text-xl mb-6 text-center">💻 通常デバイス用高度なネオン効果</h2>
              
              {/* Normal Demo 1: フルグロー効果 */}
              <div className="mb-8">
                <h3 className="text-indigo-300 text-md mb-3">Normal Demo 1: フルグロー効果</h3>
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold normal-full-glow"
                    style={{
                      color: 'transparent',
                      WebkitTextStrokeWidth: '1px',
                      WebkitTextStrokeColor: '#ffeb3b',
                      textShadow: '0 0 10px #ffeb3b, 0 0 20px #ffeb3b, 0 0 30px #ffc107'
                    } as React.CSSProperties}
                  >
                    夜の性格診断
                  </div>
                </div>
              </div>

              {/* Normal Demo 2: 多層グロー効果 */}
              <div className="mb-8">
                <h3 className="text-indigo-300 text-md mb-3">Normal Demo 2: 多層グロー効果</h3>
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold normal-multi-glow"
                    style={{
                      color: '#ff6b35',
                      textShadow: '0 0 5px #ff6b35, 0 0 10px #ff6b35, 0 0 20px #ff4500, 0 0 40px #ff0000'
                    } as React.CSSProperties}
                  >
                    夜の性格診断
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* デバイス情報 */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-white text-lg mb-4">デバイス情報</h2>
            <div className="text-white text-sm space-y-1">
              <div>User Agent: {deviceInfo.userAgent}</div>
              <div>Device Pixel Ratio: {deviceInfo.devicePixelRatio}</div>
              <div>Screen: {deviceInfo.screenWidth} x {deviceInfo.screenHeight}</div>
              <div className="font-bold text-yellow-400">
                {deviceInfo.isIPhone ? '📱 iPhone検出: はい' : '💻 iPhone検出: いいえ'}
              </div>
            </div>
          </div>

          {/* 戻るボタン */}
          <div className="text-center pb-8">
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              ホームに戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugNeonPage;