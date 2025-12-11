'use client';

import { useEffect } from 'react';
import { isMobileEnvironment } from '@/utils/device';

declare global {
  interface Window {
    admaxads?: Array<Record<string, unknown>>;
    __admaxOverlayQueued?: boolean;
  }
}

const OVERLAY_AD_ID = 'f70d71d55fd1ace582de8faff9f20c52';
const OVERLAY_SCRIPT_SRC = 'https://adm.shinobi.jp/st/t.js';

const MobileOverlayAd = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!isMobileEnvironment()) {
      return;
    }

    if (window.__admaxOverlayQueued) {
      return;
    }

    window.admaxads = window.admaxads || [];
    window.admaxads.push({ admax_id: OVERLAY_AD_ID, type: 'overlay' });
    window.__admaxOverlayQueued = true;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = OVERLAY_SCRIPT_SRC;
    script.async = true;
    script.dataset.admaxOverlay = 'true';
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default MobileOverlayAd;
