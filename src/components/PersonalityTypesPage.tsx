'use client';

import { personalityTypes, getCategoryColor, getCategoryName } from '@/data/personalityTypes';
import { PersonalityType } from '@/types/personality';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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
          <div className={`w-72 h-72 mx-auto mb-4 rounded-2xl overflow-hidden ${scheme.imageBg} flex items-center justify-center`}>
            <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
          </div>
          <div className={`${scheme.textBg} rounded-xl p-4 mx-auto`}>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {type.name}
            </h3>
            <p className="text-sm font-medium text-gray-700 mb-3">
              {type.code}
            </p>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-0 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-0 pt-12 bg-transparent">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4 pt-24 flex justify-center gap-1 select-none">
              <span className="neon-pink" style={{color:'#f472b6',textShadow:'0 0 10px #f472b6,0 0 20px #ec4899,0 0 30px #be185d',animation:'pulsePink 2s ease-in-out infinite'}}>性</span>
              <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>格</span>
              <span className="neon-blue" style={{color:'#3b82f6',textShadow:'0 0 10px #3b82f6,0 0 20px #60a5fa,0 0 30px #93c5fd',animation:'pulseBlue 2.5s ease-in-out infinite'}}>タ</span>
              <span className="neon-blue" style={{color:'#3b82f6',textShadow:'0 0 10px #3b82f6,0 0 20px #60a5fa,0 0 30px #93c5fd',animation:'pulseBlue 2.5s ease-in-out infinite'}}>イ</span>
              <span className="neon-blue" style={{color:'#3b82f6',textShadow:'0 0 10px #3b82f6,0 0 20px #60a5fa,0 0 30px #93c5fd',animation:'pulseBlue 2.5s ease-in-out infinite'}}>プ</span>
            </h1>
          </div>

          {/* Categories */}
          {categories.map((category, index) => {
            const categoryTypes = personalityTypes.filter(type => type.category === category);
              const scheme = categoryColorSchemes[category];
            
            return (
              <div key={category}>
                <section className={`${scheme.bg} pt-12 relative rounded-3xl`}>
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2 mt-8">
                    {getCategoryName(category)}
                  </h2>
                    <p className="text-lg text-gray-700 font-medium px-4 sm:px-6 lg:px-8">
                    {category === 'dom' && '主導権を握り、相手をリードすることを好むタイプ。積極的で支配的な傾向があります。'}
                    {category === 'sub' && '受け身で、相手に従うことを好むタイプ。協調的で従属的な傾向があります。'}
                    {category === 'introvert' && '内向的で控えめなタイプ。静かで深く考える傾向があります。'}
                    {category === 'fantasy' && '妄想的で現実逃避の傾向があるタイプ。想像力豊かで独自の世界を持ちます。'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                  {categoryTypes.map((type) => renderPersonalityType(type, category))}
              </div>
              </section>
              
              {/* セクション間の隙間 */}
              {index < categories.length - 1 && (
                <div className="h-8 bg-transparent"></div>
              )}
            </div>
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
      
    </div>
  );
} 