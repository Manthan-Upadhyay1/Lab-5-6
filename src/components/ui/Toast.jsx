import { useEffect } from "react";
import { cx } from "../../utils/helpers";

/** Auto-dismissing feedback message (Create / Update / Delete confirmations). */
export default function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onDismiss, 3500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;
  const isError = toast.type === "error";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <div
        role="status"
        className={cx(
          "toast-in pointer-events-auto flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(21,15,56,0.35)]",
          isError ? "bg-red-600" : "bg-ink",
        )}
      >
        <span
          className={cx(
            "flex h-6 w-6 items-center justify-center rounded-full text-xs",
            isError ? "bg-white/20" : "bg-brand-gradient",
          )}
        >
          {isError ? "!" : "✓"}
        </span>
        {toast.message}
      </div>
    </div>
  );
}
