'use client';

import { PersonalityType } from '@/types/personality';
import { getCategoryColor } from '@/data/personalityTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// カテゴリごとの色設定をインポート
const categoryColorSchemes = {
  dom: 'bg-red-200',
  sub: 'bg-pink-200',
  introvert: 'bg-purple-200',
  fantasy: 'bg-blue-200',
};

interface PersonalityTypeDetailProps {
  type: PersonalityType;
}

const TypeImage: React.FC<{ typeCode: string; emoji: string; name: string }> = ({ typeCode, emoji, name }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-2xl">
        <span className="text-6xl">{emoji}</span>
      </div>
    );
  }

  return (
    <div className="w-64 h-64 relative">
      <Image
        src={`/images/personality-types/${typeCode}.svg`}
        alt={name}
        width={256}
        height={256}
        className="w-full h-full object-cover rounded-2xl"
        onError={handleImageError}
      />
    </div>
  );
};

const PersonalityTypeDetail: React.FC<PersonalityTypeDetailProps> = ({ type }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ナビゲーション */}
        <div className="mb-8">
          <Link 
            href="/types" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            性格タイプ一覧に戻る
          </Link>
        </div>

        {/* メインコンテンツ */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* 画像をカテゴリごとの背景色でグラデーションdivに配置 */}
          <div className={`p-8 text-white flex justify-center ${categoryColorSchemes[type.category]}`}>
            <div className={`${categoryColorSchemes[type.category]} rounded-2xl p-6 flex items-center justify-center`}>
              <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
            </div>
          </div>

          {/* コンテンツエリア */}
          <div className="p-8">
            {/* タイプ説明文を追加 */}
            <div className="mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">{type.description}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 主な特徴 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">主な特徴</h2>
                <div className="space-y-3">
                  {type.traits.map((trait, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(type.category)} text-white`}
                    >
                      <span className="font-medium">{trait}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 強みと弱み */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">強み</h2>
                  <div className="space-y-2">
                    {type.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center p-3 bg-green-50 rounded-xl">
                        <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">改善点</h2>
                  <div className="space-y-2">
                    {type.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-center p-3 bg-orange-50 rounded-xl">
                        <svg className="w-5 h-5 text-orange-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 相性とキャリア */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {/* 相性の良いタイプ */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">相性の良いタイプ</h2>
                <div className="flex flex-wrap gap-3">
                  {type.compatibility.map((compat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-bold text-pink-700">{index + 1}位</span>
                      <Link
                        href={`/types/${compat.toLowerCase()}`}
                        className="px-4 py-2 rounded-full text-sm bg-pink-100 text-pink-800 border border-pink-200 hover:bg-pink-200 transition-colors"
                      >
                        {compat}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="mt-12 text-center">
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link
                  href="/test"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
                >
                  診断テストを受ける
                </Link>
                <Link
                  href="/compatibility"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold text-lg rounded-2xl hover:from-teal-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-xl"
                >
                  相性診断をする
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PersonalityTypeDetail; 