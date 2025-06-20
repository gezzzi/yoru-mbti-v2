import { TestResult } from '../types/personality';

// 5軸データから相性診断コードを生成
export const generateCompatibilityCode = (result: TestResult): string => {
  // 各軸の値を2桁の数値として表現し、結合してコードを作成
  const E = Math.round((result.E / 100) * 99).toString().padStart(2, '0');
  const D = Math.round((result.D / 100) * 99).toString().padStart(2, '0');
  const T = Math.round((result.T / 100) * 99).toString().padStart(2, '0');
  const R = Math.round((result.R / 100) * 99).toString().padStart(2, '0');
  const A = Math.round((result.A / 100) * 99).toString().padStart(2, '0');
  
  // コードの形式: E-D-T-R-A
  return `${E}${D}${T}${R}${A}`;
};

// 相性診断コードから5軸データを復元
export const parseCompatibilityCode = (code: string): TestResult | null => {
  if (code.length !== 10) return null;
  
  try {
    const E = (parseInt(code.substr(0, 2)) / 99) * 100;
    const D = (parseInt(code.substr(2, 2)) / 99) * 100;
    const T = (parseInt(code.substr(4, 2)) / 99) * 100;
    const R = (parseInt(code.substr(6, 2)) / 99) * 100;
    const A = (parseInt(code.substr(8, 2)) / 99) * 100;
    
    return {
      E,
      D,
      T, 
      R,
      A,
      type: null as any // 型判定は別途実行する必要がある
    };
  } catch {
    return null;
  }
};

// SNS投稿テキストを生成
export const generateSNSShareText = (result: TestResult): string => {
  const compatibilityCode = generateCompatibilityCode(result);
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-site.com';
  
  const shareText = `【夜の性格診断】
🌙 私の性格診断結果 🌙
タイプ: ${result.type.name}（${result.type.code}）
相性診断してみて！
[相性診断コード: ${compatibilityCode}]
${siteUrl} #夜の性格診断 #相性チェック`;

  return shareText;
};

// TwitterでシェアするためのURL生成
export const generateTwitterShareURL = (result: TestResult): string => {
  const text = generateSNSShareText(result);
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?text=${encodedText}`;
};

// LINEでシェアするためのURL生成
export const generateLineShareURL = (result: TestResult): string => {
  const text = generateSNSShareText(result);
  const encodedText = encodeURIComponent(text);
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}&text=${encodedText}`;
};

// クリップボードにコピー
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // フォールバック方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error('クリップボードへのコピーに失敗しました:', error);
    return false;
  }
}; 