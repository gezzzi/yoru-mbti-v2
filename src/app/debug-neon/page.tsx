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
          ネオンテキスト デモコレクション
        </h1>
        
        {/* Demo 1: 3Dフリップ */}
        <div className="bg-gradient-to-br from-purple-900 to-black p-8 rounded-lg border-2 border-purple-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 1: 3Dフリップエフェクト</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <div className="mb-4">
                  <span className="iphone-3d-flip-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                  <span className="iphone-3d-flip-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                </div>
                <div>
                  <span className="iphone-3d-flip-char iphone-3d-flip-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                  <span className="iphone-3d-flip-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                  <span className="iphone-3d-flip-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                  <span className="iphone-3d-flip-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <div className="mb-4">
                  <span className="normal-3d-flip-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                  <span className="normal-3d-flip-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                </div>
                <div>
                  <span className="normal-3d-flip-char normal-3d-flip-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                  <span className="normal-3d-flip-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                  <span className="normal-3d-flip-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                  <span className="normal-3d-flip-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo 2: グリッチエフェクト */}
        <div className="bg-gradient-to-br from-green-900 to-black p-8 rounded-lg border-2 border-green-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 2: グリッチエフェクト</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-glitch-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-glitch-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-glitch-char iphone-glitch-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-glitch-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-glitch-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-glitch-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-glitch-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-glitch-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-glitch-char normal-glitch-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-glitch-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-glitch-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-glitch-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo 3: ホログラムエフェクト */}
        <div className="bg-gradient-to-br from-cyan-900 to-black p-8 rounded-lg border-2 border-cyan-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 3: ホログラムエフェクト</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-hologram-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-hologram-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-hologram-char iphone-hologram-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-hologram-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-hologram-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-hologram-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-hologram-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-hologram-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-hologram-char normal-hologram-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-hologram-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-hologram-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-hologram-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo 4: プラズマエフェクト */}
        <div className="bg-gradient-to-br from-pink-900 to-black p-8 rounded-lg border-2 border-pink-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 4: プラズマエフェクト</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-plasma-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-plasma-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-plasma-char iphone-plasma-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-plasma-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-plasma-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-plasma-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-plasma-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-plasma-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-plasma-char normal-plasma-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-plasma-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-plasma-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-plasma-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo 5: 3Dフリップ改良版（見やすい色） */}
        <div className="bg-gradient-to-br from-blue-900 to-black p-8 rounded-lg border-2 border-blue-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 5: 3Dフリップ改良版（見やすい配色）</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <div className="mb-4">
                  <span className="iphone-3d-flip-v2-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                  <span className="iphone-3d-flip-v2-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                </div>
                <div>
                  <span className="iphone-3d-flip-v2-char iphone-3d-flip-v2-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                  <span className="iphone-3d-flip-v2-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                  <span className="iphone-3d-flip-v2-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                  <span className="iphone-3d-flip-v2-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <div className="mb-4">
                  <span className="normal-3d-flip-v2-char" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                  <span className="normal-3d-flip-v2-char" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                </div>
                <div>
                  <span className="normal-3d-flip-v2-char normal-3d-flip-v2-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                  <span className="normal-3d-flip-v2-char" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                  <span className="normal-3d-flip-v2-char" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                  <span className="normal-3d-flip-v2-char" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo 6: クリアアウトライン版 */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-gray-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 6: クリアアウトライン版（グロー最小）</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-clear-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-clear-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-clear-outline iphone-clear-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-clear-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-clear-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-clear-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-clear-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-clear-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-clear-outline normal-clear-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-clear-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-clear-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-clear-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo 7: 太アウトライン版 */}
        <div className="bg-gradient-to-br from-red-900 to-black p-8 rounded-lg border-2 border-red-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 7: 太アウトライン版</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-thick-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-thick-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-thick-outline iphone-thick-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-thick-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-thick-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-thick-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-thick-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-thick-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-thick-outline normal-thick-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-thick-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-thick-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-thick-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo 8: ダブルアウトライン版 */}
        <div className="bg-gradient-to-br from-purple-900 to-black p-8 rounded-lg border-2 border-purple-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 8: ダブルアウトライン版（ネオンピンク×シアン）</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-double-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-double-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-double-outline iphone-double-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-double-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-double-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-double-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-double-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-double-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-double-outline normal-double-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-double-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-double-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-double-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo 9: シャープアウトライン版 */}
        <div className="bg-gradient-to-br from-yellow-900 to-black p-8 rounded-lg border-2 border-yellow-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 9: シャープアウトライン版</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-sharp-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-sharp-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-sharp-outline iphone-sharp-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-sharp-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-sharp-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-sharp-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-sharp-outline" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-sharp-outline" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-sharp-outline normal-sharp-outline-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-sharp-outline" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-sharp-outline" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-sharp-outline" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* Demo 10: ネオンピンク×シアン */}
        <div className="bg-gradient-to-br from-purple-900 to-black p-8 rounded-lg border-2 border-purple-500 mb-8">
          <h2 className="text-white text-xl mb-6 text-center font-bold">Demo 10: ネオンピンク×シアン</h2>
          
          {deviceInfo.isIPhone ? (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="iphone-neon-pink-cyan" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="iphone-neon-pink-cyan" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="iphone-neon-pink-cyan-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="iphone-neon-pink-cyan" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="iphone-neon-pink-cyan" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="iphone-neon-pink-cyan" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block">
                <span className="normal-neon-pink-cyan" data-char="夜" style={{ '--char-index': 0 } as React.CSSProperties}>夜</span>
                <span className="normal-neon-pink-cyan" data-char="の" style={{ '--char-index': 1 } as React.CSSProperties}>の</span>
                <span className="normal-neon-pink-cyan-special" data-char="性" style={{ '--char-index': 2 } as React.CSSProperties}>性</span>
                <span className="normal-neon-pink-cyan" data-char="格" style={{ '--char-index': 3 } as React.CSSProperties}>格</span>
                <span className="normal-neon-pink-cyan" data-char="診" style={{ '--char-index': 4 } as React.CSSProperties}>診</span>
                <span className="normal-neon-pink-cyan" data-char="断" style={{ '--char-index': 5 } as React.CSSProperties}>断</span>
              </div>
            </div>
          )}
        </div>

        {/* デバイス情報 */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
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
  );
};

export default DebugNeonPage;