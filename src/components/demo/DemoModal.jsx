import { useLayoutEffect, useRef, useState } from "react";
import { useDemo } from "../../context/DemoContext";
import { useProfilesContext } from "../../context/ProfilesContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { gsap } from "../../lib/gsap";
import { searchRestaurants } from "../../services/placesService";
import LocationField from "../profiles/LocationField";
import PreferenceFields from "../profiles/PreferenceFields";
import Button from "../ui/Button";
import { CloseIcon, RobotIcon } from "../ui/Icons";
import Modal from "../ui/Modal";
import SelectField from "../ui/SelectField";
import RestaurantCard from "./RestaurantCard";

// Same localStorage key + shape as the Part 1 demo, so "last search" still works.
const SAVED_KEY = "dinematePreferences";

const EMPTY_PREFS = {
  cuisine: "",
  budget: "",
  dietary: "",
  groupSize: "",
  ambience: "",
  latitude: null,
  longitude: null,
};

const fromSaved = (saved) => ({
  ...EMPTY_PREFS,
  cuisine: saved.cuisine ?? "",
  budget: saved.budget ?? "",
  dietary: saved.dietary ?? "",
  groupSize: saved.groupSize ?? "",
  ambience: saved.ambience ?? "",
  latitude: saved.location?.latitude ?? null,
  longitude: saved.location?.longitude ?? null,
});

const fromProfile = (profile) => ({
  cuisine: profile.cuisine ?? "",
  budget: profile.budget ?? "",
  dietary: profile.dietary ?? "",
  groupSize: profile.groupSize ?? "",
  ambience: profile.ambience ?? "",
  latitude: profile.latitude ?? null,
  longitude: profile.longitude ?? null,
});

