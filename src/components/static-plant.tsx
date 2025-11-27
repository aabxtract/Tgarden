import { cn } from '@/lib/utils';

type PlantState = 'growing' | 'bloomed' | 'wilting' | 'sprout';

interface StaticPlantProps {
  state: PlantState;
}

export function StaticPlant({ state }: StaticPlantProps) {
  const leaves = [
    { id: 1, rotate: -60, x: -10, y: -40, scale: 1, origin: 'bottom right' },
    { id: 2, rotate: 60, x: 10, y: -40, scale: 1, origin: 'bottom left' },
    { id: 3, rotate: -30, x: -20, y: -80, scale: 0.9, origin: 'bottom right' },
    { id: 4, rotate: 30, x: 20, y: -80, scale: 0.9, origin: 'bottom left' },
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
    <div className="relative w-full h-full">
      <svg viewBox="0 -180 100 200" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="staticPetalGradient" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </radialGradient>
        </defs>
        <path
          d="M50,20 C 55,-40 45,-120 50,-180"
          stroke={cn((state === 'growing' || state === 'bloomed') ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))')}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="transition-all duration-1000"
          style={{ transformOrigin: 'bottom center', transform: state === 'wilting' ? 'rotate(-5deg)' : 'rotate(0deg)' }}
        />
        <g transform="translate(50, 0)">
          {leaves.map(leaf => (
            <path
              key={leaf.id}
              d="M0,0 C10,-10 20,-20 0,-40 C-20,-20 -10,-10 0,0 Z"
              className={cn(
                "transition-all duration-1000 ease-in-out",
                (state === 'growing' || state === 'bloomed') ? 'fill-primary' : 'fill-muted-foreground/50'
              )}
              style={{
                transform: `translate(${leaf.x}px, ${leaf.y}px) rotate(${leaf.rotate}deg) scale(${state === 'sprout' ? 0 : leaf.scale}) ${state === 'wilting' ? 'rotate(15deg)' : ''}`,
                transformOrigin: leaf.origin,
              }}
            />
          ))}
        </g>
        <g 
          transform="translate(50, -160)" 
          className="transition-all duration-1000"
          style={{ 
            transform: `translate(50px, -170px) scale(${state === 'bloomed' ? 0.8 : 0})`,
            transformOrigin: 'center'
          }}
        >
          {petals.map(petal => (
            <path
              key={petal.id}
              d="M0,0 C15,-20 15,-40 0,-50 C-15,-40 -15,-20 0,0 Z"
              fill="url(#staticPetalGradient)"
              style={{
                transform: `rotate(${petal.rotate}deg) scale(${petal.scale})`,
                transformOrigin: 'bottom center',
              }}
            />
          ))}
          <circle cx="0" cy="-5" r="8" className="fill-yellow-300/80" />
        </g>
      </svg>
    </div>
  );
}
