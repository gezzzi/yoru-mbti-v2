'use client';

import React from 'react';
import { ScrollAnimation } from './ScrollAnimation';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 w-full space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  お問い合わせ
                </h1>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  夜の性格診断へのお問い合わせはこちらからお願いします。
                </p>
              </div>

              <ScrollAnimation animation="fadeInUp" delay={200}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">お問い合わせ先</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      サービスに関するご質問、ご意見、ご要望などがございましたら、
                      下記のメールアドレスまでお気軽にお問い合わせください。
                    </p>
                    <div className="bg-white/5 rounded-lg p-4 mt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <span className="font-medium sm:w-32">メールアドレス：</span>
                        <a href="mailto:sakumonbot7@gmail.com"
                           className="text-pink-300 hover:text-pink-200 underline break-all">
                          sakumonbot7@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">お問い合わせ内容の例</h2>
                  <div className="text-[#e0e7ff]/80 text-sm">
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>診断結果に関するご質問</li>
                      <li>サービスの使い方についてのお問い合わせ</li>
                      <li>技術的な問題のご報告</li>
                      <li>新機能のご提案</li>
                      <li>プライバシーに関するご質問</li>
                      <li>その他のご意見・ご要望</li>
                    </ul>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={400}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">返信について</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      お問い合わせいただいた内容については、通常3営業日以内にご返信いたします。
                      ただし、内容によってはお時間をいただく場合がございます。
                    </p>
                    <p>
                      また、以下の場合は返信を控えさせていただく場合がございます：
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>営業・勧誘を目的としたお問い合わせ</li>
                      <li>公序良俗に反する内容</li>
                      <li>個人を特定・誹謗中傷する内容</li>
                      <li>その他、不適切と判断される内容</li>
                    </ul>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={500}>
                <section>
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">注意事項</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      お問い合わせの際は、以下の点にご注意ください：
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>お問い合わせ内容は具体的にご記載ください</li>
                      <li>技術的な問題の場合は、使用環境（OS、ブラウザ等）をお知らせください</li>
                      <li>返信先メールアドレスに誤りがないかご確認ください</li>
                      <li>迷惑メールフィルタの設定をご確認ください</li>
                    </ul>
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

export default ContactPage;