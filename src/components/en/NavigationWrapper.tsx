'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import EnNavigation from './Navigation';

type PageType = 'home' | 'types' | 'quiz' | 'results' | 'compatibility' | 'compatibility-results' | 'privacy' | 'blog' | 'stats';

const EnNavigationWrapper: React.FC = () => {
  const pathname = usePathname();
  const [hasTestResult, setHasTestResult] = useState(false);

  const getCurrentPage = (): PageType => {
    if (pathname === '/en' || pathname === '/en/') return 'home';
    if (pathname === '/en/types') return 'types';
    if (pathname === '/en/test') return 'quiz';
    if (pathname.startsWith('/en/results')) return 'results';
    if (pathname === '/en/compatibility') return 'compatibility';
    if (pathname.startsWith('/en/compatibility/')) return 'compatibility-results';
    if (pathname === '/en/privacy') return 'privacy';
    if (pathname.startsWith('/en/blog')) return 'blog';
    if (pathname === '/en/stats') return 'stats';
    return 'home';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('en_personality_test_result');
      setHasTestResult(!!savedResult);
    }
  }, []);

  return (
    <EnNavigation
      currentPage={getCurrentPage()}
      hasTestResult={hasTestResult}
    />
  );
};

export default EnNavigationWrapper;
