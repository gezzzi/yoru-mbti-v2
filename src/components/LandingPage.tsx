'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollAnimation } from './ScrollAnimation';

const LandingPage: React.FC = () => {
  return (
    <>
      {/* こんな悩みに */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              こんな悩みありませんか？
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: "💭", text: "パートナーとの夜の相性が気になる" },
              { icon: "❤️", text: "もっと親密な関係を築きたい" },
              { icon: "🌙", text: "夜の時間をもっと充実させたい" },
              { icon: "💫", text: "相手の本当の気持ちが知りたい" },
              { icon: "✨", text: "倦怠期を乗り越える方法を探している" },
              { icon: "🔥", text: "お互いの満足度を高めたい" }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{item.icon}</div>
                  <p className="text-sm sm:text-base text-white/90">{item.text}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className="text-center mt-8 sm:mt-10">
              <p className="text-white/80 text-base sm:text-lg mb-4 sm:mb-6">10分で現状を可視化</p>
              <Link
                href="/compatibility"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
              >
                相性診断をはじめる
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 診断でわかること */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4">
              夜の性格診断でわかること
            </h2>
            <p className="text-sm sm:text-base text-white/70 text-center mb-8 sm:mb-12">
              科学的なアプローチで二人の関係を分析
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "カップル親密度スコア",
                description: "二人の親密度を数値化。現在の関係性の強さと改善ポイントを明確に把握できます。",
                icon: "📊"
              },
              {
                title: "夜の満足度診断",
                description: "お互いの満足度と期待値のギャップを分析。より良い関係を築くためのヒントが見つかります。",
                icon: "💝"
              },
              {
                title: "相性の良い兆候・注意点",
                description: "二人の相性における強みと改善が必要な部分を具体的に提示。関係改善の指針となります。",
                icon: "🎯"
              },
              {
                title: "1週間改善プラン",
                description: "すぐに実践できる具体的なアクションリスト。小さな変化から大きな改善へ導きます。",
                icon: "📝"
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 150}>
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* どうやって測るの？ */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              どうやって測るの？
            </h2>
          </ScrollAnimation>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                step: "1",
                title: "心理学ベースの質問",
                description: "40問の質問で5つの性格軸を測定。科学的な心理モデルに基づいた分析を行います。"
              },
              {
                step: "2",
                title: "二人で回答",
                description: "パートナーと個別に回答後にお互いのQRコードで相性診断できます。"
              },
              {
                step: "3",
                title: "詳細レポート生成",
                description: "親密度・満足度・相性を総合的に分析。具体的な改善アドバイスも提供します。"
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 200}>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className="text-center mt-8 sm:mt-12">
              <Link
                href="/test"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white font-semibold rounded-full hover:from-[#818cf8] hover:to-[#a78bfa] transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
              >
                無料で診断を始める
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* 特徴 */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              夜の性格診断の特徴
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "完全無料",
                description: "すべての機能を無料で利用可能。隠された料金はありません。",
                icon: "🎁"
              },
              {
                title: "匿名・安心",
                description: "個人情報の登録不要。プライバシーを完全に保護します。",
                icon: "🔒"
              },
              {
                title: "10分で完了",
                description: "短時間で診断可能。すぐに結果を確認できます。",
                icon: "⚡"
              },
              {
                title: "科学的アプローチ",
                description: "心理学の理論に基づいた信頼性の高い分析。",
                icon: "🧪"
              },
              {
                title: "カスタマイズされたアドバイス",
                description: "あなたの結果に合わせた具体的な改善提案。",
                icon: "💡"
              },
              {
                title: "結果の保存・共有",
                description: "診断結果をQRコードで簡単に共有。いつでも見返せます。",
                icon: "📱"
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-white/70">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ユーザーの声 */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              利用者の声
            </h2>
          </ScrollAnimation>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                text: "カップルで相性診断をしてみて、話しにくかったことを自然に話せました。1ヶ月で夜のズレが縮まりました。",
                author: "20代女性"
              },
              {
                text: "パートナーとの相性を客観的に知れて良かった。お互いの理解が深まりました。",
                author: "30代男性"
              },
              {
                text: "無理のないペースで関係改善ができました。具体的なアドバイスが役立ちました。",
                author: "20代カップル"
              }
            ].map((review, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 150}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                  <p className="text-sm sm:text-base text-white/90 mb-2 sm:mb-3">&quot;{review.text}&quot;</p>
                  <p className="text-xs sm:text-sm text-white/60">— {review.author}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              よくある質問
            </h2>
          </ScrollAnimation>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                q: "無料ですか？匿名で使えますか？",
                a: "はい、完全無料でご利用いただけます。会員登録も不要で、データはローカルに保存されるので安全です。"
              },
              {
                q: "一人でも診断できますか？",
                a: "はい、一人でも診断可能です。後からパートナーの回答を追加して、二人の相性診断レポートを作成することもできます。"
              },
              {
                q: "診断にはどのくらい時間がかかりますか？",
                a: "約10分で完了します。40問の質問に答えるだけで、詳細な分析結果が得られます。"
              },
              {
                q: "結果は保存・共有できますか？",
                a: "はい、診断結果はQRコードで簡単に共有できます。スクリーンショットでの保存も可能です。"
              },
              {
                q: "どんな改善アドバイスがもらえますか？",
                a: "相性の良い点の維持方法、改善が必要な点への対処法、コミュニケーションのコツなど、1週間単位の具体的なプランを提供します。"
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{item.q}</h3>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed">{item.a}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* 最終CTA */}
      <section className="w-full px-4 py-16 sm:py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              二人の&quot;夜&quot;は、もっと良くなる。
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-10">
              今すぐ無料で夜の相性を診断して、より深い関係を築きましょう
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/compatibility"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base md:text-lg"
              >
                今すぐ夜の相性診断を試す
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/types"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm sm:text-base md:text-lg"
              >
                まずは16タイプを確認する
              </Link>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/60 text-xs sm:text-sm">
              <span className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                匿名利用
              </span>
              <span className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                10分で完了
              </span>
              <span className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                結果保存可
              </span>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
};

export default LandingPage;