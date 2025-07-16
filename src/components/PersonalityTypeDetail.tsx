'use client';

import { PersonalityType } from '@/types/personality';
import { getCategoryColor } from '@/data/personalityTypes';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ScrollAnimation } from '@/components/ScrollAnimation';

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
      <div className="w-64 h-64 flex items-center justify-center">
        <span className="text-8xl">{emoji}</span>
      </div>
    );
  }

  return (
      <Image
      src={`/images/personality-types/${typeCode.toUpperCase()}.svg`}
        alt={name}
      width={256}
      height={256}
      className="w-64 h-64 object-contain"
        onError={handleImageError}
      />
  );
};

const PersonalityTypeDetail: React.FC<PersonalityTypeDetailProps> = ({ type }) => {
  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ナビゲーション */}
        <ScrollAnimation animation="fadeIn" duration={800}>
          <div className="mb-8">
          <Link 
            href="/types" 
            className="inline-flex items-center text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            性格タイプ一覧に戻る
          </Link>
          </div>
        </ScrollAnimation>

        {/* メインコンテンツ */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* 画像をカテゴリごとの背景色でグラデーションdivに配置 */}
            <ScrollAnimation animation="fadeIn" delay={400}>
              <div className={`p-8 text-white flex justify-center ${categoryColorSchemes[type.category]}`}>
                <div className={`w-72 h-72 mx-auto rounded-2xl overflow-hidden ${categoryColorSchemes[type.category]} flex items-center justify-center`}>
                  <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
                </div>
              </div>
            </ScrollAnimation>

            {/* コンテンツエリア */}
            <ScrollAnimation animation="fadeInUp" delay={600}>
              <div className="p-8">
                {/* 性格タイプ名とコード */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    {type.ruby ? (
                      <ruby>
                        {type.name}
                        <rt className="text-lg font-normal">{type.ruby}</rt>
                      </ruby>
                    ) : (
                      type.name
                    )}
                  </h1>
                  <p className="text-2xl font-mono text-green-700 font-bold">{type.code}</p>
                </div>
                
                {/* タイプ説明文 */}
                <div className="mb-8 bg-gray-50 rounded-xl p-6">
                  <p className="text-lg text-gray-900 leading-relaxed font-medium">{type.description}</p>
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
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default PersonalityTypeDetail;