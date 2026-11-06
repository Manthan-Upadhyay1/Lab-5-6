import { useRef } from "react";
import { useDemo } from "../../context/DemoContext";
import { BENEFITS, PROFILE_BARS, PROFILE_TAGS } from "../../data/content";
import { useGsap } from "../../hooks/useGsap";
import { gsap } from "../../lib/gsap";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";

export default function About() {
  const rootRef = useRef(null);
  const { openDemo } = useDemo();

  useGsap(rootRef, () => {
    const trigger = { trigger: rootRef.current, start: "top 55%", toggleActions: "play none none reverse" };

    gsap.fromTo(
      "#about-profile-card",
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", scrollTrigger: { ...trigger, start: "top 70%" } },
    );

    gsap.fromTo(
      ".about-benefit",
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-benefit", start: "top 85%", toggleActions: "play none none reverse" },
      },
    );

    // Progress bars grow and the % numbers count up
    gsap.utils.toArray(".preference-bar").forEach((bar, i) => {
      gsap.to(bar, { width: bar.dataset.width, duration: 1.5, delay: i * 0.12, ease: "power3.out", scrollTrigger: trigger });
    });
    gsap.utils.toArray(".preference-value").forEach((el, i) => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: Number(el.dataset.value),
        duration: 1.5,
        delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: trigger,
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}%`;
        },
      });
    });
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative overflow-hidden bg-canvas py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-brand-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-coral-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Why DineMate AI?"
          title="Less searching."
          accent="More enjoying."
          description="DineMate AI takes the guesswork out of restaurant discovery, so you can spend less time searching and more time experiencing great food wherever your journey takes you."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Profile card */}
          <div id="about-profile-card" className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-mesh-dark p-6 shadow-[0_25px_70px_rgba(21,15,56,0.22)] sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Your dining profile</p>
                  <h3 className="mt-1 text-xl font-bold text-white">Manthan&apos;s Preferences</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-xl text-white">✦</div>
              </div>

              <div className="mt-8 space-y-5">
                {PROFILE_BARS.map((bar) => (
                  <div key={bar.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-slate-300">{bar.label}</span>
                      <span className="preference-value font-semibold text-coral-300" data-value={bar.value}>0%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="preference-bar h-full w-0 rounded-full bg-brand-gradient" data-width={`${bar.value}%`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {PROFILE_TAGS.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200">{tag}</span>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/15 text-green-400">✓</div>
                <div>
                  <p className="text-sm font-semibold text-white">AI profile ready</p>
                  <p className="text-xs text-slate-400">Personalization active</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-brand-100 bg-white px-5 py-4 shadow-[0_15px_40px_rgba(21,15,56,0.14)] sm:-right-6">
              <p className="text-xs font-medium text-slate-500">Average match</p>
              <p className="mt-1 text-2xl font-extrabold text-ink">93%</p>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="font-display text-3xl text-ink sm:text-4xl">A smarter way to discover food.</h3>
            <p className="mt-4 leading-7 text-slate-600">
              DineMate AI combines your preferences with your destination to create restaurant recommendations that actually make sense for your journey.
            </p>
            <div className="mt-8 space-y-5">
              {BENEFITS.map((b) => (
                <article
                  key={b.title}
                  className="about-benefit group flex gap-4 rounded-2xl border border-brand-100 bg-white/70 p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-xl">{b.icon}</div>
                  <div>
                    <h4 className="font-bold text-ink">{b.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{b.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-coral-500 px-6 py-10 text-center shadow-[0_20px_50px_rgba(103,67,238,0.28)] sm:px-10">
          <h3 className="font-display text-3xl text-white sm:text-4xl">Your journey deserves a better food search.</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-brand-50 sm:text-base">
            Tell DineMate where you&apos;re going and what you love. We&apos;ll help you discover where to eat.
          </p>
          <Button variant="dark" size="lg" arrow onClick={() => openDemo()} className="mt-6">
            Get Started with DineMate
          </Button>
        </div>
      </div>
    </section>
  );
}
