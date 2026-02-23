'use client';

import React, { useState } from 'react';
import { ScrollAnimation } from '../ScrollAnimation';

const EnHelpPage: React.FC = () => {
  const faqData = [
    {
      question: 'How accurate are the personality test results?',
      answer: 'Our test is based on psychological research and has been statistically validated for high accuracy. However, results should be used as reference material to aid in self-understanding rather than definitive assessments.'
    },
    {
      question: 'How long does the test take?',
      answer: 'It typically takes about 10-15 minutes to complete. Taking time to carefully consider each question will yield more accurate results.'
    },
    {
      question: 'Are my results saved?',
      answer: 'Your results are saved locally in your browser. They are never shared with anyone else, but clearing your browser data will also delete your results.'
    },
    {
      question: 'How does the compatibility test work?',
      answer: 'The compatibility test analyzes differences in personality type traits and values to show relationship tendencies. Even low compatibility scores don\'t mean a relationship can\'t work — use the results as a guide for improvement.'
    },
    {
      question: 'What if I don\'t agree with my results?',
      answer: 'The test provides just one perspective. Try taking it again after some time, or consider feedback from people you trust for a more rounded view.'
    },
    {
      question: 'Is this service free to use?',
      answer: 'Yes, the core personality and compatibility tests are completely free. We may offer premium features in the future, but the core experience will remain free.'
    },
    {
      question: 'Can this be used for corporate purposes?',
      answer: 'The service is designed for personal use. For team-building or corporate applications, please contact us for more information about potential business plans.'
    },
    {
      question: 'Can I share my results on social media?',
      answer: 'Absolutely! We provide built-in sharing features for your results. Just be mindful of any personal information you choose to share.'
    }
  ];

  const [openFaq, setOpenFaq] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <ScrollAnimation animation="fadeIn" duration={800}>
              <div id="faq" className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 scroll-mt-20 w-full">
                <h2 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  Frequently Asked Questions
                </h2>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  Here are answers to the most common questions from our users.
                </p>

              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <ScrollAnimation key={index} animation="fadeInUp" delay={200 + index * 100}>
                    <div className="border-b border-white/20 pb-4">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full py-4 text-left font-semibold text-[#e0e7ff] hover:text-[#e0e7ff]/90 focus:outline-none transition-colors duration-150 flex justify-between items-center"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 flex-shrink-0 ${
                          openFaq.includes(index) ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className={`transition-all duration-300 ${
                      openFaq.includes(index) ? 'max-h-96' : 'max-h-0'
                    } overflow-hidden`}>
                      <div className="pt-2">
                        <p className="text-[#e0e7ff]/80 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnHelpPage;
