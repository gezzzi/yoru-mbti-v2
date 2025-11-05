'use client';

import { personalityTypes, getCategoryColor, getCategoryName } from '@/data/personalityTypes';
import { PersonalityType } from '@/types/personality';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';
import { buildPersonalityImageSources } from '@/utils/personalityImage';

// カテゴリごとの色設定
const categoryColorSchemes = {
  dom: {
    bg: 'bg-purple-400/50',
    textBg: 'bg-transparent',
    imageBg: 'bg-transparent'
  },
  sub: {
    bg: 'bg-pink-400/50',
    textBg: 'bg-transparent',
    imageBg: 'bg-transparent'
  },
  introvert: {
    bg: 'bg-cyan-400/50',
    textBg: 'bg-transparent',
    imageBg: 'bg-transparent'
  },
  fantasy: {
    bg: 'bg-blue-400/50',
    textBg: 'bg-transparent',
    imageBg: 'bg-transparent'
  }
};

// 画像または絵文字を表示するコンポーネント
const TypeImage: React.FC<{ typeCode: string; emoji: string; name: string }> = ({ typeCode, emoji, name }) => {
  const [imageError, setImageError] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  const sources = useMemo(() => buildPersonalityImageSources([typeCode]), [typeCode]);
  const sourceKey = sources.join('|');

  useEffect(() => {
    setSourceIndex(0);
    setImageError(false);
  }, [sourceKey]);

  const handleImageError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  if (imageError || sources.length === 0) {
    return (
      <div className="w-64 h-64 flex items-center justify-center">
        <span className="text-8xl">{emoji}</span>
      </div>
    );
  }

  return (
    <Image
      src={sources[sourceIndex]}
      alt={name}
      width={256}
      height={256}
      className="w-64 h-64 object-contain"
      onError={handleImageError}
    />
  );
};

export default function PersonalityTypesPage() {
  const categories: Array<keyof typeof categoryColorSchemes> = ['dom', 'fantasy'];

  const renderPersonalityType = (type: PersonalityType, categoryColor: keyof typeof categoryColorSchemes, delay: number) => {
    const scheme = categoryColorSchemes[categoryColor];
    
    return (
      <ScrollAnimation key={type.code} animation="fadeInUp" delay={delay}>
        <Link
          href={`/types/${type.code.toLowerCase()}`}
          className="block rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
        >
        <div className="text-center mb-6 relative z-20">
          <div className={`w-72 h-72 mx-auto mb-4 rounded-2xl overflow-hidden ${scheme.imageBg} flex items-center justify-center`}>
            <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
          </div>
          <div className={`${scheme.textBg} rounded-xl p-4 mx-auto`}>
            <h3 className="text-xl font-bold text-[#e0e7ff] mb-1 break-words">
              {type.name}
            </h3>
            <p className="text-sm font-medium text-[#e0e7ff]/80 mb-1">
              {type.code}
            </p>
            {type.summary && (
              <p className="text-sm font-semibold text-[#e0e7ff]/90 mt-2">
                {type.summary}
              </p>
            )}
          </div>
        </div>
        </Link>
      </ScrollAnimation>
    );
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-0 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-0 pt-12 bg-transparent">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 pt-24 select-none">
                <NeonText text="性格タイプ" specialCharIndex={0} className="flex justify-center gap-1" />
              </h1>
            </div>
          </ScrollAnimation>

          {/* Categories */}
          {categories.map((category, index) => {
            const categoryTypes = personalityTypes.filter(type => type.category === category);
              const scheme = categoryColorSchemes[category];
            
            return (
              <div key={category}>
                <ScrollAnimation animation="fadeInUp" delay={100 + index * 200}>
                  <section className={`${scheme.bg} pt-12 relative rounded-3xl backdrop-blur-sm border border-white/10`}>
                    <div className="text-center mb-0 relative z-0">
                      <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#e0e7ff] mb-0 mt-4 sm:mt-6 md:mt-8">
                      {getCategoryName(category)}
                    </h2>
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 -mt-12 sm:-mt-14 md:-mt-16 lg:-mt-18 xl:-mt-20 relative z-10">
                  {categoryTypes.map((type, idx) => renderPersonalityType(type, category, 200 + idx * 100))}
              </div>
                </section>
                </ScrollAnimation>
              
              {/* セクション間の隙間 */}
              {index < categories.length - 1 && (
                <div className="h-16 md:h-20 lg:h-24 bg-transparent"></div>
              )}
            </div>
          );
        })}
        </div>

        {/* Footer */}
        <ScrollAnimation animation="fadeInUp" delay={1000}>
          <div className="text-center mt-20 bg-white/10 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20">
            <h3 className="text-3xl font-bold text-[#e0e7ff] mb-6">
              自分のタイプを知りたい？
            </h3>
            <p className="text-xl text-[#e0e7ff]/80 mb-8 max-w-2xl mx-auto">
              診断テストを受けて、あなたの本当の性格タイプを発見しましょう。
            </p>
            <Link
              href="/test"
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white font-semibold text-lg rounded-2xl hover:from-[#818cf8] hover:to-[#a78bfa] transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              診断テストを受ける
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
      
    </div>
  );
} 
