'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import EnCompatibilityPage from '@/components/en/CompatibilityPage';
import { TestResult } from '@/types/personality';
import Link from 'next/link';

export default function EnCompatibilityPageWrapper() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    // Check if test results exist
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('en_personality_test_result');
      if (!savedResult) {
        setStatus('missing');
        return;
      }

      setStatus('ready');
    }
  }, []);

  const handleStartTest = () => {
    router.push('/en/test');
  };

  const handleShowResults = (myResult: TestResult, partnerResult: TestResult) => {
    // Save compatibility results to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('en_compatibility_my_result', JSON.stringify(myResult));
      localStorage.setItem('en_compatibility_partner_result', JSON.stringify(partnerResult));
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (status === 'missing') {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(236,72,153,0.2)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              No Results Found
            </h2>
            <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
              It looks like you haven&apos;t taken the personality test yet. Take the test first to check your compatibility!
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
    <EnCompatibilityPage
      onStartTest={handleStartTest}
      onShowResults={handleShowResults}
    />
  );
}
