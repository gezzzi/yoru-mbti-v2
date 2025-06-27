'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigation from './Navigation';

type PageType = 'home' | 'types' | 'quiz' | 'results' | 'compatibility' | 'compatibility-results';

const NavigationWrapper: React.FC = () => {
  const pathname = usePathname();
  const [hasTestResult, setHasTestResult] = useState(false);

  // パスから現在のページタイプを決定
  const getCurrentPage = (): PageType => {
    if (pathname === '/') return 'home';
    if (pathname === '/types') return 'types';
    if (pathname === '/test') return 'quiz';
    if (pathname.startsWith('/results')) return 'results';
    if (pathname === '/compatibility') return 'compatibility';
    if (pathname.startsWith('/compatibility/')) return 'compatibility-results';
    return 'home';
  };

  // ローカルストレージから診断結果をチェック
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = localStorage.getItem('personality_test_result');
      setHasTestResult(!!savedResult);
    }
  }, []);

  return (
    <Navigation 
      currentPage={getCurrentPage()}
      hasTestResult={hasTestResult}
    />
  );
};

export default NavigationWrapper; 