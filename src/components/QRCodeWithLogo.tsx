'use client';

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeWithLogoProps {
  value: string;
  size?: number;
  logoSrc?: string;
  logoSizeRatio?: number;
  className?: string;
  onGenerated?: (dataUrl: string) => void; // QRコード生成完了時のコールバック
}

const QRCodeWithLogo: React.FC<QRCodeWithLogoProps> = ({
  value,
  size = 200,
  logoSrc = '/icon-512.png',
  logoSizeRatio = 0.18, // QRコードサイズの18%
  className = '',
  onGenerated,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      try {
        // デバイスピクセル比を取得（Retina対応）
        const dpr = window.devicePixelRatio || 1;
        const scaledSize = size * dpr;

        // Canvas要素の実際のサイズを設定（高解像度）
        canvasRef.current.width = scaledSize;
        canvasRef.current.height = scaledSize;

        // Canvas要素の表示サイズを設定
        canvasRef.current.style.width = `${size}px`;
        canvasRef.current.style.height = `${size}px`;

        // QRコード生成（高解像度）
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        // スケーリングを適用
        ctx.scale(dpr, dpr);

        await QRCode.toCanvas(canvasRef.current, value, {
          width: size,
          margin: 2,
          errorCorrectionLevel: 'H', // 高エラー訂正レベル（最大30%の破損に対応）
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        });

        // ロゴ追加
        // アンチエイリアスと高品質な画像スケーリングを有効化
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const logo = new Image();
        logo.crossOrigin = 'anonymous'; // CORS対応
        logo.src = logoSrc;
        
        logo.onload = () => {
          const logoSize = size * logoSizeRatio;
          const logoPosition = (size - logoSize) / 2;
          const padding = size * 0.03; // パディングをQRコードサイズの3%に（比例調整）
          const backgroundSize = logoSize + padding * 2;
          const backgroundPosition = (size - backgroundSize) / 2;
          const borderRadius = logoSize * 0.2; // 角丸の半径（ロゴサイズの20%）

          // 角丸正方形を描画する関数
          const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
          };

          // 白い背景を角丸正方形で描画（アンチエイリアス付き）
          ctx.save();
          drawRoundedRect(backgroundPosition, backgroundPosition, backgroundSize, backgroundSize, borderRadius + 2);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.restore();

          // ロゴを角丸正方形にクリップして描画
          ctx.save();
          drawRoundedRect(logoPosition, logoPosition, logoSize, logoSize, borderRadius);
          ctx.clip();
          ctx.drawImage(logo, logoPosition, logoPosition, logoSize, logoSize);
          ctx.restore();

          // 生成完了時にData URLをコールバックで渡す
          if (onGenerated && canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL('image/png');
            onGenerated(dataUrl);
          }
        };

        logo.onerror = () => {
          console.error('ロゴの読み込みに失敗しました:', logoSrc);
          // ロゴなしでもQRコードは生成されているのでコールバックを呼ぶ
          if (onGenerated && canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL('image/png');
            onGenerated(dataUrl);
          }
        };
      } catch (error) {
        console.error('QRコードの生成に失敗しました:', error);
      }
    };

    generateQR();
  }, [value, size, logoSrc, logoSizeRatio, onGenerated]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
    />
  );
};

export default QRCodeWithLogo;