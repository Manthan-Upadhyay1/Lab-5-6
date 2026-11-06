import { useCallback, useMemo, useRef, useState } from "react";
import { useDemo } from "../../context/DemoContext";
import { useProfilesContext } from "../../context/ProfilesContext";
import { IS_LOCAL_PREVIEW } from "../../services/profileApi";
import { matchesQuery } from "../../utils/helpers";
import ConfirmDialog from "../profiles/ConfirmDialog";
import ProfileCard from "../profiles/ProfileCard";
import ProfileForm from "../profiles/ProfileForm";
import SearchBar from "../profiles/SearchBar";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import Toast from "../ui/Toast";

/**
 * "My Dining Profiles" – the CRUD module for Lab 5 & 6.
 *
 *   Create → <ProfileForm>  (POST)
 *   Read   → <ProfileCard>  list (GET)
 *   Update → Edit button re-uses <ProfileForm> (PUT)
 *   Delete → Delete button + <ConfirmDialog> (DELETE)
 *   Search → <SearchBar> filters the list as you type
 */
export default function ProfilesSection() {
  const { profiles, status, error, reload, createProfile, updateProfile, deleteProfile } =
    useProfilesContext();
  const { openDemo } = useDemo();

  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null); // profile being edited, or null
  const [toDelete, setToDelete] = useState(null); // profile awaiting confirmation
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const formRef = useRef(null);

  const dismissToast = useCallback(() => setToast(null), []);

  // Search: derive the visible list from state – no extra storage needed
  const visible = useMemo(() => profiles.filter((p) => matchesQuery(p, query)), [profiles, query]);

  /* ---------- Create & Update ---------- */
  const handleSubmit = async (values) => {
    if (editing) {
      await updateProfile(editing.id, values);
      setToast({ message: `“${values.profileName}” updated` });
      setEditing(null);
    } else {
      await createProfile(values);
      setToast({ message: `“${values.profileName}” created` });
    }
  };

  const startEditing = (profile) => {
    setEditing(profile);
    // On phones the form sits above the list, so bring it into view
    if (window.matchMedia("(max-width: 1023px)").matches) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  /* ---------- Delete ---------- */
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteProfile(toDelete.id);
      if (editing?.id === toDelete.id) setEditing(null);
      setToast({ message: `“${toDelete.profileName}” deleted` });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  return (
    <section id="profiles" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-brand-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-coral-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Saved Profiles"
          title="Your dining profiles,"
          accent="always one tap away."
          description="Save the way you like to eat once, then reuse it anywhere. Create, edit, search and delete profiles — everything is stored in your JSON Server database."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-start">
          {/* ---------- Left: Create / Update form ---------- */}
          <div ref={formRef} className="scroll-mt-28 lg:sticky lg:top-28">
            <ProfileForm
              key={editing ? `edit-${editing.id}` : "new"}
              initialValues={editing ?? undefined}
              isEditing={Boolean(editing)}
              onSubmit={handleSubmit}
              onCancel={() => setEditing(null)}
            />
          </div>

          {/* ---------- Right: Search + Read ---------- */}
          <div>
            <SearchBar value={query} onChange={setQuery} />

            <div className="mt-4 flex items-center justify-between text-sm">
              <p className="font-semibold text-ink/60" aria-live="polite">
                {status === "ready" &&
                  (query
                    ? `${visible.length} of ${profiles.length} profiles match “${query}”`
                    : `${profiles.length} saved ${profiles.length === 1 ? "profile" : "profiles"}`)}
              </p>
              <span className="hidden items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 sm:inline-flex">
                <span className="h-2 w-2 rounded-full bg-green-500" />{" "}
                {IS_LOCAL_PREVIEW ? "Preview: saved in this browser" : "Synced with JSON Server"}
              </span>
            </div>

            <div className="mt-5">
              {status === "loading" && <ListSkeleton />}

              {status === "error" && (
                <div role="alert" className="rounded-[1.75rem] border border-red-200 bg-red-50 p-7 text-center">
                  <p className="text-3xl">🔌</p>
                  <h4 className="mt-3 text-lg font-extrabold text-red-800">Can't reach the database</h4>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-red-700/80">{error}</p>
                  <Button variant="danger" size="sm" className="mt-5" onClick={reload}>
                    Try again
                  </Button>
                </div>
              )}

              {status === "ready" && profiles.length === 0 && (
                <EmptyState
                  emoji="🍽️"
                  title="No profiles yet"
                  text="Create your first dining profile using the form."
                />
              )}

              {status === "ready" && profiles.length > 0 && visible.length === 0 && (
                <EmptyState
                  emoji="🔎"
                  title="No matching profiles"
                  text={`Nothing matches “${query}”. Try a city, cuisine or dietary need.`}
                  action={
                    <Button variant="soft" size="sm" onClick={() => setQuery("")}>
                      Clear search
                    </Button>
                  }
                />
              )}

              {status === "ready" && visible.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  {visible.map((profile) => (
                    <ProfileCard
                      key={profile.id}
                      profile={profile}
                      isEditing={editing?.id === profile.id}
                      onEdit={startEditing}
                      onDelete={setToDelete}
                      onFind={openDemo}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {toDelete && (
        <ConfirmDialog
          title={`Delete “${toDelete.profileName}”?`}
          message="This permanently removes the profile from the database. You can't undo this."
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => !deleting && setToDelete(null)}
        />
      )}

      <Toast toast={toast} onDismiss={dismissToast} />
    </section>
  );
}

function EmptyState({ emoji, title, text, action }) {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-brand-200 bg-brand-50/50 p-10 text-center">
      <p className="text-4xl">{emoji}</p>
      <h4 className="mt-3 text-lg font-extrabold text-ink">{title}</h4>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-ink/55">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2" aria-busy="true" aria-label="Loading profiles">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-56 animate-pulse rounded-[1.75rem] border border-ink/5 bg-canvas" />
      ))}
    </div>
  );
}
