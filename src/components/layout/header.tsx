"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "My Garden" },
  { href: "/growth-log", label: "Growth Log" },
  { href: "/community-grove", label: "Community Grove" },
  { href: "/forge", label: "Forge" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, className }: { href: string, label: string, className?: string }) => (
    <Link href={href} className={cn(
      "text-sm font-medium transition-colors hover:text-primary",
      pathname === href ? "text-primary" : "text-muted-foreground",
      className
    )}>
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b !rounded-none">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Logo />
          <span className="font-semibold hidden sm:inline-block">Temporal Garden</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => <NavLink key={link.href} {...link} />)}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-6 pt-12 px-4">
                  {navLinks.map(link => <NavLink key={link.href} {...link} className="text-lg" />)}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
