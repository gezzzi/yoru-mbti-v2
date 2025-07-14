'use client';

import React from 'react';

interface SimpleNeonTextProps {
  text: string | string[];
  className?: string;
}

const SimpleNeonText: React.FC<SimpleNeonTextProps> = ({ text, className = '' }) => {
  const textArray = Array.isArray(text) ? text : [text];
  
  return (
    <div className={`simple-neon-text inline-flex flex-col ${className}`}>
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
                textStroke: '1px #ffeb3b',
                textShadow: '0 0 10px #ffeb3b',
                WebkitFontSmoothing: 'antialiased',
                fontWeight: 'bold',
                display: 'inline-block'
              }}
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