'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Results from '@/components/Results';
import { sampleResult } from '../resultsSampleData';

export default function ResultsWFullContainedPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const suspectRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [scrollWidth, setScrollWidth] = useState<number | null>(null);
  const [suspectWidth, setSuspectWidth] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const measure = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(Math.round(rect.width));
        setScrollWidth(Math.round(containerRef.current.scrollWidth));
      }
      const target = suspectRef.current;
      if (target) {
        setSuspectWidth(Math.round(target.getBoundingClientRect().width));
      }
    };

    if (!suspectRef.current && containerRef.current) {
      const headerBlock = containerRef.current.querySelector('.p-8.text-white.flex.justify-center > .w-full');
      if (headerBlock instanceof HTMLElement) {
        suspectRef.current = headerBlock;
      }
    }

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [mounted]);

  return (
    <div className="min-h-dvh bg-[#070b16] pb-24 pt-24 text-white">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-widest text-pink-300/80">variant #3</p>
          <h1 className="text-3xl font-bold md:text-4xl">ヘッダーの `w-full` を制限したテスト</h1>
          <p className="text-sm text-white/70">
            iOS Chrome で横幅が伸びると報告のあったヘッダー直下の `div.w-full` に max-width と安全領域考慮を強制しています。
            背景色で対象要素をハイライトしているので幅の変化を確認してください。
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-pink-200/80">
            <Link href="/test/results-baseline" className="underline underline-offset-4">baselineに戻る</Link>
            <Link href="/test/results-overflow-visible" className="underline underline-offset-4">overflow可視化を見る</Link>
            <Link href="/test/results-width-relaxed" className="underline underline-offset-4">幅緩和版を確認</Link>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            <span>container width: {containerWidth ? `${containerWidth}px` : '計測中...'}</span>
            <span>scroll width: {scrollWidth ? `${scrollWidth}px` : '計測中...'}</span>
            <span>suspect width: {suspectWidth ? `${suspectWidth}px` : '計測中...'}</span>
          </div>
        </header>

        <section
          ref={containerRef}
          className="results-wfull-contained relative overflow-x-auto rounded-3xl border border-amber-400/50 bg-white/5 p-4 shadow-lg backdrop-blur"
        >
          <div className="rounded-2xl bg-amber-500/20 p-2 text-xs text-amber-100">
            ヘッダー直下の `div.w-full` を `max-width: min(100%, calc(100vw - safe-area))` に制限し、
            小画面での `w-full` の伸び具合を確認しています。
          </div>
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
        .results-wfull-contained .p-8.text-white.flex.justify-center > .w-full {
          max-width: min(100%, calc(100vw - (env(safe-area-inset-left, 0px) + env(safe-area-inset-right, 0px))));
          margin-left: auto;
          margin-right: auto;
          background: rgba(251, 191, 36, 0.12);
          border-radius: 1.5rem;
        }
        .results-wfull-contained .p-8.text-white.flex.justify-center > .w-full::after {
          content: 'w-full 対象：max-width 調整適用中';
          display: block;
          text-align: center;
          font-size: 11px;
          color: rgba(255, 209, 128, 0.9);
          margin-top: 4px;
        }
      `}</style>
    </div>
  );
}
