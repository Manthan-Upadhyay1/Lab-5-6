import { cx } from "../../utils/helpers";

/**
 * The badge + serif headline + intro paragraph used at the top of every section.
 * `accent` is rendered with the brand gradient. `tone="dark"` is for ink backgrounds.
 */
export default function SectionHeading({ badge, title, accent, description, tone = "light", className }) {
  const dark = tone === "dark";
  return (
    <div className={cx("mx-auto max-w-3xl text-center", className)}>
      <span
        className={cx(
          "inline-flex items-center rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.15em]",
          dark
            ? "border border-white/10 bg-white/5 text-coral-300"
            : "border border-brand-200 bg-brand-50 text-brand-700",
        )}
      >
        {badge}
      </span>
      <h2
        className={cx(
          "mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}{" "}
        {accent && <span className={dark ? "text-gradient-light" : "text-gradient"}>{accent}</span>}
      </h2>
      {description && (
        <p
          className={cx(
            "mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg",
            dark ? "text-white/55" : "text-ink/60",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
