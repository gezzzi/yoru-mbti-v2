'use client';

import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
      <div className="h-28"></div>
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center px-4 py-16 rounded-3xl">
      <div className="w-full text-center">
        {/* メインコンテンツ */}
        {/* アイコン */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* タイトル */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          準備中
        </h1>

        {/* 説明文 */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          申し訳ございません。<br />
          この機能は現在準備中です。<br />
          今しばらくお待ちください。
        </p>

        {/* アクションボタン */}
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            トップページに戻る
          </Link>
          
          <Link
            href="/test"
            className="block w-full bg-white text-purple-600 py-3 px-6 rounded-lg font-semibold border border-purple-600 hover:bg-purple-50 transition-colors"
          >
            診断テストを受ける
          </Link>
        </div>

        {/* フッター情報 */}
        <div className="mt-8 text-sm text-gray-500">
          ご不明な点がございましたら、<br />
          お気軽にお問い合わせください。
        </div>
      </div>
    </div>
    </div>
  );
} 