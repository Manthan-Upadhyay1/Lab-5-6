// Single source of truth for every dropdown / radio group in the app.
// The values are the same ones used by the Part 1 (HTML/JS) demo form.

export const CUISINE_OPTIONS = [
  { value: "", label: "Any cuisine" },
  { value: "Indian", label: "Indian" },
  { value: "Italian", label: "Italian" },
  { value: "Chinese", label: "Chinese" },
  { value: "Asian", label: "Asian" },
  { value: "Mexican", label: "Mexican" },
];

export const BUDGET_OPTIONS = [
  { value: "", label: "Any budget" },
  { value: "budget", label: "₹300 – ₹700" },
  { value: "moderate", label: "₹700 – ₹1500" },
  { value: "premium", label: "₹1500+" },
];

export const DIETARY_OPTIONS = [
  { value: "", label: "No preference" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten free", label: "Gluten Free" },
];

export const GROUP_SIZE_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "4", label: "4" },
  { value: "6+", label: "6+" },
];

export const AMBIENCE_OPTIONS = [
  { value: "", label: "Any" },
  { value: "Casual", label: "Casual" },
  { value: "Romantic", label: "Romantic" },
  { value: "Family", label: "Family" },
  { value: "Business", label: "Business" },
];

/** Shape of one dining-profile record (what JSON Server stores). */
export const EMPTY_PROFILE = {
  profileName: "",
  destination: "",
  cuisine: "",
  budget: "",
  dietary: "",
  groupSize: "",
  ambience: "",
  notes: "",
  latitude: null,
  longitude: null,
};

/** Look up the human label for a stored value. */
export const labelFor = (options, value) =>
  options.find((o) => o.value === value)?.label ?? value;
