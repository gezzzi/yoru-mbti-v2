'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[30vh] pt-8 overflow-hidden flex flex-col justify-between flex-grow">
      {/* テキスト部分 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-8 md:pt-12 text-center">
        {/* ここは既存のまま */}
        <h1 className="mt-8 md:mt-12 text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg flex justify-center gap-1 select-none">
          <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>夜</span>
          <span className="neon-gold" style={{color:'#ffd700',textShadow:'0 0 10px #ffd700,0 0 20px #ffed4e,0 0 30px #fff59d',animation:'shimmerGold 3s ease-in-out infinite'}}>の</span>
          <span className="neon-pink" style={{color:'#ff1493',textShadow:'0 0 10px #ff1493,0 0 20px #ff1493,0 0 30px #ff1493,0 0 40px #ff0080',animation:'pulsePink 2s ease-in-out infinite'}}>性</span>
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
      <div className="w-full flex-shrink-0">
        <Image
          src="/images/page/landing-page.svg"
          alt="ランディングページイラスト"
          width={1920}
          height={600}
          className="w-full object-cover select-none pointer-events-none -mb-1"
          sizes="100vw"
        />
      </div>
    </div>
  );
};

export default Hero; 