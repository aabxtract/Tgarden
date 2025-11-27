
"use client"

import React, { useMemo } from 'react';
import { Leaf } from 'lucide-react';

export function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 15 }).map(() => ({
    left: `${Math.random() * 100}%`,
    duration: `${Math.random() * 10 + 8}s`,
    delay: `-${Math.random() * 10}s`,
    size: `${Math.random() * 12 + 8}px`,
    rotationStart: `${Math.random() * 360}deg`,
    rotationEnd: `${Math.random() * 720 - 360}deg`,
    xEnd: `${Math.random() * 100 - 50}vw`
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 h-full">
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(0vw) rotate(var(--rotation-start));
            opacity: 0;
          }
          10% {
             opacity: 1;
          }
          90% {
             opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(var(--x-end)) rotate(var(--rotation-end));
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute text-primary/30 dark:text-accent/20"
          style={{
            left: p.left,
            top: 0,
            animationName: 'fall',
            animationDuration: p.duration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: p.delay,
            '--rotation-start': p.rotationStart,
            '--rotation-end': p.rotationEnd,
            '--x-end': p.xEnd,
          } as React.CSSProperties}
        >
          <Leaf style={{ width: p.size, height: p.size }}/>
        </div>
      ))}
    </div>
  );
}
