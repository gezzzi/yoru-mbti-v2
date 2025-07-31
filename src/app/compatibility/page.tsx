'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CompatibilityPage from '@/components/CompatibilityPage';
import { TestResult } from '@/types/personality';

export default function CompatibilityPageWrapper() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 診断結果があるかチェック
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (!savedResult) {
        // 診断結果がない場合はトップページにリダイレクト
        router.push('/');
      } else {
        setIsLoading(false);
      }
    }
  }, [router]);

  const handleStartTest = () => {
    router.push('/test');
  };

  const handleShowResults = (myResult: TestResult, partnerResult: TestResult) => {
    // 相性診断結果をローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('compatibility_my_result', JSON.stringify(myResult));
      localStorage.setItem('compatibility_partner_result', JSON.stringify(partnerResult));
    }
    
    // 相性診断結果ページにリダイレクト
    router.push('/compatibility/results');
  };

  // ローディング中は何も表示しない
  if (isLoading) {
    return null;
  }

  return (
    <CompatibilityPage 
      onStartTest={handleStartTest} 
      onShowResults={handleShowResults} 
    />
  );
} 