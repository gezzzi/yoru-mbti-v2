'use client';

import React, { useState } from 'react';
import { ScrollAnimation } from './ScrollAnimation';

const HelpPage: React.FC = () => {
  const faqData = [
    {
      question: '性格診断の結果はどのくらい正確ですか？',
      answer: '本診断は心理学的な研究に基づいており、統計的に高い精度を持っています。ただし、診断結果は参考情報として活用し、自己理解の一助としてお使いください。'
    },
    {
      question: '診断にかかる時間はどのくらいですか？',
      answer: '通常10-15分程度で完了します。じっくりと各質問に向き合って回答していただくことで、より正確な結果が得られます。'
    },
    {
      question: '診断結果は保存されますか？',
      answer: '診断結果はお使いのブラウザにローカルで保存されます。他の人に共有されることはありませんが、ブラウザのデータを削除すると結果も消去されます。'
    },
    {
      question: '相性診断の仕組みを教えてください',
      answer: '性格タイプの特徴や価値観の違いを分析し、関係性の傾向を示します。相性が低くても関係性の改善は可能ですので、参考程度にお考えください。'
    },
    {
      question: '診断結果に納得がいかない場合はどうすればよいですか？',
      answer: '診断は一つの視点に過ぎません。時間を置いて再度診断を受けてみるか、信頼できる人からの意見も参考にしてみてください。'
    },
    {
      question: 'このサービスは無料で使い続けられますか？',
      answer: 'はい、基本的な性格診断と相性診断は無料でご利用いただけます。今後追加される機能の一部で有料プランを提供する可能性がありますが、基本機能は無料のままです。'
    },
    {
      question: '企業での利用は可能ですか？',
      answer: '個人利用を想定していますが、チームビルディングなどでの利用については別途お問い合わせください。企業向けのプランを検討中です。'
    },
    {
      question: '診断結果をSNSでシェアしても問題ありませんか？',
      answer: 'はい、診断結果のシェア機能もご用意しています。ただし、個人情報の取り扱いにはご注意ください。'
    }
  ];

  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* よくある質問 */}
            <ScrollAnimation animation="fadeIn" duration={800}>
              <div id="faq" className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 scroll-mt-20 w-full">
                <h2 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  よくある質問
                </h2>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  多くのお客様からお寄せいただくご質問とその回答をまとめました。
                </p>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <ScrollAnimation key={index} animation="fadeInUp" delay={200 + index * 100}>
                    <div className="border-b border-white/20 pb-4">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-4 text-left font-semibold text-[#e0e7ff] hover:text-[#e0e7ff]/90 focus:outline-none transition-colors duration-150 flex justify-between items-center"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
                          openFaq.includes(index) ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`transition-all duration-300 ${
                      openFaq.includes(index) ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="pt-2">
                        <p className="text-[#e0e7ff]/80 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 