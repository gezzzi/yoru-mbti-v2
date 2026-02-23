'use client';

import { useRouter } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { calculatePersonalityType } from '@/utils/testLogic';
import { trackTestComplete } from '@/utils/analytics';
import { personalityTypes } from '@/data/personalityTypes';

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

      // GA4イベント送信: 診断完了時点で計測
      // 結果タイプの情報を取得
      const baseTypeCode = `${result.L >= 50 ? 'L' : 'F'}${result.A >= 50 ? 'A' : 'S'}${result.L2 >= 50 ? 'L' : 'F'}`;
      const firstAxis = result.E >= 50 ? 'E' : 'I';
      const fifthAxis = result.O >= 50 ? 'O' : 'S';
      const fiveAxisCode = `${firstAxis}${baseTypeCode}${fifthAxis}`;
      const displayCode = `${baseTypeCode}-${firstAxis}${fifthAxis}`;
      
      // タイプ名を取得
      const typeInfo = personalityTypes.find(t => t.code === baseTypeCode);
      const typeName = typeInfo?.name || baseTypeCode;

      // 性別と年齢を取得
      const gender = localStorage.getItem('personality_test_gender') || '';
      const ageGroup = localStorage.getItem('personality_test_age') || '';

      trackTestComplete({
        resultType: baseTypeCode,
        resultTypeFull: displayCode,
        resultName: typeName,
        fiveAxisCode: fiveAxisCode,
        scoreE: result.E,
        scoreL: result.L,
        scoreA: result.A,
        scoreL2: result.L2,
        scoreO: result.O,
        smTendency: result.additionalResults?.smTendency || 'unknown',
        tags: result.additionalResults?.tags || [],
        usernameProvided: !!username,
        gender: gender,
        ageGroup: ageGroup,
      });
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
