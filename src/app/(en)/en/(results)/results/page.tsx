'use client';

import { useEffect, useState } from 'react';
import EnResults from '@/components/en/Results';
import Link from 'next/link';
import { TestResult } from '@/types/personality';

export default function EnResultsPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('en_personality_test_result');
      if (!savedResult) {
        setStatus('missing');
        return;
      }

      try {
        const parsedResult: TestResult = JSON.parse(savedResult);
        setResult(parsedResult);
        setStatus('ready');
      } catch (error) {
        console.error('Failed to load test results:', error);
        setStatus('missing');
      }
    }
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (status === 'missing' || !result) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              No Results Found
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
              It looks like you haven&apos;t taken the personality test yet. Take the test first to see your results!
            </p>
            <Link
              href="/en/test"
              className="bg-gradient-to-r from-[#ec4899] to-[#ffb8ce] text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold tracking-wide hover:from-[#ffb8ce] hover:to-[#ffb8ce] transition-all transform hover:scale-110 shadow-[0_10px_30px_rgba(236,72,153,0.45)] inline-flex items-center gap-2"
            >
              <span>Take the Test</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <EnResults
      result={result}
    />
  );
}
