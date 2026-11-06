import { cx } from "../../utils/helpers";

/** Shared look for inputs/selects. `tone` switches between light and dark cards. */
export const controlClasses = (tone, hasError) =>
  cx(
    "w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
    tone === "dark"
      ? "border-white/10 bg-white/10 text-white placeholder:text-white/40 focus:border-brand-300 focus:ring-4 focus:ring-brand-500/25"
      : "border-slate-200 bg-white text-ink placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100",
    hasError && "!border-red-400 focus:!ring-red-100",
  );

export const labelClasses = (tone) =>
  cx("mb-2 block text-sm font-semibold", tone === "dark" ? "text-white" : "text-ink");

/** Label + control + error message wrapper. */
export default function Field({ label, htmlFor, error, hint, tone = "light", className, children }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className={labelClasses(tone)}>
          {label}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className={cx("mt-1.5 text-xs", tone === "dark" ? "text-white/50" : "text-slate-500")}>
          {hint}
        </p>
      )}
      {error && (
        <p role="alert" className={cx("mt-1.5 text-xs font-medium", tone === "dark" ? "text-coral-300" : "text-red-600")}>
          {error}
        </p>
      )}
    </div>
  );
}
