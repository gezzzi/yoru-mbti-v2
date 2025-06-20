'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import PersonalityGrid from '@/components/PersonalityGrid';
import PersonalityTypesPage from '@/components/PersonalityTypesPage';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import Navigation from '@/components/Navigation';
import CompatibilityPage from '@/components/CompatibilityPage';
import { TestResult } from '@/types/personality';
import { calculatePersonalityType } from '@/utils/testLogic';
import { personalityTypes } from '@/data/personalityTypes';

type AppState = 'home' | 'types' | 'quiz' | 'results' | 'compatibility';

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleStartTest = () => {
    setCurrentState('quiz');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleShowTypes = () => {
    setCurrentState('types');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleShowCompatibility = () => {
    setCurrentState('compatibility');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleQuizComplete = (answers: Record<string, number>) => {
    const result = calculatePersonalityType(answers);
    setTestResult(result);
    setCurrentState('results');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleRestart = () => {
    setTestResult(null);
    setCurrentState('home');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  // デバッグ用：結果ページに直接ジャンプ
  const handleDebugShowResults = () => {
    // ダミーの診断結果を作成
    const dummyResult: TestResult = {
      E: 25, // Extroversion vs Introversion (低い = Introversion)
      D: 75, // Dominance vs Submission (高い = Dominance)  
      T: 60, // Thrill-seeking vs Security-seeking (高い = Thrill-seeking)
      R: 40, // Shame-resistant vs Shame-sensitive (低い = Shame-sensitive)
      A: 80, // Attachment vs Non-attachment (高い = Attachment)
      type: personalityTypes[0] // 最初のタイプを使用（EDTA - 快楽王）
    };
    setTestResult(dummyResult);
    setCurrentState('results');
  };

  const renderCurrentPage = () => {
    switch (currentState) {
      case 'types':
        return <PersonalityTypesPage />;
      case 'quiz':
        return (
          <Quiz 
            onComplete={handleQuizComplete}
            onBack={handleBackToHome}
          />
        );
      case 'results':
        return testResult ? (
          <Results 
            result={testResult}
            onRestart={handleRestart}
          />
        ) : null;
      case 'compatibility':
        return <CompatibilityPage onStartTest={handleStartTest} />;
      default:
        return (
          <>
            <Hero onStartTest={handleStartTest} />
            <PersonalityGrid onShowTypes={handleShowTypes} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentState} 
        onShowTypes={handleShowTypes}
        onShowCompatibility={handleShowCompatibility}
        onStartTest={handleStartTest}
        onBackToHome={handleBackToHome}
        onDebugShowResults={handleDebugShowResults}
      />
      {renderCurrentPage()}
    </div>
  );
} 