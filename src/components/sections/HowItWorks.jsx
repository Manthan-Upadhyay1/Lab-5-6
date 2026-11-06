import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import SectionHeading from "../ui/SectionHeading";

const TAG = "rounded-full bg-canvas px-2.5 py-1 text-[10px] font-semibold text-ink/55";

const STEPS = [
  {
    icon: "✎",
    title: ["Tell DineMate", "What You Want"],
    text: "Choose your cuisine, budget, dietary needs, location, ambience, and group size.",
    footer: (
      <div className="mt-6 flex flex-wrap gap-2">
        {["Cuisine", "Budget", "Dietary"].map((t) => (
          <span key={t} className={TAG}>{t}</span>
        ))}
      </div>
    ),
  },
  {
    icon: "✦",
    title: ["AI Understands", "You"],
    text: "DineMate AI analyzes your preferences and identifies restaurants that fit your needs.",
    footer: (
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-canvas px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-brand-gradient" />
        <span className="text-[10px] font-bold text-ink/50">Analyzing your preferences...</span>
      </div>
    ),
  },
  {
    icon: "♡",
    title: ["Discover", "Your Matches"],
    text: "Get personalized restaurants ranked by how well they match your preferences.",
    footer: (
      <div className="mt-6 flex items-center justify-between rounded-xl bg-brand-50 px-3 py-2.5">
        <span className="text-[10px] font-bold text-ink/50">Best Match</span>
        <span className="text-sm font-extrabold text-brand-700">92%</span>
      </div>
    ),
  },
  {
    icon: "🍜",
    title: ["Enjoy Your", "Meal"],
    text: "Choose your restaurant and spend less time searching and more time enjoying your journey.",
    footer: (
      <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">✓</span>
        <span className="text-[10px] font-bold text-green-700">Perfect match found</span>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const rootRef = useRef(null);

  // Scroll-driven sequence (no pinning, so there is no dead scroll or giant page height):
  //  1. cards fade/slide in with a stagger as the grid enters the viewport
  //  2. the progress bar + "Step n of 4" + highlighted card follow the scroll position
  useGsap(rootRef, () => {
    const steps = gsap.utils.toArray(".how-step");
    const grid = rootRef.current.querySelector("#how-steps-grid");
    const bar = rootRef.current.querySelector("#how-progress");
    const label = rootRef.current.querySelector("#how-progress-label");

    const activate = (active) => {
      steps.forEach((step, i) => step.classList.toggle("is-active", i === active));
      label.textContent = `Step ${active + 1} of ${steps.length}`;
    };

    gsap.set(steps, { autoAlpha: 0, y: 40 });
    gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
    activate(0);

    // 1. staggered reveal (re-plays in reverse when scrolling back up)
    ScrollTrigger.batch(steps, {
      start: "top 88%",
      onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out", overwrite: true }),
      onLeaveBack: (batch) => gsap.to(batch, { autoAlpha: 0, y: 40, duration: 0.4, overwrite: true }),
    });

    // 2. progress follows the grid as it scrolls through the viewport
    ScrollTrigger.create({
      trigger: grid,
      start: "top 70%",
      end: "bottom 55%",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
        activate(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
      },
    });

    gsap.from("#how-summary", {
      scrollTrigger: { trigger: "#how-summary", start: "top 92%", toggleActions: "play none none reverse" },
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <section id="how-it-works" ref={rootRef} className="relative overflow-x-clip bg-canvas py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How It Works"
          title="From preferences to"
          accent="the perfect table."
          description="Tell DineMate AI what you want, and let intelligent recommendations handle the searching for you."
        />

        <div id="how-stage">
          <div className="sticky top-24 z-10 mx-auto mb-8 mt-10 flex max-w-2xl items-center gap-3 rounded-full border border-brand-100 bg-white/85 px-5 py-3 shadow-sm backdrop-blur sm:mb-10 sm:mt-14" aria-label="How it works progress">
            <span id="how-progress-label" className="shrink-0 text-xs font-bold text-brand-700" aria-live="polite">
              Step 1 of 4
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-brand-100">
              <div id="how-progress" className="h-full w-full origin-left rounded-full bg-brand-gradient" />
            </div>
          </div>

          <div id="how-steps-grid" className="relative mt-6 grid gap-6 sm:mt-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {STEPS.map((step, index) => (
              <article
                key={step.title.join(" ")}
                className="how-step group relative rounded-[1.75rem] border border-ink/10 bg-white p-6 shadow-[0_10px_35px_rgba(21,15,56,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(21,15,56,0.12)] sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-lg font-extrabold text-brand-700 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-2xl text-white">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-extrabold tracking-tight text-ink">
                  {step.title[0]}
                  <br />
                  {step.title[1]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-ink/55">{step.text}</p>
                {step.footer}
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm text-white">✦</span>
          <p id="how-summary" className="text-sm font-semibold text-ink/60">
            Your preferences do the talking. <span className="text-ink">DineMate AI does the searching.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
