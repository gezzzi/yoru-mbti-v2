'use client';

import { PersonalityType } from '@/types/personality';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { personalityInsights } from '@/data/personalityInsights';
import { buildPersonalityImageSources } from '@/utils/personalityImage';

// カテゴリごとの色設定をインポート
const categoryColorSchemes = {
  dom: 'bg-purple-400/50',
  sub: 'bg-pink-400/50',
  introvert: 'bg-cyan-400/50',
  fantasy: 'bg-blue-400/50',
};

interface PersonalityTypeDetailProps {
  type: PersonalityType;
}

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
      <div className="w-full max-w-[24rem] h-[24rem] flex items-center justify-center">
        <span className="text-[clamp(3.5rem,10vw,7rem)]">{emoji}</span>
      </div>
    );
  }

  return (
    <Image
      src={sources[sourceIndex]}
      alt={name}
      width={384}
      height={384}
      className="w-full h-full object-contain"
      onError={handleImageError}
    />
  );
};

const actionButtonBase =
  'inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-lg';

const PersonalityTypeDetail: React.FC<PersonalityTypeDetailProps> = ({ type }) => {
  const baseCode = type.code as keyof typeof personalityInsights;
  const insight = personalityInsights[baseCode];

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ナビゲーション */}
        <ScrollAnimation animation="fadeIn" duration={800}>
          <div className="mb-8">
          <Link 
            href="/types" 
            className="inline-flex items-center text-white bg-gray-600 hover:bg-gray-700 transition-all duration-300 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            タイプ一覧に戻る
          </Link>
          </div>
        </ScrollAnimation>

        {/* メインコンテンツ */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div className="rounded-3xl shadow-xl overflow-hidden border-2 border-white/40 bg-gradient-to-br from-white/25 via-white/15 to-white/20 backdrop-blur-sm" style={{boxShadow: '0 0 40px rgba(255, 255, 255, 0.3)'}}>
            {/* 画像をカテゴリごとの背景色でグラデーションdivに配置 */}
            <ScrollAnimation animation="fadeIn" delay={400}>
              <div className={`p-8 text-white flex justify-center ${categoryColorSchemes[type.category]} backdrop-blur-md`}>
                <div className={`w-full max-w-[24rem] h-[24rem] mx-auto rounded-2xl overflow-hidden bg-transparent flex items-center justify-center`}>
                  <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
                </div>
              </div>
            </ScrollAnimation>

            {/* コンテンツエリア */}
            <ScrollAnimation animation="fadeInUp" delay={600}>
              <div className="p-8">
                {/* 性格タイプ名とコード */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#e0e7ff] mb-4 break-words">
                    {type.name}
                  </h1>
                  <p className="text-2xl font-mono text-green-400 font-bold">{type.code}</p>
                </div>
                
                {/* タイプ説明文 */}
                <div className="mb-8 bg-transparent rounded-xl py-6">
                  <p className="text-lg text-[#e0e7ff] leading-relaxed font-medium">{type.fullDescription || type.description}</p>
                </div>

                {insight && (
                  <div className="space-y-10">
                    <ScrollAnimation animation="fadeInUp" delay={700}>
                      <section className="rounded-2xl py-6 md:py-8 space-y-4">
                        <header className="space-y-2 text-center">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Axis Profile</p>
                          <h2 className="text-2xl font-semibold text-[#c4b5fd]">
                            {type.name}の5軸プロファイル
                          </h2>
                          <p className="text-lg text-[#e0e7ff] leading-relaxed text-left">
                            {type.name}が持つ心理軸の傾向をまとめました。どのような場面で持ち味が発揮され、どこに緊張が生まれやすいのかを把握しておきましょう。
                          </p>
                        </header>
                        <ul className="space-y-3 text-lg text-[#e0e7ff] leading-relaxed px-0">
                          {insight.axisHighlights.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </ScrollAnimation>

                    <ScrollAnimation animation="fadeInUp" delay={770}>
                      <section className="rounded-2xl py-6 md:py-8 space-y-4">
                        <header className="space-y-2 text-center">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Action Plan</p>
                          <h2 className="text-2xl font-semibold text-[#f9a8d4]">おすすめの過ごし方</h2>
                          <p className="text-lg text-[#e0e7ff] leading-relaxed text-left">
                            日常の中で{type.name}らしさを発揮するための行動ヒントです。1つずつ取り入れて、相手とのリズムを整えてみましょう。
                          </p>
                        </header>
                        <ul className="space-y-3 text-lg text-[#e0e7ff] leading-relaxed">
                          {insight.recommendedActions.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </ScrollAnimation>

                    <ScrollAnimation animation="fadeInUp" delay={840}>
                      <section className="rounded-2xl py-6 md:py-8 space-y-4">
                        <header className="space-y-2 text-center">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Growth Tips</p>
                          <h2 className="text-2xl font-semibold text-[#fbbf24]">改善のヒント</h2>
                          <p className="text-lg text-[#e0e7ff] leading-relaxed text-left">
                            行き違いや疲れが溜まりやすいポイントを事前にケアすることで、長期的な安定や信頼に繋がります。
                          </p>
                        </header>
                        <ul className="space-y-3 text-lg text-[#e0e7ff] leading-relaxed">
                          {insight.improvementTips.map((item) => (
                            <li key={item} className="flex items-start gap-3">
                              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-pink-300" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </ScrollAnimation>

                    <ScrollAnimation animation="fadeInUp" delay={900}>
                      <section className="rounded-2xl py-6 md:py-8 space-y-4">
                        <header className="space-y-2 text-center">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Expert Note</p>
                          <h2 className="text-2xl font-semibold text-[#7dd3fc]">専門的な補足メモ</h2>
                        </header>
                        <div className="space-y-4 text-lg text-[#e0e7ff] leading-relaxed">
                          {insight.expertCommentary.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </section>
                    </ScrollAnimation>
                  </div>
                )}

                {/* アクションボタン */}
                <div className="mt-12 text-center">
                  <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                    <Link
                      href="/test"
                      className={`${actionButtonBase} bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white hover:from-[#818cf8] hover:to-[#a78bfa] hover:shadow-xl`}
                    >
                      性格診断をする
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/compatibility"
                      className={`${actionButtonBase} bg-gradient-to-r from-[#ec4899] to-[#ffb8ce] text-white hover:from-[#ffb8ce] hover:to-[#ffb8ce] hover:shadow-xl`}
                    >
                      相性診断をする
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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
