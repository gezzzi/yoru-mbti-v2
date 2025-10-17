import React from 'react';

interface WaveDividerProps {
  fromColor: string;
  toColor: string;
  variant?: 'wave' | 'wave-reverse';
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fromColor,
  toColor,
  variant = 'wave',
  className = ''
}) => {
  const path = variant === 'wave'
    ? "M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,80 L0,80 Z"
    : "M0,20 Q150,60 300,20 T600,20 T900,20 T1200,20 L1200,80 L0,80 Z";

  // ユニークなIDを生成（色のHEXコードから特殊文字を削除）
  const gradientId = `gradient-${fromColor.replace('#', '')}-${toColor.replace('#', '')}`;

  return (
    <div className={`absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none ${className}`} style={{ height: '80px', zIndex: 10 }}>
      <svg
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 80"
        style={{ minWidth: '100%' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="1" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill={`url(#${gradientId})`}
        />
      </svg>
    </div>
  );
};

// モバイル用の高さを調整したバージョン
export const WaveDividerMobile: React.FC<WaveDividerProps> = ({
  fromColor,
  toColor,
  variant = 'wave',
  className = ''
}) => {
  const path = variant === 'wave'
    ? "M0,30 Q150,10 300,30 T600,30 T900,30 T1200,30 L1200,50 L0,50 Z"
    : "M0,10 Q150,30 300,10 T600,10 T900,10 T1200,10 L1200,50 L0,50 Z";

  return (
    <div className={`absolute bottom-0 left-0 w-full overflow-hidden md:hidden ${className}`} style={{ height: '50px' }}>
      <svg
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1200 50"
        style={{ minWidth: '100%' }}
      >
        <defs>
          <linearGradient id={`gradient-mobile-${fromColor}-${toColor}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} stopOpacity="1" />
            <stop offset="100%" stopColor={toColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill={`url(#gradient-mobile-${fromColor}-${toColor})`}
        />
      </svg>
    </div>
  );
};