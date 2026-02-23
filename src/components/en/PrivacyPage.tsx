'use client';

import React from 'react';
import { ScrollAnimation } from '../ScrollAnimation';

const EnPrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 w-full space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  Privacy Policy
                </h1>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  This policy describes how we handle your personal information.
                </p>
              </div>

              <ScrollAnimation animation="fadeInUp" delay={200}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">1. Handling of Personal Information</h2>
                  <p className="text-[#e0e7ff]/80 mb-2 text-sm">
                    We may collect and use personal information in the following cases:
                  </p>
                  <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                    <li>When you contact us through the inquiry form</li>
                    <li>For analyzing and improving service usage</li>
                  </ul>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">2. Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-[#e0e7ff] mb-2">2.1 Information You Provide</h3>
                      <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                        <li>Username entered during the test (stored in local storage)</li>
                        <li>Test responses (stored in local storage)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#e0e7ff] mb-2">2.2 Automatically Collected Information</h3>
                      <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                        <li>Access logs (IP address, browser information, etc.)</li>
                        <li>Cookie information</li>
                        <li>Usage data via Google Analytics</li>
                      </ul>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={400}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">3. Use of Google Analytics</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      This site uses Google Analytics, a web analytics service provided by Google.
                      Google Analytics uses cookies to collect traffic data.
                    </p>
                    <p>
                      This traffic data is collected anonymously and does not identify individuals.
                      You can refuse the collection by disabling cookies in your browser settings.
                    </p>
                    <p>
                      For more details, please refer to the{' '}
                      <a href="https://marketingplatform.google.com/about/analytics/terms/us/"
                         className="text-pink-300 hover:text-pink-200 underline"
                         target="_blank"
                         rel="noopener noreferrer">
                        Google Analytics Terms of Service
                      </a>.
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={500}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">4. Advertising</h2>
                  <div className="text-[#e0e7ff]/80 space-y-4 text-sm">
                    <p>
                      This site uses third-party advertising services.
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-[#e0e7ff]">4.1 Google AdSense</h4>
                      <p>
                        This site uses Google AdSense, an advertising service provided by Google and its partners.
                        Google AdSense may use cookies to display ads based on your interests.
                      </p>
                      <p>
                        For more information on how Google uses your data, please visit{' '}
                        <a href="https://policies.google.com/technologies/partner-sites?hl=en"
                           className="text-pink-300 hover:text-pink-200 underline"
                           target="_blank"
                           rel="noopener noreferrer">
                          Google&apos;s Policies and Terms
                        </a>.
                      </p>
                      <p>
                        To opt out of personalized advertising, you can change your settings at{' '}
                        <a href="https://www.google.com/settings/ads"
                           className="text-pink-300 hover:text-pink-200 underline"
                           target="_blank"
                           rel="noopener noreferrer">
                          Google Ads Settings
                        </a>.
                      </p>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={600}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">5. Use of Cookies</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      This site uses cookies for certain features.
                      Cookies are small data files that websites send to your browser.
                    </p>
                    <p>
                      You can refuse cookies by changing your browser settings.
                      However, disabling cookies may prevent some features of this site from working properly.
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={700}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">6. Use of Local Storage</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      This site uses your browser&apos;s local storage to save test results and response history.
                      This data is stored only in your browser and is not sent to our servers.
                    </p>
                    <p>
                      You can delete local storage data through your browser settings.
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={800}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">7. Disclosure to Third Parties</h2>
                  <p className="text-[#e0e7ff]/80 mb-2 text-sm">
                    We manage personal information appropriately and will not disclose it to third parties except in the following cases:
                  </p>
                  <ul className="list-disc list-inside text-[#e0e7ff]/80 space-y-1 ml-4 text-sm">
                    <li>When the individual has given consent</li>
                    <li>When required by law</li>
                    <li>When necessary to protect a person&apos;s life, body, or property</li>
                    <li>When necessary to improve public health or promote the sound development of children</li>
                    <li>When cooperating with a government agency or local authority performing legally mandated duties</li>
                  </ul>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={900}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">8. Changes to This Policy</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      We comply with applicable laws regarding personal information and will review and improve this policy as necessary.
                    </p>
                    <p>
                      The latest version of this privacy policy will always be available on this page.
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={1000}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-3">9. Disclaimer</h2>
                  <div className="text-[#e0e7ff]/80 space-y-2 text-sm">
                    <p>
                      We are not responsible for information or services provided on external sites that you may access through links on this site.
                    </p>
                    <p>
                      While we strive to provide accurate information, we do not guarantee its accuracy or safety.
                      Information may become outdated. We accept no liability for any damages resulting from the content published on this site.
                    </p>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeIn" delay={1100}>
                <section className="pt-4">
                  <p className="text-sm text-[#e0e7ff]/60">Established: September 2025</p>
                  <p className="text-sm text-[#e0e7ff]/60">Last updated: December 2025</p>
                </section>
              </ScrollAnimation>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
};

export default EnPrivacyPage;
