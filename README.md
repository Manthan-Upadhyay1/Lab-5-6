# DineMate AI – React + JSON Server (Lab Exercise 5 & 6)

React conversion of the Part 1 HTML/CSS/JS module ("DineMate AI" restaurant recommender),
extended with **CRUD** on **Dining Profiles** stored in **JSON Server**, plus live **search**.

## Quick start

```bash
npm install
npm run dev        # starts Vite (http://localhost:5173) AND JSON Server (http://localhost:3001)
```

Run them separately if you prefer: `npm run client` and `npm run server`.

`.env` (copy `.env.example`):

| Variable | Purpose |
|---|---|
| `VITE_API_URL` | JSON Server URL (default `http://localhost:3001`) |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Places key for the AI demo (moved out of the source code). Restrict it by HTTP referrer in Google Cloud Console. |

## REST API (JSON Server – `db.json`)

| Operation | Method & URL | Used in |
|---|---|---|
| Create | `POST /profiles` | `ProfileForm` (new) |
| Read   | `GET /profiles?_sort=createdAt&_order=desc` | `useProfiles` on load |
| Update | `PUT /profiles/:id` | `ProfileForm` (edit mode) |
| Delete | `DELETE /profiles/:id` | `ConfirmDialog` |
| Search | client-side filter on the loaded list | `SearchBar` |

## Project structure

```
src/
  components/
    ui/         Button, Modal, Field, TextField, SelectField, RadioGroup, Chip, Toast, Logo, Icons, SectionHeading
    profiles/   ProfileForm, ProfileCard, SearchBar, ConfirmDialog, PreferenceFields, LocationField
    demo/       DemoModal, RestaurantCard
    layout/     Navbar, Footer, Loader, FloatingActions
    sections/   Hero, Problem, HowItWorks, Features, Travellers, About, ProfilesSection
  hooks/        useProfiles, useGeolocation, useLocalStorage, useActiveSection, useGsap
  services/     profileApi (JSON Server), placesService (Google Places)
  context/      ProfilesContext, DemoContext
  data/         options.js (dropdown/radio lists), content.js (marketing copy)
  index.css     design tokens ("Twilight Coral" palette) + custom CSS
```

## Lab requirement checklist

| Requirement | Where |
|---|---|
| Functional components, JSX | every file in `src/components` |
| `useState()` | `ProfileForm`, `ProfilesSection`, `DemoModal`, `useProfiles` … |
| Event handling / form handling | `ProfileForm.handleChange / handleSubmit`, search, delete, edit |
| Multiple input fields | name, destination, notes, location, 3 selects, 2 radio groups |
| Radio buttons | `RadioGroup` → group size & ambience |
| Select dropdown | `SelectField` → cuisine, budget, dietary (+ "load saved profile") |
| Reusable components | `src/components/ui/*`, `PreferenceFields` (shared by form + demo) |
| CSS styling + responsive | Tailwind v4 + `index.css`, tested at 390 px and 1440 px |
| CRUD | `profileApi.js` + `useProfiles.js` |
| Bonus search | `SearchBar` + `matchesQuery()` |
| Database file | `db.json` |
