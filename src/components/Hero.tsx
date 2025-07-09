'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  useEffect(() => {
    // 動的ビューポートの高さを計算してCSS変数に設定
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 初期設定
    setViewportHeight();

    // リサイズ時とオリエンテーション変更時に再計算
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center justify-center w-full p-0 m-0 min-h-dvh overflow-hidden">
      {/* テキスト部分 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center flex-1">
        {/* ここは既存のまま */}
        <h1 className="mt-8 md:mt-12 text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg flex justify-center gap-1 select-none">
          <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>夜</span>
          <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>の</span>
          <span className="neon-pink" style={{color:'#f472b6',textShadow:'0 0 10px #f472b6,0 0 20px #ec4899,0 0 30px #be185d',animation:'pulsePink 2s ease-in-out infinite'}}>性</span>
          <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>格</span>
          <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>診</span>
          <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>断</span>
        </h1>
        <p className="text-base md:text-xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto drop-shadow">
          たった10分で、自分がどんな性癖を持っていて、なぜそのプレイや関係性に惹かれるのか、不思議なくらいしっくりくる説明が手に入ります。
        </p>
        <Link
          href="/test"
          className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white font-semibold rounded-full hover:from-[#818cf8] hover:to-[#a78bfa] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg"
        >
          テストを受ける
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      {/* 画像部分 */}
      <div className="w-full flex-shrink-0 max-w-6xl mx-auto">
        <Image
          src="/images/page/landing-page.svg"
          alt="ランディングページイラスト"
          width={1152}
          height={360}
          className="w-full h-auto max-h-96 object-contain select-none pointer-events-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1152px"
          priority
        />
      </div>
    </main>
  );
};

export default Hero; 