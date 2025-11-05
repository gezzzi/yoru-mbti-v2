'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Results from '@/components/Results';
import { sampleResult } from '../resultsSampleData';

type Metric = {
  label: string;
  value: string;
  hint?: string;
};

type StripeDescriptor = {
  id: string;
  label: string;
  description: string;
  className?: string;
  style?: CSSProperties;
};

export default function ResultsViewportTestPage() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [stripeWidths, setStripeWidths] = useState<Record<string, number>>({});
  const [showOutlines, setShowOutlines] = useState(true);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stripeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const stripes = useMemo<StripeDescriptor[]>(
    () => [
      {
        id: 'full-width-wrapper',
        label: 'Wrapper (max-w-5xl + px-4)',
        description: 'Resultsページと同じ余白設定。',
        className: 'relative mx-auto w-full max-w-5xl rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-emerald-200',
      },
      {
        id: 'w-screen',
        label: 'Tailwind w-screen (100vw)',
        description: 'iOS Chromeではスクロールバー幅を含むためズレる可能性。',
        className: 'w-screen rounded-xl border border-pink-400/50 bg-pink-500/15 p-4 text-pink-200',
      },
      {
        id: 'inline-100vw',
        label: 'style={{ width: "100vw" }}',
        description: 'インラインstyleの100vw挙動確認用。',
        className: 'rounded-xl border border-blue-400/50 bg-blue-500/15 p-4 text-blue-200',
        style: { width: '100vw' },
      },
      {
        id: 'w-full',
        label: 'Tailwind w-full',
        description: '親要素幅に従うため安全なはず。',
        className: 'w-full rounded-xl border border-cyan-400/50 bg-cyan-500/15 p-4 text-cyan-200',
      },
    ],
    [],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const measure = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const doc = document.documentElement;
      const body = document.body;
      const visualViewport = window.visualViewport;

      const nextMetrics: Metric[] = [
        { label: 'window.innerWidth', value: `${Math.round(window.innerWidth)}px`, hint: 'レイアウト計算に使われるビューポート幅' },
        { label: 'window.outerWidth', value: `${Math.round(window.outerWidth)}px`, hint: 'ブラウザUI込みの幅' },
        { label: 'document.documentElement.clientWidth', value: `${Math.round(doc?.clientWidth ?? 0)}px`, hint: 'スクロールバー除外後の幅' },
        { label: 'document.body.clientWidth', value: `${Math.round(body?.clientWidth ?? 0)}px`, hint: 'bodyの描画幅' },
        { label: 'screen.width', value: `${Math.round(window.screen.width)}px` },
        { label: 'devicePixelRatio', value: window.devicePixelRatio.toFixed(2) },
      ];

      if (visualViewport) {
        nextMetrics.push(
          { label: 'visualViewport.width', value: `${Math.round(visualViewport.width)}px`, hint: 'ピンチズーム等を反映した論理幅' },
          { label: 'visualViewport.scale', value: visualViewport.scale.toFixed(3) },
        );
      }

      if (containerRef.current) {
        nextMetrics.push({
          label: 'Resultsコンテナ幅',
          value: `${Math.round(containerRef.current.getBoundingClientRect().width)}px`,
        });
      }

      const nextStripeWidths: Record<string, number> = {};
      Object.entries(stripeRefs.current).forEach(([id, element]) => {
        if (element) {
          nextStripeWidths[id] = Math.round(element.getBoundingClientRect().width);
        }
      });

      setMetrics(nextMetrics);
      setStripeWidths(nextStripeWidths);
    };

    measure();

    const handleResize = () => {
      measure();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener('resize', handleResize);
      visualViewport.addEventListener('scroll', handleResize);
    }

    let resizeObserver: ResizeObserver | undefined;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        measure();
      });
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      Object.values(stripeRefs.current).forEach((element) => {
        if (element) {
          resizeObserver?.observe(element);
        }
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);

      if (visualViewport) {
        visualViewport.removeEventListener('resize', handleResize);
        visualViewport.removeEventListener('scroll', handleResize);
      }

      resizeObserver?.disconnect();
    };
  }, []);

  const assignStripeRef = (id: string) => (element: HTMLDivElement | null) => {
    stripeRefs.current[id] = element;
  };

  return (
    <div className="min-h-screen bg-[#0b0f1c] pb-24 pt-28 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <header className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <p className="text-sm uppercase tracking-widest text-pink-300/80">debug toolkit</p>
          <h1 className="text-3xl font-bold md:text-4xl">iPhone Chrome 幅ずれ調査用テストページ</h1>
          <p className="text-sm text-white/70">
            iPhone版Chromeで結果ページが横スクロールしてしまう問題を切り分けるためのサンドボックスです。
            ビューポートの数値や、幅指定の違いによる挙動をまとめています。
          </p>
          <button
            type="button"
            onClick={() => setShowOutlines((prev) => !prev)}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-pink-400/60 bg-pink-500/20 px-4 py-2 text-sm font-semibold text-pink-100 transition hover:bg-pink-500/30"
          >
            {showOutlines ? 'ハイライトを隠す' : 'ハイライトを表示'}
          </button>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-pink-100">現在のビューポート指標</h2>
          <p className="mb-4 mt-2 text-sm text-white/70">
            値の差分を確認し、どの幅が100vw計算に使われているか推測してください。
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-pink-300/30 bg-pink-500/10 p-4"
              >
                <p className="text-xs uppercase tracking-widest text-pink-200/70">{metric.label}</p>
                <p className="text-lg font-semibold text-pink-100">{metric.value}</p>
                {metric.hint ? (
                  <p className="text-xs text-white/60">{metric.hint}</p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-blue-100">幅指定の比較</h2>
          <p className="mb-4 mt-2 text-sm text-white/70">
            各行は同じ親コンテナ内で異なる幅指定を試しています。数値が横スクロールする場合はiPhone Chrome固有の癖が原因です。
          </p>
          <div className="space-y-4 overflow-x-auto">
            {stripes.map((stripe) => (
              <div key={stripe.id} className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white/80">{stripe.label}</h3>
                  <span className="text-xs text-white/60">{stripeWidths[stripe.id] ? `${stripeWidths[stripe.id]}px` : '計測中...'}</span>
                </div>
                <div
                  ref={assignStripeRef(stripe.id)}
                  className={stripe.className}
                  style={stripe.style}
                >
                  <p className="text-xs text-white/70">{stripe.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-emerald-100">Resultsコンポーネント プレビュー</h2>
          <p className="mb-6 mt-2 text-sm text-white/70">
            実際のResultsコンポーネントをテストデータで描画しています。横スクロールが発生する場合はコンテナ幅と比較しながら原因を特定してください。
          </p>
          <div
            ref={containerRef}
            className={[
              'relative overflow-x-auto rounded-3xl bg-[#05070f]/70 p-2 sm:p-4 shadow-lg',
              showOutlines ? 'outline outline-2 outline-pink-400/60' : '',
            ].join(' ').trim()}
          >
            <div className={showOutlines ? 'relative outline outline-1 outline-dashed outline-emerald-300/60' : ''}>
              {mounted ? (
                <Results result={sampleResult} />
              ) : (
                <div className="grid place-content-center py-32 text-sm text-white/60">
                  ロード中...
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
