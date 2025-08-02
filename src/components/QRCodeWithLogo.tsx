'use client';

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeWithLogoProps {
  value: string;
  size?: number;
  logoSrc?: string;
  logoSizeRatio?: number;
  className?: string;
}

const QRCodeWithLogo: React.FC<QRCodeWithLogoProps> = ({
  value,
  size = 200,
  logoSrc = '/icon-192.png',
  logoSizeRatio = 0.25, // QRコードサイズの25%
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      if (!canvasRef.current) return;

      try {
        // QRコード生成
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
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        const logo = new Image();
        logo.crossOrigin = 'anonymous'; // CORS対応
        logo.src = logoSrc;
        
        logo.onload = () => {
          const logoSize = size * logoSizeRatio;
          const logoPosition = (size - logoSize) / 2;

          // 白い背景を円形で描画
          ctx.save();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, logoSize / 2 + 8, 0, 2 * Math.PI);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.restore();

          // ロゴを円形にクリップして描画
          ctx.save();
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, logoSize / 2, 0, 2 * Math.PI);
          ctx.clip();
          ctx.drawImage(logo, logoPosition, logoPosition, logoSize, logoSize);
          ctx.restore();
        };

        logo.onerror = () => {
          console.error('ロゴの読み込みに失敗しました:', logoSrc);
        };
      } catch (error) {
        console.error('QRコードの生成に失敗しました:', error);
      }
    };

    generateQR();
  }, [value, size, logoSrc, logoSizeRatio]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default QRCodeWithLogo;