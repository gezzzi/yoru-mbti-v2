'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Check } from 'lucide-react';
import UsernameInput from './UsernameInput';
import { questions as originalQuestions, getShuffledQuestions } from '../data/questions';
import { Question } from '../types/personality';
import { getProgressPercentage } from '../utils/testLogic';
import NeonText from './NeonText';
import { ScrollAnimation } from './ScrollAnimation';

type AdInjectionStatus = 'success' | 'error';

const injectAdIntoContainer = (
  container: HTMLElement,
  scriptUrl: string,
  onFinish?: (status: AdInjectionStatus) => void
) => {
  container.innerHTML = '';

  const originalWrite = document.write.bind(document);
  const originalWriteln = document.writeln.bind(document);
  const originalOpen = document.open.bind(document);
  const originalClose = document.close.bind(document);

  const appendHtml = (html: string) => {
    if (!html) return;

    const template = document.createElement('template');
    template.innerHTML = html;

    for (const node of Array.from(template.content.childNodes)) {
      if (node.nodeName === 'SCRIPT') {
        const scriptNode = node as HTMLScriptElement;
        const scriptEl = document.createElement('script');
        for (const attr of Array.from(scriptNode.attributes)) {
          scriptEl.setAttribute(attr.name, attr.value);
        }
        scriptEl.text = scriptNode.text;
        container.appendChild(scriptEl);
      } else {
        container.appendChild(node);
      }
    }
  };

  document.write = (...html: string[]) => appendHtml(html.join(''));
  document.writeln = (...html: string[]) => appendHtml(`${html.join('')}\n`);
  document.open = ((..._args: Parameters<typeof document.open>) => {
    container.innerHTML = '';
    return document;
  }) as typeof document.open;
  document.close = () => {
    /* noop */
  };

  const restore = () => {
    document.write = originalWrite;
    document.writeln = originalWriteln;
    document.open = originalOpen;
    document.close = originalClose;
  };

  const handleFinish = (status: AdInjectionStatus) => {
    restore();
    onFinish?.(status);
  };

  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = false;
  script.onload = () => handleFinish('success');
  script.onerror = () => handleFinish('error');

  container.appendChild(script);

  return restore;
};

interface QuizProps {
  onComplete: (answers: Record<string, number>, username?: string) => void;
  onBack: () => void;
}

// 定数をコンポーネント外で定義
const QUESTIONS_PER_PAGE = 6;
const SCROLL_DELAY = 150; // 自然なスクロールタイミング

