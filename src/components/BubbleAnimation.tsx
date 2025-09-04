'use client';

import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
  delay: number;
  wobble: number;
}

export default function BubbleAnimation() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const bubbleList: Bubble[] = [];
    for (let i = 0; i < 25; i++) {
      bubbleList.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 4 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.5,
        size: 20 + Math.random() * 40,
        delay: Math.random() * 5,
        wobble: Math.random() * 30 - 15
      });
    }
    setBubbles(bubbleList);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute animate-float"
          style={{
            left: `${bubble.left}%`,
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `${bubble.delay}s`,
            opacity: bubble.opacity,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            transform: `translateX(${bubble.wobble}px)`
          }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 182, 193, 0.4), rgba(219, 112, 147, 0.3))`,
              boxShadow: 'inset -2px -2px 4px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(255, 182, 193, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(110vh) translateX(0) scale(0);
          }
          5% {
            transform: translateY(100vh) translateX(0) scale(1);
          }
          15% {
            transform: translateY(85vh) translateX(10px) scale(1);
          }
          25% {
            transform: translateY(70vh) translateX(-10px) scale(1);
          }
          35% {
            transform: translateY(55vh) translateX(5px) scale(1);
          }
          45% {
            transform: translateY(40vh) translateX(-15px) scale(1);
          }
          55% {
            transform: translateY(25vh) translateX(10px) scale(1);
          }
          65% {
            transform: translateY(10vh) translateX(-5px) scale(1);
          }
          75% {
            transform: translateY(-5vh) translateX(15px) scale(1);
          }
          85% {
            transform: translateY(-20vh) translateX(-10px) scale(1);
          }
          95% {
            transform: translateY(-35vh) translateX(5px) scale(0.5);
          }
          100% {
            transform: translateY(-50vh) translateX(0) scale(0);
          }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
}