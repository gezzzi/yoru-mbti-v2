'use client';

import { PersonalityType } from '@/types/personality';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ScrollAnimation } from '@/components/ScrollAnimation';
import { personalityInsights } from '@/data/personalityInsights';

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

const actionButtonBase =
  'inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-200 shadow-lg';

const PersonalityTypeDetail: React.FC<PersonalityTypeDetailProps> = ({ type }) => {
  const baseCode = type.code.split('-')[0] as keyof typeof personalityInsights;
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
                <div className={`w-72 h-72 mx-auto rounded-2xl overflow-hidden bg-transparent flex items-center justify-center`}>
                  <TypeImage typeCode={type.code} emoji={type.emoji} name={type.name} />
                </div>
              </div>
            </ScrollAnimation>

            {/* コンテンツエリア */}
            <ScrollAnimation animation="fadeInUp" delay={600}>
              <div className="p-8">
                {/* 性格タイプ名とコード */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#e0e7ff] mb-4">
                    {type.ruby ? (
                      <ruby>
                        {type.name}
                        <rt className="text-lg font-normal">{type.ruby}</rt>
                      </ruby>
                    ) : (
                      type.name
                    )}
                  </h1>
                  <p className="text-2xl font-mono text-green-400 font-bold">{type.code}</p>
                </div>
                
                {/* タイプ説明文 */}
                <div className="mb-8 bg-transparent rounded-xl p-6">
                  <p className="text-lg text-[#e0e7ff] leading-relaxed font-medium">{type.fullDescription || type.description}</p>
                </div>

                {insight && (
                  <div className="space-y-10">
                    <ScrollAnimation animation="fadeInUp" delay={700}>
                      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 space-y-4 shadow-inner shadow-white/10">
                        <header className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Axis Profile</p>
                          <h2 className="text-2xl font-semibold text-white">
                            {type.name}の5軸プロファイル
                          </h2>
                          <p className="text-sm md:text-base text-white/75 leading-relaxed">
                            {type.name}が持つ心理軸の傾向をまとめました。どのような場面で持ち味が発揮され、どこに緊張が生まれやすいのかを把握しておきましょう。
                          </p>
                        </header>
                        <ul className="space-y-3 text-sm md:text-base text-white/85 leading-relaxed">
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
                      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-6 md:p-8 space-y-4">
                        <header className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Action Plan</p>
                          <h2 className="text-2xl font-semibold text-white">おすすめの過ごし方</h2>
                          <p className="text-sm md:text-base text-white/75 leading-relaxed">
                            日常の中で{type.name}らしさを発揮するための行動ヒントです。1つずつ取り入れて、相手とのリズムを整えてみましょう。
                          </p>
                        </header>
                        <ul className="space-y-3 text-sm md:text-base text-white/85 leading-relaxed">
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
                      <section className="rounded-2xl border border-white/10 bg-black/30 p-6 md:p-8 space-y-4">
                        <header className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Growth Tips</p>
                          <h2 className="text-2xl font-semibold text-white">改善のヒント</h2>
                          <p className="text-sm md:text-base text-white/75 leading-relaxed">
                            行き違いや疲れが溜まりやすいポイントを事前にケアすることで、長期的な安定や信頼に繋がります。
                          </p>
                        </header>
                        <ul className="space-y-3 text-sm md:text-base text-white/85 leading-relaxed">
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
                      <section className="rounded-2xl border border-white/10 bg-white/10 p-6 md:p-8 space-y-4">
                        <header className="space-y-2">
                          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Expert Note</p>
                          <h2 className="text-2xl font-semibold text-white">専門的な補足メモ</h2>
                        </header>
                        <div className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
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
