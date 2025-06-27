'use client';

import { useRouter } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { calculatePersonalityType } from '@/utils/testLogic';

export default function TestPage() {
  const router = useRouter();

  const handleQuizComplete = (answers: Record<string, number>) => {
    const result = calculatePersonalityType(answers);
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('personality_test_result', JSON.stringify(result));
    }
    
    // 結果ページにリダイレクト
    router.push('/results');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Quiz 
      onComplete={handleQuizComplete}
      onBack={handleBack}
    />
  );
} 