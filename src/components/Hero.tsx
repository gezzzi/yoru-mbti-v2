'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-blue-600 min-h-[30vh] pt-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/25 rounded-full"></div>
        <div className="absolute bottom-60 right-40 w-5 h-5 bg-white/20 rounded-full"></div>
      </div>
      
      {/* テキスト部分 */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-8 md:pt-12 text-center">
        <h1 className="mt-8 md:mt-12 text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
          「やっと自分の&ldquo;性&rdquo;のカタチがわかりました」
        </h1>
        <p className="text-base md:text-xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto drop-shadow">
          たった10分で、自分がどんな性癖を持っていて、なぜそのプレイや関係性に惹かれるのか、不思議なくらいしっくりくる説明が手に入ります。
        </p>
        <Link
          href="/test"
          className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-base md:text-lg"
        >
          テストを受ける
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      {/* 画像部分 */}
      <Image
        src="/images/page/landing-page.svg"
        alt="ランディングページイラスト"
        width={1920}
        height={600}
        className="w-full object-cover select-none pointer-events-none"
        sizes="100vw"
      />
    </div>
  );
};

export default Hero; 