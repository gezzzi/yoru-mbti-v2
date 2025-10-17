'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './slider.css';

const axes = ['E/I', 'D/S', 'T/S', 'R/H', 'A/N'] as const;
const axisNames = {
  'E/I': '外向性 / 内向性',
  'D/S': 'リード / フォロー',
  'T/S': '冒険 / 安定',
  'R/H': 'ラブ / フリー',
  'A/N': '開放 / 秘密'
};

// タグのリスト（質問11-35のタグ）
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

export default function TestCompatibilityPage() {
  const router = useRouter();
  
  // 各軸のスコアを管理（0-100で、50が中間）
  const [user1Scores, setUser1Scores] = useState({
    'E/I': 50,
    'D/S': 50,
    'T/S': 50,
    'R/H': 50,
    'A/N': 50
  });
  
  const [user2Scores, setUser2Scores] = useState({
    'E/I': 50,
    'D/S': 50,
    'T/S': 50,
    'R/H': 50,
    'A/N': 50
  });

  const [user1Name, setUser1Name] = useState('テストユーザー1');
  const [user2Name, setUser2Name] = useState('テストユーザー2');

  // タグとスコアの管理（各ユーザー最大2つのタグ、スコア1-5）
  const [user1Tags, setUser1Tags] = useState<{ tag: string; score: number }[]>([]);
  const [user2Tags, setUser2Tags] = useState<{ tag: string; score: number }[]>([]);

  // プリセット設定
  const applyPreset = (preset: string) => {
    switch(preset) {
      case 'perfect':
        // 完全一致（100%相性）- D/Sは補完軸なので片方高く片方低く
        setUser1Scores({ 'E/I': 80, 'D/S': 80, 'T/S': 20, 'R/H': 70, 'A/N': 30 });
        setUser2Scores({ 'E/I': 80, 'D/S': 20, 'T/S': 20, 'R/H': 70, 'A/N': 30 });
        setUser1Tags([{ tag: '🔥 欲望の炎', score: 5 }, { tag: '💬 言語プレイ派', score: 5 }]);
        setUser2Tags([{ tag: '🔥 欲望の炎', score: 5 }, { tag: '💬 言語プレイ派', score: 5 }]);
        break;
      case 'good':
        // 良い相性（60-80%）- D/Sは補完的に
        setUser1Scores({ 'E/I': 70, 'D/S': 70, 'T/S': 40, 'R/H': 65, 'A/N': 45 });
        setUser2Scores({ 'E/I': 65, 'D/S': 35, 'T/S': 45, 'R/H': 60, 'A/N': 50 });
        setUser1Tags([{ tag: '🕯 ロマン重視', score: 4 }, { tag: '💋 キス魔', score: 4 }]);
        setUser2Tags([{ tag: '🛁 アフターケア必須', score: 4 }, { tag: '💋 キス魔', score: 3 }]);
        break;
      case 'medium':
        // 中程度（40-59%）- 各軸で違いを作る
        setUser1Scores({ 'E/I': 70, 'D/S': 50, 'T/S': 80, 'R/H': 20, 'A/N': 75 });
        setUser2Scores({ 'E/I': 30, 'D/S': 50, 'T/S': 20, 'R/H': 80, 'A/N': 25 });
        setUser1Tags([{ tag: '⚡️ スピード勝負派', score: 3 }, { tag: '🎮 ゲーム派', score: 3 }]);
        setUser2Tags([{ tag: '💤 まったり派', score: 3 }, { tag: '🧼 ケア＆衛生重視', score: 3 }]);
        break;
      case 'poor':
        // 低い相性（0-39%）- D/Sも同じ側にして相性を悪くする
        setUser1Scores({ 'E/I': 90, 'D/S': 80, 'T/S': 95, 'R/H': 5, 'A/N': 90 });
        setUser2Scores({ 'E/I': 10, 'D/S': 85, 'T/S': 5, 'R/H': 95, 'A/N': 10 });
        setUser1Tags([{ tag: '🚪 NG明確', score: 2 }, { tag: '🛡 安全第一派', score: 2 }]);
        setUser2Tags([{ tag: '⛏️ 開拓派', score: 5 }, { tag: '🧷 軽SM耐性あり', score: 5 }]);
        break;
      case 'fireworks':
        // 花火が出る相性（80%以上）- D/Sは補完的に
        setUser1Scores({ 'E/I': 75, 'D/S': 75, 'T/S': 28, 'R/H': 74, 'A/N': 26 });
        setUser2Scores({ 'E/I': 78, 'D/S': 25, 'T/S': 25, 'R/H': 77, 'A/N': 23 });
        setUser1Tags([{ tag: '🏃‍♂️ 衝動トリガー型', score: 5 }, { tag: '🔄 リピート求め派', score: 4 }]);
        setUser2Tags([{ tag: '🏃‍♂️ 衝動トリガー型', score: 4 }, { tag: '☀️ 朝型エロス', score: 4 }]);
        break;
    }
  };

  // タグの追加
  const addTag = (user: 'user1' | 'user2', tag: string, score: number) => {
    const setTags = user === 'user1' ? setUser1Tags : setUser2Tags;
    const currentTags = user === 'user1' ? user1Tags : user2Tags;
    
    // 同じタグがすでにある場合は追加しない
    if (currentTags.some(t => t.tag === tag)) return;
    
    setTags([...currentTags, { tag, score }]);
  };
  
  // タグの削除
  const removeTag = (user: 'user1' | 'user2', index: number) => {
    const setTags = user === 'user1' ? setUser1Tags : setUser2Tags;
    const currentTags = user === 'user1' ? user1Tags : user2Tags;
    setTags(currentTags.filter((_, i) => i !== index));
  };
  
  // タグのスコア変更
  const updateTagScore = (user: 'user1' | 'user2', index: number, score: number) => {
    const setTags = user === 'user1' ? setUser1Tags : setUser2Tags;
    const currentTags = user === 'user1' ? user1Tags : user2Tags;
    const newTags = [...currentTags];
    newTags[index].score = score;
    setTags(newTags);
  };

  // 相性診断結果ページへ遷移
  const goToResults = () => {
    // TestResult形式のデータを作成
    const createTestResult = (
      name: string,
      scores: typeof user1Scores,
      tags: typeof user1Tags
    ) => {
      // 5軸の文字を判定
      const typeCode = 
        (scores['E/I'] >= 50 ? 'E' : 'I') +
        (scores['D/S'] >= 50 ? 'L' : 'F') +  // D/SはL/Fに変換
        (scores['T/S'] >= 50 ? 'A' : 'S') +  // T/SはA/Sに変換
        (scores['R/H'] >= 50 ? 'L' : 'F') +  // R/HはL/Fに変換
        '-' +
        (scores['A/N'] >= 50 ? 'O' : 'S');   // A/NはO/Sに変換
      
      return {
        E: scores['E/I'],
        L: scores['D/S'],
        A: scores['T/S'],
        L2: scores['R/H'],
        O: scores['A/N'],
        type: {
          code: typeCode,
          name: name,
          category: 'dom' as const,
          emoji: '🌙',
          description: 'テストユーザー',
          traits: [],
          compatibility: [],
          strengths: [],
          weaknesses: []
        },
        additionalResults: {
          smTendency: scores['D/S'] >= 65 ? 'S' as const : scores['D/S'] <= 35 ? 'M' as const : 'Both' as const,
          smScore: scores['D/S'],
          libidoLevel: 3 as const,
          positionPreferences: {
            cozy: 50,
            adventurous: 50,
            flexible: 50,
            back: 50,
            chill: 50
          },
          gapLevel: 50,
          tensionFactors: {
            vocal: false,
            reactive: false
          },
          kissImportance: 50,
          preferences: [],
          tags: tags.map(t => t.tag),
          tagScores: tags
        }
      };
    };
    
    const user1Result = createTestResult(user1Name, user1Scores, user1Tags);
    const user2Result = createTestResult(user2Name, user2Scores, user2Tags);
    
    // LocalStorageに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('compatibility_my_result', JSON.stringify(user1Result));
      localStorage.setItem('compatibility_partner_result', JSON.stringify(user2Result));
    }
    
    // 相性診断結果ページにリダイレクト
    router.push('/compatibility/results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            相性診断テストページ
          </h1>
          
          {/* プリセットボタン */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">プリセット</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyPreset('perfect')}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
              >
                完璧な相性 (100%)
              </button>
              <button
                onClick={() => applyPreset('fireworks')}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                花火演出 (80%+)
              </button>
              <button
                onClick={() => applyPreset('good')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                良い相性 (60-80%)
              </button>
              <button
                onClick={() => applyPreset('medium')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                桜吹雪 (40-59%)
              </button>
              <button
                onClick={() => applyPreset('poor')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                雪演出 (0-39%)
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* ユーザー1の設定 */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">ユーザー1</h2>
              <input
                type="text"
                value={user1Name}
                onChange={(e) => setUser1Name(e.target.value)}
                className="w-full px-4 py-2 mb-4 bg-white/10 text-white rounded-lg border border-white/20"
                placeholder="名前"
              />
              
              {axes.map(axis => {
                const [left, right] = axisNames[axis].split(' / ');
                return (
                  <div key={axis} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm">{left}</span>
                      <span className="text-white font-bold">{user1Scores[axis]}%</span>
                      <span className="text-white text-sm">{right}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={user1Scores[axis]}
                      onChange={(e) => setUser1Scores({
                        ...user1Scores,
                        [axis]: parseInt(e.target.value)
                      })}
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #ec4899 ${user1Scores[axis]}%, #4b5563 ${user1Scores[axis]}%)`
                      }}
                    />
                  </div>
                );
              })}
              
              {/* タグ選択 */}
              <div className="mt-6 border-t border-white/20 pt-4">
                <h3 className="text-white font-semibold mb-3">タグ</h3>
                
                {/* 選択されたタグ */}
                {user1Tags.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {user1Tags.map((tagData, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                        <span className="flex-1 text-white text-sm">{tagData.tag}</span>
                        <select
                          value={tagData.score}
                          onChange={(e) => updateTagScore('user1', index, parseInt(e.target.value))}
                          className="bg-white/20 text-white rounded px-2 py-1 text-sm [&>option]:bg-purple-900 [&>option]:text-white"
                        >
                          {[1, 2, 3, 4, 5].map(score => (
                            <option key={score} value={score}>{score}点</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeTag('user1', index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* タグ追加 */}
                <div className="space-y-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addTag('user1', e.target.value, 4);
                        e.target.value = '';
                      }
                    }}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 text-sm [&>option]:bg-purple-900 [&>option]:text-white"
                  >
                    <option value="">タグを選択...</option>
                    {availableTags.map(tag => (
                      <option key={tag} value={tag} className="bg-purple-900 text-white">{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* ユーザー2の設定 */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">ユーザー2</h2>
              <input
                type="text"
                value={user2Name}
                onChange={(e) => setUser2Name(e.target.value)}
                className="w-full px-4 py-2 mb-4 bg-white/10 text-white rounded-lg border border-white/20"
                placeholder="名前"
              />
              
              {axes.map(axis => {
                const [left, right] = axisNames[axis].split(' / ');
                return (
                  <div key={axis} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-sm">{left}</span>
                      <span className="text-white font-bold">{user2Scores[axis]}%</span>
                      <span className="text-white text-sm">{right}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={user2Scores[axis]}
                      onChange={(e) => setUser2Scores({
                        ...user2Scores,
                        [axis]: parseInt(e.target.value)
                      })}
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #ec4899 ${user2Scores[axis]}%, #4b5563 ${user2Scores[axis]}%)`
                      }}
                    />
                  </div>
                );
              })}
              
              {/* タグ選択 */}
              <div className="mt-6 border-t border-white/20 pt-4">
                <h3 className="text-white font-semibold mb-3">タグ</h3>
                
                {/* 選択されたタグ */}
                {user2Tags.length > 0 && (
                  <div className="mb-3 space-y-2">
                    {user2Tags.map((tagData, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                        <span className="flex-1 text-white text-sm">{tagData.tag}</span>
                        <select
                          value={tagData.score}
                          onChange={(e) => updateTagScore('user2', index, parseInt(e.target.value))}
                          className="bg-white/20 text-white rounded px-2 py-1 text-sm"
                        >
                          {[1, 2, 3, 4, 5].map(score => (
                            <option key={score} value={score}>{score}点</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeTag('user2', index)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* タグ追加 */}
                <div className="space-y-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addTag('user2', e.target.value, 4);
                        e.target.value = '';
                      }
                    }}
                    className="w-full bg-white/10 text-white rounded-lg px-3 py-2 text-sm [&>option]:bg-purple-900 [&>option]:text-white"
                  >
                    <option value="">タグを選択...</option>
                    {availableTags.map(tag => (
                      <option key={tag} value={tag} className="bg-purple-900 text-white">{tag}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 結果を見るボタン */}
          <div className="text-center mt-8">
            <button
              onClick={goToResults}
              className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-lg font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              相性診断結果を確認
            </button>
          </div>

          {/* 説明 */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 mt-8">
            <h3 className="text-lg font-bold text-white mb-3">使い方</h3>
            <ul className="text-white/80 space-y-2 text-sm">
              <li>• 各軸のスライダーを調整して、テストしたいスコアを設定</li>
              <li>• 50%以上で右側の特性、50%未満で左側の特性が選択される</li>
              <li>• プリセットボタンで特定のアニメーションをテスト可能</li>
              <li>• 0-39%: 雪のアニメーション</li>
              <li>• 40-59%: 桜吹雪のアニメーション</li>
              <li>• 60-100%: ハートの雨アニメーション</li>
              <li>• 80%以上: 追加で花火アニメーション</li>
            </ul>
          </div>
        </div>
      </div>
  );
}