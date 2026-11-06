import { cx } from "../../utils/helpers";

const VARIANTS = {
  primary:
    "bg-brand-600 text-white shadow-[0_10px_30px_rgba(103,67,238,0.28)] hover:bg-brand-700 hover:shadow-[0_14px_34px_rgba(103,67,238,0.34)]",
  gradient:
    "bg-brand-gradient text-white shadow-[0_10px_30px_rgba(103,67,238,0.28)] hover:brightness-110",
  dark: "bg-ink text-white hover:bg-ink-soft",
  outline: "border border-ink/15 bg-white/60 text-ink hover:bg-white",
  ghost: "text-ink/80 hover:bg-white hover:text-ink",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  light: "bg-white text-ink hover:bg-brand-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const SIZES = {
  sm: "px-3.5 py-2 text-xs rounded-lg",
  md: "px-5 py-2.5 text-sm rounded-xl",
  lg: "px-6 py-3.5 text-sm rounded-xl",
};

/**
 * One button for the whole app. Renders an <a> when `href` is given,
 * otherwise a <button>. `arrow` adds the animated → used throughout the design.
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  arrow = false,
  loading = false,
  className,
  children,
  type = "button",
  ...rest
}) {
  const classes = cx(
    "group inline-flex items-center justify-center gap-2 font-bold transition-all duration-300",
    "hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60",
    VARIANTS[variant],
    SIZES[size],
    className,
  );

  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
      {arrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={loading || rest.disabled} {...rest}>
      {content}
    </button>
  );
}