export default function DemoModal() {
  const { profile: initialProfile, closeDemo } = useDemo();
  const { profiles } = useProfilesContext();
  const [saved, setSaved] = useLocalStorage(SAVED_KEY, null);

  // Opened from a profile card → pre-fill from it; otherwise restore the last search
  const [prefs, setPrefs] = useState(() =>
    initialProfile ? fromProfile(initialProfile) : saved ? fromSaved(saved) : EMPTY_PREFS,
  );
  const [profileId, setProfileId] = useState(initialProfile ? String(initialProfile.id) : "");
  const [searching, setSearching] = useState(false);
  const [notice, setNotice] = useState("");
  const [results, setResults] = useState(null); // { places, prefs } | null

  const layoutRef = useRef(null);
  const prefsRef = useRef(null);
  const resultsRef = useRef(null);
  const leftBeforeResults = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPrefs((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePick = (event) => {
    const id = event.target.value;
    setProfileId(id);
    const match = profiles.find((p) => String(p.id) === id);
    if (match) setPrefs(fromProfile(match));
  };

  const handleFind = async () => {
    // 1. Remember the latest preferences (Part 1 saved them before validating)
    setSaved({
      location: { latitude: prefs.latitude, longitude: prefs.longitude },
      cuisine: prefs.cuisine,
      budget: prefs.budget,
      dietary: prefs.dietary,
      groupSize: prefs.groupSize,
      ambience: prefs.ambience,
    });

    // 2. Validate location
    if (prefs.latitude == null || prefs.longitude == null) {
      setNotice("Please allow your location first.");
      return;
    }

    // 3. Search
    setNotice("");
    setSearching(true);
    try {
      const places = await searchRestaurants(prefs);
      if (!places.length) {
        setNotice("No restaurants found for these preferences.");
        return;
      }
      // remember where the preferences card is now, so it can glide to the left
      leftBeforeResults.current = prefsRef.current?.getBoundingClientRect().left ?? null;
      setResults({ places, prefs: { ...prefs } });
    } catch (error) {
      console.error("Google Places error:", error);
      setNotice(`Unable to find restaurants. ${error.message ?? ""}`.trim());
    } finally {
      setSearching(false);
    }
  };

  /* Slide the preferences card left, bring the results in, stagger the cards. */
  useLayoutEffect(() => {
    if (!results) return;
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (leftBeforeResults.current != null) {
        const delta = leftBeforeResults.current - prefsRef.current.getBoundingClientRect().left;
        if (Math.abs(delta) > 1) {
          timeline.fromTo(prefsRef.current, { x: delta }, { x: 0, duration: 0.8, ease: "power3.inOut" });
        }
      }

      timeline
        .fromTo(resultsRef.current, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.7 }, "-=0.45")
        .fromTo(
          ".restaurant-card",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.3",
        );
    }, layoutRef);
    return () => ctx.revert();
  }, [results]);

  const profileOptions = [
    { value: "", label: "Choose a saved profile…" },
    ...profiles.map((p) => ({ value: String(p.id), label: `${p.profileName} · ${p.destination}` })),
  ];

  return (
    <Modal onClose={closeDemo} labelledBy="demo-title" panelClassName="max-w-[1500px]">
      <div id="ai-demo-box" className="overflow-hidden rounded-[2rem] bg-canvas shadow-2xl">
        {/* ---------- Header ---------- */}
        <div className="flex items-center justify-between border-b border-brand-100 px-6 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <RobotIcon />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">DineMate AI</p>
              <h2 id="demo-title" className="text-lg font-bold text-ink">
                AI Recommendation Demo
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDemo}
            aria-label="Close AI Demo"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-brand-50 hover:text-ink"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ---------- Body ---------- */}
        <div className="p-6 md:p-8">
          <div ref={layoutRef} className="demo-layout">
            {/* LEFT: preferences */}
            <div ref={prefsRef} className="demo-preferences">
              <div className="rounded-[2rem] bg-mesh-dark p-7 text-white">
                <div className="mb-8">
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/70">
                    <span className="h-2 w-2 rounded-full bg-coral-400" /> AI Assistant
                  </div>
                  <h3 className="font-display text-4xl text-white">Tell us what you&apos;re looking for.</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Give DineMate a few details and we&apos;ll find restaurants that match your preferences.
                  </p>
                </div>

                {profiles.length > 0 && (
                  <SelectField
                    label="📂 Load a saved profile"
                    name="savedProfile"
                    value={profileId}
                    onChange={handleProfilePick}
                    options={profileOptions}
                    tone="dark"
                    className="mb-5"
                  />
                )}

                <PreferenceFields
                  values={prefs}
                  onChange={handleChange}
                  tone="dark"
                  lead={
                    <LocationField
                      tone="dark"
                      latitude={prefs.latitude}
                      longitude={prefs.longitude}
                      onChange={(coords) => setPrefs((prev) => ({ ...prev, ...coords }))}
                    />
                  }
                />

                {notice && (
                  <p role="alert" className="mt-5 rounded-xl bg-coral-500/15 px-4 py-3 text-sm font-medium text-coral-200">
                    {notice}
                  </p>
                )}

                <Button
                  variant="gradient"
                  size="lg"
                  arrow={!searching}
                  loading={searching}
                  onClick={handleFind}
                  className="mt-6 w-full !rounded-2xl !py-4 !text-base"
                >
                  {searching ? "Finding restaurants..." : "Find My Restaurants"}
                </Button>
              </div>
            </div>

            {/* RIGHT: results (only after a successful search) */}
            {results && (
              <div ref={resultsRef} className="restaurant-results">
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-700">
                      Step 2
                    </span>
                    <span className="text-sm text-slate-400">AI Recommended Results</span>
                  </div>
                  <h3 className="mt-3 text-4xl font-bold text-ink">
                    Restaurants <span className="text-gradient">for You</span>
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {results.places.length} restaurants found near you.
                  </p>
                </div>

                <div className="restaurant-results-grid">
                  {results.places.map((place) => (
                    <RestaurantCard key={place.id} place={place} preferences={results.prefs} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
