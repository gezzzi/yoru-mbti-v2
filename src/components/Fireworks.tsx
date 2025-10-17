'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

const Fireworks: React.FC = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const colors = ['#ff6b6b', '#ff9f40', '#ffec5c', '#a855f7', '#ec4899', '#3b82f6', '#10b981', '#ff4757'];

  useEffect(() => {
    const createFirework = () => {
      const x = Math.random() * 100;
      const y = 15 + Math.random() * 35; // 中間の高さで爆発
      const particles: Particle[] = [];
      const particleCount = 30 + Math.floor(Math.random() * 15); // 中間の粒子数
      const color = colors[Math.floor(Math.random() * colors.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2.2 + Math.random() * 3; // 中間の速度
        particles.push({
          id: i,
          x: x,
          y: y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: color,
          size: 2.5 + Math.random() * 5, // 中間のサイズ
          life: 1,
        });
      }

      const firework: Firework = {
        id: Date.now() + Math.random(),
        x: x,
        y: y,
        particles: particles,
      };

      setFireworks(prev => [...prev, firework]);

      // 2.5秒後に削除
      setTimeout(() => {
        setFireworks(prev => prev.filter(fw => fw.id !== firework.id));
      }, 2500);
    };

    // 適度な花火を連続で打ち上げ
    const intervals: NodeJS.Timeout[] = [];
    const totalFireworks = 12; // 中間の花火数
    
    for (let i = 0; i < totalFireworks; i++) {
      intervals.push(setTimeout(() => {
        createFirework();
        // 時々追加の花火
        if (Math.random() > 0.55) {
          setTimeout(() => createFirework(), 150);
        }
      }, i * 400)); // 中間の間隔で発射
    }

    return () => {
      intervals.forEach(interval => clearTimeout(interval));
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {fireworks.map(firework => (
        <div key={firework.id} className="absolute inset-0">
          {firework.particles.map(particle => (
            <div
              key={particle.id}
              className="absolute rounded-full animate-firework-particle"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                '--vx': `${particle.vx}`,
                '--vy': `${particle.vy}`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
      <style jsx>{`
        @keyframes firework-particle {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          10% {
            transform: translate(0, 0) scale(1.5);
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--vx) * 65px), calc(var(--vy) * 65px + 100px)) scale(0);
            opacity: 0;
          }
        }
        
        .animate-firework-particle {
          animation: firework-particle 2.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Fireworks;