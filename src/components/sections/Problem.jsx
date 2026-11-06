import { useRef } from "react";
import { OLD_WAY, SMART_WAY } from "../../data/content";
import { useGsap } from "../../hooks/useGsap";
import { gsap } from "../../lib/gsap";
import SectionHeading from "../ui/SectionHeading";

export default function Problem() {
  const rootRef = useRef(null);

  useGsap(rootRef, () => {
    gsap.from("article", {
      scrollTrigger: { trigger: rootRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      opacity: 0,
      y: 70,
      scale: 0.94,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <section id="problem" ref={rootRef} className="relative overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          badge="The Problem"
          title="Finding the right restaurant"
          accent="shouldn't be a guessing game."
          description="Travellers often spend too much time searching through endless options, only to find restaurants that don't really match what they need."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* The old way */}
          <article className="rounded-[2rem] border border-brand-100 bg-white/70 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-xl">🔎</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-ink/40">The old way</p>
                <h3 className="mt-1 text-xl font-extrabold text-ink">Traditional Search</h3>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              {OLD_WAY.map((item) => (
                <div key={item.title} className="flex items-start gap-4 rounded-xl bg-white p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-50 text-sm text-red-500">✕</span>
                  <div>
                    <p className="font-bold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-ink/50">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* The smarter way */}
          <article className="relative overflow-hidden rounded-[2rem] bg-mesh-dark p-6 text-white shadow-[0_20px_60px_rgba(21,15,56,0.2)] sm:p-8 lg:p-10">
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-xl">✦</div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40">The smarter way</p>
                  <h3 className="mt-1 text-xl font-extrabold">DineMate AI</h3>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                {SMART_WAY.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:bg-white/10"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500/25 text-sm text-coral-300">✓</span>
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="mt-1 text-sm leading-5 text-white/50">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-brand-gradient p-5">
                <p className="text-sm font-bold">✦ Your preferences. Your destination. Your perfect match.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
