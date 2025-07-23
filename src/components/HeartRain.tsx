'use client';

import React, { useEffect, useRef } from 'react';

const HeartRain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartTypes = ['♡', '❤', '💕', '💖', '💗'];
  const heartColors = ['#ff4757', '#ff6b7a', '#ff8b94', '#ffa0a9', '#ffb5bd'];

  useEffect(() => {
    if (!containerRef.current) return;

    const createHeart = () => {
      if (!containerRef.current) return;
      
      const heart = document.createElement('div');
      heart.className = 'falling-heart';
      heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
      heart.style.position = 'absolute';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
      heart.style.animation = `fall ${Math.random() * 2 + 2}s linear`;
      heart.style.opacity = '0';
      
      containerRef.current.appendChild(heart);
      
      // Remove heart after animation
      heart.addEventListener('animationend', () => {
        heart.remove();
      });
    };

    const interval = setInterval(createHeart, 100);

    return () => {
      clearInterval(interval);
      if (containerRef.current) {
        const hearts = containerRef.current.querySelectorAll('.falling-heart');
        hearts.forEach(heart => heart.remove());
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
    >
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(420px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HeartRain;