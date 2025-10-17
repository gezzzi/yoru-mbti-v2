import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { questions } from '../data/questions';
import { Question } from '../types/personality';
import { getProgressPercentage } from '../utils/testLogic';

interface QuizProps {
  onComplete: (answers: Record<string, number>) => void;
  onBack: () => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  const questionsPerPage = 6;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentPageQuestions = questions.slice(
    currentPageIndex * questionsPerPage,
    (currentPageIndex + 1) * questionsPerPage
  );
  
  const isLastPage = currentPageIndex === totalPages - 1;
  const answeredQuestions = Object.keys(answers).length;
  const progress = getProgressPercentage(answeredQuestions, questions.length);

  const handleAnswerSelect = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

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
        // scroll to the "次へ" button
        const nextButton = document.querySelector('[data-next-button]');
        if (nextButton) {
          nextButton.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else {
        // If it's the last question overall, scroll to "結果を見る" button
        const resultsButton = document.querySelector('[data-results-button]');
        if (resultsButton) {
          resultsButton.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }, 300); // Small delay to allow for visual feedback
  };

  const handleNext = () => {
    // Check if all questions on current page are answered
    const currentPageAnswered = currentPageQuestions.every(q => answers[q.id] !== undefined);
    
    if (!currentPageAnswered) return;
    
    if (isLastPage) {
      onComplete(answers);
    } else {
      setCurrentPageIndex(prev => prev + 1);
      // Scroll to first question of new page after a short delay
      setTimeout(() => {
        const firstQuestionOfNextPage = questions[(currentPageIndex + 1) * questionsPerPage];
        if (firstQuestionOfNextPage) {
          const firstQuestionElement = questionRefs.current[firstQuestionOfNextPage.id];
          if (firstQuestionElement) {
            firstQuestionElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      // Scroll to top of previous page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onBack();
    }
  };

  // Check if current page is complete
  const isCurrentPageComplete = currentPageQuestions.every(q => answers[q.id] !== undefined);

  // Scale values from strongly agree to strongly disagree (7-point scale)
  const scaleValues = [3, 2, 1, 0, -1, -2, -3];

  const getCircleSize = (index: number) => {
    if (index === 0 || index === 6) return 'w-16 h-16'; // Largest circles (extreme ends)
    if (index === 1 || index === 5) return 'w-14 h-14'; // Large circles
    if (index === 2 || index === 4) return 'w-12 h-12'; // Medium circles
    return 'w-10 h-10'; // Smallest circle (neutral center)
  };

  const getCircleColor = (value: number, isSelected: boolean) => {
    if (isSelected) {
      if (value >= 2) return 'bg-teal-500 border-teal-500 text-white';
      if (value >= 1) return 'bg-teal-400 border-teal-400 text-white';
      if (value === 0) return 'bg-gray-400 border-gray-400 text-white';
      if (value >= -1) return 'bg-purple-400 border-purple-400 text-white';
      return 'bg-purple-500 border-purple-500 text-white';
    }
    
    if (value >= 2) return 'border-teal-500 hover:border-teal-600 bg-white text-teal-500';
    if (value >= 1) return 'border-teal-400 hover:border-teal-500 bg-white text-teal-400';
    if (value === 0) return 'border-gray-300 hover:border-gray-400 bg-white text-gray-300';
    if (value >= -1) return 'border-purple-400 hover:border-purple-500 bg-white text-purple-400';
    return 'border-purple-500 hover:border-purple-600 bg-white text-purple-500';
  };

  const QuestionItem: React.FC<{ question: Question }> = ({ question }) => (
    <div 
      ref={(el) => questionRefs.current[question.id] = el}
      className="bg-white p-8 mb-8 border-b border-gray-100"
    >
      <div className="text-center mb-8">
        <h3 className="text-lg font-normal text-gray-700 leading-relaxed max-w-2xl mx-auto">
          {question.text}
        </h3>
      </div>

      {/* Visual Scale */}
      <div className="flex flex-col items-center space-y-6">
        {/* Scale Labels */}
        <div className="flex justify-between items-center w-full max-w-2xl">
          <span className="text-sm font-medium text-teal-600">そう思う</span>
          <span className="text-sm font-medium text-purple-600">そう思わない</span>
        </div>

        {/* Circle Scale */}
        <div className="flex items-center justify-center space-x-3">
          {scaleValues.map((value, index) => {
            const isSelected = answers[question.id] === value;
            
            return (
              <button
                key={value}
                onClick={() => handleAnswerSelect(question.id, value)}
                className={`${getCircleSize(index)} rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                  getCircleColor(value, isSelected)
                } ${isSelected ? 'scale-105 shadow-lg' : 'hover:shadow-md'} flex items-center justify-center`}
              >
                {isSelected && (
                  <Check className="w-5 h-5" strokeWidth={3} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header with green background */}
      <div className="bg-gradient-to-r from-teal-500 to-green-500 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">無料性格診断テスト</h1>
          <p className="text-white/90 text-sm">NERIS Type Explorer®</p>
        </div>
      </div>

      {/* Three info cards */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                自分の性格タイプを深く理解するため
                に、あなたの考えの傾向で正直に答え
                してください。
              </p>
            </div>
            
            <div className="bg-orange-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                人生の様々な場面において、自分の
                の性格タイプがどのような影響を与え
                ているかを学びましょう。
              </p>
            </div>
            
            <div className="bg-purple-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-400 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                オプションのプレミアムテストを
                利用して、さらに詳細に理解しま
                しょう。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPageQuestions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>

      {/* Navigation */}
      <div className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={!isCurrentPageComplete}
              data-next-button={!isLastPage}
              data-results-button={isLastPage}
              className={`px-12 py-3 rounded-full font-medium transition-all ${
                isCurrentPageComplete
                  ? 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLastPage ? '結果を見る' : '次へ'}
            </button>
          </div>
          
          <div className="text-center mt-6">
            <div className="text-sm text-gray-500 mb-2">
              質問 {answeredQuestions} / {questions.length} 回答済み
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div
                className="bg-gradient-to-r from-teal-400 to-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section matching 16personalities */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Social sharing */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">511K</h3>
            <div className="flex justify-center space-x-4">
              <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                f
              </button>
              <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800">
                X
              </button>
              <button className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                P
              </button>
              <button className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center hover:bg-gray-500">
                @
              </button>
              <button className="w-10 h-10 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-400">
                ⋯
              </button>
            </div>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Premium Profile</a></li>
                <li><a href="#" className="hover:text-teal-600">Team Assessments</a></li>
                <li><a href="#" className="hover:text-teal-600">Reports for Professionals</a></li>
                <li><a href="#" className="hover:text-teal-600">Testimonials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Personality Test</a></li>
                <li><a href="#" className="hover:text-teal-600">Personality Types</a></li>
                <li><a href="#" className="hover:text-teal-600">Articles</a></li>
                <li><a href="#" className="hover:text-teal-600">Our Framework</a></li>
                <li><a href="#" className="hover:text-teal-600">Country Profiles</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Help</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">Contact Us</a></li>
                <li><a href="#" className="hover:text-teal-600">FAQ</a></li>
                <li><a href="#" className="hover:text-teal-600">Your Orders</a></li>
                <li><a href="#" className="hover:text-teal-600">Change Language</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Our Other Creations</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-teal-600">NPQE®</a></li>
                <li><a href="#" className="hover:text-teal-600">MindTrackers®</a></li>
                <li><a href="#" className="hover:text-teal-600">Leadership by 16Personalities</a></li>
                <li><a href="#" className="hover:text-teal-600">INFJ by 16Personalities</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © 2011-2025 NERIS Analytics Limited
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Discord</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Facebook</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Instagram</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Twitter</span>
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;