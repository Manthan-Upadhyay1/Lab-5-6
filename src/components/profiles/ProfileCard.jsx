import { AMBIENCE_OPTIONS, BUDGET_OPTIONS, DIETARY_OPTIONS, labelFor } from "../../data/options";
import { cx, formatDate } from "../../utils/helpers";
import Button from "../ui/Button";
import Chip from "../ui/Chip";
import { PencilIcon, TrashIcon } from "../ui/Icons";

/** READ view of one record, with its Update / Delete actions. */
export default function ProfileCard({ profile, isEditing, onEdit, onDelete, onFind }) {
  const hasLocation = profile.latitude != null && profile.longitude != null;

  return (
    <article
      className={cx(
        "pop-in flex flex-col rounded-[1.75rem] border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(21,15,56,0.12)]",
        isEditing
          ? "border-brand-500 shadow-[0_20px_50px_rgba(103,67,238,0.18)] ring-4 ring-brand-100"
          : "border-ink/10 shadow-[0_10px_35px_rgba(21,15,56,0.05)]",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="truncate text-lg font-extrabold tracking-tight text-ink">{profile.profileName}</h4>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/55">
            <span aria-hidden>📍</span>
            <span className="truncate">{profile.destination}</span>
          </p>
        </div>
        <span className="shrink-0 rounded-xl bg-brand-50 px-3 py-2 text-center">
          <span className="block text-sm font-extrabold leading-none text-brand-700">👥 {profile.groupSize}</span>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-wider text-brand-700/60">Guests</span>
        </span>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.cuisine && <Chip tone="brand">🍜 {profile.cuisine}</Chip>}
        {profile.budget && <Chip tone="neutral">{labelFor(BUDGET_OPTIONS, profile.budget)}</Chip>}
        {profile.dietary && <Chip tone="green">🥗 {labelFor(DIETARY_OPTIONS, profile.dietary)}</Chip>}
        {profile.ambience && <Chip tone="coral">{labelFor(AMBIENCE_OPTIONS, profile.ambience)}</Chip>}
      </div>

      {profile.notes && (
        <p className="mt-4 line-clamp-2 rounded-xl bg-canvas px-3.5 py-3 text-xs leading-5 text-ink/60">
          “{profile.notes}”
        </p>
      )}

      <p className="mt-4 text-[11px] font-medium text-ink/40">
        {hasLocation ? "📡 Location saved" : "No location saved"} · Updated {formatDate(profile.updatedAt)}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
        <Button variant="soft" size="sm" onClick={() => onFind(profile)} className="w-full" arrow>
          Find restaurants
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(profile)}
          aria-label={`Edit ${profile.profileName}`}
          className="flex-1"
        >
          <PencilIcon /> Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(profile)}
          aria-label={`Delete ${profile.profileName}`}
          className="flex-1 !text-red-600 hover:!bg-red-50"
        >
          <TrashIcon /> Delete
        </Button>
      </div>
    </article>
  );
}
