import { useRef } from "react";
import { TRAVELLERS } from "../../data/content";
import { useGsap } from "../../hooks/useGsap";
import { gsap } from "../../lib/gsap";
import Chip from "../ui/Chip";
import SectionHeading from "../ui/SectionHeading";

/** Reusable dark glass card. */
function TravellerCard({ icon, title, text, tags }) {
  return (
    <article className="traveller-card group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand-400/50 hover:bg-white/[0.07] hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      <div className="traveller-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 text-2xl ring-1 ring-brand-400/30 transition-all duration-300 group-hover:bg-brand-gradient group-hover:ring-transparent">
        {icon}
      </div>
      <h3 className="mt-7 text-xl font-extrabold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Chip key={tag} tone="dark" className="!text-[10px]">{tag}</Chip>
        ))}
      </div>
    </article>
  );
}

export default function Travellers() {
  const rootRef = useRef(null);

  useGsap(rootRef, () => {
    const cards = gsap.utils.toArray(".traveller-card");
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, x: i % 2 === 0 ? -80 : 80, y: 30, rotation: i % 2 === 0 ? -3 : 3 });
      const icon = card.querySelector(".traveller-icon");
      if (icon) gsap.set(icon, { opacity: 0, scale: 0.5 });
    });

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: rootRef.current, start: "top 65%", toggleActions: "play none none reverse" },
    });
    cards.forEach((card, i) => {
      timeline.to(card, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.7, ease: "power3.out" }, i * 0.12);
      const icon = card.querySelector(".traveller-icon");
      if (icon) timeline.to(icon, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, i * 0.12 + 0.35);
    });

    gsap.from("#traveller-summary", {
      scrollTrigger: { trigger: rootRef.current, start: "top 35%", toggleActions: "play none none reverse" },
      opacity: 0,
      y: 35,
      scale: 0.96,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <section id="travellers" ref={rootRef} className="relative overflow-hidden bg-mesh-dark py-20 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          badge="Built For Your Journey"
          title={<>One AI companion.<br /></>}
          accent="Every kind of traveller."
          description="Whether you're exploring alone, travelling with family, or meeting clients abroad, DineMate adapts to your journey."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRAVELLERS.map((t) => (
            <TravellerCard key={t.title} {...t} />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm text-white">✦</span>
          <p id="traveller-summary" className="text-sm font-semibold text-white/60">
            Different journeys. <span className="text-white">One intelligent dining companion.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
