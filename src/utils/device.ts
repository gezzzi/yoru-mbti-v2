export const isMobileEnvironment = () => {
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
