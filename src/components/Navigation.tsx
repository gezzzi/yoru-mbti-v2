'use client';

import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'types' | 'quiz' | 'results' | 'compatibility' | 'compatibility-results';
  hasTestResult?: boolean;
  onShowTypes?: () => void;
  onBackToHome?: () => void;
  onShowCompatibility?: () => void;
  onStartTest?: () => void;
  onShowResults?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, hasTestResult, onShowTypes, onBackToHome, onShowCompatibility, onStartTest, onShowResults }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 relative">
          {/* アプリ名 - 左端固定 */}
          <div className="absolute left-0 flex items-center space-x-2">
            <button 
              onClick={onBackToHome}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">夜の性格診断</span>
            </button>
          </div>
          
          {/* デスクトップメニュー - 中央配置 */}
          <div className="hidden tablet:flex items-center space-x-8">
            {hasTestResult && (
              <button 
                onClick={onShowResults}
                className={`text-sm font-medium transition-colors ${
                  currentPage === 'results' 
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                あなたの結果
              </button>
            )}
            <button 
              onClick={onStartTest}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'quiz' 
                  ? 'text-teal-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              性格診断テスト
            </button>
            <button 
              onClick={onShowTypes}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'types' 
                  ? 'text-teal-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              性格タイプ
            </button>
            <button 
              onClick={onShowCompatibility}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'compatibility' || currentPage === 'compatibility-results'
                  ? 'text-teal-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              相性診断
            </button>
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
        
        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="tablet:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {hasTestResult && (
                <button 
                  onClick={() => {
                    onShowResults?.();
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                    currentPage === 'results' 
                      ? 'text-teal-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  あなたの結果
                </button>
              )}
              <button 
                onClick={() => {
                  onStartTest?.();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'quiz' 
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                性格診断テスト
              </button>
              <button 
                onClick={() => {
                  onShowTypes?.();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'types' 
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                性格タイプ
              </button>
              <button 
                onClick={() => {
                  onShowCompatibility?.();
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'compatibility' || currentPage === 'compatibility-results'
                    ? 'text-teal-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                相性診断
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 