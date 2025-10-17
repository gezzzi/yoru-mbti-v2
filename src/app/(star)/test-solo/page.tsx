'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculatePersonalityType } from '@/utils/testLogic';

// タグ一覧
const availableTags = [
  '🔥 欲望の炎',
  '💬 言語プレイ派',
  '🎭 ロールプレイ好き',
  '🛁 アフターケア必須',
  '⛏️ 開拓派',
  '🧷 軽SM耐性あり',
  '🕯 ロマン重視',
  '⚡️ スピード勝負派',
  '🏃‍♂️ 衝動トリガー型',
  '🪞 鏡プレイ好き',
  '🚪 NG明確',
  '🎮 ゲーム派',
  '🧥 コスプレ派',
  '🧼 ケア＆衛生重視',
  '🕵️‍♀️ 覗き見興奮派',
  '🛡 安全第一派',
  '📱 デジタル前戯派',
  '💋 キス魔',
  '☀️ 朝型エロス',
  '🔄 リピート求め派',
  '🗣 下ネタOK',
  '📚 学習研究派',
  '🧭 ガイド派',
  '🤹‍♀️ マルチタスク派',
  '💤 まったり派'
];

export default function TestSoloPage() {
  const router = useRouter();
  
  // 5軸の値（0-100）
  const [axes, setAxes] = useState({
    E: 50,  // 外向性 / 内向性
    L: 50,  // リード / フォロー
    A: 50,  // 冒険 / 安定
    L2: 50, // ラブ / フリー
    O: 50   // 開放 / 秘密
  });
  
  // 選択されたタグとそのスコア
  const [tagScores, setTagScores] = useState<{[key: string]: number}>({});
  
  // ユーザー名
  const [username, setUsername] = useState('テストユーザー');
  
  const handleAxisChange = (axis: string, value: number) => {
    setAxes(prev => ({ ...prev, [axis]: value }));
  };
  
  const handleTagToggle = (tag: string) => {
    setTagScores(prev => ({
      ...prev,
      [tag]: prev[tag] === 6 ? 0 : 6
    }));
  };
  
  const handleSubmit = () => {
    // 本番と同じ形式の回答データを作成
    const answers: Record<string, number> = {};
    
    // 5軸の質問に対する回答を生成（各軸2問ずつ、ID 1-10）
    // E/I軸 (質問1-2) - axis: 'EI'
    // 質問1はisReverse: false、質問2はisReverse: true
    // E側（エクスタシー）が高い場合、質問1は高い値、質問2は低い値
    answers['1'] = Math.round((axes.E / 100) * 6);
    answers['2'] = Math.round(((100 - axes.E) / 100) * 6);
    
    // L/F軸 (質問3-4) - axis: 'LF'
    // 質問3はisReverse: false、質問4はisReverse: true
    // L側（ドミナント）が高い場合、質問3は高い値、質問4は低い値
    answers['3'] = Math.round((axes.L / 100) * 6);
    answers['4'] = Math.round(((100 - axes.L) / 100) * 6);
    
    // A/S軸 (質問5-6) - axis: 'AS'
    // 質問5はisReverse: false、質問6はisReverse: true
    // A側（テンダー）が高い場合、質問5は高い値、質問6は低い値
    answers['5'] = Math.round((axes.A / 100) * 6);
    answers['6'] = Math.round(((100 - axes.A) / 100) * 6);
    
    // L2/F2軸 (質問7-8) - axis: 'LF2'
    // 質問7はisReverse: true（ヘドニスト寄りの質問）
    // 質問8はisReverse: false（リアリスト寄りの質問）
    // L2側（リアリスト）が高い場合、質問7は低い値、質問8は高い値
    answers['7'] = Math.round(((100 - axes.L2) / 100) * 6);
    answers['8'] = Math.round((axes.L2 / 100) * 6);
    
    // O/S軸 (質問9-10) - axis: 'OS'
    // 質問9はisReverse: true、質問10はisReverse: false
    // O側（アナリティカル）が高い場合、質問9は低い値、質問10は高い値
    answers['9'] = Math.round(((100 - axes.O) / 100) * 6);
    answers['10'] = Math.round((axes.O / 100) * 6);
    
    // タグ質問（ID 11-35）に対する回答を生成
    const tagMapping: {[key: string]: number} = {
      '🔥 欲望の炎': 11,
      '💬 言語プレイ派': 12,
      '🎭 ロールプレイ好き': 13,
      '🛁 アフターケア必須': 14,
      '⛏️ 開拓派': 15,
      '🧷 軽SM耐性あり': 16,
      '🕯 ロマン重視': 17,
      '⚡️ スピード勝負派': 18,
      '🏃‍♂️ 衝動トリガー型': 19,
      '🪞 鏡プレイ好き': 20,
      '🚪 NG明確': 21,
      '🎮 ゲーム派': 22,
      '🧥 コスプレ派': 23,
      '🧼 ケア＆衛生重視': 24,
      '🕵️‍♀️ 覗き見興奮派': 25,
      '🛡 安全第一派': 26,
      '📱 デジタル前戯派': 27,
      '💋 キス魔': 28,
      '☀️ 朝型エロス': 29,
      '🔄 リピート求め派': 30,
      '🗣 下ネタOK': 31,
      '📚 学習研究派': 32,
      '🧭 ガイド派': 33,
      '🤹‍♀️ マルチタスク派': 34,
      '💤 まったり派': 35
    };
    
    // タグのスコアを回答として設定
    Object.entries(tagMapping).forEach(([tag, questionId]) => {
      answers[questionId.toString()] = tagScores[tag] || 0;
    });
    
    // 残りの質問（36-40）はデフォルト値
    for (let i = 36; i <= 40; i++) {
      answers[i.toString()] = 3;
    }
    
    // 本番と同じcalculatePersonalityTypeを使用
    const result = calculatePersonalityType(answers);
    
    // localStorageに保存（本番と同じ形式）
    localStorage.setItem('personality_test_result', JSON.stringify(result));
    localStorage.setItem('answer_history', JSON.stringify(answers));
    localStorage.setItem('personality_test_username', username);
    
    // resultsページへ遷移
    router.push('/results');
  };
  
  // 選択されたタグの数を取得
  const selectedTagsCount = Object.values(tagScores).filter(score => score === 6).length;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8 mt-8">
          診断結果テストページ
        </h1>
        
        {/* ユーザー名入力 */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">ユーザー名</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30"
            placeholder="ユーザー名を入力"
          />
        </div>
        
        {/* 5軸スライダー */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">5軸の値を設定</h2>
          
          {[
            { key: 'E', left: '外向性', right: '内向性' },
            { key: 'L', left: 'リード', right: 'フォロー' },
            { key: 'A', left: '冒険', right: '安定' },
            { key: 'L2', left: 'ラブ', right: 'フリー' },
            { key: 'O', left: '開放', right: '秘密' }
          ].map(({ key, left, right }) => (
            <div key={key} className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm">{left}</span>
                <span className="text-white font-bold">{axes[key as keyof typeof axes]}%</span>
                <span className="text-white text-sm">{right}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={axes[key as keyof typeof axes]}
                onChange={(e) => handleAxisChange(key, parseInt(e.target.value))}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ec4899 ${axes[key as keyof typeof axes]}%, #4b5563 ${axes[key as keyof typeof axes]}%)`
                }}
              />
            </div>
          ))}
        </div>
        
        {/* タグ選択 */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            タグを選択
          </h2>
          <div className="text-sm text-white/70 mb-4">
            選択済み: {selectedTagsCount}個
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableTags.map(tag => (
              <label
                key={tag}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                  tagScores[tag] === 6
                    ? 'bg-purple-500/50 border-2 border-purple-300'
                    : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                }`}
              >
                <input
                  type="checkbox"
                  checked={tagScores[tag] === 6}
                  onChange={() => handleTagToggle(tag)}
                  className="mr-2"
                />
                <span className="text-white text-sm">{tag}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* 送信ボタン */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
          >
            結果を表示
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
}