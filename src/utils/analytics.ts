/**
 * GA4 Analytics ユーティリティ
 * 
 * GTMを介さず、gtag.jsで直接GA4にイベントを送信します。
 * Cursor Agentがコードを見れば、どこでどのようなイベントを計測しているか把握できます。
 */

// GA4測定ID（環境変数から取得、フォールバックあり）
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// gtag関数の型定義
type GtagCommand = 'config' | 'event' | 'js' | 'set';

interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

// window.gtagの存在チェック付きラッパー
const gtag = (command: GtagCommand, targetId: string | Date, params?: GtagEventParams) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(command, targetId, params);
  }
};

// ============================================
// ページビュー・基本イベント
// ============================================

/**
 * ページビューを計測
 */
export const trackPageView = (path: string, title?: string) => {
  gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
};

// ============================================
// 診断テスト関連イベント
// ============================================

/**
 * テスト開始を計測
 */
export const trackTestStart = () => {
  gtag('event', 'test_start', {
    event_category: 'engagement',
  });
};

/**
 * 診断結果を計測（メインイベント）
 */
export const trackTestComplete = (params: {
  resultType: string;           // 'FAL', 'LAL' など
  resultTypeFull: string;       // 'FAL-EO' など
  resultName: string;           // '情熱的リーダー' など
  fiveAxisCode: string;         // 'ELALO' など
  scoreE: number;
  scoreL: number;
  scoreA: number;
  scoreL2: number;
  scoreO: number;
  smTendency: string;
  tags: string[];
  usernameProvided: boolean;
}) => {
  gtag('event', 'test_complete', {
    result_type: params.resultType,
    result_type_full: params.resultTypeFull,
    result_name: params.resultName,
    five_axis_code: params.fiveAxisCode,
    score_e: params.scoreE,
    score_l: params.scoreL,
    score_a: params.scoreA,
    score_l2: params.scoreL2,
    score_o: params.scoreO,
    sm_tendency: params.smTendency,
    tags: params.tags.join(','),
    username_provided: params.usernameProvided,
  });
};

// ============================================
// 相性診断関連イベント
// ============================================

/**
 * 相性診断結果を計測
 */
export const trackCompatibilityResult = (params: {
  myType: string;
  partnerType: string;
  compatibilityScore?: number;
}) => {
  gtag('event', 'compatibility_result', {
    my_type: params.myType,
    partner_type: params.partnerType,
    compatibility_score: params.compatibilityScore,
  });
};

// ============================================
// ユーザーインタラクション
// ============================================

/**
 * AI分析クリックを計測（結果画面）
 */
export const trackAiAnalysisClickResults = () => {
  gtag('event', 'ai_analysis_click', {
    page_location: 'results',
  });
};

/**
 * AI分析クリックを計測（相性結果画面）
 */
export const trackAiAnalysisClickCompatibility = () => {
  gtag('event', 'ai_analysis_click', {
    page_location: 'compatibility',
  });
};

/**
 * SNSシェアを計測
 */
export const trackShare = (platform: string, contentType: string) => {
  gtag('event', 'share', {
    method: platform,
    content_type: contentType,
  });
};

/**
 * 外部リンククリックを計測
 */
export const trackOutboundLink = (url: string) => {
  gtag('event', 'click', {
    event_category: 'outbound',
    event_label: url,
  });
};

// ============================================
// カスタムイベント（汎用）
// ============================================

/**
 * 汎用カスタムイベント送信
 */
export const trackCustomEvent = (
  eventName: string,
  params?: GtagEventParams
) => {
  gtag('event', eventName, params);
};

