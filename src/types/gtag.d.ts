/**
 * Google Analytics gtag.js 型定義
 * 
 * GA4直接導入用のTypeScript型定義
 */

type GtagCommand = 'config' | 'event' | 'js' | 'set';

interface GtagEventParams {
  [key: string]: string | number | boolean | undefined | null;
}

declare global {
  interface Window {
    gtag: (
      command: GtagCommand,
      targetId: string | Date,
      params?: GtagEventParams
    ) => void;
    // dataLayerは互換性のため残す（gtagが内部で使用）
    dataLayer: Array<unknown>;
  }
}

export {};

