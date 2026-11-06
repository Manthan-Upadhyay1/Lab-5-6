import { useRef } from "react";
import { useDemo } from "../../context/DemoContext";
import { useGsap } from "../../hooks/useGsap";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";
import Chip from "../ui/Chip";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCUUJuL30SdkPswFnVvXHEZPvujTidPJ74AserAt0Zayt-ZfXHIK6g-M1EvAf1Cs-6adj2aaSYYHetAfNl8N3DJ1aHc_wH6JJcoZJKBhFeFFWyYXija2EqgxpfLEkN_zWv_oaxX5QO49NVIx0_ZJA71cEbMdge9P7G8XlvzSnwH-7HVdLa2duswV0cdJAgng9K9RXO3ALEiAnOM7bKlYz3nv0_ZPaDJGKOmn37rqyUQn9AYt3cEIhCKJA";

const STATS = [
  { value: "AI-Powered", label: "Personalized matching" },
  { value: "6+", label: "Preference factors" },
  { value: "Any City", label: "Wherever you travel" },
];

export default function Hero() {
  const rootRef = useRef(null);
  const { openDemo } = useDemo();

  useGsap(rootRef, () => {
    // Entrance sequence
    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .from(".hero-badge", { opacity: 0, y: 25, duration: 0.7 })
      .from("h1", { opacity: 0, y: 50, duration: 1 }, "-=0.35")
      .from(".hero-copy", { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
      .from(".hero-cta", { opacity: 0, y: 25, stagger: 0.12, duration: 0.6 }, "-=0.35")
      .from("#recommendation-card", { opacity: 0, y: 70, scale: 0.92, duration: 1 }, "-=0.6");

    // Parallax on the card image
    gsap.to("#hero-background", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section id="home" ref={rootRef} className="relative min-h-screen overflow-hidden bg-canvas" style={{ paddingTop: 50 }}>
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-coral-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------- Copy ---------- */}
          <div className="max-w-2xl">
            <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              <span className="flex h-2 w-2 rounded-full bg-brand-gradient" />
              AI-Powered Restaurant Recommendations
            </div>

            <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Your Perfect Meal,{" "}
              <span className="relative inline-block text-gradient">
                Wherever You Go.
                <svg className="absolute -bottom-3 left-0 h-3 w-full" viewBox="0 0 300 12" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="squiggle" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#6743EE" />
                      <stop offset="1" stopColor="#FF6A42" />
                    </linearGradient>
                  </defs>
                  <path d="M3 8C70 2 170 2 297 7" stroke="url(#squiggle)" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="hero-copy mt-8 max-w-xl text-base leading-7 text-ink/65 sm:text-lg sm:leading-8">
              DineMate AI understands your taste, budget, dietary needs, and travel style to find restaurants that feel made for you.
            </p>

            {/* GSAP animates the wrapper divs – animating the buttons themselves would fight their CSS transitions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="hero-cta">
                <Button variant="gradient" size="lg" arrow onClick={() => openDemo()} className="w-full sm:w-auto">
                  Get Personalized Recommendations
                </Button>
              </div>
              <div className="hero-cta">
                <Button variant="outline" size="lg" href="#how-it-works" className="w-full sm:w-auto">
                  <span>▶</span> See How It Works
                </Button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/10 pt-6">
              {STATS.map((stat, index) => (
                <div key={stat.value} className="flex items-center gap-8">
                  {index > 0 && <div className="hidden h-9 w-px bg-ink/10 sm:block" />}
                  <div>
                    <p className="text-xl font-extrabold text-ink">{stat.value}</p>
                    <p className="mt-1 text-xs text-ink/50">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Recommendation card ---------- */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-brand-500/25" />

            <div
              id="recommendation-card"
              className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-[0_25px_70px_rgba(21,15,56,0.14)] sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-ink/40">AI Recommendation</p>
                  <h2 className="mt-1 text-xl font-extrabold text-ink">La Terraza</h2>
                </div>
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-brand-50">
                  <span className="text-xl font-extrabold text-brand-700">92%</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-brand-700/60">Match</span>
                </div>
              </div>

              <div className="relative mt-5 h-52 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500/25 to-coral-500/25">
                <div id="hero-background" className="absolute inset-0 flex items-center justify-center">
                  <img src={HERO_IMAGE} alt="Candle-lit table at La Terraza" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                </div>
                <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-xs font-semibold text-ink shadow-sm backdrop-blur">
                  📍 500 meters away
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-gold-500">★</span>
                    <span className="text-sm font-bold text-ink">4.8</span>
                    <span className="text-xs text-ink/40"> (328) </span>
                  </div>
                  <span className="text-sm font-bold text-ink"> ₹₹ </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip tone="neutral">Italian</Chip>
                  <Chip tone="green">Vegetarian Friendly</Chip>
                  <Chip tone="coral">Romantic</Chip>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-canvas p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-sm text-white">✦</div>
                  <div>
                    <p className="text-xs font-bold text-ink">Why we recommend it</p>
                    <p className="mt-1 text-xs leading-5 text-ink/55">
                      Matches your cuisine preference, budget, dietary needs, and preferred ambience.
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="dark" size="lg" arrow onClick={() => openDemo()} className="mt-5 w-full">
                View Recommendation
              </Button>
            </div>

            {/* floating badges */}
            <div className="float-budget absolute -left-5 top-25 hidden rounded-xl border border-white bg-white px-4 py-3 shadow-[0_12px_30px_rgba(21,15,56,0.12)] sm:block">
              <p className="text-xs font-bold text-ink">✓ Budget matched</p>
              <p className="mt-0.5 text-[10px] text-ink/40">Within your range</p>
            </div>
            <div className="float-dietary absolute -right-5 bottom-46 hidden rounded-xl border border-white bg-white px-4 py-3 shadow-[0_12px_30px_rgba(21,15,56,0.12)] sm:block">
              <p className="text-xs font-bold text-ink">✓ Dietary friendly</p>
              <p className="mt-0.5 text-[10px] text-ink/40">Vegetarian options</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
