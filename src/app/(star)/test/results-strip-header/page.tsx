'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Results from '@/components/Results';
import { sampleResult } from '../resultsSampleData';

export default function ResultsStripHeaderPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [scrollWidth, setScrollWidth] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setContainerWidth(Math.round(rect.width));
      setScrollWidth(Math.round(containerRef.current.scrollWidth));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [mounted]);

  return (
    <div className="min-h-dvh bg-[#070b16] pb-24 pt-24 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-widest text-pink-300/80">strip test α</p>
          <h1 className="text-3xl font-bold md:text-4xl">ヘッダー(タイプ名・画像周辺)を非表示</h1>
          <p className="text-sm text-white/70">
            `Results` からタイプ名ブロック全体を CSS で非表示にしました。これで横スクロールが消えるか確認してください。
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-pink-200/80">
            <Link href="/test/results-baseline" className="underline underline-offset-4">baseline</Link>
            <Link href="/test/results-strip-image" className="underline underline-offset-4">画像だけ非表示</Link>
            <Link href="/test/results-strip-main" className="underline underline-offset-4">メイン本文だけ非表示</Link>
            <Link href="/test/results-strip-minimal" className="underline underline-offset-4">最小構成</Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            <span>container width: {containerWidth ? `${containerWidth}px` : '計測中...'}</span>
            <span>scroll width: {scrollWidth ? `${scrollWidth}px` : '計測中...'}</span>
          </div>
        </header>

        <section
          ref={containerRef}
          className="results-strip-header relative overflow-x-auto rounded-3xl border border-white/20 bg-white/5 p-4 shadow-lg backdrop-blur"
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
        .results-strip-header .p-8.text-white.flex.justify-center {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
