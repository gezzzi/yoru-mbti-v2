'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SimpleNeonTextProps {
  text: string | string[];
  className?: string;
}

const SimpleNeonText: React.FC<SimpleNeonTextProps> = ({ text, className = '' }) => {
  const textArray = Array.isArray(text) ? text : [text];
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  return (
    <div ref={ref} className={`simple-neon-text inline-flex flex-col ${className} ${isIntersecting ? 'in-view' : ''}`}>
      {textArray.map((line, lineIndex) => (
        <div key={lineIndex} className="flex justify-center">
          {line.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="simple-neon-char"
              style={{
                color: 'transparent',
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: '#ffeb3b',
                textShadow: isIntersecting ? '0 0 10px #ffeb3b' : 'none',
                WebkitFontSmoothing: 'antialiased',
                fontWeight: 'bold',
                display: 'inline-block',
                '--char-index': charIndex
              } as React.CSSProperties}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SimpleNeonText;