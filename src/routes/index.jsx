import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Users, User, Cpu, Trophy, Star } from "lucide-react";

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

const fallbackControls = [
  { time: "30s", category: "HyperBullet" },
  { time: "15s", category: "UltraBullet" },
  { time: "7.5s", category: "UltraZerk" },
  { time: "3.25s", category: "Psycho" },
  { time: "1.625s", category: "Psycho" },
  { time: "0.8125s", category: "Psycho" },
  { time: "0.406s", category: "Psycho" },
  { time: "0.203s", category: "Psycho" },
  { time: "Custom", category: "" },
];

const fallbackUpdates = [
  { time_ago: "13 hours ago", text: "The Total Chess Pilot 2026 semifinals are underway — set 2 starts at 9:00 AM. Catch up on interviews with the players after set 1!" },
  { time_ago: "2 days ago", text: "Watch a new instructive breakdown of the Carlsbad Structure from our latest Ladder Legends edition and learn how grandmasters handle it." },
  { time_ago: "3 days ago", text: "Our online chess league celebrates its 700th edition today after over 6 years — play starts at 2:00 PM!" },
  { time_ago: "4 days ago", text: "Our November 3+0 Warm-up Arena starts today at 1:00 PM!" },
];

function Board({ pieces = {}, highlight = [], flip = false }) {
  const squares = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const light = (r + c) % 2 === 0;
      const key = `${r}-${c}`;
      const piece = pieces[key];
      squares.push(
        <div
          key={key}
          className={`aspect-square flex items-center justify-center text-[clamp(18px,4vw,38px)] leading-none transition-colors duration-300 ${
            highlight.includes(key) ? "bg-accent/50" : light ? "bg-[#f0d9b5] dark:bg-secondary" : "bg-[#b58863] dark:bg-primary/20"
          }`}
          style={!highlight.includes(key) && light ? { backgroundColor: 'hsl(var(--secondary))' } : !highlight.includes(key) && !light ? { backgroundColor: 'hsl(var(--primary) / 0.15)' } : {}}
        >
          {piece && (
            <span
              className={`font-bold transition-transform hover:scale-110 cursor-pointer ${
                piece.w ? "text-card drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" : "text-foreground drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]"
              }`}
            >
              {piece.s}
            </span>
          )}
        </div>
      );
    }
  }
  return <div className="grid grid-cols-8 rounded-sm overflow-hidden shadow-md border border-border/50">{squares}</div>;
}

const liveBoard = {
  "1-6": { s: "♙", w: true }, "1-7": { s: "♚", w: false }, "2-4": { s: "♙", w: true }, "2-5": { s: "♔", w: true },
  "4-6": { s: "♙", w: true }, "5-5": { s: "♗", w: true },
};

function HeroSection() {
  const [tab, setTab] = useState("quick");
  const [controls, setControls] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    base44.entities.TimeControl.list().then(setControls).catch(() => {});
  }, []);
  const items = controls.length > 0 ? controls : fallbackControls;

  const tabs = [
    { id: "quick", label: "Quick pairing" },
    { id: "lobby", label: "Lobby" },
    { id: "corr", label: "Correspondence" },
  ];

  return (
    <section className="relative pt-6 pb-12">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_hsl(var(--border))_1px,_transparent_1px)] bg-[length:24px_24px] opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Shapes */}
      <div className="absolute top-32 left-12 w-4 h-4 rounded-full bg-accent/30 pointer-events-none hidden lg:block" style={{ animation: "floatA 7s ease-in-out infinite" }} />
      <div className="absolute top-80 right-24 w-6 h-6 rounded-full bg-primary/20 pointer-events-none hidden lg:block" style={{ animation: "floatB 9s ease-in-out 1s infinite" }} />
      <div className="absolute bottom-10 left-1/3 w-3 h-3 rounded-full bg-foreground/10 pointer-events-none hidden lg:block" style={{ animation: "floatA 6s ease-in-out 2s infinite" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_2.4fr_1fr] gap-6 lg:gap-8"
      >
        {/* Left column */}
        <div className="order-2 lg:order-1 space-y-5 pt-8">
          <h1 className="text-3xl sm:text-4xl font-light text-foreground tracking-tight">
            Play chess. <br className="hidden lg:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[range-sweep_5s_linear_infinite]">Free.</span>
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Lag Free Ultra is a free, no-ads, open source chess server.<br />
            <a href="#" className="text-primary hover:underline font-medium mt-1 inline-block">About...</a>
          </p>
        </div>

        {/* Center: pairing grid */}
        <div className="order-1 lg:order-2 relative z-10">
          <div className="grid grid-cols-3 text-center text-sm font-medium text-muted-foreground mb-4">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`py-2.5 border-t-2 transition-all duration-300 ${
                  tab === t.id
                    ? "border-accent text-accent bg-gradient-to-b from-accent/5 to-transparent"
                    : "border-transparent hover:text-foreground hover:bg-muted/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "quick" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {items.map((c, i) => (
                <AnimatedElement key={c.id || c.time} delay={i * 40}>
                  <button
                    onClick={() => setSelected(c.time)}
                    className={`w-full group relative overflow-hidden bg-card/90 backdrop-blur-md border border-border/50 rounded-sm py-6 sm:py-8 text-center transition-all duration-300 hover:bg-card hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30 ${
                      selected === c.time ? "ring-2 ring-primary shadow-md" : ""
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl font-light text-foreground group-hover:text-primary transition-colors duration-300">
                      {c.time}
                    </div>
                    <div className="text-sm sm:text-base font-light text-muted-foreground group-hover:text-primary/80 transition-colors duration-300 mt-1 min-h-[1.5em]">
                      {c.category}
                    </div>
                    {i === 0 && (
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite] pointer-events-none" />
                    )}
                  </button>
                </AnimatedElement>
              ))}
            </div>
          ) : (
            <AnimatedElement>
              <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-sm p-10 text-center text-muted-foreground min-h-[350px] flex flex-col items-center justify-center gap-4 shadow-sm">
                <Users className="h-12 w-12 text-primary/40 animate-pulse" />
                <p className="text-lg font-medium text-foreground">
                  {tab === "lobby" ? "Browse open games from other players" : "Play at your own pace — days per move"}
                </p>
                <button onClick={() => setTab("quick")} className="text-primary hover:underline text-sm font-medium mt-2">
                  Back to quick pairing
                </button>
              </div>
            </AnimatedElement>
          )}
        </div>

        {/* Right: buttons */}
        <div className="order-3 space-y-3 lg:pt-14">
          {[
            { icon: Users, label: "Create lobby game" },
            { icon: User, label: "Challenge a friend" },
            { icon: Cpu, label: "Play against computer" },
          ].map(({ icon: Icon, label }, i) => (
            <AnimatedElement key={label} delay={i * 100}>
              <button className="w-full group flex items-center gap-4 bg-card/90 backdrop-blur-sm border border-border/50 rounded-sm shadow-sm px-5 py-4 text-left font-medium text-card-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 active:scale-[0.98]">
                <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="group-hover:text-primary transition-colors">{label}</span>
              </button>
            </AnimatedElement>
          ))}

          <AnimatedElement delay={400} className="text-sm text-muted-foreground pt-8 lg:pt-24 space-y-1">
            <div className="flex items-center justify-between lg:justify-start lg:gap-2">
              <strong className="font-semibold text-foreground text-base">46,161</strong>
              <span>players</span>
            </div>
            <div className="flex items-center justify-between lg:justify-start lg:gap-2">
              <strong className="font-semibold text-foreground text-base">19,458</strong>
              <span>games in play</span>
            </div>
          </AnimatedElement>
        </div>
      </motion.div>
    </section>
  );
}

