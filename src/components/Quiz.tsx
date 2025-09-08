'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import UsernameInput from './UsernameInput';
import { questions } from '../data/questions';
import { Question } from '../types/personality';
import { getProgressPercentage } from '../utils/testLogic';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';

interface QuizProps {
  onComplete: (answers: Record<string, number>, username?: string) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [username, setUsername] = useState('');
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  const questionsPerPage = 6;
  const totalQuestions = questions.length + 1; // 40問 + ユーザー名入力
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);
  
  // 現在のページの質問を取得（最後のページには質問とユーザー名入力が混在）
  const startIdx = currentPageIndex * questionsPerPage;
  const endIdx = Math.min((currentPageIndex + 1) * questionsPerPage, questions.length);
  const currentPageQuestions = questions.slice(startIdx, endIdx);
  
  // 最後のページかつ、ユーザー名入力を表示すべきか
  const isLastPage = currentPageIndex === totalPages - 1;
  const shouldShowUsernameInput = isLastPage && startIdx < totalQuestions;
  const isUsernameInputPage = startIdx === questions.length; // 41問目のみのページ
  
  const answeredQuestions = Object.keys(answers).length;
  const totalProgress = username ? answeredQuestions + 1 : answeredQuestions;
  const progress = Math.round((totalProgress / totalQuestions) * 100);

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    // ユーザー名入力ページでは自動スクロールしない
    if (isUsernameInputPage || (shouldShowUsernameInput && currentPageQuestions.length === 0)) {
      return;
    }

    // Auto-scroll to next question after a short delay
    setTimeout(() => {
      const currentQuestionIndex = currentPageQuestions.findIndex(q => q.id === questionId);
      const nextQuestionIndex = currentQuestionIndex + 1;
      
      if (nextQuestionIndex < currentPageQuestions.length) {
        // Scroll to next question on same page
        const nextQuestionId = currentPageQuestions[nextQuestionIndex].id;
        const nextQuestionElement = questionRefs.current[nextQuestionId];
        
        if (nextQuestionElement) {
          nextQuestionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else if (!isLastPage) {
        // If it's the last question on the page and not the final page,
        // scroll to the "次へ" button positioned at a comfortable viewing position
        const nextButton = document.querySelector('[data-next-button]');
        if (nextButton) {
          nextButton.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else if (shouldShowUsernameInput && nextQuestionIndex === currentPageQuestions.length) {
        // 最後の質問の後、ユーザー名入力欄にスクロール
        const usernameInput = document.querySelector('[data-username-input]');
        if (usernameInput && !document.activeElement?.tagName?.match(/INPUT|TEXTAREA/)) {
          usernameInput.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else {
        // If it's the last question overall, scroll to "結果を見る" button at a comfortable position
        const resultsButton = document.querySelector('[data-results-button]');
        if (resultsButton) {
          resultsButton.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }, 30); // Ultra fast response
  };

  const handleNext = () => {
    // 現在のページの質問がすべて回答されているかチェック
    const currentPageAnswered = currentPageQuestions.every(q => answers[q.id] !== undefined);
    
    // 最後のページでユーザー名入力が表示されている場合
    if (isLastPage && (shouldShowUsernameInput || isUsernameInputPage)) {
      // 質問がある場合は質問をチェック
      if (currentPageQuestions.length > 0 && !currentPageAnswered) return;
      // ユーザー名が入力されていない場合は終了
      if (!username.trim()) return;
      // すべてOKなら結果へ
      handleUsernameSubmit();
    } else if (!currentPageAnswered) {
      // 通常の質問ページで回答が完了していない場合
      return;
    } else {
      setHasTransitioned(true);
      setCurrentPageIndex(prev => prev + 1);
      // Scroll to first question of new page after a short delay
      setTimeout(() => {
        const firstQuestionOfNextPage = questions[(currentPageIndex + 1) * questionsPerPage];
        if (firstQuestionOfNextPage) {
          const firstQuestionElement = questionRefs.current[firstQuestionOfNextPage.id];
          if (firstQuestionElement) {
            firstQuestionElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }, 30);
    }
  };

  const handleUsernameSubmit = () => {
    if (username.trim()) {
      localStorage.setItem('personality_test_username', username);
      onComplete(answers, username);
    }
  };


  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setHasTransitioned(true);
      setCurrentPageIndex(prev => prev - 1);
      
      // Scroll to first question of previous page after a short delay
      setTimeout(() => {
        const firstQuestionOfPrevPage = questions[(currentPageIndex - 1) * questionsPerPage];
        if (firstQuestionOfPrevPage) {
          const firstQuestionElement = questionRefs.current[firstQuestionOfPrevPage.id];
          if (firstQuestionElement) {
            firstQuestionElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }, 30);
    }
  };

  // 保存されたユーザー名を取得
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('personality_test_username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);


  // Check if current page is complete
  const isCurrentPageComplete = (() => {
    // 通常の質問ページ
    const questionsAnswered = currentPageQuestions.every(q => answers[q.id] !== undefined);
    
    // 最後のページでユーザー名入力がある場合
    if (isLastPage && (shouldShowUsernameInput || isUsernameInputPage)) {
      // 質問とユーザー名の両方をチェック
      return questionsAnswered && username.trim() !== '';
    }
    
    // 通常のページ
    return questionsAnswered;
  })();

  // Scale values from strongly agree to strongly disagree (7-point scale)
  // 0-6 scale to match questions.ts: 6=非常にそう思う, 3=どちらでもない, 0=全くそう思わない
  const scaleValues = [6, 5, 4, 3, 2, 1, 0];

  const getCircleSize = (index: number) => {
    if (index === 0 || index === 6) return 'w-12 h-12 md:w-16 md:h-16'; // Largest circles (extreme ends)
    if (index === 1 || index === 5) return 'w-11 h-11 md:w-14 md:h-14'; // Large circles
    if (index === 2 || index === 4) return 'w-10 h-10 md:w-12 md:h-12'; // Medium circles
    return 'w-9 h-9 md:w-10 md:h-10'; // Smallest circle (neutral center)
  };

  const getCircleColor = (value: number, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-yellow-400 border-yellow-500 text-white'; // 選択時は濃い黄色
    }
    return 'border-gray-400 bg-gray-800 text-gray-300'; // 未選択時は薄いグレー
  };

  const QuestionItem: React.FC<{ question: Question }> = ({ question }) => (
    <div 
      ref={(el) => { questionRefs.current[question.id] = el; }}
      className="px-0 py-8 sm:p-6 md:p-8 mb-8 border-b border-gray-100"
    >
      <div className="text-center mb-8 px-4">
        <h3 className="text-lg font-bold text-gray-100 leading-relaxed max-w-2xl mx-auto">
          {question.text}
        </h3>
      </div>

      {/* Visual Scale */}
      <div className="flex flex-col items-center space-y-6">
        {/* Scale Labels */}
        <div className="flex justify-between items-center w-full max-w-2xl px-6 sm:px-12 md:px-5">
          <span className="text-base font-bold text-cyan-300">Yes</span>
          <span className="text-base font-bold text-pink-300">No</span>
        </div>

        {/* Circle Scale */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-5">
          {scaleValues.map((value, index) => {
            const isSelected = answers[question.id] === value;
            
            return (
              <button
                key={value}
                onClick={() => handleAnswerSelect(question.id, value)}
                className={`${getCircleSize(index)} rounded-full border-2 transition-all duration-100 hover:scale-105 ${
                  getCircleColor(value, isSelected)
                } ${isSelected ? 'scale-105 shadow-lg' : 'hover:shadow-md'} flex items-center justify-center`}
              >
                {isSelected && (
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen pt-16">
      {/* Header with transparent background */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <h1 className="mt-12 text-5xl md:text-6xl font-bold text-white mb-4 select-none text-center">
              <NeonText text={["夜の", "性格診断"]} specialCharIndex={2} className="gap-1" />
            </h1>
          </ScrollAnimation>
        </div>
      </div>

      {/* Progress Bar */}
      <ScrollAnimation animation="fadeInUp" delay={200}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-100">
              {isUsernameInputPage ? '質問 41 / 41' : `質問 ${currentPageIndex * questionsPerPage + 1}-${Math.min((currentPageIndex + 1) * questionsPerPage, questions.length)} / 41`}
            </span>
            <span className="text-sm font-medium text-gray-100">
              {progress}% 完了
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#818cf8] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </ScrollAnimation>

      {/* Questions and Username Input */}
      {hasTransitioned ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentPageQuestions.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
          {(shouldShowUsernameInput || isUsernameInputPage) && (
            <UsernameInput 
              username={username}
              setUsername={setUsername}
              onSubmit={handleUsernameSubmit}
              isLastPage={isLastPage}
            />
          )}
        </div>
      ) : (
        <ScrollAnimation animation="fadeInUp" delay={400}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentPageQuestions.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
            {(shouldShowUsernameInput || isUsernameInputPage) && (
              <UsernameInput 
                username={username}
                setUsername={setUsername}
                onSubmit={handleUsernameSubmit}
                isLastPage={isLastPage}
              />
            )}
          </div>
        </ScrollAnimation>
      )}

      {/* Navigation */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            {/* ボタンコンテナ */}
            <div className="flex items-center gap-4">
              
              {/* 次へ/結果を見るボタン */}
              <button
                onClick={handleNext}
                disabled={!isCurrentPageComplete}
                className={`flex items-center justify-center px-16 py-4 rounded-full text-lg font-medium transition-all duration-200 transform hover:scale-105 min-w-[200px] ${
                  isCurrentPageComplete
                    ? 'bg-[#818cf8] text-white hover:bg-[#6366f1] shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                data-next-button={!isLastPage}
                data-results-button={isLastPage}
              >
                {isLastPage ? '結果を見る' : '次へ'}
                <span className="ml-2">→</span>
              </button>
            </div>

            <div className="text-sm text-gray-200">
              ページ {currentPageIndex + 1} / {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 