'use client';

import React from 'react';
import Footer from './Footer';

interface HeroProps {
  onStartTest: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartTest }) => {
  return (
    <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-blue-600 min-h-screen pt-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-white/15 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-white/25 rounded-full"></div>
        <div className="absolute bottom-60 right-40 w-5 h-5 bg-white/20 rounded-full"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Main content */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            「やっと自分のことを理解してもらえました」
          </h1>
          
          <p className="text-xl text-white/90 mb-4 leading-relaxed max-w-3xl mx-auto">
            たった10分で、自分がどんな人間か、自らの願望や行動の理由について
          </p>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            で、不思議なくらい正確な説明を手に入れられます。
          </p>
          
          <button
            onClick={onStartTest}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            テストを受ける
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Illustration area - simplified geometric shapes */}
        <div className="relative h-64 mb-16">
          {/* Mountains background */}
          <div className="absolute bottom-0 left-0 right-0 h-32">
            <svg viewBox="0 0 800 200" className="w-full h-full">
              <polygon points="0,200 150,50 300,120 450,30 600,90 800,60 800,200" fill="rgba(255,255,255,0.1)" />
              <polygon points="0,200 100,80 250,140 400,60 550,110 700,80 800,100 800,200" fill="rgba(255,255,255,0.05)" />
            </svg>
          </div>
          
          {/* Trees */}
          <div className="absolute bottom-16 left-1/4 w-4 h-8 bg-green-400/60 transform rotate-12"></div>
          <div className="absolute bottom-16 left-1/3 w-4 h-10 bg-green-500/60"></div>
          <div className="absolute bottom-16 right-1/3 w-4 h-8 bg-green-400/60 transform -rotate-12"></div>
          <div className="absolute bottom-16 right-1/4 w-4 h-9 bg-green-500/60"></div>
          
          {/* Character representations - simple geometric figures */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-8">
              {/* Character 1 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-orange-300 rounded-full mb-1"></div>
                <div className="w-6 h-12 bg-green-400 rounded-sm"></div>
                <div className="w-2 h-4 bg-brown-400 mt-1"></div>
              </div>
              
              {/* Character 2 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-pink-300 rounded-full mb-1"></div>
                <div className="w-6 h-12 bg-purple-400 rounded-sm"></div>
                <div className="w-2 h-4 bg-brown-400 mt-1"></div>
              </div>
              
              {/* Character 3 */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-yellow-300 rounded-full mb-1"></div>
                <div className="w-6 h-12 bg-blue-400 rounded-sm"></div>
                <div className="w-2 h-4 bg-brown-400 mt-1"></div>
              </div>
            </div>
          </div>
          
          {/* Scattered objects */}
          <div className="absolute bottom-12 left-1/4 w-3 h-3 bg-gray-400/60 rounded-sm transform rotate-45"></div>
          <div className="absolute bottom-14 right-1/4 w-4 h-2 bg-yellow-400/60 rounded-sm"></div>
          <div className="absolute bottom-10 left-2/3 w-2 h-2 bg-red-400/60 rounded-full"></div>
        </div>
      </div>
      
      {/* Footer section */}
      <Footer />
    </div>
  );
};

export default Hero; 