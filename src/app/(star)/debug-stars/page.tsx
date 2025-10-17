'use client';

import React, { useState, useEffect } from 'react';

export default function DebugStarsPage() {
  const [starCount, setStarCount] = useState(0);
  const [starInfo, setStarInfo] = useState<any[]>([]);
  const [highlightStars, setHighlightStars] = useState(false);

  useEffect(() => {
    // 星の要素を検出
    const stars = document.querySelectorAll('.star');
    setStarCount(stars.length);
    
    const info = Array.from(stars).map((star, index) => {
      const computed = window.getComputedStyle(star);
      const rect = star.getBoundingClientRect();
      const parent = star.parentElement;
      const parentComputed = parent ? window.getComputedStyle(parent) : null;
      
      return {
        index,
        position: {
          left: computed.left,
          top: computed.top,
          x: rect.x,
          y: rect.y
        },
        styles: {
          opacity: computed.opacity,
          zIndex: computed.zIndex,
          display: computed.display,
          visibility: computed.visibility
        },
        parent: {
          zIndex: parentComputed?.zIndex,
          position: parentComputed?.position,
          overflow: parentComputed?.overflow
        }
      };
    });
    
    setStarInfo(info.slice(0, 5)); // 最初の5つだけ表示
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">星の表示デバッグページ</h1>
        
        <div className="bg-black/80 text-white p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">星の情報</h2>
          <p className="mb-4">検出された星の数: {starCount}</p>
          
          <button
            onClick={() => {
              setHighlightStars(!highlightStars);
              document.querySelectorAll('.star').forEach((star: any) => {
                if (highlightStars) {
                  star.style.boxShadow = '';
                  star.style.width = '';
                  star.style.height = '';
                } else {
                  star.style.boxShadow = '0 0 20px red';
                  star.style.width = '10px';
                  star.style.height = '10px';
                }
              });
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
          >
            {highlightStars ? '星のハイライトを解除' : '星をハイライト表示'}
          </button>
          
          <div className="space-y-4">
            {starInfo.map((star) => (
              <div key={star.index} className="bg-black/50 p-3 rounded">
                <h3 className="font-bold mb-2">星 #{star.index + 1}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">位置:</span> ({Math.round(star.position.x)}, {Math.round(star.position.y)})
                  </div>
                  <div>
                    <span className="text-gray-400">opacity:</span> {star.styles.opacity}
                  </div>
                  <div>
                    <span className="text-gray-400">z-index:</span> {star.styles.zIndex}
                  </div>
                  <div>
                    <span className="text-gray-400">親のz-index:</span> {star.parent.zIndex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-black/80 text-white p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">要素の重なりテスト</h2>
          
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-md p-4 rounded">
              <p>backdrop-blur-md + bg-white/5 (Tailwind)</p>
            </div>
            
            <div className="p-4 rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(12px)'}}>
              <p>backdrop-filter: blur(12px) + rgba(255, 255, 255, 0.05)</p>
            </div>
            
            <div className="p-4 rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(8px)'}}>
              <p>backdrop-filter: blur(8px) + rgba(255, 255, 255, 0.03)</p>
            </div>
            
            <div className="p-4 rounded" style={{backgroundColor: 'rgba(255, 255, 255, 0.02)'}}>
              <p>rgba(255, 255, 255, 0.02) のみ（blur無し）</p>
            </div>
            
            <div className="p-4 rounded border border-white/20">
              <p>透明背景（borderのみ）</p>
            </div>
          </div>
        </div>
        
        <div className="bg-black/80 text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">DOM構造の確認</h2>
          <button
            onClick={() => {
              const body = document.body;
              const stars = document.querySelector('.fixed.inset-0.-z-10');
              console.log('Body z-index:', window.getComputedStyle(body).zIndex);
              console.log('Stars container:', stars);
              if (stars) {
                console.log('Stars container z-index:', window.getComputedStyle(stars).zIndex);
                console.log('Stars container position:', window.getComputedStyle(stars).position);
              }
              
              // 全ての要素のz-indexをチェック
              document.querySelectorAll('*').forEach((el) => {
                const zIndex = window.getComputedStyle(el).zIndex;
                if (zIndex !== 'auto' && zIndex !== '0') {
                  console.log('Element with z-index:', el, zIndex);
                }
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            コンソールにDOM情報を出力
          </button>
        </div>
      </div>
    </div>
  );
}