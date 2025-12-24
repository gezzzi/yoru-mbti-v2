'use client';

import React, { useState } from 'react';
import { ScrollAnimation } from './ScrollAnimation';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`【夜の性格診断】${formData.category || 'お問い合わせ'}`);
    const body = encodeURIComponent(
      `お名前: ${formData.name}\n` +
      `メールアドレス: ${formData.email}\n` +
      `カテゴリ: ${formData.category}\n\n` +
      `お問い合わせ内容:\n${formData.message}`
    );
    
    window.location.href = `mailto:info@nightpersonality.com?subject=${subject}&body=${body}`;
  };

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
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">お問い合わせフォーム</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        お名前 <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] placeholder-[#e0e7ff]/40 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
                        placeholder="山田 太郎"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        メールアドレス <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] placeholder-[#e0e7ff]/40 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        お問い合わせカテゴリ <span className="text-pink-400">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
                      >
                        <option value="" className="bg-[#1a1a2e]">選択してください</option>
                        <option value="診断結果について" className="bg-[#1a1a2e]">診断結果について</option>
                        <option value="サービスの使い方" className="bg-[#1a1a2e]">サービスの使い方</option>
                        <option value="技術的な問題" className="bg-[#1a1a2e]">技術的な問題</option>
                        <option value="新機能のご提案" className="bg-[#1a1a2e]">新機能のご提案</option>
                        <option value="プライバシーについて" className="bg-[#1a1a2e]">プライバシーについて</option>
                        <option value="その他" className="bg-[#1a1a2e]">その他</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        お問い合わせ内容 <span className="text-pink-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] placeholder-[#e0e7ff]/40 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all resize-none"
                        placeholder="お問い合わせ内容をご記入ください"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-pink-500/25 transition-all duration-300 hover:shadow-pink-500/40 hover:scale-[1.02]"
                      >
                        メールアプリで送信
                      </button>
                      <p className="text-xs text-[#e0e7ff]/60 mt-2 text-center">
                        ※ 送信ボタンを押すと、お使いのメールアプリが起動します
                      </p>
                    </div>
                  </form>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">直接メールを送る</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      フォームを使わず直接メールを送信する場合は、下記のメールアドレスまでお送りください。
                    </p>
                    <div className="bg-white/5 rounded-lg p-4 mt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <span className="font-medium sm:w-32">メールアドレス：</span>
                        <a href="mailto:info@nightpersonality.com"
                           className="text-pink-300 hover:text-pink-200 underline break-all">
                          info@nightpersonality.com
                        </a>
                      </div>
                    </div>
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
