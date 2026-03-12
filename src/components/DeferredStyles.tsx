'use client';

import { useEffect } from 'react';

const DEFERRED_CSS = `
/* fadeIn animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: var(--animation-delay, 0s);
  opacity: 0;
}
@keyframes fadeInLetter {
  from { opacity: 0; transform: translateY(0.25em); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in-letter {
  display: inline-block;
  opacity: 0;
  animation: fadeInLetter 0.4s ease forwards;
}
@keyframes fadeInJump {
  0% { opacity: 0; transform: translateY(10px) scale(0.95); }
  60% { opacity: 1; transform: translateY(-4px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fadeInJump {
  animation: fadeInJump 0.6s ease-out forwards;
  opacity: 0;
}

/* Ripple effect */
@keyframes ripple {
  0% { width: 40px; height: 40px; opacity: 0.6; }
  100% { width: 400px; height: 400px; opacity: 0; }
}
.animate-ripple {
  animation: ripple 0.8s ease-out forwards;
  width: 40px;
  height: 40px;
}

/* Gentle glow animation */
@keyframes gentle-glow {
  0%, 100% { opacity: 0.4; }
  25% { opacity: 0.6; }
  50% { opacity: 1; }
  75% { opacity: 0.6; }
}
@keyframes shadow-pulse {
  0%, 100% { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
  50% { box-shadow: 0 6px 12px -2px rgba(0, 0, 0, 0.2); }
}
.animate-gentle-glow {
  animation: gentle-glow 3s ease-in-out infinite, shadow-pulse 3s ease-in-out infinite;
  animation-delay: var(--glow-delay, 0s);
  will-change: opacity;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}
.animate-gentle-glow:hover {
  animation-play-state: paused;
  opacity: 1;
  box-shadow: 0 8px 16px -3px rgba(0, 0, 0, 0.3);
}

/* Category diagonal */
.category-diagonal::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -20px;
  width: 100%;
  height: 60px;
  background: inherit;
  transform: skewY(-2deg);
  z-index: 1;
  pointer-events: none;
}

/* Color animations */
@keyframes pulsePink {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}
@keyframes shimmerGold {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.5); }
}
@keyframes electricBlue {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes glowGreen {
  0%, 100% { filter: blur(0px); }
  50% { filter: blur(2px); }
}

/* 3D flip animations */
@keyframes flip-3d {
  0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
  25% { transform: rotateY(180deg) rotateX(10deg); }
  50% { transform: rotateY(360deg) rotateX(0deg); }
  75% { transform: rotateY(540deg) rotateX(-10deg); }
}
@keyframes flip-3d-reverse {
  0%, 100% { transform: rotateY(0deg) scale(1); }
  25% { transform: rotateY(-90deg) scale(1.2); }
  50% { transform: rotateY(-180deg) scale(1); }
  75% { transform: rotateY(-270deg) scale(1.2); }
}
@keyframes shadow-dance {
  0%, 100% { text-shadow: 0 0 25px #ff6b35, 0 0 50px #ff4500; }
  50% { text-shadow: 0 0 40px #ff6b35, 0 0 80px #ff4500, 0 0 120px #ff0000; }
}
@keyframes shimmer {
  0% { opacity: 0.3; transform: translateX(-5px); }
  50% { opacity: 0.7; transform: translateX(5px); }
  100% { opacity: 0.3; transform: translateX(-5px); }
}
@keyframes drift {
  0%, 100% { transform: rotate(-5deg) scale(0.9); }
  50% { transform: rotate(5deg) scale(1.1); }
}
`;

const DeferredStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.setAttribute('data-deferred', 'true');
    style.textContent = DEFERRED_CSS;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default DeferredStyles;
