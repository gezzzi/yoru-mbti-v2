'use client';

import { useRouter } from 'next/navigation';
import CompatibilityPage from '@/components/CompatibilityPage';
import { TestResult } from '@/types/personality';

export default function CompatibilityPageWrapper() {
  const router = useRouter();

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

  return (
    <CompatibilityPage 
      onStartTest={handleStartTest} 
      onShowResults={handleShowResults} 
    />
  );
} 