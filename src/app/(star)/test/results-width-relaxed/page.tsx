'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Results from '@/components/Results';
import { sampleResult } from '../resultsSampleData';

export default function ResultsWidthRelaxedPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setWidth(Math.round(rect.width));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [mounted]);

  return (
    <div className="min-h-dvh bg-[#070b16] pb-24 pt-24 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-widest text-pink-300/80">variant #2</p>
          <h1 className="text-3xl font-bold md:text-4xl">コンテンツ幅を緩めたテスト</h1>
          <p className="text-sm text-white/70">
            `max-w-4xl` を `100vw` ベースの計算に置き換え、安全領域を考慮した `padding` に調整しています。これで横スクロールが解消するか確認してください。
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-pink-200/80">
            <Link href="/test/results-baseline" className="underline underline-offset-4">baselineに戻る</Link>
            <Link href="/test/results-overflow-visible" className="underline underline-offset-4">overflow可視化を見る</Link>
          </div>
          <div className="text-xs text-white/50">可視化コンテナ幅: {width ? `${width}px` : '計測中...'}</div>
        </header>

        <section
          ref={containerRef}
          className="results-width-relaxed relative overflow-x-auto rounded-3xl border border-cyan-400/40 bg-white/5 p-4 shadow-lg backdrop-blur"
        >
          {mounted ? (
            <Results result={sampleResult} />
          ) : (
            <div className="grid place-content-center py-32 text-sm text-white/60">
              ロード中...
            </div>
          )}
        </section>
      </main>

      <style jsx global>{`
        .results-width-relaxed .max-w-4xl {
          max-width: min(100%, calc(100vw - (env(safe-area-inset-left, 0px) + env(safe-area-inset-right, 0px))));
        }
        .results-width-relaxed .px-4 {
          padding-left: max(1rem, env(safe-area-inset-left, 0px));
          padding-right: max(1rem, env(safe-area-inset-right, 0px));
        }
      `}</style>
    </div>
  );
}
