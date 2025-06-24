'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import PersonalityTypesPage from '@/components/PersonalityTypesPage';
import Quiz from '@/components/Quiz';
import Results from '@/components/Results';
import Navigation from '@/components/Navigation';
import CompatibilityPage from '@/components/CompatibilityPage';
import CompatibilityResults from '@/components/CompatibilityResults';
import { TestResult } from '@/types/personality';
import { calculatePersonalityType } from '@/utils/testLogic';
import { personalityTypes } from '@/data/personalityTypes';

type AppState = 'home' | 'types' | 'quiz' | 'results' | 'compatibility' | 'compatibility-results';

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [hasTestResult, setHasTestResult] = useState<boolean>(false);
  const [compatibilityMyResult, setCompatibilityMyResult] = useState<TestResult | null>(null);
  const [compatibilityPartnerResult, setCompatibilityPartnerResult] = useState<TestResult | null>(null);

  // コンポーネントマウント時にローカルストレージから結果をチェック
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (savedResult) {
        try {
          const parsedResult: TestResult = JSON.parse(savedResult);
          setHasTestResult(true);
          // 必要に応じてtestResultも設定
          if (!testResult) {
            setTestResult(parsedResult);
          }
        } catch (error) {
          console.error('保存された診断結果の読み込みに失敗しました:', error);
          setHasTestResult(false);
        }
      } else {
        setHasTestResult(false);
      }
    }
  }, [testResult]);

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

  const handleShowCompatibilityResults = (myResult: TestResult, partnerResult: TestResult) => {
    setCompatibilityMyResult(myResult);
    setCompatibilityPartnerResult(partnerResult);
    setCurrentState('compatibility-results');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleBackToCompatibility = () => {
    setCurrentState('compatibility');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleQuizComplete = (answers: Record<string, number>) => {
    const result = calculatePersonalityType(answers);
    setTestResult(result);
    setHasTestResult(true);
    setCurrentState('results');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleRestart = () => {
    setTestResult(null);
    setHasTestResult(false);
    // ローカルストレージからも削除
    if (typeof window !== 'undefined') {
      localStorage.removeItem('personality_test_result');
    }
    setCurrentState('home');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleShowResults = () => {
    // ローカルストレージから保存された結果を確認
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      if (savedResult) {
        try {
          const parsedResult: TestResult = JSON.parse(savedResult);
          setTestResult(parsedResult);
          setCurrentState('results');
          setTimeout(() => window.scrollTo(0, 0), 0);
          return;
        } catch (error) {
          console.error('保存された診断結果の読み込みに失敗しました:', error);
        }
      }
    }
    
    // 現在のtestResultがある場合はそれを表示
    if (testResult) {
      setCurrentState('results');
      setTimeout(() => window.scrollTo(0, 0), 0);
    } else {
      // 結果がない場合はテスト開始を促すためにhomeに移動
      setCurrentState('home');
      setTimeout(() => window.scrollTo(0, 0), 0);
    }
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
        return <CompatibilityPage onStartTest={handleStartTest} onShowResults={handleShowCompatibilityResults} />;
      case 'compatibility-results':
        return compatibilityMyResult && compatibilityPartnerResult ? (
          <CompatibilityResults 
            myResult={compatibilityMyResult}
            partnerResult={compatibilityPartnerResult}
            onBack={handleBackToCompatibility}
            onNewTest={handleShowCompatibility}
          />
        ) : null;
      default:
        return <Hero onStartTest={handleStartTest} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentPage={currentState} 
        hasTestResult={hasTestResult}
        onShowTypes={handleShowTypes}
        onShowCompatibility={handleShowCompatibility}
        onStartTest={handleStartTest}
        onBackToHome={handleBackToHome}
        onShowResults={handleShowResults}
      />
      {renderCurrentPage()}
    </div>
  );
} 