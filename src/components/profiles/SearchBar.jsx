import { CloseIcon, SearchIcon } from "../ui/Icons";

/** Live search box – filters the list on every keystroke (bonus requirement). */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, city, cuisine, diet, notes…"
        aria-label="Search dining profiles"
        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-11 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink/50 transition hover:bg-brand-50 hover:text-ink"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
