'use client';

import { personalityTypes, getCategoryColor, getCategoryName } from '@/data/personalityTypes';
import { PersonalityType } from '@/types/personality';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/components/Footer';

// カテゴリごとの色設定
const categoryColorSchemes = {
  dom: {
    bg: 'bg-red-200',
    textBg: 'bg-red-200',
    imageBg: 'bg-red-200'
  },
  sub: {
    bg: 'bg-pink-200',
    textBg: 'bg-pink-200',
    imageBg: 'bg-pink-200'
  },
  introvert: {
    bg: 'bg-purple-200',
    textBg: 'bg-purple-200',
    imageBg: 'bg-purple-200'
  },
  fantasy: {
    bg: 'bg-blue-200',
    textBg: 'bg-blue-200',
    imageBg: 'bg-blue-200'
  }
};

// 画像または絵文字を表示するコンポーネント
const TypeImage: React.FC<{ typeCode: string; emoji: string; name: string }> = ({ typeCode, emoji, name }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div className="w-112 h-112 flex items-center justify-center">
        <span className="text-16xl">{emoji}</span>
      </div>
    );
  }

  return (
      <Image
      src={`/images/personality-types/${typeCode}.svg`}
        alt={name}
      width={448}
      height={448}
      className="w-112 h-112 object-contain"
        onError={handleImageError}
      />
  );
};

export default function PersonalityTypesPage() {
  const categories = ['dom', 'sub', 'introvert', 'fantasy'] as const;

  const renderPersonalityType = (type: PersonalityType, categoryColor: keyof typeof categoryColorSchemes) => {
    const scheme = categoryColorSchemes[categoryColor];
    
    return (
      <Link
        key={type.code}
        href={`/types/${type.code.toLowerCase()}`}
        className="block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
      >
        <div className="text-center mb-6">
          <div className={`w-128 h-128 mx-auto mb-4 rounded-2xl overflow-hidden ${scheme.imageBg} flex items-center justify-center`}>
            <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
          </div>
          <div className={`${scheme.textBg} rounded-xl p-4 mx-auto`}>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {type.name}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-3">
              {type.code}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
          {type.description}
        </p>
        </div>
      </div>
    </Link>
  );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-28 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            性格タイプ
          </h1>
        </div>

        {/* Categories */}
        <div className="space-y-20">
        {categories.map((category) => {
          const categoryTypes = personalityTypes.filter(type => type.category === category);
            const scheme = categoryColorSchemes[category];
          
          return (
              <section key={category} className={`${scheme.bg} rounded-3xl p-8 md:p-12`}>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  {getCategoryName(category)}
                </h2>
                  <p className="text-lg text-gray-700 font-medium">
                  {category === 'dom' && '主導権を握り、相手をリードすることを好むタイプ。積極的で支配的な傾向があります。'}
                  {category === 'sub' && '受け身で、相手に従うことを好むタイプ。協調的で従属的な傾向があります。'}
                  {category === 'introvert' && '内向的で控えめなタイプ。静かで深く考える傾向があります。'}
                  {category === 'fantasy' && '妄想的で現実逃避の傾向があるタイプ。想像力豊かで独自の世界を持ちます。'}
                </p>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {categoryTypes.map((type) => renderPersonalityType(type, category))}
              </div>
              </section>
          );
        })}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 bg-white rounded-3xl p-12 shadow-xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            自分のタイプを知りたい？
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            診断テストを受けて、あなたの本当の性格タイプを発見しましょう。
          </p>
          <Link
            href="/test"
            className="inline-block px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            診断テストを受ける
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 