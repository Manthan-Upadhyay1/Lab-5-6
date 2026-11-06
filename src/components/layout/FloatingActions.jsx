import { useEffect, useState } from "react";
import { useDemo } from "../../context/DemoContext";
import { RobotIcon } from "../ui/Icons";

/** Floating "Get AI Demo" pill + contextual back-to-top button. */
export default function FloatingActions() {
  const { openDemo } = useDemo();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY >= 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => openDemo()}
        aria-label="Get AI demo"
        className="demo-fab fixed bottom-20 right-4 z-50 inline-flex items-center gap-0 rounded-full bg-ink px-3 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:gap-3 hover:bg-ink-soft focus-visible:gap-3 sm:right-6 md:right-15"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient">
          <RobotIcon className="h-5 w-5 text-white" />
        </span>
        <span className="demo-fab-label">Get AI Demo</span>
      </button>

      {showTop && (
        <button
          type="button"
          aria-label="Back to top"
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </>
  );
}
