'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface NavigationProps {
  currentPage: 'home' | 'types' | 'quiz' | 'results' | 'compatibility' | 'compatibility-results' | 'privacy' | 'blog' | 'stats';
  hasTestResult?: boolean;
}

const EnNavigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-600 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* App name - left aligned */}
        <div className="absolute left-4 top-0 h-16 flex items-center z-10">
          <Link
            href="/en"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <div className="w-8 h-8 relative">
              <Image
                src="/favicon.svg"
                alt="Night Personality Test"
                width={32}
                height={32}
                className="w-full h-full"
              />
            </div>
            <span className={`text-lg font-bold transition-colors ${currentPage === 'home' ? 'text-teal-300' : 'text-white'}`}>NightPersonality</span>
          </Link>
        </div>

        {/* Language switcher - right side */}
        <div className="absolute right-16 lg:right-4 top-0 h-16 flex items-center z-10">
          <LanguageSwitcher currentLocale="en" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-16 relative">

          {/* Desktop menu - center aligned */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/en/results"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'results'
                  ? 'text-teal-300'
                  : 'text-white'
              }`}
            >
              Your Results
            </Link>
            <Link
              href="/en/test"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'quiz'
                  ? 'text-teal-300'
                  : 'text-white'
              }`}
            >
              Personality Test
            </Link>
            <Link
              href="/en/types"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'types'
                  ? 'text-teal-300'
                  : 'text-white'
              }`}
            >
              Personality Types
            </Link>
            <Link
              href="/en/compatibility"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'compatibility' || currentPage === 'compatibility-results'
                  ? 'text-teal-300'
                  : 'text-white'
              }`}
            >
              Compatibility
            </Link>
            <Link
              href="/en/stats"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'stats'
                  ? 'text-teal-300'
                  : 'text-white'
              }`}
            >
              Stats
            </Link>
            <Link
              href="/en/blog"
              onClick={closeMenu}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'blog'
                  ? 'text-teal-300'
                  : 'text-white'
              }`}
            >
              Blog
            </Link>
          </div>

          {/* Hamburger menu button - right aligned */}
          <div className="lg:hidden absolute right-0 top-0 h-16">
            <div className="h-full flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-100 hover:text-gray-100 focus:outline-none focus:text-gray-100"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-slate-600">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link
                href="/en/results"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'results'
                    ? 'text-teal-300'
                    : 'text-white'
                }`}
              >
                Your Results
              </Link>
              <Link
                href="/en/test"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'quiz'
                    ? 'text-teal-300'
                    : 'text-white'
                }`}
              >
                Personality Test
              </Link>
              <Link
                href="/en/types"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'types'
                    ? 'text-teal-300'
                    : 'text-white'
                }`}
              >
                Personality Types
              </Link>
              <Link
                href="/en/compatibility"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'compatibility' || currentPage === 'compatibility-results'
                    ? 'text-teal-300'
                    : 'text-white'
                }`}
              >
                Compatibility
              </Link>
              <Link
                href="/en/stats"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'stats'
                    ? 'text-teal-300'
                    : 'text-white'
                }`}
              >
                Stats
              </Link>
              <Link
                href="/en/blog"
                onClick={closeMenu}
                className={`block w-full text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'blog'
                    ? 'text-teal-300'
                    : 'text-white'
                }`}
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default EnNavigation;
