import React from 'react';
import { Heart } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'types' | 'quiz' | 'results';
  onShowTypes?: () => void;
  onBackToHome?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onShowTypes, onBackToHome }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
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
          
          <div className="flex items-center space-x-8">
            <button 
              onClick={onBackToHome}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' 
                  ? 'text-teal-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              あなたの結果
            </button>
            <button className={`text-sm font-medium transition-colors ${
              currentPage === 'quiz' 
                ? 'text-teal-600' 
                : 'text-gray-600 hover:text-gray-900'
            }`}>
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
            <div className="flex items-center space-x-4">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                ログイン
              </button>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">日本語</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;