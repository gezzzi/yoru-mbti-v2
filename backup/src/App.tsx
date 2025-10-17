import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PersonalityGrid from './components/PersonalityGrid';
import PersonalityTypesPage from './components/PersonalityTypesPage';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { TestResult } from './types/personality';
import { calculatePersonalityType } from './utils/testLogic';

type AppState = 'home' | 'types' | 'quiz' | 'results';

function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  const handleStartTest = () => {
    setCurrentState('quiz');
  };

  const handleShowTypes = () => {
    setCurrentState('types');
  };

  const handleQuizComplete = (answers: Record<string, number>) => {
    const result = calculatePersonalityType(answers);
    setTestResult(result);
    setCurrentState('results');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
  };

  const handleRestart = () => {
    setTestResult(null);
    setCurrentState('home');
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
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation 
          currentPage={currentState} 
          onShowTypes={handleShowTypes}
          onBackToHome={handleBackToHome}
        />
        {renderCurrentPage()}
      </div>
    </Router>
  );
}

export default App;