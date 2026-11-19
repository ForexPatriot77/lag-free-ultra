import { Link } from "@tanstack/react-router";
import { Search, Settings, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

function CursorLogo() {
  return (
    <svg viewBox="0 0 20 24" className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-500 group-hover:scale-110" aria-hidden="true">
      <defs>
        <linearGradient id="lfuCursor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="55%" stopColor="#bdbdbd" />
          <stop offset="100%" stopColor="#7a7a7a" />
        </linearGradient>
        <filter id="lfuCursorShadow" x="-40%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0.6" dy="1.1" stdDeviation="0.6" floodColor="#000000" floodOpacity="0.45" />
        </filter>
      </defs>
      <path
        d="M1,1 L1,17 L5,13 L7.5,19.5 L10.2,18.5 L7.7,12 L14,12 Z"
        fill="url(#lfuCursor)"
        stroke="#2b2b2b"
        strokeWidth="1"
        strokeLinejoin="round"
        filter="url(#lfuCursorShadow)"
      />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md text-foreground border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 min-w-0">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <CursorLogo />
            <span className="text-[22px] sm:text-2xl font-light tracking-tight leading-none">
              Lag Free <span className="text-primary">Ultra</span>
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-4 lg:gap-5 text-xs lg:text-sm font-medium uppercase text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Play</Link>
            <a href="#" className="hover:text-foreground transition-colors">Watch</a>
            <a href="#" className="hover:text-foreground transition-colors">Tools</a>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button aria-label="Search" className="hidden sm:inline-flex p-2 text-muted-foreground hover:text-foreground transition-colors hover:scale-105 active:scale-95">
            <Search className="h-5 w-5" />
          </button>
          <a href="#" className="hidden sm:inline text-sm font-medium uppercase text-primary hover:underline hover:text-primary/80 transition-colors">
            Sign in
          </a>
          <a href="#" className="hidden sm:inline-flex relative overflow-hidden bg-primary text-primary-foreground text-sm font-medium uppercase px-5 py-2 rounded-sm shadow-md shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:scale-95">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent bg-[length:200%_100%] animate-[shimmer_2.5s_ease-in-out_infinite]" />
            <span className="relative">Register</span>
          </a>
          <button aria-label="Settings" className="hidden sm:inline-flex p-2 text-muted-foreground hover:text-foreground transition-colors hover:scale-105 active:scale-95">
            <Settings className="h-5 w-5" />
          </button>

          <Sheet>
            <SheetTrigger asChild className="sm:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-muted transition-colors">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground border-l border-border">
              <nav className="flex flex-col gap-4 mt-8 font-medium uppercase text-sm">
                <Link to="/" className="hover:text-primary transition-colors">Play</Link>
                <a href="#" className="hover:text-primary transition-colors">Watch</a>
                <a href="#" className="hover:text-primary transition-colors">Tools</a>
                <hr className="border-border my-2" />
                <a href="#" className="text-primary hover:underline">Sign in</a>
                <a href="#" className="relative overflow-hidden bg-primary text-primary-foreground text-center py-2.5 rounded-sm shadow-md transition-transform active:scale-95">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent bg-[length:200%_100%] animate-[shimmer_2.5s_ease-in-out_infinite]" />
                  <span className="relative">Register</span>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}