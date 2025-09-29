'use client';

import React from 'react';
import { ScrollAnimation } from './ScrollAnimation';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 w-full space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  プライバシーポリシー
                </h1>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  お客様の個人情報の取り扱いについて、以下のとおり定めます。
                </p>
              </div>

              <ScrollAnimation animation="fadeInUp" delay={200}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">1. 個人情報の取り扱いについて</h2>
                  <p className="text-[#e0e7ff]/80 mb-2 text-sm">
                    当サイトでは、以下の場合に個人情報を収集・利用することがあります。
                  </p>
                  <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                    <li>お問い合わせフォームからのご連絡時</li>
                    <li>サービスの利用状況の分析・改善のため</li>
                  </ul>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">2. 収集する情報</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#e0e7ff] mb-2">2.1 ユーザーが入力する情報</h3>
                      <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                        <li>診断で入力されるユーザー名（ローカルストレージに保存）</li>
                        <li>診断の回答内容（ローカルストレージに保存）</li>
                        <li>フィードバック内容（メールアドレスは収集しません）</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#e0e7ff] mb-2">2.2 自動的に収集される情報</h3>
                      <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                        <li>アクセスログ（IPアドレス、ブラウザ情報など）</li>
                        <li>Cookie情報</li>
                        <li>Google Analyticsによる利用状況データ</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={400}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">3. Google Analyticsの利用について</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。
                      このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。
                    </p>
                    <p>
                      このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                      この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                    </p>
                    <p>
                      この規約に関して、詳しくは
                      <a href="https://marketingplatform.google.com/about/analytics/terms/jp/"
                         className="text-pink-300 hover:text-pink-200 underline mx-1"
                         target="_blank"
                         rel="noopener noreferrer">
                        Google Analyticsサービス利用規約
                      </a>
                      をご覧ください。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={500}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">4. 広告について</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      当サイトでは、第三者配信の広告サービス（A8.net）を利用しています。
                    </p>
                    <p>
                      広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookie（クッキー）を使用することがあります。
                      Cookieを無効にする方法やA8.netのプライバシーポリシーについては、
                      <a href="https://www.a8.net/privacy.html"
                         className="text-pink-300 hover:text-pink-200 underline mx-1"
                         target="_blank"
                         rel="noopener noreferrer">
                        A8.netのプライバシーポリシー
                      </a>
                      をご覧ください。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={600}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">5. Cookieの利用について</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      当サイトでは、一部のコンテンツにおいてCookieを利用しています。
                      Cookieとは、ウェブサイトがユーザーのコンピューターのブラウザに送信する小さなデータファイルです。
                    </p>
                    <p>
                      ユーザーは、ブラウザの設定によりCookieの受け入れを拒否することができます。
                      ただし、Cookieを無効にすることで、当サイトの一部の機能が利用できなくなる場合があります。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={700}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">6. ローカルストレージの利用について</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      当サイトでは、診断結果や回答履歴を保存するためにブラウザのローカルストレージを使用しています。
                      これらのデータはユーザーのブラウザにのみ保存され、当サイトのサーバーには送信されません。
                    </p>
                    <p>
                      ローカルストレージのデータは、ブラウザの設定から削除することができます。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={800}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">7. 個人情報の第三者への開示</h2>
                  <p className="text-[#e0e7ff]/80 mb-2 text-sm">
                    当サイトでは、個人情報を適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
                  </p>
                  <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                    <li>本人の同意がある場合</li>
                    <li>法令に基づく場合</li>
                    <li>人の生命、身体または財産の保護のために必要がある場合</li>
                    <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                    <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
                  </ul>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={900}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">8. プライバシーポリシーの変更</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直し、その改善に努めます。
                    </p>
                    <p>
                      修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={1000}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">9. 免責事項</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
                    </p>
                    <p>
                      当サイトのコンテンツ・情報については、可能な限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。
                      情報が古くなっていることもあります。当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeIn" delay={1100}>
                <section className="pt-4">
                  <p className="text-sm text-[#e0e7ff]/60">制定日: 2025年9月</p>
                  <p className="text-sm text-[#e0e7ff]/60">最終更新日: 2025年9月</p>
                </section>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;