import { Header } from '@/components/layout/header';
import { FloatingParticles } from '@/components/floating-particles';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/30 dark:to-secondary/10">
      <FloatingParticles />
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24 md:pt-32 z-10 relative">
        {children}
      </main>
    </div>
  );
}
