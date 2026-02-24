'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Check } from 'lucide-react';
import EnUsernameInput from '@/components/en/UsernameInput';
import { questions as originalQuestions, getShuffledQuestions } from '@/data/en/questions';
import { Question } from '@/types/personality';
import { getProgressPercentage } from '@/utils/testLogic';
import NeonText from '@/components/NeonText';
import { ScrollAnimation } from '@/components/ScrollAnimation';

// Scale values (defined outside component)
const scaleValues = [5, 4, 3, 2, 1, 0];

const getCircleSize = (index: number) => {
  if (index === 0 || index === 5) return 'w-14 h-14 md:w-20 md:h-20';
  if (index === 1 || index === 4) return 'w-12 h-12 md:w-16 md:h-16';
  return 'w-11 h-11 md:w-14 md:h-14';
};

const getCircleColor = (value: number, isSelected: boolean) => {
  if (isSelected) {
    return 'bg-yellow-400 border-yellow-500 text-white';
  }
  return 'border-gray-400 bg-gray-800 text-gray-300';
};

interface QuestionItemProps {
  question: Question;
  currentAnswer: number | undefined;
  onAnswerSelect: (questionId: number, value: number) => void;
  onRefSet: (id: number, el: HTMLDivElement | null) => void;
}

const QuestionItem = React.memo<QuestionItemProps>(({ question, currentAnswer, onAnswerSelect, onRefSet }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentValue = currentAnswer ?? 2;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newValue = Math.min(currentValue + 1, 5);
      onAnswerSelect(question.id, newValue);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newValue = Math.max(currentValue - 1, 0);
      onAnswerSelect(question.id, newValue);
    } else if (e.key >= '1' && e.key <= '6') {
      const value = 6 - parseInt(e.key);
      onAnswerSelect(question.id, value);
    }
  };

  return (
    <div
      ref={(el) => { onRefSet(question.id, el); }}
      className="px-0 py-8 sm:p-6 md:p-8 mb-8 border-b border-gray-100"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="group"
      aria-labelledby={`question-${question.id}`}
    >
      <div className="text-center mb-8 px-4">
        <h3
          id={`question-${question.id}`}
          className="text-xl md:text-2xl font-bold text-gray-100 leading-relaxed max-w-2xl mx-auto"
        >
          {question.text}
        </h3>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="flex justify-between items-center w-full max-w-2xl px-6 sm:px-12 md:px-5">
          <span className="text-base font-bold text-cyan-300">Yes</span>
          <span className="text-base font-bold text-pink-300">No</span>
        </div>

        <div
          className="flex items-center justify-center space-x-3 sm:space-x-3 md:space-x-6"
          role="radiogroup"
          aria-labelledby={`question-${question.id}`}
        >
          {scaleValues.map((value, index) => {
            const isSelected = currentAnswer === value;
            const optionText = question.options[index]?.text || '';

            return (
              <button
                key={value}
                onClick={() => onAnswerSelect(question.id, value)}
                className={`${getCircleSize(index)} rounded-full border-2 transition-all duration-100 hover:scale-105 ${
                  getCircleColor(value, isSelected)
                } ${isSelected ? 'scale-105 shadow-lg' : 'hover:shadow-md'} flex items-center justify-center`}
                role="radio"
                aria-checked={isSelected}
                aria-label={optionText}
                title={optionText}
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
});
QuestionItem.displayName = 'QuestionItem';

interface QuizProps {
  onComplete: (answers: Record<string, number>, username?: string) => void;
  onBack: () => void;
}

// Constants defined outside the component
const QUESTIONS_PER_PAGE = 6;
const SCROLL_DELAY = 150; // Natural scroll timing

type Gender = 'male' | 'female' | 'other' | '';

const EnQuiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [age, setAge] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const resultsLinkRef = useRef<HTMLAnchorElement | null>(null);

  const totalQuestions = 41; // 40 questions + username input
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);

  // Get questions for the current page (last page may mix questions and username input)
  const startIdx = currentPageIndex * QUESTIONS_PER_PAGE;
  const endIdx = Math.min((currentPageIndex + 1) * QUESTIONS_PER_PAGE, questions.length);
  const currentPageQuestions = useMemo(
    () => questions.slice(startIdx, endIdx),
    [questions, startIdx, endIdx]
  );

  // Whether this is the last page and should show the username input
  const isLastPage = currentPageIndex === totalPages - 1;
  const shouldShowUsernameInput = isLastPage && startIdx < totalQuestions;
  const isUsernameInputPage = startIdx === questions.length; // Page with only the 41st item


  const answeredQuestions = Object.keys(answers).length;
  const totalProgress = username ? answeredQuestions + 1 : answeredQuestions;
  const progress = Math.round((totalProgress / totalQuestions) * 100);

  const handleAnswerSelect = useCallback((questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Do not auto-scroll on the username input page
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
        // scroll to the "Next" button
        const nextButton = document.querySelector('[data-next-button]');
        if (nextButton) {
          nextButton.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else if (shouldShowUsernameInput && nextQuestionIndex === currentPageQuestions.length) {
        // After the last question, scroll to the username input
        const usernameInput = document.querySelector('[data-username-input]');
        if (usernameInput && !document.activeElement?.tagName?.match(/INPUT|TEXTAREA/)) {
          usernameInput.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else {
        // If it's the last question overall, scroll to "View Results" button
        const resultsButton = document.querySelector('[data-results-button]');
        if (resultsButton) {
          resultsButton.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }, 30); // Ultra fast response
  }, [currentPageQuestions, isUsernameInputPage, shouldShowUsernameInput, isLastPage]);

  const handleNext = () => {
    if (isLastPage) {
      return;
    }

    // Check if all questions on the current page are answered
    const currentPageAnswered = currentPageQuestions.every(q => answers[q.id] !== undefined);
    if (!currentPageAnswered) {
      return;
    }

    setHasTransitioned(true);
    setCurrentPageIndex(prev => prev + 1);
    // Scroll to first question of new page after a short delay
    setTimeout(() => {
      const firstQuestionOfNextPage = questions[(currentPageIndex + 1) * QUESTIONS_PER_PAGE];
      if (firstQuestionOfNextPage) {
        const firstQuestionElement = questionRefs.current[firstQuestionOfNextPage.id];
        if (firstQuestionElement) {
          firstQuestionElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }, SCROLL_DELAY);
  };

  const completeQuiz = () => {
    if (!username.trim()) {
      return false;
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem('en_personality_test_username', username);
      localStorage.setItem('en_personality_test_gender', gender);
      localStorage.setItem('en_personality_test_age', age);
    }

    onComplete(answers, username);
    return true;
  };

  const handleUsernameSubmit = (options?: { triggerNavigation?: boolean }) => {
    if (!isCurrentPageComplete) {
      return;
    }

    const completed = completeQuiz();
    if (!completed) {
      return;
    }

    if (options?.triggerNavigation) {
      if (resultsLinkRef.current) {
        resultsLinkRef.current.click();
      } else if (typeof window !== 'undefined') {
        window.location.href = '/en/results';
      }
    }
  };

  const handleResultsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isCurrentPageComplete) {
      event.preventDefault();
      return;
    }

    const completed = completeQuiz();
    if (!completed) {
      event.preventDefault();
      return;
    }

  };


  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setHasTransitioned(true);
      setCurrentPageIndex(prev => prev - 1);

      // Scroll to first question of previous page after a short delay
      setTimeout(() => {
        const firstQuestionOfPrevPage = questions[(currentPageIndex - 1) * QUESTIONS_PER_PAGE];
        if (firstQuestionOfPrevPage) {
          const firstQuestionElement = questionRefs.current[firstQuestionOfPrevPage.id];
          if (firstQuestionElement) {
            firstQuestionElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }
        }
      }, SCROLL_DELAY);
    }
  };

  // Shuffle questions client-side and retrieve username
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Get shuffled questions from session storage or generate new ones
        const sessionKey = 'en_quiz_questions_shuffled';
        const savedQuestions = sessionStorage.getItem(sessionKey);

        if (savedQuestions) {
          // Maintain the same order within a session
          setQuestions(JSON.parse(savedQuestions));
        } else {
          // Randomize for a new session
          const shuffled = getShuffledQuestions();
          setQuestions(shuffled);
          sessionStorage.setItem(sessionKey, JSON.stringify(shuffled));
        }

        // Retrieve saved username
        const savedUsername = localStorage.getItem('en_personality_test_username');
        if (savedUsername) {
          setUsername(savedUsername);
        }

        const ua = window.navigator.userAgent;
        const isMobileUA = /iPhone|iPad|Android.+Mobile|Windows Phone|iPod/i.test(ua);
        const isSmallViewport = typeof window.matchMedia === 'function'
          ? window.matchMedia('(max-width: 768px)').matches
          : false;
        setIsMobileView(isMobileUA || isSmallViewport);
      } catch (error) {
        console.error('Failed to initialize quiz:', error);
        // Use default questions on error
        setQuestions(originalQuestions);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);


  // Check if current page is complete
  const isCurrentPageComplete = (() => {
    // Normal question pages
    const questionsAnswered = currentPageQuestions.every(q => answers[q.id] !== undefined);

    // Last page with username input
    if (isLastPage && (shouldShowUsernameInput || isUsernameInputPage)) {
      // Check questions, gender, age, and username
      return questionsAnswered && gender !== '' && age.trim() !== '' && username.trim() !== '';
    }

    // Normal pages
    return questionsAnswered;
  })();

  const handleRefSet = useCallback((id: number, el: HTMLDivElement | null) => {
    questionRefs.current[id] = el;
  }, []);


  return (
    <div className="min-h-screen pt-16">
      {/* Header with transparent background */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <h1 className="mt-12 text-5xl md:text-6xl font-bold text-white mb-4 select-none text-center">
              <NeonText text={["Night", "Personality"]} specialCharIndex={2} className="gap-1" />
            </h1>
          </ScrollAnimation>
        </div>
      </div>

      {/* Progress Bar */}
      <ScrollAnimation animation="fadeInUp" delay={200}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-100">
              {isUsernameInputPage ? 'Username Entry' : `Q ${startIdx + 1}-${Math.min(startIdx + currentPageQuestions.length, 40)} / 40`}
            </span>
            <span className="text-sm font-medium text-gray-100" aria-live="polite">
              {progress}% Complete
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
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-gray-100">Loading...</div>
        </div>
      ) : (
        <div className={hasTransitioned ? '' : 'animate-fadeInUp'}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {currentPageQuestions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                currentAnswer={answers[question.id]}
                onAnswerSelect={handleAnswerSelect}
                onRefSet={handleRefSet}
              />
            ))}
            {(shouldShowUsernameInput || isUsernameInputPage) && (
              <EnUsernameInput
                username={username}
                setUsername={setUsername}
                gender={gender}
                setGender={setGender}
                age={age}
                setAge={setAge}
                onSubmit={() => handleUsernameSubmit({ triggerNavigation: true })}
                isLastPage={isLastPage}
                data-username-input
              />
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            {/* Button container */}
            <div className="flex items-center gap-4">
              {/* Next button */}
              {!isLastPage && (
                <button
                  onClick={handleNext}
                  disabled={!isCurrentPageComplete}
                  className={`flex items-center justify-center px-16 py-4 rounded-full text-lg font-medium transition-all duration-200 transform hover:scale-105 min-w-[200px] ${
                    isCurrentPageComplete
                      ? 'bg-[#818cf8] text-white hover:bg-[#6366f1] shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  data-next-button
                >
                  Next
                  <span className="ml-2">&rarr;</span>
                </button>
              )}

              {/* View Results link (always in DOM) */}
              <a
                ref={resultsLinkRef}
                href="/en/results"
                onClick={(event) => {
                  if (!isLastPage || !isCurrentPageComplete) {
                    event.preventDefault();
                    return;
                  }
                  handleResultsClick(event);
                }}
                className={`flex items-center justify-center px-16 py-4 rounded-full text-lg font-medium transition-all duration-200 transform min-w-[200px] ${
                  isLastPage && isCurrentPageComplete
                    ? 'bg-[#818cf8] text-white hover:bg-[#6366f1] shadow-lg hover:shadow-xl hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                } ${isLastPage ? '' : 'sr-only absolute opacity-0'} `}
                aria-disabled={!isLastPage || !isCurrentPageComplete}
                tabIndex={isLastPage && isCurrentPageComplete ? 0 : -1}
                data-results-button
              >
                View Results
                <span className="ml-2">&rarr;</span>
              </a>
            </div>

            <div className="text-sm text-gray-200">
              Page {currentPageIndex + 1} / {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnQuiz;
