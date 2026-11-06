import { cx } from "../../utils/helpers";

/** DineMate brand mark: gradient tile + wordmark. */
export default function Logo({ tone = "light", className }) {
  return (
    <a href="#home" className={cx("inline-flex items-center gap-2.5", className)} aria-label="DineMate AI home">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-xl shadow-[0_6px_18px_rgba(103,67,238,0.35)]">
        🍴
      </span>
      <span className={cx("text-lg font-extrabold leading-none tracking-tight", tone === "dark" ? "text-white" : "text-ink")}>
        DineMate{" "}
        <span className={cx("font-bold tracking-wider", tone === "dark" ? "text-gradient-light" : "text-gradient")}>
          AI
        </span>
      </span>
    </a>
  );
}
