'use client';

import React from 'react';
import { ScrollAnimation } from '../ScrollAnimation';

const EnAboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 w-full space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  About Us
                </h1>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  Information about Night Personality Test and its operators.
                </p>
              </div>

              <ScrollAnimation animation="fadeInUp" delay={200}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Site Information</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">Site Name:</span>
                      <span>Night Personality Test</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">URL:</span>
                      <a href="https://nightpersonality.com"
                         className="text-pink-300 hover:text-pink-200 underline"
                         target="_blank"
                         rel="noopener noreferrer">
                        https://nightpersonality.com
                      </a>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">Launched:</span>
                      <span>July 2025</span>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Operator</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">Operator:</span>
                      <span>Night Personality Test</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <span className="font-medium sm:w-32">Contact:</span>
                      <a href="mailto:info@nightpersonality.com"
                         className="text-pink-300 hover:text-pink-200 underline break-all">
                        info@nightpersonality.com
                      </a>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={400}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">About the Service</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      Night Personality Test is a personality assessment service built on a unique 5-axis system.
                      It is designed to help users understand their intimate and romantic personality types,
                      fostering deeper self-awareness and mutual understanding in relationships.
                    </p>
                    <p>
                      The test is free to use, and your results are stored locally in your browser.
                      Our compatibility test feature also provides insights into your relationship dynamics with a partner.
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={500}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Technology Stack</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Next.js 14 (Frontend & Backend)</li>
                      <li>TypeScript (Programming Language)</li>
                      <li>Tailwind CSS (Styling)</li>
                      <li>Google Analytics (Analytics)</li>
                    </ul>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={600}>
                <section>
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Disclaimer</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      The results provided by this service are based on psychological research but
                      do not constitute medical or professional advice.
                      Please use the results as a reference tool for self-understanding.
                    </p>
                    <p>
                      We cannot be held responsible for any outcomes resulting from the use of
                      diagnostic results. Please use the service at your own discretion.
                    </p>
                  </div>
                </section>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default EnAboutPage;
