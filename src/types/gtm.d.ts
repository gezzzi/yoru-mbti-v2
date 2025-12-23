// GTM DataLayer 型定義
export interface GTMDataLayerEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: GTMDataLayerEvent[];
  }
}

export {};