function TimelineSection() {
  const [updates, setUpdates] = useState([]);
  useEffect(() => { base44.entities.TimelineUpdate.list().then(setUpdates).catch(() => {}); }, []);
  const items = updates.length > 0 ? updates : fallbackUpdates;

  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 bottom-8 w-[2px] bg-border/60" />
      <ul className="space-y-8">
        {items.map((u, i) => (
          <AnimatedElement key={u.id || i} delay={i * 100}>
            <li className="relative flex gap-5 group">
              <span className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-background border-2 border-accent/60 flex items-center justify-center shadow-sm group-hover:border-accent group-hover:scale-110 transition-all duration-300">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              </span>
              <div className="min-w-0 pt-1">
                <div className="text-accent font-semibold text-sm mb-1 group-hover:text-accent/80 transition-colors">{u.time_ago}</div>
                <p className="text-sm text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors">{u.text}</p>
              </div>
            </li>
          </AnimatedElement>
        ))}
        <AnimatedElement delay={items.length * 100}>
          <li className="relative flex gap-5 items-center group cursor-pointer">
            <span className="relative z-10 shrink-0 w-8 h-8 rounded-full bg-background border-2 border-accent/60 flex items-center justify-center shadow-sm group-hover:border-accent group-hover:scale-110 transition-all duration-300">
              <Star className="h-3.5 w-3.5 text-accent" />
            </span>
            <a href="#" className="text-accent font-semibold text-sm hover:underline">All updates »</a>
          </li>
        </AnimatedElement>
      </ul>
    </div>
  );
}

function LowerSection() {
  return (
    <section className="relative pb-20">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_2.4fr] gap-6 lg:gap-8">
        {/* Left column: live game */}
        <div className="space-y-6 order-2 lg:order-1">
          <AnimatedElement delay={200} className="bg-card border border-border/50 p-3 rounded-sm shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground mb-2 px-1">
              <span className="text-foreground">SkyebreakImmortal <span className="text-accent ml-1">2753</span></span>
              <span className="bg-muted px-1.5 py-0.5 rounded-sm">0:00</span>
            </div>
            <Board pieces={liveBoard} highlight={["0-6", "1-7"]} />
            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground mt-2 px-1">
              <span className="text-foreground">Modrix14 <span className="ml-1">2849</span></span>
              <span className="text-accent bg-accent/10 px-1.5 py-0.5 rounded-sm">0:02</span>
            </div>
          </AnimatedElement>
        </div>

        {/* Center */}
        <div className="order-1 lg:order-2">
          <TimelineSection />

          <AnimatedElement delay={300}>
            <a href="#" className="group flex items-center justify-between bg-card border border-border/50 rounded-sm shadow-sm px-5 py-4 hover:shadow-lg hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300">
              <h2 className="flex items-center gap-3 font-medium text-foreground group-hover:text-primary transition-colors">
                <Trophy className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                Open tournaments
              </h2>
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">More »</span>
            </a>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatA { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(-2deg); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes range-sweep { 0% { background-position: 180% 0; } 100% { background-position: -90% 0; } }
        @keyframes mask1 { 0% { stroke-dashoffset: 180.87px; } to { stroke-dashoffset: -180.87px; } }
        @keyframes mask2 { 0% { stroke-dashoffset: 214.83px; } to { stroke-dashoffset: -146.91px; } }
        @keyframes mask3 { 0% { stroke-dashoffset: 257.43px; } to { stroke-dashoffset: -104.31px; } }
        @keyframes ddloader { 0% { background-position: 0; } to { background-position: 100%; } }
        @keyframes reconnected { 0% { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(2.5rem); } }
      `}} />
      <HeroSection />
      <LowerSection />
    </div>
  );
}

export const Route = createFileRoute("/")({ component: Home, ssr: false });