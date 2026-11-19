import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Users, MessageSquare, PenLine, Github, Search, ArrowRight, Flame } from "lucide-react";

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

const fallbackPosts = [
  { title: "A Night at the Bullet Opera: Triggering the Morphy Pattern to Topple GM Makhnev", author: "BocoPacer", title_prefix: "", date_label: "Nov 9, 2026", image_url: "https://image.lichess.org/display?fmt=webp&h=250&op=thumbnail&path=znbso8LDsLfk.webp&w=400&sig=736e7d7ac7a488491c67b535c5a6d7a814ad827f" },
  { title: "My Immortal Game I DIDN'T Win", author: "CkickyCheck", title_prefix: "", date_label: "Nov 7, 2026", image_url: "https://image.lichess.org/display?fmt=webp&h=250&op=thumbnail&path=s_bDr2aJmPGj.webp&w=400&sig=e337bddca72f80abc7aa20da251fcd947414e364" },
  { title: "Can I Get My First IM Norm?", author: "Zig_Zag_Zug_Zwang", title_prefix: "FM", date_label: "Nov 10, 2026", image_url: "https://image.lichess.org/display?fmt=webp&h=250&op=thumbnail&path=AEvCkbcZ47x5.webp&w=400&sig=a447d50981166c6cad076c94f3902523dc5f29c4" },
];

const hubs = [
  { icon: Users, title: "Players", text: "Browse the leaderboards, follow friends and find opponents." },
  { icon: Flame, title: "Teams", text: "Join a team, play team battles and climb the ranks together." },
  { icon: MessageSquare, title: "Forum", text: "Discuss chess, share feedback and get help from the community." },
  { icon: PenLine, title: "Blog", text: "Read and write long-form stories about the game we love." },
];

function Community() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => { base44.entities.BlogPost.list().then(setPosts).catch(() => {}); }, []);
  const items = (posts.length > 0 ? posts : fallbackPosts).filter((p) =>
    `${p.title} ${p.author}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute -top-24 right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <Users className="absolute right-[10%] top-12 h-16 w-16 text-primary/20 pointer-events-none" style={{ animation: "floatC 9s ease-in-out infinite" }} />
        <MessageSquare className="absolute left-[10%] bottom-10 h-12 w-12 text-accent/25 pointer-events-none" style={{ animation: "floatA 8s ease-in-out 1s infinite" }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative max-w-7xl mx-auto px-4 md:px-8 py-14">
          <p className="text-accent text-sm font-medium tracking-wide uppercase mb-3">Community</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground">
            Built by <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-x font-normal">players, for players</span>
          </h1>
          <p className="mt-4 max-w-xl text-foreground/80">Lichess is powered by volunteers and donors. Join 46,000 players online right now.</p>
          <button className="relative overflow-hidden mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/25 to-transparent bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
            <span className="relative">Join the community</span><ArrowRight className="relative h-4 w-4" />
          </button>
        </motion.div>
      </section>

      <section className="bg-secondary py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {hubs.map((h, i) => (
            <AnimatedElement key={h.title} delay={i * 80}>
              <a href="#" className="block h-full bg-card rounded-sm shadow p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.35)]">
                <h.icon className="h-9 w-9 text-primary mb-3" />
                <h3 className="text-lg font-medium text-foreground mb-1">{h.title}</h3>
                <p className="text-sm text-foreground/75">{h.text}</p>
              </a>
            </AnimatedElement>
          ))}
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <AnimatedElement>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-light text-foreground">Community blogs</h2>
              <label className="flex items-center gap-2 bg-card rounded-sm shadow px-3 py-2 text-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts or authors" className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-52" />
              </label>
            </div>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p, i) => (
              <AnimatedElement key={p.id || i} delay={(i % 3) * 80}>
                <a href="#" className="group block h-full bg-card rounded-sm shadow overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_hsl(var(--primary)/0.35)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-1 left-1 text-[11px] px-1.5 py-0.5 bg-foreground/70 text-background rounded-sm">{p.date_label}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-foreground leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">{p.title_prefix && <span className="text-accent mr-1">{p.title_prefix}</span>}{p.author}</p>
                  </div>
                </a>
              </AnimatedElement>
            ))}
            {items.length === 0 && <p className="text-muted-foreground col-span-full">No posts match your search.</p>}
          </div>
        </div>
      </section>

      <section className="bg-muted py-14">
        <AnimatedElement className="max-w-3xl mx-auto px-4 text-center">
          <Github className="h-10 w-10 text-primary mx-auto mb-3" />
          <h2 className="text-3xl font-light text-foreground mb-3">Open source, forever</h2>
          <p className="text-foreground/80 mb-6">Contribute code, translations or donations and help keep chess free for everyone.</p>
          <a href="https://github.com/lichess-org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/30">View on GitHub <ArrowRight className="h-4 w-4" /></a>
        </AnimatedElement>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/Community")({ component: Community, ssr: false });
