/** Join class names, ignoring falsy values. */
export const cx = (...parts) => parts.filter(Boolean).join(" ");

/** "2026-10-12T09:00:00.000Z" → "12 Oct 2026" */
export const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

/** Does a profile match the text typed in the search box? */
export const matchesQuery = (profile, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [
    profile.profileName,
    profile.destination,
    profile.cuisine,
    profile.dietary,
    profile.ambience,
    profile.notes,
  ]
    .filter(Boolean)
    .some((field) => String(field).toLowerCase().includes(q));
};
