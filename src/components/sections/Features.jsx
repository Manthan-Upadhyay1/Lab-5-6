import { useRef } from "react";
import { useGsap } from "../../hooks/useGsap";
import { gsap } from "../../lib/gsap";
import Chip from "../ui/Chip";
import SectionHeading from "../ui/SectionHeading";

/** Reusable card: icon + title + description + a custom "widget" slot. */
function FeatureCard({ icon, title, text, children }) {
  return (
    <article className="feature-card group relative overflow-hidden rounded-[1.75rem] border border-ink/10 bg-canvas p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand-500/30 hover:shadow-[0_20px_50px_rgba(21,15,56,0.10)]">
      <div className="feature-icon flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-100">
        {icon}
      </div>
      <h3 className="mt-7 text-xl font-extrabold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-ink/55">{text}</p>
      <div className="mt-6">{children}</div>
    </article>
  );
}

const Tags = ({ items, tone }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((t) => (
      <Chip key={t} tone={tone} className="!text-[10px]">{t}</Chip>
    ))}
  </div>
);

export default function Features() {
  const rootRef = useRef(null);

  useGsap(rootRef, () => {
    const cards = gsap.utils.toArray(".feature-card");
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0, y: 60 });
      const icon = card.querySelector(".feature-icon");
      if (icon) gsap.set(icon, { opacity: 0, scale: 0.5, rotation: -15 });
    });

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: rootRef.current, start: "top 70%", toggleActions: "play none none reverse" },
    });
    cards.forEach((card, i) => {
      timeline.to(card, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, i * 0.12);
      const icon = card.querySelector(".feature-icon");
      if (icon) {
        timeline.to(icon, { opacity: 1, scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.7)" }, i * 0.12 + 0.35);
      }
    });
  }, []);

  return (
    <section id="features" ref={rootRef} className="relative overflow-hidden bg-canvas py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-coral-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Personalization"
          title="Recommendations that"
          accent="know what you need."
          description="DineMate AI looks beyond ratings and popularity. It considers the details that make a restaurant right for you."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard icon="💰" title="Budget" text="Find restaurants that fit your spending range without compromising on quality.">
            <div className="flex items-center justify-between text-[10px] font-bold text-ink/40">
              <span>Budget</span>
              <span>₹500 – ₹1,500</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
              <div className="h-full w-2/3 rounded-full bg-brand-gradient" />
            </div>
          </FeatureCard>

          <FeatureCard icon="🍜" title="Cuisine" text="Discover restaurants based on the cuisines and flavours you enjoy.">
            <Tags items={["Italian", "Indian", "Asian"]} tone="white" />
          </FeatureCard>

          <FeatureCard icon="🥗" title="Dietary Needs" text="Find options compatible with vegetarian, vegan, gluten-free, halal, and other needs.">
            <Tags items={["Vegetarian", "Vegan", "Gluten Free"]} tone="green" />
          </FeatureCard>

          <FeatureCard icon="📍" title="Location" text="Discover great restaurants near your destination, hotel, or current location.">
            <div className="flex items-center gap-3 rounded-xl bg-white p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">📍</div>
              <div>
                <p className="text-[10px] font-bold text-ink/40">Current destination</p>
                <p className="text-xs font-bold text-ink">Mumbai, India</p>
              </div>
            </div>
          </FeatureCard>

          <FeatureCard icon="🏮" title="Local Food" text="Discover authentic local food and hidden gems that match your taste and travel style.">
            <div className="flex items-center justify-between rounded-xl bg-white p-3">
              <div className="flex items-center gap-3">
                <span className="text-lg">🍛</span>
                <div>
                  <p className="text-xs font-bold text-ink">Local Favourite</p>
                  <p className="text-[10px] text-ink/40">Authentic experience</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-brand-700">94%</span>
            </div>
          </FeatureCard>

          <FeatureCard icon="👥" title="Group Size" text="Get recommendations suitable for solo travellers, couples, families, and groups.">
            <div className="flex gap-2">
              {["1", "2", "4", "6+"].map((n, i) => (
                <span
                  key={n}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm ${
                    i === 0 ? "bg-brand-600 font-semibold text-white" : "bg-white font-semibold text-ink/50"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </FeatureCard>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm text-white">✦</span>
          <p className="text-sm font-semibold text-ink/60">
            The more DineMate knows, <span className="text-ink">the better it can recommend.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
