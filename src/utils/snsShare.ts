import { TestResult } from '../types/personality';

// タグの定義（順序が重要）
const ALL_TAGS = [
  '🔥 欲望の炎',
  '💬 言語プレイ派',
  '🎭 ロールプレイ好き',
  '🛁 アフターケア必須',
  '⛏️ 開拓派',
  '🧷 軽SM耐性あり',
  '🕯 ロマン重視',
  '⚡️ スピード勝負派',
  '🏃‍♂️ 衝動トリガー型',
  '🪞 鏡プレイ好き',
  '🚪 NG明確',
  '🎮 ゲーム派',
  '🧥 コスプレ派',
  '🧼 ケア＆衛生重視',
  '🕵️‍♀️ 覗き見興奮派',
  '🛡 安全第一派',
  '📱 デジタル前戯派',
  '💋 キス魔',
  '☀️ 朝型エロス',
  '🔄 リピート求め派',
  '🗣 下ネタOK',
  '📚 学習研究派',
  '🧭 ガイド派',
  '🤹‍♀️ マルチタスク派',
  '💤 まったり派'
];

// 5軸データとすべてのタグスコア、秘密の回答から相性診断コードを生成
export const generateCompatibilityCode = (result: TestResult, secretAnswer?: { questionId: number; answer: number }): string => {
  // 各軸の値を0-100の整数値に変換
  const v1 = Math.round(result.E);
  const v2 = Math.round(result.L);
  const v3 = Math.round(result.A);
  const v4 = Math.round(result.L2);
  const v5 = Math.round(result.O);
  
  // 5軸データを1つの数値にエンコード
  const axisValue = v1 * Math.pow(101, 4) + 
                    v2 * Math.pow(101, 3) + 
                    v3 * Math.pow(101, 2) + 
                    v4 * Math.pow(101, 1) + 
                    v5 * Math.pow(101, 0);
  
  // 36進数に変換し、7文字固定長にパディング
  // 最大値は 100×(101^4 + 101^3 + 101^2 + 101 + 1) ≈ 10,510,100,500
  // これは36進数で "5YRHQX" (6文字) なので、7文字でパディングすれば十分
  const axisCode = axisValue.toString(36).toUpperCase().padStart(7, '0');
  
  // すべてのタグスコアをエンコード
  let tagCode = '';
  if (result.additionalResults?.tagScores) {
    // 各タグのスコアを0-6の値と1文字にエンコード
    const scores: string[] = [];
    ALL_TAGS.forEach(tag => {
      const tagScore = result.additionalResults?.tagScores?.find(ts => ts.tag === tag);
      const score = tagScore ? tagScore.score : 3; // デフォルトは3（どちらでもない）
      scores.push(score.toString());
    });
    
    // 25個のスコアを5グループに分けてエンコード
    // 各グループを5桁の7進数に変換（0-16806 = 7^5-1）
    for (let i = 0; i < 5; i++) {
      const groupScores = scores.slice(i * 5, (i + 1) * 5);
      let groupValue = 0;
      groupScores.forEach((score, index) => {
        groupValue += parseInt(score) * Math.pow(7, 4 - index);
      });
      // グループの値を36進数に変換（3文字固定）
      tagCode += groupValue.toString(36).toUpperCase().padStart(3, '0');
    }
  }
  
  // 秘密の回答がある場合は追加
  if (secretAnswer) {
    const secretCode = `${secretAnswer.questionId.toString(36)}${secretAnswer.answer.toString(36)}`.toUpperCase();
    return tagCode ? `${axisCode}-${tagCode}-${secretCode}` : `${axisCode}--${secretCode}`;
  }
  
  // ハイフンで区切って返す
  return tagCode ? `${axisCode}-${tagCode}` : axisCode;
};

// 相性診断コードから5軸データとすべてのタグスコア、秘密の回答を復元
export const parseCompatibilityCode = (code: string): { result: TestResult | null; secretAnswer?: { questionId: number; answer: number } } => {
  if (!code || code.length === 0) return { result: null };
  
  try {
    // ハイフンで分割
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
      // タグデータ付き：軸データ-タグデータ
      axisCode = parts[0];
      tagCode = parts[1];
    } else {
      // 軸データのみ
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
    
    // タグスコアの復元
    let tags: string[] = [];
    let tagScores: { tag: string; score: number }[] = [];
    
    if (tagCode && tagCode.length === 15) { // 5グループ × 3文字 = 15文字
      try {
        // 5グループに分割
        for (let i = 0; i < 5; i++) {
          const groupCode = tagCode.substring(i * 3, (i + 1) * 3);
          const groupValue = parseInt(groupCode.toUpperCase(), 36);
          
          // グループの値から5つのスコアを復元
          for (let j = 0; j < 5; j++) {
            const tagIndex = i * 5 + j;
            if (tagIndex < ALL_TAGS.length) {
              const score = Math.floor(groupValue / Math.pow(7, 4 - j)) % 7;
              tagScores.push({ tag: ALL_TAGS[tagIndex], score });
              // スコア4以上のタグをtags配列に追加
              if (score >= 4) {
                tags.push(ALL_TAGS[tagIndex]);
              }
            }
          }
        }
      } catch {
        // タグデータの復元に失敗
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
        // 秘密データの復元に失敗
      }
    }
    
    const result: TestResult = {
      E: v1,
      L: v2,
      A: v3,
      L2: v4,
      O: v5,
      type: null as any, // 型判定は別途実行する必要がある
      additionalResults: (tags.length > 0 || tagScores.length > 0) ? { tags, tagScores } as any : undefined
    };
    
    return { result, secretAnswer };
  } catch {
    return { result: null };
  }
};

// QRコードのSVGまたはCanvasをFileオブジェクトに変換
export const convertQRCodeToFile = async (qrCodeElement: HTMLDivElement, fileName: string): Promise<File | null> => {
  try {
    // まずcanvas要素を探す
    const canvas = qrCodeElement.querySelector('canvas');
    if (canvas) {
      // Canvas要素の場合
      return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], fileName, { type: 'image/png' });
            resolve(file);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        }, 'image/png');
      });
    }

    // SVG要素の場合（フォールバック）
    const svg = qrCodeElement.querySelector('svg');
    if (!svg) throw new Error('QRコードが見つかりません');

    // SVGをCanvasに変換
    const canvasElement = document.createElement('canvas');
    const ctx = canvasElement.getContext('2d');
    const img = document.createElement('img') as HTMLImageElement;
    
    // SVGをData URLに変換
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvasElement.width = 400;
        canvasElement.height = 400;
        ctx?.drawImage(img, 0, 0, 400, 400);
        
        // CanvasをBlobに変換
        canvasElement.toBlob((blob) => {
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