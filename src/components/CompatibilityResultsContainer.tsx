'use client';

import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { TestResult } from '@/types/personality';
import CompatibilityResults from '@/components/CompatibilityResults';

export interface SampleCompatibilitySummary {
  score: number;
  description: string;
  tips: string[];
}

export interface SampleAxisInsight {
  label: string;
  verdict: string;
  detail: string;
}

interface CompatibilityResultsContainerProps {
  sampleSummary: SampleCompatibilitySummary;
  sampleAxisInsights: SampleAxisInsight[];
  sampleNightParagraphs: string[];
  sampleMyTypeName: string;
  samplePartnerTypeName: string;
}

const CompatibilityResultsContainer = ({
  sampleSummary,
  sampleAxisInsights,
  sampleNightParagraphs,
  sampleMyTypeName,
  samplePartnerTypeName,
}: CompatibilityResultsContainerProps) => {
  const router = useRouter();
  const [myResult, setMyResult] = useState<TestResult | null>(null);
  const [partnerResult, setPartnerResult] = useState<TestResult | null>(null);

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const savedMyResult = window.localStorage.getItem('compatibility_my_result');
      const savedPartnerResult = window.localStorage.getItem('compatibility_partner_result');

      if (savedMyResult && savedPartnerResult) {
        const parsedMyResult: TestResult = JSON.parse(savedMyResult);
        const parsedPartnerResult: TestResult = JSON.parse(savedPartnerResult);

        setMyResult(parsedMyResult);
        setPartnerResult(parsedPartnerResult);
      }
    } catch (error) {
      console.error('相性診断結果の読み込みに失敗しました:', error);
    }
  }, []);

  const handleBack = () => {
    router.push('/compatibility');
  };

  const handleNewTest = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('compatibility_my_result');
      window.localStorage.removeItem('compatibility_partner_result');
    }
    router.push('/compatibility');
  };

  if (myResult && partnerResult) {
    return (
      <CompatibilityResults
        myResult={myResult}
        partnerResult={partnerResult}
        onBack={handleBack}
        onNewTest={handleNewTest}
      />
    );
  }

  return (
    <div className="space-y-12">
      <article className="mx-auto w-full max-w-5xl px-4 pb-16 pt-28 space-y-12 text-white">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">Sample Report</p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">カップル相性診断サンプルレポート</h1>
          <p className="text-base md:text-lg text-white/75">
            このページでは、夜の性格診断で生成されるカップルレポートのダイジェストを掲載しています。実際の診断ではお二人の回答データに基づき、以下のような詳細なレポートを即時にお届けします。
          </p>
        </header>

        <section className="rounded-3xl border border-white/15 bg-white/10 px-6 py-8 md:px-10 md:py-12 backdrop-blur-xl shadow-xl shadow-purple-900/20">
          <div className="space-y-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="inline-flex items-center rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-200 uppercase tracking-wide">
                Score Overview
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#fdf4ff]">
                {sampleMyTypeName} × {samplePartnerTypeName}
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-[200px,1fr] md:items-center">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-white/40">Compatibility</p>
                <p className="mt-2 text-5xl font-bold text-pink-200">
                  {sampleSummary.score}
                  <span className="text-2xl">%</span>
                </p>
                <p className="mt-2 text-xs text-white/60">全体バランス評価</p>
              </div>
              <p className="text-base leading-relaxed text-white/80">{sampleSummary.description}</p>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">改善アドバイス（サンプル）</h3>
              <ul className="space-y-2 text-sm md:text-base text-white/80">
                {sampleSummary.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-pink-300" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-8 md:px-10 md:py-12 backdrop-blur-lg md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">軸ごとの相性ハイライト</h2>
            <p className="text-sm md:text-base text-white/70">
              診断では5つの心理軸をスコア化し、似ている点と補い合える点を判定します。以下はサンプルのハイライトです。
            </p>
          </div>
          <ul className="space-y-5">
            {sampleAxisInsights.map((insight) => (
              <li key={insight.label} className="rounded-2xl border border-white/5 bg-black/30 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-white/35">{insight.label}</p>
                <p className="mt-2 text-base font-semibold text-white">{insight.verdict}</p>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{insight.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {sampleNightParagraphs.length > 0 && (
          <section className="rounded-3xl border border-pink-500/30 bg-pink-500/10 px-6 py-8 md:px-10 md:py-12 backdrop-blur-lg space-y-4">
            <h2 className="text-xl font-semibold text-pink-50">夜の相性インサイト（サンプル）</h2>
            {sampleNightParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm md:text-base text-pink-100/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        )}

        <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#1f1436] via-[#180d2e] to-[#110722] px-6 py-10 md:px-10 md:py-14 space-y-6">
          <h2 className="text-xl font-semibold text-white">診断の受け方</h2>
          <p className="text-sm md:text-base text-white/75">
            ご自身のレポートを確認するには、まず性格診断テストを完了し、結果ページで表示されるQRコードをお相手と交換してください。その後、相性診断ページでコードを読み込むとリアルタイムでカップルレポートが生成されます。
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/test"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 transition-transform hover:scale-105"
            >
              性格診断を受ける
            </Link>
            <Link
              href="/compatibility"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/85 transition-transform hover:scale-105 hover:border-white/60"
            >
              相性診断の手順を見る
            </Link>
          </div>
        </section>
      </article>

      <section className="mx-auto w-full max-w-5xl px-4 pb-24">
        <div className="w-full rounded-3xl border border-white/10 bg-black/30 px-6 py-12 md:px-10 md:py-14 backdrop-blur-lg text-white/85 space-y-6">
          <header className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Guide</p>
            <h2 className="text-2xl md:text-3xl font-semibold">実際のカップルレポートを表示する手順</h2>
            <p className="text-base md:text-lg text-white/70">
              上のレポートはサンプルです。ご自身の結果を表示するには、性格診断とQRコードによる相性診断の2ステップが必要です。
            </p>
          </header>
          <ol className="list-decimal list-inside space-y-3 text-sm md:text-base text-white/80">
            <li>
              まず{' '}
              <Link className="text-pink-300 underline decoration-pink-300" href="/test">
                性格診断
              </Link>
              {' '}を受けて、ご自身のタイプと診断コードを取得します。
            </li>
            <li>パートナーにも同じ診断を受けてもらい、相性診断ページでQRコードを読み取ってください。</li>
            <li>診断が完了すると、このページでお互いの結果に基づく詳細レポートが自動表示されます。</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default CompatibilityResultsContainer;
