"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sparkles, Wind, Droplets, Sun, Sprout as SproutIcon } from 'lucide-react';

type PlantState = 'growing' | 'bloomed' | 'wilting' | 'sprout';

export function PlantDisplay() {
  const [state, setState] = useState<PlantState>('growing');

  const leaves = [
    { id: 1, rotate: -60, x: -10, y: -40, scale: 1, origin: 'bottom right' },
    { id: 2, rotate: 60, x: 10, y: -40, scale: 1, origin: 'bottom left' },
    { id: 3, rotate: -30, x: -20, y: -80, scale: 0.9, origin: 'bottom right' },
    { id: 4, rotate: 30, x: 20, y: -80, scale: 0.9, origin: 'bottom left' },
    { id: 5, rotate: -70, x: -15, y: -120, scale: 0.8, origin: 'bottom right' },
    { id: 6, rotate: 70, x: 15, y: -120, scale: 0.8, origin: 'bottom left' },
  ];

  const petals = [
    { id: 1, rotate: 0, scale: 1 },
    { id: 2, rotate: 60, scale: 0.95 },
    { id: 3, rotate: 120, scale: 1 },
    { id: 4, rotate: 180, scale: 0.95 },
    { id: 5, rotate: 240, scale: 1 },
    { id: 6, rotate: 300, scale: 0.95 },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      <div className="relative w-64 h-96">
        <div className={cn(
          "absolute inset-0 -bottom-10 rounded-full transition-all duration-1000",
          (state === 'growing' || state === 'bloomed') ? "bg-primary/20 dark:bg-primary/10 blur-3xl" : "bg-muted-foreground/10 blur-2xl"
        )}></div>

        <svg viewBox="0 -200 100 220" className="w-full h-full drop-shadow-lg">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
             <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" className={cn("transition-colors duration-1000", (state === 'growing' || state === 'bloomed') ? 'stop-color-primary' : 'stop-color-[hsl(var(--muted-foreground))] opacity-50')} />
              <stop offset="100%" className={cn("transition-colors duration-1000", 'stop-color-[hsl(var(--primary))] opacity-80 dark:opacity-50')} />
            </linearGradient>
            <radialGradient id="petalGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </radialGradient>
          </defs>
          
          <path
            d="M50,20 C 55,-40 45,-120 50,-200"
            stroke="url(#stemGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{ transformOrigin: 'bottom center', transform: state === 'wilting' ? 'rotate(-5deg)' : 'rotate(0deg)' }}
          />

          <g transform="translate(50, 0)">
            {leaves.map(leaf => (
              <path
                key={leaf.id}
                d="M0,0 C10,-10 30,-30 0,-50 C-30,-30 -10,-10 0,0 Z"
                className={cn(
                  "transition-all duration-1000 ease-in-out",
                  (state === 'growing' || state === 'bloomed') ? 'fill-primary' : 'fill-muted-foreground/50'
                )}
                style={{
                  transform: `translate(${leaf.x}px, ${leaf.y}px) rotate(${leaf.rotate}deg) scale(${state === 'sprout' ? 0 : leaf.scale}) ${state === 'wilting' ? 'rotate(15deg)' : ''}`,
                  transformOrigin: leaf.origin,
                  transitionDelay: `${leaf.id * 100}ms`
                }}
              />
            ))}
          </g>

          <g 
            transform="translate(50, -180)" 
            className="transition-all duration-1000"
            style={{ 
              transform: `translate(50px, -180px) scale(${state === 'bloomed' ? 1 : 0})`,
              transformOrigin: 'center',
              filter: state === 'bloomed' ? 'url(#glow)' : 'none'
            }}
          >
             {petals.map(petal => (
              <path
                key={petal.id}
                d="M0,0 C15,-20 15,-40 0,-50 C-15,-40 -15,-20 0,0 Z"
                fill="url(#petalGradient)"
                style={{
                  transform: `rotate(${petal.rotate}deg) scale(${petal.scale})`,
                  transformOrigin: 'bottom center',
                  transition: 'transform 1s ease-in-out',
                  transitionDelay: `${petal.id * 150}ms`,
                }}
              />
            ))}
            <circle cx="0" cy="-5" r="8" className="fill-yellow-300/80" />
          </g>
        </svg>
      </div>

      <div className="absolute bottom-0 md:-bottom-10 flex flex-wrap justify-center gap-2 p-4">
        <Button variant={state === 'sprout' ? 'default' : 'outline'} size="sm" onClick={() => setState('sprout')}><SproutIcon className="mr-2 h-4 w-4"/>Sprout</Button>
        <Button variant={state === 'growing' ? 'default' : 'outline'} size="sm" onClick={() => setState('growing')}><Sun className="mr-2 h-4 w-4"/>Grow</Button>
        <Button variant={state === 'bloomed' ? 'default' : 'outline'} size="sm" onClick={() => setState('bloomed')}><Sparkles className="mr-2 h-4 w-4"/>Bloom</Button>
        <Button variant={state === 'wilting' ? 'destructive' : 'outline'} size="sm" onClick={() => setState('wilting')}><Droplets className="mr-2 h-4 w-4"/>Wilt</Button>
      </div>
    </div>
  );
}
