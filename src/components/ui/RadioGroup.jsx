import { cx } from "../../utils/helpers";
import { labelClasses } from "./Field";

/**
 * Real <input type="radio"> elements, styled as pill buttons.
 * The radio is visually hidden (`sr-only`) but stays keyboard- and
 * screen-reader-accessible; `peer-checked:` styles the selected pill.
 */
export default function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  tone = "light",
  columns, // e.g. "grid-cols-4" for equal-width pills
}) {
  const pill =
    tone === "dark"
      ? "border-white/10 bg-white/10 text-white hover:bg-white/20 peer-checked:border-brand-400 peer-checked:bg-brand-500 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-300"
      : "border-slate-200 bg-white text-ink/70 hover:border-brand-300 hover:text-ink peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400";

  return (
    <fieldset>
      <legend className={cx(labelClasses(tone), "mb-2.5")}>{legend}</legend>
      <div className={cx(columns ? `grid gap-2 ${columns}` : "flex flex-wrap gap-2")}>
        {options.map((option) => (
          <label key={option.value || "any"} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="peer sr-only"
            />
            <span
              className={cx(
                "block rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition",
                pill,
              )}
            >
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p role="alert" className={cx("mt-1.5 text-xs font-medium", tone === "dark" ? "text-coral-300" : "text-red-600")}>
          {error}
        </p>
      )}
    </fieldset>
  );
}
