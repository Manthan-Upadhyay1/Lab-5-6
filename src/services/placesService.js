import { GOOGLE_MAPS_API_KEY } from "../config";

/* ------------------------------------------------------------------
   Google Places (New) – the same search the Part 1 demo performed.
   The Maps script is loaded lazily, the first time a search happens,
   instead of on every page load.
------------------------------------------------------------------- */
let mapsPromise = null;

function loadGoogleMaps() {
  // Already available (loaded earlier, or provided by a test stub)
  if (window.google?.maps?.importLibrary) return Promise.resolve();
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    if (!GOOGLE_MAPS_API_KEY) {
      mapsPromise = null;
      reject(new Error("Missing VITE_GOOGLE_MAPS_API_KEY in your .env file."));
      return;
    }
    window.__dinemateMapsReady = () => resolve();
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js" +
      `?key=${GOOGLE_MAPS_API_KEY}&v=weekly&loading=async&callback=__dinemateMapsReady`;
    script.async = true;
    script.onerror = () => {
      mapsPromise = null;
      reject(new Error("The Google Maps JavaScript API could not load."));
    };
    document.head.append(script);
  });

  return mapsPromise;
}

/** Build the free-text query exactly like Part 1, plus optional ambience. */
export function buildQuery({ cuisine, dietary, ambience }) {
  let query = cuisine ? `${cuisine} restaurants` : "restaurants";
  if (dietary) query += ` ${dietary}`;
  if (ambience) query += ` ${ambience.toLowerCase()}`;
  return query;
}

const PRICE_BANDS = {
  budget: ["PRICE_LEVEL_FREE", "PRICE_LEVEL_INEXPENSIVE"],
  moderate: ["PRICE_LEVEL_MODERATE"],
  premium: ["PRICE_LEVEL_EXPENSIVE", "PRICE_LEVEL_VERY_EXPENSIVE"],
};

/** Same scoring rules as Part 1 (+ a small bonus when the price band fits). */
export function calculateMatchScore(place, preferences) {
  let score = 70;
  if (place.rating) score += Math.round((place.rating - 3) * 6);
  if (preferences.cuisine) score += 5;
  if (preferences.dietary) score += 5;
  if (preferences.groupSize) score += 3;
  if (preferences.budget && PRICE_BANDS[preferences.budget]?.includes(place.priceLevel)) {
    score += 6;
  }
  return Math.max(65, Math.min(score, 98));
}

const SAMPLE_PLACES = [
  ["Saffron Terrace", "12 MG Road, Bengaluru", 4.6, "PRICE_LEVEL_MODERATE"],
  ["The Green Thali", "Indiranagar, Bengaluru", 4.8, "PRICE_LEVEL_INEXPENSIVE"],
  ["Masala Library", "Church Street, Bengaluru", 4.4, "PRICE_LEVEL_MODERATE"],
  ["Spice Route", "Koramangala, Bengaluru", 4.2, "PRICE_LEVEL_EXPENSIVE"],
];

/** Search restaurants near the given coordinates. Returns plain objects. */
export async function searchRestaurants(preferences) {
  // Hosted preview can't reach Google, so show clearly-labelled sample data
  if (import.meta.env.VITE_STORAGE === "local") {
    await new Promise((r) => setTimeout(r, 700));
    return SAMPLE_PLACES.map(([name, address, rating, priceLevel], i) => ({
      id: `sample-${i}`,
      name: `${name} (sample)`,
      address,
      rating: rating.toFixed(1),
      mapsUrl: null,
      score: calculateMatchScore({ rating, priceLevel }, preferences),
    }));
  }
  await loadGoogleMaps();
  const { Place } = await window.google.maps.importLibrary("places");

  const request = {
    textQuery: buildQuery(preferences),
    fields: [
      "displayName",
      "formattedAddress",
      "location",
      "rating",
      "priceLevel",
      "businessStatus",
      "googleMapsURI",
    ],
    includedType: "restaurant",
    maxResultCount: 6,
    language: "en",
    region: "IN",
    locationBias: {
      center: { lat: preferences.latitude, lng: preferences.longitude },
      radius: 5000,
    },
  };

  const { places } = await Place.searchByText(request);

  return (places ?? []).map((place, index) => ({
    id: place.id ?? place.googleMapsURI ?? `place-${index}`,
    name: place.displayName || "Restaurant",
    address: place.formattedAddress || "Address unavailable",
    rating: place.rating ? Number(place.rating).toFixed(1) : "N/A",
    mapsUrl: place.googleMapsURI ?? null,
    score: calculateMatchScore(place, preferences),
  }));
}
