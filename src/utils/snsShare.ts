import { TestResult } from '../types/personality';

// 公開タグリスト
const publicTags = [
  '🔥 欲望の炎',
  '💬 言語プレイ派',
  '🛁 アフターケア必須',
  '⛏️ 開拓派',
  '🕯 ロマン重視',
  '⚡️ スピード勝負派',
  '🏃‍♂️ 衝動トリガー型',
  '📅 準備派',
  '🚪 NG明確',
  '🙈 言い出しにくい派',
  '🎧 感覚演出派',
  '🧼 ケア＆衛生重視',
  '🛡 安全第一派',
  '🌙 深夜エロス',
  '☀️ 朝型エロス',
  '🔄 リピート求め派',
  '🗣 下ネタOK'
];

// 5軸データと公開タグ、秘密の回答から相性診断コードを生成
export const generateCompatibilityCode = (result: TestResult, secretAnswer?: { questionId: number; answer: number }): string => {
  // 各軸の値を0-100の整数値に変換
  const v1 = Math.round(result.E);
  const v2 = Math.round(result.L);
  const v3 = Math.round(result.A);
  const v4 = Math.round(result.L2);
  const v5 = Math.round(result.O);
  
  // 公開タグのビットフラグを生成（最大17タグ = 17ビット）
  let tagFlags = 0;
  if (result.additionalResults?.tags) {
    result.additionalResults.tags.forEach(tag => {
      const index = publicTags.indexOf(tag);
      if (index >= 0) {
        tagFlags |= (1 << index);
      }
    });
  }
  
  // 5軸データを1つの数値にエンコード
  const axisValue = v1 * Math.pow(101, 4) + 
                    v2 * Math.pow(101, 3) + 
                    v3 * Math.pow(101, 2) + 
                    v4 * Math.pow(101, 1) + 
                    v5 * Math.pow(101, 0);
  
  // 36進数に変換（軸データとタグデータを分けて結合）
  const axisCode = axisValue.toString(36).toUpperCase();
  const tagCode = tagFlags.toString(36).toUpperCase();
  
  // 秘密の回答がある場合は追加
  if (secretAnswer) {
    const secretCode = `${secretAnswer.questionId.toString(36)}${secretAnswer.answer.toString(36)}`.toUpperCase();
    return `${axisCode}-${tagCode}-${secretCode}`;
  }
  
  // ハイフンで区切って返す
  return `${axisCode}-${tagCode}`;
};

// 相性診断コードから5軸データと公開タグ、秘密の回答を復元
export const parseCompatibilityCode = (code: string): { result: TestResult | null; secretAnswer?: { questionId: number; answer: number } } => {
  if (!code || code.length === 0) return { result: null };
  
  try {
    // ハイフンで分割（新フォーマット）または旧フォーマットとして処理
    const parts = code.split('-');
    let axisCode: string;
    let tagCode: string | null = null;
    let secretCode: string | null = null;
    
    if (parts.length === 3) {
      // 秘密の回答付きフォーマット：軸データ-タグデータ-秘密データ
      axisCode = parts[0];
      tagCode = parts[1];
      secretCode = parts[2];
    } else if (parts.length === 2) {
      // 新フォーマット：軸データ-タグデータ
      axisCode = parts[0];
      tagCode = parts[1];
    } else {
      // 旧フォーマット：軸データのみ
      axisCode = code;
    }
    
    // 36進数から10進数に変換
    const value = parseInt(axisCode.toUpperCase(), 36);
    
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
      return { result: null };
    }
    
    // タグデータの復元
    let tags: string[] = [];
    if (tagCode) {
      const tagFlags = parseInt(tagCode, 36);
      for (let i = 0; i < publicTags.length; i++) {
        if (tagFlags & (1 << i)) {
          tags.push(publicTags[i]);
        }
      }
    }
    
    // 秘密の回答の復元
    let secretAnswer: { questionId: number; answer: number } | undefined;
    if (secretCode && secretCode.length >= 2) {
      try {
        const questionId = parseInt(secretCode.substring(0, secretCode.length - 1), 36);
        const answer = parseInt(secretCode.substring(secretCode.length - 1), 36);
        if (questionId >= 36 && questionId <= 40 && answer >= 0 && answer <= 6) {
          secretAnswer = { questionId, answer };
        }
      } catch {
        // 秘密データの復元に失敗しても続行
      }
    }
    
    const result: TestResult = {
      E: v1,
      L: v2,
      A: v3,
      L2: v4,
      O: v5,
      type: null as any, // 型判定は別途実行する必要がある
      additionalResults: tags.length > 0 ? { tags } as any : undefined
    };
    
    return { result, secretAnswer };
  } catch {
    return { result: null };
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
): Promise<boolean | 'cancelled'> => {
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
  } catch (error: any) {
    // ユーザーがキャンセルした場合は 'AbortError' が発生する
    if (error.name === 'AbortError') {
      console.log('ユーザーがシェアをキャンセルしました');
      return 'cancelled';
    }
    console.error('Web Share APIでのシェアに失敗しました:', error);
    return false;
  }
};

// SNS投稿テキストを生成
export const generateSNSShareText = (result: TestResult): string => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-site.com';
  
  const shareText = `【夜の性格診断】
🌙 性格診断結果 🌙
タイプ: ${result.type.name}（${result.type.code}）
相性診断してみて！
${siteUrl}
#夜の性格診断 #相性チェック`;

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

// Instagramでシェアするためのテキスト（アプリで開く）
export const shareToInstagram = (text: string): void => {
  if (navigator.share) {
    navigator.share({
      text: text,
      url: typeof window !== 'undefined' ? window.location.origin : ''
    }).catch(console.error);
  } else {
    // フォールバック: テキストをクリップボードにコピー
    copyToClipboard(text);
    alert('テキストをコピーしました。Instagramアプリで投稿してください。');
  }
};

// FacebookでシェアするためのURL生成
export const generateFacebookShareURL = (result: TestResult): string => {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const encodedUrl = encodeURIComponent(siteUrl);
  const text = generateSNSShareText(result);
  const encodedText = encodeURIComponent(text);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
};

// Discordでシェアするためのテキスト（クリップボードにコピー）
export const shareToDiscord = (text: string): void => {
  copyToClipboard(text);
  alert('テキストをコピーしました。Discordで貼り付けてください。');
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
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://your-site.com';
  const comment = 'あなたと相性抜群の相手はどんな人？'; // 興味を引く一言
  return `【夜の性格診断】\n` +
    `❤️ 相性診断結果 ❤️\n` +
    `私: ${myResult.type.name}（${myResult.type.code}）\n` +
    `相手: ${partnerResult.type.name}（${partnerResult.type.code}）\n` +
    `相性スコア: ${compatibilityPercent}%\n` +
    `${comment}\n` +
    `${siteUrl}\n` +
    `#夜の性格診断 #相性チェック`;
}; 