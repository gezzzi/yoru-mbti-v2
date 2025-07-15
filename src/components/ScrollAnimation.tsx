'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export const ScrollAnimation = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
}: ScrollAnimationProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const getInitialStyles = () => {
    switch (animation) {
      case 'fadeIn':
        return 'opacity-0';
      case 'fadeInUp':
        return 'opacity-0 translate-y-10';
      case 'fadeInDown':
        return 'opacity-0 -translate-y-10';
      case 'fadeInLeft':
        return 'opacity-0 translate-x-10';
      case 'fadeInRight':
        return 'opacity-0 -translate-x-10';
      case 'scaleIn':
        return 'opacity-0 scale-95';
      case 'slideInLeft':
        return 'opacity-0 translate-x-full';
      case 'slideInRight':
        return 'opacity-0 -translate-x-full';
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={`${
        isVisible 
          ? 'opacity-100 translate-x-0 translate-y-0 scale-100' 
          : getInitialStyles()
      } ${className}`}
      style={{
        transition: isVisible 
          ? `all ${duration}ms ease-out ${delay}ms` 
          : 'none',
      }}
    >
      {children}
    </div>
  );
};