const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [username, setUsername] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topAdInjected, setTopAdInjected] = useState(false);
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const topAdContainerRef = useRef<HTMLDivElement | null>(null);
  const resultsLinkRef = useRef<HTMLAnchorElement | null>(null);

  const totalQuestions = 41; // 40問 + ユーザー名入力
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  
  // 現在のページの質問を取得（最後のページには質問とユーザー名入力が混在）
  const startIdx = currentPageIndex * QUESTIONS_PER_PAGE;
  const endIdx = Math.min((currentPageIndex + 1) * QUESTIONS_PER_PAGE, questions.length);
  const currentPageQuestions = useMemo(
    () => questions.slice(startIdx, endIdx),
    [questions, startIdx, endIdx]
  );
  
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
    if (isLastPage) {
      return;
    }

    // 現在のページの質問がすべて回答されているかチェック
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
      localStorage.setItem('personality_test_username', username);
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
        window.location.href = '/results';
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

  // クライアントサイドで質問をシャッフルし、ユーザー名を取得
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // セッションストレージからシャッフル済み質問を取得または新規生成
        const sessionKey = 'quiz_questions_shuffled';
        const savedQuestions = sessionStorage.getItem(sessionKey);

        if (savedQuestions) {
          // セッション内では同じ順序を維持
          setQuestions(JSON.parse(savedQuestions));
        } else {
          // 新しいセッションではランダム化
          const shuffled = getShuffledQuestions();
          setQuestions(shuffled);
          sessionStorage.setItem(sessionKey, JSON.stringify(shuffled));
        }

        // 保存されたユーザー名を取得
        const savedUsername = localStorage.getItem('personality_test_username');
        if (savedUsername) {
          setUsername(savedUsername);
        }
      } catch (error) {
        console.error('Failed to initialize quiz:', error);
        // エラー時はデフォルトの質問を使用
        setQuestions(originalQuestions);
      } finally {
        setIsLoading(false);
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

  useEffect(() => {
    if (isLoading || topAdInjected) return;

    const container = topAdContainerRef.current;
    if (!container) return;

    const restore = injectAdIntoContainer(
      container,
      'https://adm.shinobi.jp/s/978e28ae3e1fa17cc059c9a5a3a5c942',
      () => {
        setTopAdInjected(true);
      }
    );

    return () => {
      restore();
    };
  }, [isLoading, topAdInjected]);

  // Scale values from strongly agree to strongly disagree (6-point scale)
  // 0-5 scale to match questions.ts: 5=非常にそう思う, 0=全くそう思わない
  const scaleValues = [5, 4, 3, 2, 1, 0];

  const getCircleSize = (index: number) => {
    if (index === 0 || index === 5) return 'w-14 h-14 md:w-20 md:h-20'; // Largest circles (extreme ends)
    if (index === 1 || index === 4) return 'w-12 h-12 md:w-16 md:h-16'; // Large circles
    return 'w-11 h-11 md:w-14 md:h-14'; // Medium circles (middle options)
  };

  const getCircleColor = (value: number, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-yellow-400 border-yellow-500 text-white'; // 選択時は濃い黄色
    }
    return 'border-gray-400 bg-gray-800 text-gray-300'; // 未選択時は薄いグレー
  };

  const QuestionItem: React.FC<{ question: Question }> = ({ question }) => {
    const currentAnswer = answers[question.id];

    // キーボード操作のハンドラ
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentValue = currentAnswer ?? 2; // デフォルトは中央寄り

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newValue = Math.min(currentValue + 1, 5);
        handleAnswerSelect(question.id, newValue);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newValue = Math.max(currentValue - 1, 0);
        handleAnswerSelect(question.id, newValue);
      } else if (e.key >= '1' && e.key <= '6') {
        // 数字キーで直接選択（1=非常にそう思う、 6=全くそう思わない）
        const value = 6 - parseInt(e.key);
        handleAnswerSelect(question.id, value);
      }
    };

    return (
      <div
        ref={(el) => { questionRefs.current[question.id] = el; }}
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

        {/* Visual Scale */}
        <div className="flex flex-col items-center space-y-6">
          {/* Scale Labels */}
          <div className="flex justify-between items-center w-full max-w-2xl px-6 sm:px-12 md:px-5">
            <span className="text-base font-bold text-cyan-300">Yes</span>
            <span className="text-base font-bold text-pink-300">No</span>
          </div>

          {/* Circle Scale */}
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
                  onClick={() => handleAnswerSelect(question.id, value)}
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
  };


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
              {isUsernameInputPage ? 'ユーザー名入力' : `質問 ${startIdx + 1}-${Math.min(startIdx + currentPageQuestions.length, 40)} / 40`}
            </span>
            <span className="text-sm font-medium text-gray-100" aria-live="polite">
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
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-gray-100">読み込み中...</div>
        </div>
      ) : (
        <div className={hasTransitioned ? '' : 'animate-fadeInUp'}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div
              ref={topAdContainerRef}
              className="w-full flex justify-center mb-10"
              data-admax-container="top"
              aria-label="広告"
            />
            {currentPageQuestions.map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))}
            {(shouldShowUsernameInput || isUsernameInputPage) && (
              <UsernameInput
                username={username}
                setUsername={setUsername}
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
            {/* ボタンコンテナ */}
            <div className="flex items-center gap-4">
              
              {/* 次へ/結果を見るボタン */}
              {isLastPage ? (
                <a
                  ref={resultsLinkRef}
                  href="/results"
                  onClick={handleResultsClick}
                  className={`flex items-center justify-center px-16 py-4 rounded-full text-lg font-medium transition-all duration-200 transform hover:scale-105 min-w-[200px] ${
                    isCurrentPageComplete
                      ? 'bg-[#818cf8] text-white hover:bg-[#6366f1] shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                  }`}
                  aria-disabled={!isCurrentPageComplete}
                  data-results-button
                >
                  結果を見る
                  <span className="ml-2">→</span>
                </a>
              ) : (
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
                  次へ
                  <span className="ml-2">→</span>
                </button>
              )}
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
