"use client"

import React, { useMemo } from 'react';

export function FloatingParticles() {
  const particles = useMemo(() => Array.from({ length: 25 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    duration: `${Math.random() * 20 + 15}s`,
    delay: `-${Math.random() * 20}s`,
    endX: `${Math.random() * 40 - 20}vw`,
    endY: `${Math.random() * 40 - 20}vh`,
    endRotate: `${Math.random() * 360}deg`
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <style>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          25%, 75% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--end-x), var(--end-y)) rotate(var(--end-rotate));
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 dark:bg-accent/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationName: 'float',
            animationDuration: p.duration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: p.delay,
            '--end-x': p.endX,
            '--end-y': p.endY,
            '--end-rotate': p.endRotate,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
