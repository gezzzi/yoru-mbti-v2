'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center pt-16 border-t border-gray-100">
          <div className="text-center">
            <h3 className="font-semibold text-gray-100 mb-4">リソース</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="/test" className="hover:text-teal-300">性格診断テスト</a></li>
              <li><a href="/types" className="hover:text-teal-300">性格タイプ</a></li>
              <li><a href="/compatibility" className="hover:text-teal-300">相性診断</a></li>
              <li><a href="/blog" className="hover:text-teal-300">夜ブログ</a></li>
            </ul>
          </div>
          
          <div className="text-center">
            <h3 className="font-semibold text-gray-100 mb-4">ヘルプ</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="/help" className="hover:text-teal-300">よくある質問</a></li>
              <li><a href="/about" className="hover:text-teal-300">運営者情報</a></li>
              <li><a href="/contact" className="hover:text-teal-300">お問い合わせ</a></li>
              <li><a href="/privacy" className="hover:text-teal-300">プライバシーポリシー</a></li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-semibold text-gray-100 mb-4">開発用</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><a href="/test-solo" className="hover:text-teal-300">個人テスト (dev)</a></li>
              <li><a href="/test-match" className="hover:text-teal-300">相性テスト (dev)</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 夜の性格診断 - すべての権利を保有
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer; 
