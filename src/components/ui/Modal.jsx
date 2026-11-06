import { useEffect } from "react";
import { cx } from "../../utils/helpers";

/**
 * Accessible modal shell: Esc to close, click on the backdrop to close,
 * locks page scroll while open. Used by the AI demo and the delete confirmation.
 */
export default function Modal({ onClose, labelledBy, children, panelClassName }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      className="fixed inset-0 z-[100] overflow-y-auto bg-ink/70 px-4 py-6 backdrop-blur-sm"
    >
      <div
        className="flex min-h-full items-center justify-center"
        onMouseDown={(event) => event.target === event.currentTarget && onClose()}
      >
        <div className={cx("pop-in relative w-full", panelClassName)}>{children}</div>
      </div>
    </div>
  );
}
