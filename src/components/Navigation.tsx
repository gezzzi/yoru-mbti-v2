'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'types' | 'quiz' | 'results' | 'compatibility' | 'compatibility-results';
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
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* アプリ名 - 完全に左端に配置 */}
        <div className="absolute left-4 top-0 h-16 flex items-center z-10">
          <Link 
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">夜の性格診断</span>
          </Link>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 relative">
          
          {/* デスクトップメニュー - 中央配置 */}
          <div className="hidden tablet:flex items-center space-x-8">
            {hasTestResult && (
              <Link 
                href="/results"
                onClick={closeMenu}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'results' 
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                あなたの結果
              </Link>
            )}
            <Link 
              href="/test"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'quiz' 
                  ? 'text-teal-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              性格診断テスト
            </Link>
            <Link 
              href="/types"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'types' 
                  ? 'text-teal-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              性格タイプ
            </Link>
            <Link 
              href="/compatibility"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'compatibility' || currentPage === 'compatibility-results'
                  ? 'text-teal-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              相性診断
            </Link>
          </div>

          {/* ハンバーガーメニューボタン - 右端固定 */}
          <div className="absolute right-0 tablet:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          </div>
        </div>
        
        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="tablet:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {hasTestResult && (
                <Link 
                  href="/results"
                  onClick={closeMenu}
                  className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                    currentPage === 'results' 
                      ? 'text-teal-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  あなたの結果
                </Link>
              )}
              <Link 
                href="/test"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'quiz' 
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                性格診断テスト
              </Link>
              <Link 
                href="/types"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'types' 
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                性格タイプ
              </Link>
              <Link 
                href="/compatibility"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'compatibility' || currentPage === 'compatibility-results'
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                相性診断
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 