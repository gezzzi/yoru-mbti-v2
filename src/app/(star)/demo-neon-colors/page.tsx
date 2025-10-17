'use client';

import React from 'react';
import NeonText from '@/components/NeonText';

export default function NeonColorDemo() {
  const colorCombinations = [
    {
      name: '現在の設定（ゴールド系）',
      inner: '#ffd700',
      outer: '#ffb300',
      description: 'ゴールド + 濃いゴールド'
    },
    {
      name: 'レモン系',
      inner: '#fff44f',
      outer: '#ffeb3b',
      description: 'レモンイエロー + 明るい黄色'
    },
    {
      name: 'オレンジ寄り',
      inner: '#ffeb3b',
      outer: '#ff9800',
      description: '明るい黄色 + オレンジイエロー'
    },
    {
      name: '淡い黄色',
      inner: '#fffde7',
      outer: '#fff59d',
      description: 'クリーム色 + 淡い黄色'
    },
    {
      name: '濃淡強め',
      inner: '#ffff00',
      outer: '#f57f17',
      description: '純黄色 + 濃い黄褐色'
    },
    {
      name: 'ネオンイエロー',
      inner: '#ffff00',
      outer: '#ffea00',
      description: '純黄色 + ネオンイエロー'
    },
    {
      name: 'ウォーム系',
      inner: '#ffe082',
      outer: '#ffa000',
      description: '薄い黄色 + 濃いアンバー'
    },
    {
      name: '元の設定（紫との組み合わせ）',
      inner: '#ffeb3b',
      outer: '#9945ff',
      description: '明るい黄色 + 紫（参考用）'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          ネオン文字色のデモ
        </h1>
        
        <div className="space-y-12">
          {colorCombinations.map((combo, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-2">{combo.name}</h2>
              <p className="text-sm text-gray-300 mb-6">{combo.description}</p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border-2 border-white/50"
                    style={{ backgroundColor: combo.inner }}
                  />
                  <span className="text-sm text-gray-300">内側: {combo.inner}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded border-2 border-white/50"
                    style={{ backgroundColor: combo.outer }}
                  />
                  <span className="text-sm text-gray-300">外側: {combo.outer}</span>
                </div>
              </div>
              
              <div className="text-center py-8">
                <style jsx>{`
                  .demo-${index} .neon-char:not(.special) {
                    -webkit-text-stroke: 1px ${combo.inner} !important;
                    text-stroke: 1px ${combo.inner} !important;
                  }
                  .demo-${index} .neon-char:not(.special)::before {
                    -webkit-text-stroke: 3px ${combo.outer} !important;
                    text-stroke: 3px ${combo.outer} !important;
                  }
                `}</style>
                <div className={`demo-${index} text-5xl md:text-6xl font-bold`}>
                  <NeonText text={["夜の", "性格診断"]} specialCharIndex={3} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            ホームに戻る
          </a>
        </div>
      </div>
    </div>
  );
}