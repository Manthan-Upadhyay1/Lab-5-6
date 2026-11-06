# Project demonstration (5–7 min)

1. **Intro (30 s)** – DineMate AI, Part 1 vs Part 2. Show the new palette; scroll the landing page (loader, hero, pinned "How it works").
2. **Architecture (60 s)** – VS Code: `components/ui` (reusable), `hooks/useProfiles.js`, `services/profileApi.js`, `db.json`.
3. **Read (30 s)** – "My Profiles" lists records from JSON Server. Show `http://localhost:3001/profiles` in a tab.
4. **Create (60 s)** – Fill the form (text, selects, radios, location, notes). Show validation by submitting empty. Save → toast → new card → refresh → still there → `db.json` changed.
5. **Search (30 s)** – type `mumbai`, `vegan`, then a nonsense word (empty state).
6. **Update (60 s)** – Edit a card → "Editing profile #n" → change fields → Save changes → same id in `db.json`.
7. **Delete (30 s)** – Delete → confirmation dialog → confirm → card gone and record removed from `db.json`.
8. **AI demo integration (60 s)** – "Find restaurants" on a card → modal pre-filled → allow location → results with match scores.
9. **Responsive + wrap-up (30 s)** – DevTools at 390 px; mention PWA/Capacitor as the next step.
