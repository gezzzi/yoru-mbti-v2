'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { TestResult } from '@/types/personality';
import DetailedResults from '@/components/DetailedResults';

function DetailedResultsContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<TestResult | null>(null);
  
  useEffect(() => {
    const resultParam = searchParams.get('result');
    if (resultParam) {
      try {
        const decodedResult = JSON.parse(decodeURIComponent(resultParam));
        setResult(decodedResult);
      } catch (error) {
        console.error('Failed to parse result:', error);
        // Fallback: try to get from localStorage
        const savedResult = localStorage.getItem('personality_test_result');
        if (savedResult) {
          setResult(JSON.parse(savedResult));
        }
      }
    } else {
      // Try to get from localStorage
      const savedResult = localStorage.getItem('personality_test_result');
      if (savedResult) {
        setResult(JSON.parse(savedResult));
      }
    }
  }, [searchParams]);

  if (!result) {
    return (
      <div className="min-h-screen pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#e0e7ff]">結果が見つかりません。</p>
        </div>
      </div>
    );
  }

  return <DetailedResults result={result} />;
}

export default function DetailedResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#e0e7ff]">読み込み中...</p>
        </div>
      </div>
    }>
      <DetailedResultsContent />
    </Suspense>
  );
}