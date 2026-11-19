import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col items-center gap-3 text-xs">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-medium text-foreground">
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
          <a href="#" className="hover:text-primary transition-colors">Mobile App</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary transition-colors">Source Code</a>
        </div>
        <div className="flex gap-4 text-muted-foreground pt-1">
          <Link to="/" className="hover:text-primary transition-colors">Play</Link>
        </div>
        <p className="text-muted-foreground pt-1">© 2026 Lag Free Ultra</p>
      </div>
    </footer>
  );
}