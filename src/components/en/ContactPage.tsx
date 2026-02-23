'use client';

import React, { useState } from 'react';
import { ScrollAnimation } from '../ScrollAnimation';

const EnContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'fa2bd7b0-75fd-43aa-83b1-bc2f0e49d0bd',
          subject: `[Night Personality Test] ${formData.category || 'Inquiry'}`,
          from_name: 'Night Personality Test Contact Form',
          name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', category: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="pt-28 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fadeIn" duration={800}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-white/5 w-full space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-[#e0e7ff] mb-6 text-center">
                  Contact Us
                </h1>
                <p className="text-[#e0e7ff]/80 mb-8 text-center">
                  Have a question or feedback? We&apos;d love to hear from you.
                </p>
              </div>

              <ScrollAnimation animation="fadeInUp" delay={200}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Contact Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        Name <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] placeholder-[#e0e7ff]/40 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        Email <span className="text-pink-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] placeholder-[#e0e7ff]/40 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        Category <span className="text-pink-400">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all"
                      >
                        <option value="" className="bg-[#1a1a2e]">Select a category</option>
                        <option value="Test Results" className="bg-[#1a1a2e]">Test Results</option>
                        <option value="How to Use" className="bg-[#1a1a2e]">How to Use</option>
                        <option value="Technical Issue" className="bg-[#1a1a2e]">Technical Issue</option>
                        <option value="Feature Suggestion" className="bg-[#1a1a2e]">Feature Suggestion</option>
                        <option value="Privacy Concern" className="bg-[#1a1a2e]">Privacy Concern</option>
                        <option value="Other" className="bg-[#1a1a2e]">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#e0e7ff] mb-1">
                        Message <span className="text-pink-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-[#e0e7ff] placeholder-[#e0e7ff]/40 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all resize-none"
                        placeholder="Please describe your inquiry"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium rounded-lg shadow-lg shadow-pink-500/25 transition-all duration-300 hover:shadow-pink-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </span>
                        ) : 'Send Message'}
                      </button>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                        <p className="text-green-300 text-sm text-center">
                          Your message has been sent successfully. Thank you!
                        </p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                        <p className="text-red-300 text-sm text-center">
                          Failed to send your message. Please try again later or contact us directly via email.
                        </p>
                      </div>
                    )}
                  </form>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={300}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Send Us an Email Directly</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      If you prefer to send an email directly instead of using the form, please use the address below.
                    </p>
                    <div className="bg-white/5 rounded-lg p-4 mt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <span className="font-medium sm:w-32">Email:</span>
                        <a href="mailto:info@nightpersonality.com"
                           className="text-pink-300 hover:text-pink-200 underline break-all">
                          info@nightpersonality.com
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={400}>
                <section className="border-b border-white/20 pb-6">
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Response Policy</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      We typically respond to inquiries within 3 business days.
                      Depending on the nature of your inquiry, it may take longer.
                    </p>
                    <p>
                      Please note that we may not respond to the following types of inquiries:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                      <li>Sales or promotional inquiries</li>
                      <li>Content that violates public decency</li>
                      <li>Content that identifies or defames individuals</li>
                      <li>Other content deemed inappropriate</li>
                    </ul>
                  </div>
                </section>
              </ScrollAnimation>

              <ScrollAnimation animation="fadeInUp" delay={500}>
                <section>
                  <h2 className="text-xl font-semibold text-[#e0e7ff] mb-4">Important Notes</h2>
                  <div className="text-[#e0e7ff]/80 space-y-3 text-sm">
                    <p>
                      When contacting us, please keep the following in mind:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Please provide specific details about your inquiry</li>
                      <li>For technical issues, include your OS and browser information</li>
                      <li>Double-check your email address for accuracy</li>
                      <li>Check your spam filter settings for our reply</li>
                    </ul>
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

export default EnContactPage;
