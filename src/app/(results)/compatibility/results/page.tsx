'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CompatibilityResults from '@/components/CompatibilityResults';
import { TestResult } from '@/types/personality';

export default function CompatibilityResultsPage() {
  const router = useRouter();
  const [myResult, setMyResult] = useState<TestResult | null>(null);
  const [partnerResult, setPartnerResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMyResult = localStorage.getItem('compatibility_my_result');
      const savedPartnerResult = localStorage.getItem('compatibility_partner_result');
      
      if (savedMyResult && savedPartnerResult) {
        try {
          const parsedMyResult: TestResult = JSON.parse(savedMyResult);
          const parsedPartnerResult: TestResult = JSON.parse(savedPartnerResult);
          setMyResult(parsedMyResult);
          setPartnerResult(parsedPartnerResult);
        } catch (error) {
          console.error('相性診断結果の読み込みに失敗しました:', error);
          router.push('/compatibility');
        }
      } else {
        // 結果がない場合は相性診断ページにリダイレクト
        router.push('/compatibility');
      }
      setLoading(false);
    }
  }, [router]);

  const handleBack = () => {
    router.push('/compatibility');
  };

  const handleNewTest = () => {
    // ローカルストレージから削除
    if (typeof window !== 'undefined') {
      localStorage.removeItem('compatibility_my_result');
      localStorage.removeItem('compatibility_partner_result');
    }
    router.push('/compatibility');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (!myResult || !partnerResult) {
    return null;
  }

  return (
    <CompatibilityResults 
      myResult={myResult}
      partnerResult={partnerResult}
      onBack={handleBack}
      onNewTest={handleNewTest}
    />
  );
} 