'use client';

import { useRouter } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { calculatePersonalityType } from '@/utils/testLogic';

export default function TestPage() {
  const router = useRouter();

  const handleQuizComplete = (answers: Record<string, number>, username?: string) => {
    const result = calculatePersonalityType(answers);
    
    // ローカルストレージに保存
    if (typeof window !== 'undefined') {
      localStorage.setItem('personality_test_result', JSON.stringify(result));
      localStorage.setItem('answer_history', JSON.stringify(answers));
      // ユーザー名も保存
      if (username) {
        localStorage.setItem('personality_test_username', username);
      }
    }
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
