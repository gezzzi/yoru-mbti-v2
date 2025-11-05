'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Results from '@/components/Results';
import { sampleResult } from '../resultsSampleData';

export default function ResultsOverflowVisiblePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [scrollWidth, setScrollWidth] = useState<number | null>(null);
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
          <p className="text-sm uppercase tracking-widest text-pink-300/80">variant #1</p>
          <h1 className="text-3xl font-bold md:text-4xl">overflow-x を可視化したテスト</h1>
          <p className="text-sm text-white/70">
            `Results` 内部の `overflow-x-hidden` を一時的に無効化し、どのコンテンツが横に溢れているかを確認できるようにしています。
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-pink-200/80">
            <Link href="/test/results-baseline" className="underline underline-offset-4">baselineに戻る</Link>
            <Link href="/test/results-width-relaxed" className="underline underline-offset-4">余白緩和版を見る</Link>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-white/50">
            <span>container width: {width ? `${width}px` : '計測中...'}</span>
            <span>scroll width: {scrollWidth ? `${scrollWidth}px` : '計測中...'}</span>
          </div>
        </header>

        <section
          ref={containerRef}
          className="results-overflow-visible relative overflow-x-auto rounded-3xl border border-rose-400/60 bg-white/5 p-4 shadow-lg backdrop-blur"
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
        .results-overflow-visible .overflow-x-hidden {
          overflow-x: visible !important;
        }
        .results-overflow-visible .outline-helper::after {
          content: '';
        }
        .results-overflow-visible :where(img, svg, div, section, ul, li) {
          outline: 1px solid rgba(244, 114, 182, 0.15);
          outline-offset: -0.5px;
        }
        @media (min-width: 640px) {
          .results-overflow-visible :where(img, svg, div, section, ul, li) {
            outline: none;
          }
        }
      `}</style>
    </div>
  );
}
