'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';

const Hero: React.FC = () => {
  useEffect(() => {
    // ページ読み込み時に一度だけビューポートタイプを決定
    const determineViewportType = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      
      // モバイルでスタンドアロンモード（PWA）の場合はsvhを使用
      // それ以外の場合はlvhを使用
      const viewportType = isMobile && !isStandalone ? 'svh' : 'lvh';
      
      document.documentElement.style.setProperty('--viewport-type', viewportType);
      document.documentElement.classList.add(`viewport-${viewportType}`);
    };

    // 初期設定（一度だけ実行）
    determineViewportType();
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center w-full p-0 m-0 min-h-dvh overflow-hidden">
      {/* テキスト部分 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center flex-1">
        {/* ここは既存のまま */}
        <ScrollAnimation animation="fadeIn" duration={800}>
          <h1 className="mt-8 md:mt-12 text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg select-none text-center">
            <NeonText text={["夜の", "性格診断"]} specialCharIndex={2} className="gap-1" />
          </h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <p className="text-base md:text-xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto drop-shadow">
            たった10分で、自分がどんな性癖を持っていて、なぜそのプレイや関係性に惹かれるのか、不思議なくらいしっくりくる説明が手に入ります。
          </p>
        </ScrollAnimation>
        <ScrollAnimation animation="fadeInUp" delay={400}>
          <Link
            href="/test"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white font-semibold rounded-full hover:from-[#818cf8] hover:to-[#a78bfa] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg"
          >
            テストを受ける
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollAnimation>
      </div>
      {/* 画像部分 */}
      <ScrollAnimation animation="fadeInUp" delay={600} className="w-full flex-shrink-0 max-w-6xl mx-auto">
        <Image
          src="/images/page/landing-page.svg"
          alt="ランディングページイラスト"
          width={1152}
          height={360}
          className="w-full h-auto max-h-96 object-contain select-none pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1152px"
          priority
        />
      </ScrollAnimation>
    </main>
  );
};

export default Hero; 