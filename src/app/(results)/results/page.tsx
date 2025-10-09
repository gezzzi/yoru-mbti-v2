'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Results from '@/components/Results';
import { TestResult } from '@/types/personality';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (savedResult) {
        try {
          const parsedResult: TestResult = JSON.parse(savedResult);
          setResult(parsedResult);
        } catch (error) {
          console.error('診断結果の読み込みに失敗しました:', error);
          router.push('/');
        }
      } else {
        // 結果がない場合はホームにリダイレクト
        router.push('/');
      }
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <Results 
      result={result}
    />
  );
} 