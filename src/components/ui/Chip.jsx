import { cx } from "../../utils/helpers";

const TONES = {
  neutral: "bg-ink/5 text-ink/70",
  brand: "bg-brand-50 text-brand-700",
  coral: "bg-coral-50 text-coral-600",
  green: "bg-green-50 text-green-700",
  dark: "bg-white/5 text-white/50",
  white: "bg-white text-ink/60",
};

/** Small rounded tag. */
export default function Chip({ tone = "neutral", className, children }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
