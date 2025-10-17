'use client';

import React, { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  delay: number;
  size: number;
  opacity: number;
  swayAmount: number;
  rotation: number;
}

export default function PetalAnimation() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const petalList: Petal[] = [];
    for (let i = 0; i < 30; i++) {
      petalList.push({
        id: i,
        left: Math.random() * 120 - 10, // -10% to 110% for entry from sides
        animationDuration: 8 + Math.random() * 6, // 8-14 seconds
        delay: Math.random() * 5,
        size: 12 + Math.random() * 8, // 12-20px
        opacity: 0.5 + Math.random() * 0.4,
        swayAmount: 30 + Math.random() * 50, // Horizontal sway distance
        rotation: Math.random() * 360
      });
    }
    setPetals(petalList);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute animate-fall-sway"
          style={{
            left: `${petal.left}%`,
            animationDuration: `${petal.animationDuration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
            fontSize: `${petal.size}px`,
            ['--sway-amount' as string]: `${petal.swayAmount}px`,
            transform: `rotate(${petal.rotation}deg)`
          }}
        >
          🌸
        </div>
      ))}
      <style jsx>{`
        @keyframes fall-sway {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          25% {
            transform: translateY(25vh) translateX(var(--sway-amount)) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(calc(var(--sway-amount) * -0.5)) rotate(180deg);
            opacity: 1;
          }
          75% {
            transform: translateY(75vh) translateX(var(--sway-amount)) rotate(270deg);
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(0) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall-sway {
          animation-name: fall-sway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}