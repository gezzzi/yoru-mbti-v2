'use client';

import { useRouter } from 'next/navigation';
import EnQuiz from '@/components/en/Quiz';
import { calculatePersonalityType } from '@/utils/testLogic';
import { trackTestComplete } from '@/utils/analytics';
import { personalityTypes } from '@/data/en/personalityTypes';

export default function EnTestPage() {
  const router = useRouter();

  const handleQuizComplete = (answers: Record<string, number>, username?: string) => {
    const result = calculatePersonalityType(answers);

    // Save to localStorage with en_ prefix
    if (typeof window !== 'undefined') {
      localStorage.setItem('en_personality_test_result', JSON.stringify(result));
      localStorage.setItem('en_answer_history', JSON.stringify(answers));
      // Save username
      if (username) {
        localStorage.setItem('en_personality_test_username', username);
      }

      // GA4 event: track test completion
      const baseTypeCode = `${result.L >= 50 ? 'L' : 'F'}${result.A >= 50 ? 'A' : 'S'}${result.L2 >= 50 ? 'L' : 'F'}`;
      const firstAxis = result.E >= 50 ? 'E' : 'I';
      const fifthAxis = result.O >= 50 ? 'O' : 'S';
      const fiveAxisCode = `${firstAxis}${baseTypeCode}${fifthAxis}`;
      const displayCode = `${baseTypeCode}-${firstAxis}${fifthAxis}`;

      // Get type name
      const typeInfo = personalityTypes.find(t => t.code === baseTypeCode);
      const typeName = typeInfo?.name || baseTypeCode;

      // Get gender and age
      const gender = localStorage.getItem('en_personality_test_gender') || '';
      const ageGroup = localStorage.getItem('en_personality_test_age') || '';

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
    router.push('/en');
  };

  return (
    <EnQuiz
      onComplete={handleQuizComplete}
      onBack={handleBack}
    />
  );
}
