'use client';

import React, { useState } from 'react';
import Footer from './Footer';

const HelpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで実際の送信処理を実装
    alert('お問い合わせありがとうございます。確認次第ご連絡いたします。');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="pt-28 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ヘルプ・サポート
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ご質問やお困りのことがございましたら、お気軽にお問い合わせください。
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            
            {/* お問い合わせフォーム */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                お問い合わせ
              </h2>
              <p className="text-gray-600 mb-8">
                ご質問、ご意見、不具合の報告など、お気軽にお問い合わせください。
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    お名前 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    お問い合わせ種別 *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">選択してください</option>
                    <option value="general">一般的な質問</option>
                    <option value="bug">不具合の報告</option>
                    <option value="feature">機能のご要望</option>
                    <option value="account">アカウントについて</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    お問い合わせ内容 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    placeholder="お問い合わせ内容をできるだけ詳しくお書きください..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-4 rounded-lg hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  送信する
                </button>
              </form>
            </div>

            {/* よくある質問 */}
            <div id="faq" className="bg-white rounded-3xl p-8 shadow-lg scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                よくある質問
              </h2>
              <p className="text-gray-600 mb-8">
                多くのお客様からお寄せいただくご質問とその回答をまとめました。
              </p>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-150 flex justify-between items-center"
                    >
                      <span>{faq.question}</span>
                                             <svg
                         className={`w-5 h-5 transition-transform duration-200 ${
                           openFaq.includes(index) ? 'transform rotate-180' : ''
                         }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq.includes(index) && (
                      <div className="px-6 pt-4 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 追加情報セクション */}
          <div className="mt-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              まだ解決しませんか？
            </h3>
            <p className="text-lg mb-6">
              上記で解決しない場合は、お気軽にお問い合わせフォームからご連絡ください。
            </p>
            <div className="text-sm opacity-90">
              <p>平日営業日：24時間以内に回答</p>
              <p>土日祝日：48時間以内に回答</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HelpPage; 