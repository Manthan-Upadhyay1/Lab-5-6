import Button from "../ui/Button";
import Chip from "../ui/Chip";

/** One Google Places result. `preferences` is the snapshot used for the search. */
export default function RestaurantCard({ place, preferences }) {
  return (
    <article className="restaurant-card flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="text-lg font-bold text-ink">{place.name}</h4>
          <p className="mt-1 text-sm text-slate-500">{place.address}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-gold-400/20 px-3 py-2 text-center">
          <div className="text-sm font-bold text-amber-700">{place.rating}</div>
          <div className="text-[10px] text-slate-500">★ Rating</div>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Chip tone="brand">{preferences.cuisine || "Restaurant"}</Chip>
        {preferences.dietary && <Chip tone="green" className="capitalize">{preferences.dietary}</Chip>}
        {preferences.groupSize && <Chip tone="neutral">👥 {preferences.groupSize}</Chip>}
        {preferences.ambience && <Chip tone="coral">{preferences.ambience}</Chip>}
      </div>

      <div className="mb-4 rounded-xl bg-canvas p-3">
        <div className="flex items-center justify-between gap-3 text-xs font-medium">
          <span className="flex items-center gap-2 text-ink/60">
            <span>✨</span> Found based on your DineMate preferences
          </span>
          <span className="shrink-0 font-extrabold text-brand-700">{place.score}% match</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${place.score}%` }} />
        </div>
      </div>

      {place.mapsUrl && (
        <Button
          href={place.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="dark"
          className="mt-auto w-full"
        >
          View on Google Maps ↗
        </Button>
      )}
    </article>
  );
}
