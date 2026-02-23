'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: 'ja' | 'en';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getPathForLocale = (locale: 'ja' | 'en'): string => {
    if (locale === currentLocale) return pathname;
    if (locale === 'en') {
      return `/en${pathname}`;
    } else {
      return pathname.replace(/^\/en/, '') || '/';
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm font-medium text-white/70 hover:text-white transition-colors"
        aria-label="Language"
      >
        <Globe className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-slate-700 rounded-lg shadow-lg border border-white/10 overflow-hidden min-w-[140px]">
          <Link
            href={getPathForLocale('ja')}
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 text-sm transition-colors ${
              currentLocale === 'ja'
                ? 'text-teal-300 bg-white/10'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            日本語
          </Link>
          <Link
            href={getPathForLocale('en')}
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 text-sm transition-colors ${
              currentLocale === 'en'
                ? 'text-teal-300 bg-white/10'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            English
          </Link>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
