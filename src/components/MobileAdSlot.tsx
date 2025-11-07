'use client';

import { useEffect, useRef, useState } from 'react';
import { injectAdIntoContainer } from '@/utils/admax';

const MOBILE_AD_SCRIPT_SRC = 'https://adm.shinobi.jp/s/8b5525003a4d77c811584b5c2e75fefd';

interface MobileAdSlotProps {
  className?: string;
  slotId?: string;
}

const isMobileEnvironment = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const ua = window.navigator.userAgent;
  const isMobileUA = /iPhone|iPad|Android.+Mobile|Windows Phone|iPod/i.test(ua);
  const isSmallViewport = typeof window.matchMedia === 'function'
    ? window.matchMedia('(max-width: 768px)').matches
    : window.innerWidth <= 768;

  return isMobileUA || isSmallViewport;
};

const MobileAdSlot = ({ className, slotId = 'mobile-ad-slot' }: MobileAdSlotProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [hasInjected, setHasInjected] = useState(false);

  useEffect(() => {
    setShouldRender(isMobileEnvironment());
  }, []);

  useEffect(() => {
    if (!shouldRender || hasInjected) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const restore = injectAdIntoContainer(container, MOBILE_AD_SCRIPT_SRC, () => {
      setHasInjected(true);
    });

    return () => {
      restore();
      container.innerHTML = '';
    };
  }, [shouldRender, hasInjected]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      data-admax-container={slotId}
      aria-label="広告"
    />
  );
};

export default MobileAdSlot;
