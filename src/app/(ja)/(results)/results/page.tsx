'use client';

import { useEffect, useState } from 'react';
import Results from '@/components/Results';
import TestFlowReminder from '@/components/TestFlowReminder';
import { TestResult } from '@/types/personality';

export default function ResultsPage() {
  const [result, setResult] = useState<TestResult | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (!savedResult) {
        setStatus('missing');
        return;
      }

      try {
        const parsedResult: TestResult = JSON.parse(savedResult);
        setResult(parsedResult);
        setStatus('ready');
      } catch (error) {
        console.error('診断結果の読み込みに失敗しました:', error);
        setStatus('missing');
      }
    }
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (status === 'missing' || !result) {
    return (
      <TestFlowReminder
        title="おっと！まだ性格診断を受けていないようです"
        description=""
        highlightStep={1}
      />
    );
  }

  return (
    <Results 
      result={result}
    />
  );
} 
