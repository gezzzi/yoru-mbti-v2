'use client';

import React from 'react';
import { ScrollAnimation } from './ScrollAnimation';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 w-full space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  運営者情報
                </h1>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  夜の性格診断の運営者についての情報です。
                </p>
              </div>

              <ScrollAnimation animation="fadeInUp" delay={200}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">サイト情報</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">サイト名：</span>
                      <span>夜の性格診断</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">URL：</span>
                      <a href="https://nightpersonality.com"
                         className="text-pink-300 hover:text-pink-200 underline"
                         target="_blank"
                         rel="noopener noreferrer">
                        https://nightpersonality.com
                      </a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">開設日：</span>
                      <span>2025年7月</span>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">運営者</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">運営者名：</span>
                      <span>夜の性格診断</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">連絡先：</span>
                      <a href="mailto:info@nightpersonality.com"
                         className="text-pink-300 hover:text-pink-200 underline break-all">
                        info@nightpersonality.com
                      </a>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={400}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">サービス概要</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      夜の性格診断は、独自の5軸システムを使用した性格診断サービスです。
                      恋愛や親密な関係における性格タイプを診断し、自己理解と相互理解を深めることを目的としています。
                    </p>
                    <p>
                      診断は無料でご利用いただけ、結果はお使いのブラウザに保存されます。
                      また、相性診断機能により、パートナーとの関係性についての洞察も提供しています。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={500}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">利用技術</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Next.js 14（フロントエンド・バックエンド）</li>
                      <li>TypeScript（プログラミング言語）</li>
                      <li>Tailwind CSS（スタイリング）</li>
                      <li>Google Analytics（アクセス解析）</li>
                    </ul>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={600}>
                <section>
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">免責事項</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      本サービスで提供される診断結果は、心理学的な研究に基づいていますが、
                      医学的・専門的なアドバイスではありません。
                      診断結果は参考情報として活用し、自己理解の一助としてお使いください。
                    </p>
                    <p>
                      診断結果によって生じた損害等の一切の責任を負いかねますので、
                      あらかじめご了承ください。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
