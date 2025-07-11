import { TestResult } from '../types/personality';

// 5軸データから相性診断コードを生成（36進数表記）
export const generateCompatibilityCode = (result: TestResult): string => {
  // 各軸の値を0-100の整数値に変換
  const v1 = Math.round(result.E);
  const v2 = Math.round(result.D);
  const v3 = Math.round(result.T);
  const v4 = Math.round(result.R);
  const v5 = Math.round(result.A);
  
  // 数式: 値 = v1×101⁴ + v2×101³ + v3×101² + v4×101¹ + v5×101⁰
  const value = v1 * Math.pow(101, 4) + 
                v2 * Math.pow(101, 3) + 
                v3 * Math.pow(101, 2) + 
                v4 * Math.pow(101, 1) + 
                v5 * Math.pow(101, 0);
  
  // 36進数に変換
  return value.toString(36).toUpperCase();
};

// 相性診断コードから5軸データを復元（36進数表記）
export const parseCompatibilityCode = (code: string): TestResult | null => {
  if (!code || code.length === 0) return null;
  
  try {
    // 36進数から10進数に変換
    const value = parseInt(code.toUpperCase(), 36);
    
    // 数式の逆算: 値 = v1×101⁴ + v2×101³ + v3×101² + v4×101¹ + v5×101⁰
    // 各軸の値を順次計算
    let remaining = value;
    
    const v1 = Math.floor(remaining / Math.pow(101, 4));
    remaining = remaining % Math.pow(101, 4);
    
    const v2 = Math.floor(remaining / Math.pow(101, 3));
    remaining = remaining % Math.pow(101, 3);
    
    const v3 = Math.floor(remaining / Math.pow(101, 2));
    remaining = remaining % Math.pow(101, 2);
    
    const v4 = Math.floor(remaining / Math.pow(101, 1));
    remaining = remaining % Math.pow(101, 1);
    
    const v5 = remaining;
    
    // 値の範囲チェック（0-100）
    if (v1 < 0 || v1 > 100 || v2 < 0 || v2 > 100 || 
        v3 < 0 || v3 > 100 || v4 < 0 || v4 > 100 || 
        v5 < 0 || v5 > 100) {
      return null;
    }
    
    return {
      E: v1,
      D: v2,
      T: v3,
      R: v4,
      A: v5,
      type: null as any // 型判定は別途実行する必要がある
    };
  } catch {
    return null;
  }
};

// QRコードのSVGをFileオブジェクトに変換
export const convertQRCodeToFile = async (qrCodeElement: HTMLDivElement, fileName: string): Promise<File | null> => {
  try {
    const svg = qrCodeElement.querySelector('svg');
    if (!svg) throw new Error('QRコードが見つかりません');

    // SVGをCanvasに変換
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.createElement('img') as HTMLImageElement;
    
    // SVGをData URLに変換
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = 400;
        canvas.height = 400;
        ctx?.drawImage(img, 0, 0, 400, 400);
        
        // CanvasをBlobに変換
        canvas.toBlob((blob) => {
          if (blob) {
            // BlobをFileに変換
            const file = new File([blob], fileName, { type: 'image/png' });
            resolve(file);
          } else {
            reject(new Error('QRコードの変換に失敗しました'));
          }
        }, 'image/png');
        
        URL.revokeObjectURL(svgUrl);
      };

      img.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        reject(new Error('QRコードの画像変換に失敗しました'));
      };

      img.src = svgUrl;
    });
  } catch (error) {
    console.error('QRコードの変換エラー:', error);
    return null;
  }
};

// Web Share API Level 2の対応チェック
export const isWebShareAPILevel2Supported = (): boolean => {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }
  
  // Web Share API Level 2の機能（filesプロパティ）をサポートしているかチェック
  return 'canShare' in navigator && typeof navigator.canShare === 'function';
};

// Web Share API Level 2を使ってQRコードとテキストを同時にシェア
export const shareWithWebAPI = async (
  text: string, 
  qrCodeElement: HTMLDivElement,
  fileName: string,
  title?: string
): Promise<boolean> => {
  if (!isWebShareAPILevel2Supported()) {
    return false;
  }

  try {
    // QRコードをFileに変換
    const qrFile = await convertQRCodeToFile(qrCodeElement, fileName);
    if (!qrFile) throw new Error('QRコードの変換に失敗しました');

    const shareData = {
      title: title || '夜の性格診断',
      text: text,
      files: [qrFile]
    };

    // Web Share APIでファイルをシェアできるかチェック
    if (navigator.canShare && !navigator.canShare(shareData)) {
      console.log('このデバイスではファイルシェアがサポートされていません');
      return false;
    }

    // Web Share API Level 2でシェア
    await navigator.share(shareData);
    return true;
  } catch (error) {
    console.error('Web Share APIでのシェアに失敗しました:', error);
    return false;
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

// 相性診断結果用のSNS投稿テキストを生成
export const generateCompatibilityShareText = (myResult: TestResult, partnerResult: TestResult, compatibilityPercent: number): string => {
  const siteUrl = 'http://localhost:3001';
  const comment = 'あなたと相性抜群の相手はどんな人？診断してみて！'; // 興味を引く一言
  return `【夜の性格診断】\n` +
    `🌙 相性診断結果 🌙\n` +
    `私: ${myResult.type.name}（${myResult.type.code}）\n` +
    `相手: ${partnerResult.type.name}（${partnerResult.type.code}）\n` +
    `相性スコア: ${compatibilityPercent}%\n` +
    `${comment}\n` +
    `${siteUrl} #夜の性格診断 #相性チェック`;
}; 