import Script from 'next/script';

export const ADMAX_INTERSTITIAL_ID = '15e0489889c928f8f3fef7ad03f62372';
export const ADMAX_INTERSTITIAL_SCRIPT_SRC = 'https://adm.shinobi.jp/st/t.js';

declare global {
  interface Window {
    admaxads?: Array<Record<string, unknown>>;
    __admaxActionQueued?: boolean;
  }
}

const INIT_SNIPPET = `(() => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return;
  }
  if (window.__admaxActionQueued) {
    return;
  }
  const ua = navigator.userAgent || '';
  const isMobile = /iPhone|iPad|Android.+Mobile|Windows Phone|iPod/i.test(ua) ||
    (typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 768px)').matches : false);
  if (!isMobile) {
    return;
  }
  window.admaxads = window.admaxads || [];
  window.admaxads.push({ admax_id: '${ADMAX_INTERSTITIAL_ID}', type: 'action' });
  window.__admaxActionQueued = true;
})();`;

const MobileInterstitialScript = () => (
  <>
    <Script id="admax-action-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: INIT_SNIPPET }} />
    <Script id="admax-action-loader" strategy="beforeInteractive" src={ADMAX_INTERSTITIAL_SCRIPT_SRC} async />
  </>
);

export default MobileInterstitialScript;
