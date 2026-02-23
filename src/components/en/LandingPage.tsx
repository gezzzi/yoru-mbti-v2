'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollAnimation } from '../ScrollAnimation';

const EnLandingPage: React.FC = () => {
  return (
    <>
      {/* Pain Points */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              Sound familiar?
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: "\uD83D\uDCAD", text: "Wondering about your intimate compatibility with your partner" },
              { icon: "\u2764\uFE0F", text: "Wanting to build a deeper, more meaningful connection" },
              { icon: "\uD83C\uDF19", text: "Looking to bring more passion into your nights together" },
              { icon: "\uD83D\uDCAB", text: "Curious about what your partner truly desires" },
              { icon: "\u2728", text: "Trying to overcome a rut in your relationship" },
              { icon: "\uD83D\uDD25", text: "Seeking greater mutual satisfaction and intimacy" }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3 sm:gap-4 text-left">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/5">
                      <span className="text-2xl sm:text-3xl md:text-4xl leading-none">{item.icon}</span>
                    </div>
                    <p className="text-base sm:text-lg text-white/90 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className="text-center mt-8 sm:mt-10">
              <p className="text-white/80 text-base sm:text-lg mb-4 sm:mb-6">Get clarity in just 5 minutes</p>
              <Link
                href="/en/test"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
              >
                Start the Personality Test
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-3 sm:mb-4">
              What the Night Personality Test reveals
            </h2>
            <p className="text-base sm:text-lg text-white/70 text-center mb-8 sm:mb-12">
              A science-backed approach to understanding your intimate relationship
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "Couple Intimacy Score",
                description: "Quantify your closeness as a couple. Clearly understand the strength of your bond and pinpoint areas for growth.",
                icon: "\uD83D\uDCCA"
              },
              {
                title: "Intimate Satisfaction Analysis",
                description: "Uncover gaps between expectations and reality. Get insights to build a more fulfilling relationship.",
                icon: "\uD83D\uDC9D"
              },
              {
                title: "Compatibility Strengths & Flags",
                description: "See exactly where you click and where you might need to work together. A roadmap for a stronger connection.",
                icon: "\uD83C\uDFAF"
              },
              {
                title: "7-Day Improvement Plan",
                description: "Actionable steps you can start today. Small changes that lead to big improvements in your relationship.",
                icon: "\uD83D\uDCDD"
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 150}>
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-left">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/10">
                      <span className="text-2xl sm:text-3xl md:text-4xl leading-none">{item.icon}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              How does it work?
            </h2>
          </ScrollAnimation>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                step: "1",
                title: "Psychology-based questions",
                description: "40 carefully crafted questions measure your personality across 5 intimate axes using a scientifically grounded model."
              },
              {
                step: "2",
                title: "Both partners take the test",
                description: "Each partner answers individually, then scan each other's QR code to unlock the compatibility analysis."
              },
              {
                step: "3",
                title: "Get your detailed report",
                description: "Receive a comprehensive breakdown of intimacy, satisfaction, and compatibility with actionable improvement tips."
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 200}>
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-base sm:text-lg text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fadeInUp" delay={600}>
            <div className="text-center mt-8 sm:mt-12">
              <Link
                href="/en/test"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white font-semibold rounded-full hover:from-[#818cf8] hover:to-[#a78bfa] transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
              >
                Start Your Free Test
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Features */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              Why Night Personality Test?
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Completely Free",
                description: "Every feature is free to use. No hidden fees, no premium tiers, no surprises.",
                icon: "\uD83C\uDF81"
              },
              {
                title: "Anonymous & Private",
                description: "No account required. Your data stays on your device. Total privacy guaranteed.",
                icon: "\uD83D\uDD12"
              },
              {
                title: "Done in 5 Minutes",
                description: "Quick and easy to complete. Get your detailed results instantly.",
                icon: "\u26A1"
              },
              {
                title: "Science-Backed",
                description: "Built on psychological research and validated personality frameworks.",
                icon: "\uD83E\uDDEA"
              },
              {
                title: "Personalized Advice",
                description: "Tailored recommendations based on your unique personality profile.",
                icon: "\uD83D\uDCA1"
              },
              {
                title: "Save & Share Results",
                description: "Share your results via QR code and revisit them anytime you want.",
                icon: "\uD83D\uDCF1"
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-base sm:text-lg text-white/70">{item.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              What people are saying
            </h2>
          </ScrollAnimation>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                text: "My partner and I finally talked about things we'd been avoiding for months. Within a few weeks, we felt so much closer. This test opened a real conversation.",
                author: "Woman, 20s"
              },
              {
                text: "It was eye-opening to see our compatibility laid out objectively. We both understood each other better, and it actually brought us closer together.",
                author: "Man, 30s"
              },
              {
                text: "The improvement tips were practical and easy to follow. We saw real changes without any pressure. Highly recommend for any couple.",
                author: "Couple, 20s"
              }
            ].map((review, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 150}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                  <p className="text-base sm:text-lg text-white/90 mb-2 sm:mb-3">&quot;{review.text}&quot;</p>
                  <p className="text-xs sm:text-sm text-white/60">&mdash; {review.author}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full px-4 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              Frequently Asked Questions
            </h2>
          </ScrollAnimation>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                q: "Is it really free? Can I stay anonymous?",
                a: "Yes, the test is completely free with no strings attached. No account or sign-up required. All data is stored locally on your device, so your privacy is fully protected."
              },
              {
                q: "Can I take the test on my own?",
                a: "Absolutely. You can take the personality test solo anytime. Later, your partner can take it too and you can compare results to get a full compatibility report."
              },
              {
                q: "How long does the test take?",
                a: "About 5 minutes. You answer 40 questions and get your detailed personality analysis right away."
              },
              {
                q: "Can I save or share my results?",
                a: "Yes. You can share your results via QR code or save them as a screenshot. Your results are always accessible from your device."
              },
              {
                q: "What kind of advice will I get?",
                a: "You will receive tips on maintaining your strengths, addressing areas for improvement, and improving communication. Everything comes as a practical, week-by-week plan."
              }
            ].map((item, index) => (
              <ScrollAnimation key={index} animation="fadeInUp" delay={index * 100}>
                <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 sm:p-6 border border-purple-500/20">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3">{item.q}</h3>
                  <p className="text-base sm:text-lg text-white/80 leading-relaxed">{item.a}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full px-4 py-16 sm:py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimation animation="fadeInUp">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Your nights together can be so much better.
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-6 sm:mb-10">
              Take the free compatibility test now and build a deeper connection
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={200}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/en/compatibility"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base md:text-lg"
              >
                Try the Compatibility Test Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/en/types"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20 text-sm sm:text-base md:text-lg"
              >
                Explore All 8 Types First
              </Link>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeInUp" delay={400}>
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/60 text-xs sm:text-sm">
              <span className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                100% Anonymous
              </span>
              <span className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                5 Minutes
              </span>
              <span className="flex items-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Results Saved
              </span>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </>
  );
};

export default EnLandingPage;
