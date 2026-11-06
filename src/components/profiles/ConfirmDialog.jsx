import Button from "../ui/Button";
import Modal from "../ui/Modal";

/** "Are you sure?" dialog shown before a record is deleted. */
export default function ConfirmDialog({ title, message, confirmLabel = "Delete", busy, onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel} labelledBy="confirm-title" panelClassName="max-w-md">
      <div className="rounded-[1.75rem] bg-white p-7 shadow-2xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-xl">🗑️</span>
        <h3 id="confirm-title" className="mt-5 text-xl font-extrabold text-ink">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink/60">{message}</p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onCancel} disabled={busy}>
            Keep it
          </Button>
          <Button variant="danger" onClick={onConfirm} loading={busy}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
