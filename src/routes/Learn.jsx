import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Crown, Swords, Target, Puzzle, BookOpen, GraduationCap, Compass, Brain, Check, ArrowRight } from "lucide-react";

const AnimatedElement = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className || ""}`}>
      {children}
    </div>
  );
};

const tracks = [
  { id: "basics", label: "Chess basics", icon: Crown, blurb: "Learn how the pieces move, capture, and checkmate. Interactive lessons guide you step by step.", lessons: ["The chess board", "Pieces and how they move", "Capturing and protecting", "Check, checkmate and stalemate", "Special moves: castling and en passant"] },
  { id: "practice", label: "Practice", icon: Swords, blurb: "Sharpen what you know with guided drills — checkmate patterns, basic tactics, and endgames.", lessons: ["Piece checkmates I", "Basic tactics: forks and pins", "Pawn endgames", "Rook endgames", "Lucena and Philidor positions"] },
  { id: "coords", label: "Coordinates", icon: Compass, blurb: "Master the board geometry so you can read notation and visualize moves effortlessly.", lessons: ["Find the square", "Name the square", "Timed coordinate sprints", "Play with white or black view"] },
  { id: "study", label: "Study", icon: BookOpen, blurb: "Create collaborative analysis boards, annotate games, and share them with friends or students.", lessons: ["Multi-chapter studies", "Real-time collaboration", "Engine analysis built-in", "Share and embed anywhere"] },
];

const tools = [
  { icon: Puzzle, title: "Puzzles", text: "Train tactics with millions of community-rated puzzles." },
  { icon: Target, title: "Puzzle Storm", text: "Solve as many as you can before time runs out." },
  { icon: Brain, title: "Openings explorer", text: "Browse master and Lichess databases move by move." },
  { icon: GraduationCap, title: "Coaches", text: "Find verified coaches to accelerate your progress." },
];

function Learn() {
  const [active, setActive] = useState("basics");
  const [done, setDone] = useState({});
  const track = tracks.find((t) => t.id === active);
  const progress = Math.round(((track.lessons.filter((l) => done[`${active}-${l}`]).length) / track.lessons.length) * 100);

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <Crown className="absolute right-[12%] top-12 h-16 w-16 text-primary/20 pointer-events-none" style={{ animation: "floatA 8s ease-in-out infinite" }} />
        <Swords className="absolute left-[8%] bottom-10 h-12 w-12 text-accent/25 pointer-events-none" style={{ animation: "floatB 6s ease-in-out 2s infinite" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative max-w-7xl mx-auto px-4 md:px-8 py-14">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Learn</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground">
            Become a <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x font-normal">better player</span>
          </h1>
          <p className="mt-4 max-w-xl text-foreground/80">Free lessons, practice drills and study tools — all open source, no ads, forever.</p>
          <button className="relative overflow-hidden mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/25 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
            <span className="relative">Start learning</span><ArrowRight className="relative h-4 w-4" />
          </button>
        </motion.div>
      </section>

      <section className="bg-secondary py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedElement>
            <div className="flex flex-wrap gap-2 mb-6">
              {tracks.map((t) => (
                <button key={t.id} onClick={() => setActive(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm transition-all duration-300 ${active === t.id ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-card text-foreground hover:-translate-y-0.5 hover:shadow-md"}`}>
                  <t.icon className="h-4 w-4" />{t.label}
                </button>
              ))}
            </div>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">
              <div className="bg-card rounded-sm shadow p-6">
                <track.icon className="h-10 w-10 text-primary mb-4" />
                <h2 className="text-2xl font-light text-foreground mb-2">{track.label}</h2>
                <p className="text-sm text-foreground/80 leading-relaxed">{track.blurb}</p>
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Progress</span><span>{progress}%</span></div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${progress}%` }} /></div>
                </div>
              </div>
              <ul className="bg-card rounded-sm shadow divide-y divide-border">
                {track.lessons.map((l, i) => {
                  const k = `${active}-${l}`;
                  return (
                    <li key={k}>
                      <button onClick={() => setDone((d) => ({ ...d, [k]: !d[k] }))} className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-secondary transition-colors">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs border-2 transition-colors ${done[k] ? "bg-primary border-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                          {done[k] ? <Check className="h-4 w-4" /> : i + 1}
                        </span>
                        <span className={`text-foreground ${done[k] ? "line-through opacity-60" : ""}`}>{l}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedElement><h2 className="text-2xl font-light text-foreground mb-6">Training tools</h2></AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((t, i) => (
              <AnimatedElement key={t.title} delay={i * 80}>
                <div className="h-full p-px rounded-sm bg-gradient-to-br from-primary/50 via-transparent to-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.35)]">
                  <div className="h-full bg-card rounded-sm p-5">
                    <t.icon className="h-8 w-8 text-accent mb-3" />
                    <h3 className="font-medium text-foreground mb-1">{t.title}</h3>
                    <p className="text-sm text-foreground/75">{t.text}</p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-14">
        <AnimatedElement className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-foreground mb-3">Ready to play what you've learned?</h2>
          <p className="text-foreground/80 mb-6">Jump into a game with a player of your level in seconds.</p>
          <a href="/" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30">Play now <ArrowRight className="h-4 w-4" /></a>
        </AnimatedElement>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/Learn")({ component: Learn, ssr: false });
