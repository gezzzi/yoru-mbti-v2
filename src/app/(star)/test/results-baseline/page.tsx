'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Results from '@/components/Results';
import { sampleResult } from '../resultsSampleData';

export default function ResultsBaselinePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-dvh bg-[#070b16] pb-24 pt-24 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-widest text-pink-300/80">baseline</p>
          <h1 className="text-3xl font-bold md:text-4xl">/results レイアウト比較用ページ</h1>
          <p className="text-sm text-white/70">
            本番の `/results` と同じ `Results` コンポーネントをサンプルデータで描画しています。ローカルストレージを経由しないので、iOS Chrome でもすぐに確認できます。
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-pink-200/80">
            <Link href="/results" className="underline underline-offset-4">/results を開く</Link>
            <Link href="/test/results-overflow-visible" className="underline underline-offset-4">
              overflow 可視化版へ
            </Link>
            <Link href="/test/results-width-relaxed" className="underline underline-offset-4">
              余白緩和版へ
            </Link>
          </div>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur">
          {mounted ? (
            <Results result={sampleResult} />
          ) : (
            <div className="grid place-content-center py-32 text-sm text-white/60">
              ロード中...
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
