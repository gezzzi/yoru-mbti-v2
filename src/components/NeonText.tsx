'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface NeonTextProps {
  text: string | string[]; // 文字列または文字列配列（改行対応）
  specialCharIndex?: number; // 特別エフェクトを適用する文字のインデックス
  className?: string;
}

const NeonText: React.FC<NeonTextProps> = ({ text, specialCharIndex, className = '' }) => {
  const [isIPhone, setIsIPhone] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: false,
  });

  React.useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isIntersecting, hasAnimated]);

  React.useEffect(() => {
    const userAgent = navigator.userAgent;
    const checkIsIPhone = /iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIPhone(checkIsIPhone);
  }, []);
  // 配列の場合は改行で表示、文字列の場合は従来通り
  if (Array.isArray(text)) {
    let charIndex = 0;
    return (
      <div ref={ref} className={`neon-text ${className} ${hasAnimated ? 'has-animated' : ''} ${isIntersecting ? 'in-view' : ''}`}>
        {text.map((line, lineIndex) => (
          <div key={lineIndex} className="block">
            {line.split('').map((char, index) => {
              const currentCharIndex = charIndex++;
              return (
                <span
                  key={`${lineIndex}-${index}`}
                  className={`${isIPhone ? 'neon-char-iphone' : 'neon-char'} ${currentCharIndex === specialCharIndex ? 'special' : ''}`}
                  data-char={char}
                  style={{ '--char-index': currentCharIndex } as React.CSSProperties}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // 従来の文字列処理
  const characters = text.split('');
  return (
    <div ref={ref} className={`neon-text ${className} ${hasAnimated ? 'has-animated' : ''} ${isIntersecting ? 'in-view' : ''}`}>
      {characters.map((char, index) => (
        <span
          key={index}
          className={`${isIPhone ? 'neon-char-iphone' : 'neon-char'} ${index === specialCharIndex ? 'special' : ''}`}
          data-char={char}
          style={{ '--char-index': index } as React.CSSProperties}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default NeonText;