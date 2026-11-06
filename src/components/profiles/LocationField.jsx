import { useGeolocation } from "../../hooks/useGeolocation";
import { cx } from "../../utils/helpers";
import { labelClasses } from "../ui/Field";

/**
 * "Use my current location" – shared by the profile form and the AI demo.
 * Stores latitude/longitude through `onChange`.
 */
export default function LocationField({ latitude, longitude, onChange, tone = "light" }) {
  const geo = useGeolocation(onChange);
  const hasCoords = latitude != null && longitude != null;
  const dark = tone === "dark";

  let label = "Use my current location";
  if (geo.status === "loading") label = "Getting your location...";
  else if (geo.status === "success") label = "✓ Location detected";
  else if (hasCoords) label = "✓ Saved location";

  const statusText =
    geo.status === "error" || geo.status === "unsupported"
      ? geo.message
      : hasCoords
        ? `${Number(latitude).toFixed(4)}, ${Number(longitude).toFixed(4)}`
        : "";

  const detected = hasCoords && geo.status !== "error";

  return (
    <div>
      <span className={labelClasses(tone)}>📍 Location</span>
      <button
        type="button"
        onClick={geo.locate}
        disabled={geo.status === "loading"}
        className={cx(
          "w-full rounded-xl border px-4 py-3 text-left text-sm transition",
          dark
            ? "border-white/10 bg-white/10 text-slate-300 hover:bg-white/15"
            : "border-slate-200 bg-white text-ink/70 hover:border-brand-300",
          detected && (dark ? "!border-green-400 !text-green-300" : "!border-green-500 !text-green-700"),
        )}
      >
        {label}
      </button>
      {statusText && (
        <p
          className={cx(
            "mt-2 flex items-center justify-between text-xs",
            geo.status === "error" || geo.status === "unsupported"
              ? dark
                ? "text-coral-300"
                : "text-red-600"
              : dark
                ? "text-brand-200"
                : "text-slate-500",
          )}
        >
          <span>{statusText}</span>
          {hasCoords && geo.status !== "error" && (
            <button
              type="button"
              onClick={() => {
                geo.reset();
                onChange({ latitude: null, longitude: null });
              }}
              className="font-semibold underline-offset-2 hover:underline"
            >
              Clear
            </button>
          )}
        </p>
      )}
    </div>
  );
}
