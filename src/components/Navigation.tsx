'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

interface NavigationProps {
  currentPage: 'home' | 'types' | 'quiz' | 'results' | 'compatibility' | 'compatibility-results' | 'privacy' | 'blog';
  hasTestResult?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, hasTestResult }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-600 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* アプリ名 - 完全に左端に配置 */}
        <div className="absolute left-4 top-0 h-16 flex items-center z-10">
          <Link 
            href="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 relative">
              <Image 
                src="/favicon.svg" 
                alt="夜の性格診断8" 
                width={32} 
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className={`text-xl font-bold transition-colors ${currentPage === 'home' ? 'text-teal-300' : 'text-white'}`}>夜の性格診断8</span>
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 relative">
          
          {/* デスクトップメニュー - 中央配置 */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/results"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'results' 
                  ? 'text-teal-300' 
                  : 'text-white'
              }`}
            >
              あなたの結果
            </Link>
            <Link 
              href="/test"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'quiz' 
                  ? 'text-teal-300' 
                  : 'text-white'
              }`}
            >
              性格診断テスト
            </Link>
            <Link 
              href="/types"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'types' 
                  ? 'text-teal-300' 
                  : 'text-white'
              }`}
            >
              性格タイプ
            </Link>
            <Link 
              href="/compatibility"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'compatibility' || currentPage === 'compatibility-results'
                  ? 'text-teal-300' 
                  : 'text-white'
              }`}
            >
              相性診断
            </Link>
            <Link 
              href="/blog"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'blog' 
                  ? 'text-teal-300' 
                  : 'text-white'
              }`}
            >
              夜ブログ
            </Link>
          </div>

          {/* ハンバーガーメニューボタン - 右端固定 */}
          <div className="absolute right-0 lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          </div>
        </div>
        
        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-600">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link 
                href="/results"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'results' 
                    ? 'text-teal-300' 
                    : 'text-white'
                }`}
              >
                あなたの結果
              </Link>
              <Link 
                href="/test"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'quiz' 
                    ? 'text-teal-300' 
                    : 'text-white'
                }`}
              >
                性格診断テスト
              </Link>
              <Link 
                href="/types"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'types' 
                    ? 'text-teal-300' 
                    : 'text-white'
                }`}
              >
                性格タイプ
              </Link>
              <Link 
                href="/compatibility"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'compatibility' || currentPage === 'compatibility-results'
                    ? 'text-teal-300' 
                    : 'text-white'
                }`}
              >
                相性診断
              </Link>
              <Link 
                href="/blog"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'blog' 
                    ? 'text-teal-300' 
                    : 'text-white'
                }`}
              >
                夜ブログ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 