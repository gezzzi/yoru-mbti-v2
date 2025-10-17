'use client';

import Link from "next/link";

export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <h1 className="text-6xl font-bold mb-4">500</h1>
      <h2 className="text-2xl mb-6">サーバーエラーが発生しました</h2>
      <p className="mb-8">申し訳ありません。問題が発生しました。時間をおいて再度お試しください。</p>
      <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">トップページへ戻る</Link>
    </div>
  );
}
