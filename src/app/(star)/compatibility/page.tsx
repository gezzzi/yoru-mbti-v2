'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CompatibilityPage from '@/components/CompatibilityPage';
import { TestResult } from '@/types/personality';
import TestFlowReminder from '@/components/TestFlowReminder';

export default function CompatibilityPageWrapper() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    // 診断結果があるかチェック
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (!savedResult) {
        setStatus('missing');
        return;
      }

      setStatus('ready');
    }
  }, []);

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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">読み込み中...</div>
      </div>
    );
  }

  if (status === 'missing') {
    return (
      <TestFlowReminder
        title="おっと！まだ性格診断を受けていないようです"
        description=""
        highlightStep={1}
      />
    );
  }

  return (
    <CompatibilityPage 
      onStartTest={handleStartTest} 
      onShowResults={handleShowResults} 
    />
  );
} 
