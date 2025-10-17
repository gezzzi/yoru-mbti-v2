import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-6">ページが見つかりません</h2>
      <p className="mb-8">お探しのページは存在しないか、移動された可能性があります。</p>
      <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">トップページへ戻る</Link>
    </div>
  );
}
